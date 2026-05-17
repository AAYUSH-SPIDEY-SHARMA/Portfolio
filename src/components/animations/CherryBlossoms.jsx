import { useEffect, useRef } from 'react';

/**
 * Cherry blossom / sakura petal falling animation
 * Used on romance/her themed sections
 */
const CherryBlossoms = ({ count = 30, opacity = 0.6 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petals = [];
    const colors = ['#FFB7C5', '#FF69B4', '#FFC0CB', '#FFD1DC', '#FF91A4'];

    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Draw petal shape
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Inner detail
      ctx.globalAlpha = p.opacity * 0.3;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(0, -p.size * 0.1, p.size * 0.4, p.size * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((p) => {
        drawPetal(p);

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.sway) * 0.5;
        p.rotation += p.rotationSpeed;
        p.sway += p.swaySpeed;

        // Reset when fallen
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
};

export default CherryBlossoms;
