import { Component } from 'react';

/**
 * Catches render errors anywhere below it so a single bad component shows a
 * recoverable panel instead of unmounting the app into a blank white page.
 *
 * Must be a class — React has no hook equivalent for componentDidCatch.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg-primary)]">
        <div className="max-w-md text-center">
          <div className="text-5xl mb-5">🕸️</div>
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3">
            Something snapped
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mb-2 leading-relaxed">
            A thread came loose in this corner of the multiverse. Reloading usually fixes it.
          </p>
          <p className="text-[11px] font-mono text-[var(--text-muted)] mb-8 break-words">
            {this.state.error?.message}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-[var(--glow-purple)] transition-all"
            >
              Reload page
            </button>
            <a
              href="/"
              className="px-6 py-3 rounded-xl text-sm font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--primary)]/30 transition-all"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
