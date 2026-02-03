/**
 * FloatingSticker - Reusable decorative sticker component
 * 
 * Props:
 * - src: Image source
 * - alt: Alt text
 * - className: Additional classes
 * - position: Object with top, left, right, bottom (CSS values)
 * - size: width in pixels or percentage
 * - opacity: 0 to 1 (default 0.08)
 * - rotation: degrees (default 0)
 * - blur: pixels (default 0)
 * - hideMobile: boolean (default true)
 * - float: boolean for slow animation (default false)
 * - grayscale: boolean or 'partial' (default false)
 */

const FloatingSticker = ({
    src,
    alt = "decorative sticker",
    className = "",
    position = {},
    size = "100px",
    opacity = 0.08,
    rotation = 0,
    blur = 0,
    hideMobile = true,
    float = false,
    grayscale = false,
}) => {
    const positionStyles = {
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
    };

    const filterStyles = [];
    if (blur > 0) filterStyles.push(`blur(${blur}px)`);
    if (grayscale === true) filterStyles.push("grayscale(100%)");
    if (grayscale === "partial") filterStyles.push("grayscale(50%)");

    return (
        <img
            src={src}
            alt={alt}
            className={`sticker ${hideMobile ? "sticker-hide-mobile" : ""} ${float ? "sticker-float" : ""} ${className}`}
            style={{
                ...positionStyles,
                width: size,
                height: "auto",
                opacity,
                transform: `rotate(${rotation}deg)`,
                filter: filterStyles.length > 0 ? filterStyles.join(" ") : undefined,
                "--rotation": `${rotation}deg`,
            }}
            loading="lazy"
            aria-hidden="true"
        />
    );
};

export default FloatingSticker;
