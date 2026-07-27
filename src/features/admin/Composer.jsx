import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, X, Loader2, Check, AlertCircle } from 'lucide-react';
import { createPost } from '../../lib/posts';

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPTED = 'image/jpeg,image/png,image/webp,image/gif,image/avif';

/** Read a File into a data URL and its natural dimensions. */
function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.onload = () => {
      const dataUrl = reader.result;
      const img = new Image();
      img.onerror = () => reject(new Error("That file isn't a readable image."));
      img.onload = () => resolve({ dataUrl, width: img.naturalWidth, height: img.naturalHeight });
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

const Composer = ({ accessToken, onPublished }) => {
  const [caption, setCaption] = useState('');
  const [title, setTitle] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [image, setImage] = useState(null); // { dataUrl, width, height, name }
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState('idle'); // idle | uploading | saving | done
  const [error, setError] = useState('');

  const fileRef = useRef(null);
  const textareaRef = useRef(null);

  // Grow the caption box with its content instead of showing a scrollbar.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 420)}px`;
  }, [caption]);

  const acceptFile = useCallback(async (file) => {
    if (!file) return;
    setError('');

    if (!file.type.startsWith('image/')) {
      setError('That needs to be an image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(`That image is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is 10 MB.`);
      return;
    }

    try {
      const read = await readImage(file);
      setImage({ ...read, name: file.name });
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  // Paste a screenshot straight in.
  useEffect(() => {
    const onPaste = (e) => {
      const file = Array.from(e.clipboardData?.items ?? [])
        .find((item) => item.type.startsWith('image/'))
        ?.getAsFile();
      if (file) acceptFile(file);
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [acceptFile]);

  const reset = () => {
    setCaption('');
    setTitle('');
    setTagInput('');
    setImage(null);
    setError('');
    setState('idle');
  };

  const publish = async (e) => {
    e.preventDefault();
    setError('');

    if (!caption.trim() && !image) {
      setError('Add an image or write something.');
      return;
    }

    let uploaded = null;

    if (image) {
      setState('uploading');
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ file: image.dataUrl }),
        });

        const payload = await res.json();
        if (!res.ok) throw new Error(payload.error || 'Upload failed.');
        uploaded = payload;
      } catch (err) {
        setError(err.message);
        setState('idle');
        return;
      }
    }

    setState('saving');

    const tags = tagInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean)
      .slice(0, 8);

    const { data, error: saveError } = await createPost({
      caption,
      title,
      imageUrl: uploaded?.path ?? null,
      imageWidth: uploaded?.width ?? null,
      imageHeight: uploaded?.height ?? null,
      tags,
    });

    if (saveError) {
      setError(saveError.message || 'Could not save that post.');
      setState('idle');
      return;
    }

    setState('done');
    onPublished?.(data);
    setTimeout(reset, 1400);
  };

  const busy = state === 'uploading' || state === 'saving';

  return (
    <form
      onSubmit={publish}
      className="overflow-hidden rounded-[22px] border border-[#EAE5DD] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_12px_36px_-12px_rgba(0,0,0,0.10)]"
    >
      {/* ── Image drop zone ── */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className="relative"
      >
        <AnimatePresence mode="wait">
          {image ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative bg-[#12110F]"
            >
              <img
                src={image.dataUrl}
                alt=""
                className="mx-auto max-h-[420px] w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                aria-label="Remove image"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
              >
                <X size={15} />
              </button>
              <p className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-mono text-white/90 backdrop-blur">
                {image.width}×{image.height}
              </p>
            </motion.div>
          ) : (
            <motion.button
              key="dropzone"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => fileRef.current?.click()}
              className={`flex w-full flex-col items-center justify-center gap-3 border-b border-dashed px-6 py-14 transition-colors ${
                dragging
                  ? 'border-[var(--primary)] bg-[var(--primary)]/[0.04]'
                  : 'border-[#E4DED5] bg-[#FAF8F5] hover:bg-[#F6F3EE]'
              }`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                <ImagePlus size={19} className="text-[#8C8478]" strokeWidth={1.6} />
              </span>
              <span className="text-[13px] font-medium text-[#4A443C]">
                {dragging ? 'Drop it here' : 'Add a photo'}
              </span>
              <span className="text-[11px] text-[#A79E93]">
                Drag, paste, or tap to browse · optional
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <input
          ref={fileRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={(e) => acceptFile(e.target.files?.[0])}
        />
      </div>

      {/* ── Text ── */}
      <div className="space-y-3 p-5">
        <label htmlFor="post-title" className="sr-only">Title (optional)</label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          maxLength={120}
          className="w-full border-0 bg-transparent p-0 font-heading text-xl font-bold text-[#1F1C18] outline-none placeholder:font-normal placeholder:text-[#BDB5AA]"
        />

        <label htmlFor="post-caption" className="sr-only">Caption</label>
        <textarea
          ref={textareaRef}
          id="post-caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption…"
          rows={3}
          className="w-full resize-none border-0 bg-transparent p-0 text-[15px] leading-[1.65] text-[#4A443C] outline-none placeholder:text-[#BDB5AA]"
        />

        <label htmlFor="post-tags" className="sr-only">Tags</label>
        <input
          id="post-tags"
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="tags, comma separated"
          className="w-full border-0 bg-transparent p-0 font-mono text-[12px] text-[#7A736A] outline-none placeholder:text-[#C6BFB4]"
        />
      </div>

      {/* ── Error ── */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 overflow-hidden px-5 pb-3 text-[12px] text-[#C2410C]"
          >
            <AlertCircle size={13} className="shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Actions ── */}
      <div className="flex items-center justify-between border-t border-[#F0ECE5] px-5 py-3">
        <span className="text-[11px] font-mono text-[#BDB5AA]">
          {caption.length > 0 && `${caption.length} chars`}
        </span>

        <div className="flex items-center gap-2">
          {(caption || image || title) && !busy && state !== 'done' && (
            <button
              type="button"
              onClick={reset}
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-[#8C8478] transition-colors hover:bg-[#F4F1EC] hover:text-[#1F1C18]"
            >
              Clear
            </button>
          )}

          <button
            type="submit"
            disabled={busy || state === 'done' || (!caption.trim() && !image)}
            className="inline-flex min-w-[104px] items-center justify-center gap-2 rounded-xl bg-[#1F1C18] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#332E27] disabled:cursor-not-allowed disabled:opacity-35"
          >
            {state === 'uploading' && <><Loader2 size={14} className="animate-spin" /> Uploading</>}
            {state === 'saving' && <><Loader2 size={14} className="animate-spin" /> Posting</>}
            {state === 'done' && <><Check size={14} /> Posted</>}
            {state === 'idle' && 'Publish'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Composer;
