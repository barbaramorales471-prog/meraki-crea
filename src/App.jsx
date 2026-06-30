import { useState, useMemo, useEffect, useRef } from "react";
import {
  ShoppingBag, X, Plus, Minus, MessageCircle, Heart, Gift, Sparkles,
  Star, Instagram, Mail, ArrowRight, ArrowDown,
} from "lucide-react";
import logoUrl from "../IMG_0995.png";
import imgTaza from "../IMG_1018.png";
import imgPoleron from "../IMG_1019.png";
import imgLapiz from "../IMG_1020.png";
import imgLlavero from "../IMG_1023.jpeg";
import imgVaso from "../IMG_1024.jpeg";
import heroImg1 from "../hero-1.webp";
import heroImg2 from "../hero-2.webp";
import heroImg3 from "../hero-3.webp";
import heroImg4 from "../hero-4.webp";
import heroImg5 from "../hero-5.webp";

const PRODUCTS = [
  { id: "poleron", name: "Polerón Personalizado", desc: "Para esos días en que alguien necesita sentirse abrazado.", price: 11990, swatch: ["#D8C3A5", "#C98C6A"], photo: imgPoleron },
  { id: "polera", name: "Polera Personalizada", desc: "Tu mensaje o su nombre, puesto sobre algo que va a usar todos los días.", price: 9990, swatch: ["#E8DDCF", "#B89C7D"] },
  { id: "taza", name: "Taza Personalizada", desc: "Para acompañar su café o té de cada mañana con un recuerdo tuyo.", price: 3000, swatch: ["#A8B39C", "#6B4F3A"], photo: imgTaza },
  { id: "llavero", name: "Llavero Personalizado", desc: "Un detalle pequeño que lleva siempre encima, sin darse cuenta.", price: 1000, swatch: ["#B89C7D", "#E8DDCF"], photo: imgLlavero },
  { id: "lapiz", name: "Lápiz Personalizado", desc: "El detalle perfecto para regalar incluso sin ocasión especial.", price: 1000, swatch: ["#C98C6A", "#A8B39C"], photo: imgLapiz },
  { id: "vaso-termico", name: "Vaso Térmico Personalizado", desc: "Para que lleve algo tuyo a donde vaya, frío o caliente, todo el día.", price: 11990, swatch: ["#6B4F3A", "#D8C3A5"], photo: imgVaso },
  { id: "mug-termico", name: "Mug Térmico Personalizado", desc: "El mensaje que más quieres que lea, justo antes de empezar su día.", price: 7990, swatch: ["#A8B39C", "#C98C6A"] },
  { id: "agenda-a5", name: "Agenda A5", desc: "Para que cada página que escriba lleve un poco de ti también.", price: 11990, swatch: ["#D8C3A5", "#6B4F3A"] },
  { id: "agenda-b5", name: "Agenda B5", desc: "Más espacio para sus ideas, con su nombre en la portada.", price: 15990, swatch: ["#E8DDCF", "#C98C6A"] },
];

const TESTIMONIALS = [
  { name: "Javiera M.", text: "Pedí un cojín con la foto de mi abuela y cuando lo recibió, se le llenaron los ojos de lágrimas. Eso no tiene precio.", stars: 5 },
  { name: "Tomás R.", text: "Se nota que cada detalle está pensado con cariño. No es solo un producto, es un mensaje hecho realidad.", stars: 5 },
  { name: "Constanza P.", text: "Súper buena comunicación durante todo el proceso. Quedé feliz con el resultado y mi mamá más feliz aún.", stars: 5 },
];

const WHATSAPP_NUMBER = "56945342817";
const LOGO_SRC = logoUrl;
const HERO_IMAGES = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];

const clp = (n) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function GiftArt({ swatch, id, big = false }) {
  const [c1, c2] = swatch;
  return (
    <div className={`gift-art ${big ? "big" : ""}`}>
      <svg viewBox="0 0 200 200" className="gift-svg">
        <defs>
          <linearGradient id={`pg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#pg-${id})`} />
        <rect x="92" y="0" width="16" height="200" fill="#ffffff" opacity="0.35" />
        <rect x="0" y="92" width="200" height="16" fill="#ffffff" opacity="0.35" />
        <path d="M70 92 Q70 50 100 50 Q130 50 130 92" stroke="#ffffff" strokeWidth="10" fill="none" opacity="0.35" />
      </svg>
    </div>
  );
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="hero-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8DDCF" />
          <stop offset="55%" stopColor="#D8C3A5" />
          <stop offset="100%" stopColor="#C98C6A" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#heroGrad)" opacity="0.9" />
      <g opacity="0.9">
        <rect x="140" y="170" width="120" height="100" rx="6" fill="#FAF8F5" />
        <rect x="140" y="170" width="120" height="26" fill="#B89C7D" />
        <rect x="190" y="170" width="20" height="100" fill="#6B4F3A" opacity="0.5" />
        <path d="M170 170 Q170 130 200 130 Q230 130 230 170" stroke="#6B4F3A" strokeWidth="9" fill="none" opacity="0.6" />
      </g>
      <circle cx="120" cy="120" r="6" fill="#A8B39C" opacity="0.8" />
      <circle cx="290" cy="140" r="4" fill="#C98C6A" opacity="0.8" />
      <circle cx="280" cy="280" r="5" fill="#6B4F3A" opacity="0.5" />
    </svg>
  );
}

function HeroCarousel({ images, intervalMs = 6000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [paused, images.length, intervalMs]);

  const goTo = (i) => setIndex(((i % images.length) + images.length) % images.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Meraki Crea ${i + 1}`}
          className={`hero-carousel-img ${i === index ? "active" : ""}`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="hero-carousel-overlay" aria-hidden="true" />

      <button className="hero-carousel-arrow left" onClick={prev} aria-label="Imagen anterior">
        <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} />
      </button>
      <button className="hero-carousel-arrow right" onClick={next} aria-label="Imagen siguiente">
        <ArrowRight size={16} />
      </button>

      <div className="hero-carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`hero-carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function MerakiCrea() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addToCart = (id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setJustAdded(id);
    setTimeout(() => setJustAdded(null), 900);
  };
  const changeQty = (id, delta) => {
    setCart((c) => {
      const next = { ...c, [id]: (c[id] || 0) + delta };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  };

  const items = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }))
        .filter(Boolean),
    [cart]
  );
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  const count = items.reduce((s, it) => s + it.qty, 0);

  const checkoutUrl = useMemo(() => {
    if (items.length === 0) return "#";
    const lines = items.map((it) => `• ${it.qty}x ${it.name} — ${clp(it.price * it.qty)}`);
    const msg = ["¡Hola Meraki Crea! 💛 Quiero regalar esto:", "", ...lines, "", `Total: ${clp(total)}`].join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [items, total]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="mk-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Poppins:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        .mk-root {
          --blanco: #FFFFFF;
          --marfil: #FAF8F5;
          --arena: #E8DDCF;
          --beige: #D8C3A5;
          --taupe: #B89C7D;
          --chocolate: #6B4F3A;
          --terracota: #C98C6A;
          --salvia: #A8B39C;
          font-family: 'Poppins', sans-serif;
          color: var(--chocolate);
          background: var(--marfil);
          overflow-x: hidden;
        }
        h1, h2, .title-serif { font-family: 'Cormorant Garamond', serif; font-weight: 600; }
        h3, .title-display { font-family: 'Playfair Display', serif; }
        p, span, button, a { font-family: 'Poppins', sans-serif; }

        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        .mk-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 40px;
          transition: background 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease;
        }
        .mk-header.scrolled {
          background: rgba(250,248,245,0.92);
          backdrop-filter: blur(10px);
          padding: 14px 40px;
          box-shadow: 0 2px 16px rgba(107,79,58,0.06);
        }
        .mk-logo { font-size: 24px; letter-spacing: 0.01em; color: var(--chocolate); }
        .mk-logo-img { height: 32px; width: auto; display: block; transition: height 0.35s ease; }
        .mk-header.scrolled .mk-logo-img { height: 26px; }
        .mk-nav-cart {
          display: flex; align-items: center; gap: 8px;
          background: transparent; border: 1.5px solid var(--taupe); color: var(--chocolate);
          border-radius: 999px; padding: 9px 18px; font-size: 13.5px; font-weight: 500;
          cursor: pointer; position: relative; transition: all 0.25s ease;
        }
        .mk-nav-cart:hover { background: var(--terracota); border-color: var(--terracota); color: white; }
        .mk-badge {
          position: absolute; top: -7px; right: -7px; background: var(--terracota); color: white;
          width: 20px; height: 20px; border-radius: 50%; font-size: 11px; font-weight: 600;
          display: flex; align-items: center; justify-content: center;
        }

        .mk-hero {
          min-height: 100vh; display: flex; align-items: center;
          padding: 0 40px; position: relative; overflow: hidden;
          background: var(--chocolate);
        }
        .hero-carousel {
          position: absolute; inset: 0; z-index: 0;
        }
        .hero-carousel-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          opacity: 0; transition: opacity 1.1s ease-in-out;
        }
        .hero-carousel-img.active { opacity: 1; }
        .hero-carousel-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.23); z-index: 1;
        }
        .hero-carousel-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 3;
          background: rgba(255,255,255,0.25); border: none; color: white;
          width: 38px; height: 38px; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px); transition: background 0.25s ease;
        }
        .hero-carousel-arrow:hover { background: rgba(255,255,255,0.4); }
        .hero-carousel-arrow.left { left: 18px; }
        .hero-carousel-arrow.right { right: 18px; }
        .hero-carousel-dots {
          position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%);
          z-index: 3; display: flex; gap: 8px;
        }
        .hero-carousel-dot {
          width: 7px; height: 7px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.45); cursor: pointer; padding: 0;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .hero-carousel-dot.active { background: white; transform: scale(1.25); }
        .mk-hero-inner {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto; width: 100%;
        }
        .mk-hero-text { max-width: 620px; }
        .mk-hero-text h1 {
          font-size: clamp(36px, 5.2vw, 58px); line-height: 1.18; color: #FFFFFF;
          margin-bottom: 30px; font-style: italic;
          text-shadow: 0 2px 18px rgba(0,0,0,0.25);
        }
        .mk-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; font-size: 13px;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--arena);
          margin-bottom: 22px; font-weight: 500;
        }
        .mk-hero-sub { font-size: 16.5px; line-height: 1.7; color: #FFFFFF; opacity: 0.9; max-width: 460px; margin-bottom: 38px; }
        .mk-hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-primary {
          background: var(--terracota); color: white; border: none; border-radius: 999px;
          padding: 15px 30px; font-size: 14.5px; font-weight: 500; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(201,140,106,0.25);
        }
        .btn-primary:hover { background: #b9744f; transform: translateY(-2px); box-shadow: 0 12px 26px rgba(201,140,106,0.32); }
        .btn-secondary {
          background: transparent; color: var(--chocolate); border: 1.5px solid var(--taupe);
          border-radius: 999px; padding: 15px 30px; font-size: 14.5px; font-weight: 500;
          cursor: pointer; transition: all 0.3s ease;
        }
        .btn-secondary:hover { border-color: var(--chocolate); background: rgba(107,79,58,0.05); }
        .hero-illustration { width: 100%; max-width: 420px; margin: 0 auto; display: block; }
        .mk-scroll-cue {
          position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
          z-index: 3;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: #FFFFFF; opacity: 0.85; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
          animation: bob 2.2s ease-in-out infinite;
        }
        @keyframes bob { 0%,100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 8px); } }

        .mk-section { padding: 110px 40px; max-width: 1180px; margin: 0 auto; }
        .mk-section.tight { padding: 90px 40px; }
        .mk-center { text-align: center; }
        .mk-section h2 { font-size: clamp(30px, 4vw, 44px); color: var(--chocolate); margin-bottom: 18px; }
        .mk-section .lede { font-size: 16px; color: var(--chocolate); opacity: 0.75; max-width: 540px; line-height: 1.7; }
        .mk-center .lede { margin: 0 auto; }

        .mk-values { display: grid; grid-template-columns: repeat(3, 1fr); gap: 44px; margin-top: 64px; }
        .mk-value { text-align: center; padding: 0 16px; }
        .mk-value-icon {
          width: 64px; height: 64px; border-radius: 50%; background: var(--arena);
          display: flex; align-items: center; justify-content: center; margin: 0 auto 22px;
          color: var(--terracota);
        }
        .mk-value h3 { font-size: 19px; margin-bottom: 10px; color: var(--chocolate); }
        .mk-value p { font-size: 14px; color: var(--chocolate); opacity: 0.7; line-height: 1.6; }

        .mk-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 36px; margin-top: 60px; }
        .mk-card { background: var(--blanco); border-radius: 4px; overflow: hidden; transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .mk-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(107,79,58,0.10); }
        .gift-art { height: 230px; overflow: hidden; }
        .gift-svg { width: 100%; height: 100%; display: block; }
        .mk-card-body { padding: 26px 22px 30px; }
        .mk-card-body h3 { font-size: 20px; margin-bottom: 8px; color: var(--chocolate); }
        .mk-card-body p.desc { font-size: 13.5px; color: var(--chocolate); opacity: 0.7; line-height: 1.55; min-height: 40px; margin-bottom: 18px; }
        .mk-card-foot { display: flex; align-items: center; justify-content: space-between; }
        .mk-price { font-size: 15.5px; font-weight: 600; color: var(--chocolate); }
        .btn-personalize {
          background: var(--arena); color: var(--chocolate); border: none; border-radius: 999px;
          padding: 9px 18px; font-size: 12.5px; font-weight: 500; cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-personalize.added { background: var(--terracota); color: white; }
        .btn-personalize:hover { background: var(--terracota); color: white; }

        .mk-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 64px; }
        .mk-step { text-align: center; position: relative; }
        .mk-step-num {
          width: 52px; height: 52px; border-radius: 50%; border: 1.5px solid var(--taupe);
          display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
          font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--terracota);
        }
        .mk-step h3 { font-size: 18px; margin-bottom: 8px; }
        .mk-step p { font-size: 13.5px; opacity: 0.7; line-height: 1.6; }

        .mk-why { background: var(--chocolate); color: var(--marfil); border-radius: 4px; padding: 80px 60px; text-align: center; }
        .mk-why h2 { color: var(--marfil); }
        .mk-why p { color: var(--marfil); opacity: 0.85; max-width: 600px; margin: 0 auto; font-size: 17px; line-height: 1.8; font-style: italic; font-family: 'Cormorant Garamond', serif; }

        .mk-testimonials { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px; margin-top: 60px; }
        .mk-testimonial { background: var(--blanco); border-radius: 4px; padding: 32px 28px; }
        .mk-stars { display: flex; gap: 3px; color: var(--terracota); margin-bottom: 16px; }
        .mk-testimonial p { font-size: 14.5px; line-height: 1.7; color: var(--chocolate); opacity: 0.85; margin-bottom: 18px; font-style: italic; }
        .mk-testimonial .who { font-size: 13px; font-weight: 600; color: var(--chocolate); }

        .mk-insta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 50px; }
        .mk-insta-tile {
          aspect-ratio: 1; border-radius: 4px; display: flex; align-items: center; justify-content: center;
          color: white; opacity: 0.9; transition: opacity 0.3s ease;
        }
        .mk-insta-tile:hover { opacity: 1; }

        .mk-footer { background: var(--arena); padding: 60px 40px 36px; }
        .mk-footer-inner { max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 40px; }
        .mk-footer h4 { font-size: 14px; margin-bottom: 16px; color: var(--chocolate); letter-spacing: 0.03em; }
        .mk-footer p, .mk-footer a { font-size: 13.5px; color: var(--chocolate); opacity: 0.75; text-decoration: none; display: block; margin-bottom: 10px; }
        .mk-footer a:hover { opacity: 1; color: var(--terracota); }
        .mk-footer-bottom { text-align: center; font-size: 12px; opacity: 0.55; margin-top: 44px; color: var(--chocolate); }
        .mk-social-row { display: flex; gap: 14px; margin-top: 4px; }
        .mk-social-row a {
          width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--taupe);
          display: flex; align-items: center; justify-content: center; margin: 0;
        }

        .mk-overlay { position: fixed; inset: 0; background: rgba(107,79,58,0.35); z-index: 60; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
        .mk-overlay.open { opacity: 1; pointer-events: auto; }
        .mk-drawer {
          position: fixed; top: 0; right: 0; height: 100%; width: min(390px, 100vw);
          background: var(--marfil); z-index: 70; display: flex; flex-direction: column;
          transform: translateX(100%); transition: transform 0.4s ease;
        }
        .mk-drawer.open { transform: translateX(0); }
        .mk-drawer-head { display: flex; align-items: center; justify-content: space-between; padding: 26px 26px 20px; border-bottom: 1px solid var(--arena); }
        .mk-drawer-head h3 { font-size: 21px; color: var(--chocolate); }
        .mk-icon-btn { background: none; border: none; cursor: pointer; color: var(--chocolate); }
        .mk-drawer-body { flex: 1; overflow-y: auto; padding: 14px 26px; }
        .mk-empty { text-align: center; color: var(--chocolate); opacity: 0.6; margin-top: 60px; font-size: 14px; line-height: 1.7; }
        .mk-line { display: flex; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--arena); }
        .mk-line-art { width: 56px; height: 56px; border-radius: 4px; overflow: hidden; flex-shrink: 0; }
        .mk-line-info h4 { font-size: 14.5px; margin-bottom: 4px; color: var(--chocolate); }
        .mk-line-info .lp { font-size: 12.5px; opacity: 0.65; }
        .mk-qty { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
        .mk-qty button { width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--taupe); background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .mk-qty span { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; }
        .mk-drawer-foot { padding: 20px 26px 26px; border-top: 1px solid var(--arena); }
        .mk-total { display: flex; justify-content: space-between; font-size: 17px; font-weight: 600; margin-bottom: 16px; color: var(--chocolate); }
        .mk-checkout { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; background: #25d366; color: white; border: none; padding: 15px; border-radius: 999px; font-weight: 600; font-size: 14.5px; cursor: pointer; text-decoration: none; }
        .mk-checkout[aria-disabled="true"] { opacity: 0.45; pointer-events: none; }
        .mk-drawer-note { font-size: 12px; text-align: center; margin-top: 12px; opacity: 0.6; color: var(--chocolate); }

        @media (max-width: 880px) {
          .mk-hero-text { text-align: center; margin: 0 auto; }
          .mk-hero-actions { justify-content: center; }
          .hero-carousel-img { object-position: center 35%; }
          .hero-carousel-arrow { display: none; }
          .mk-values, .mk-steps { grid-template-columns: 1fr; gap: 36px; }
          .mk-footer-inner { grid-template-columns: 1fr; gap: 32px; }
          .mk-insta-grid { grid-template-columns: repeat(2, 1fr); }
          .mk-section { padding: 70px 24px; }
          .mk-header { padding: 18px 22px; }
        }
      `}</style>

      <header className={`mk-header ${scrolled ? "scrolled" : ""}`}>
        <img src={LOGO_SRC} alt="Meraki Crea" className="mk-logo-img" />
        <button className="mk-nav-cart" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={16} />
          Carrito
          {count > 0 && <span className="mk-badge">{count}</span>}
        </button>
      </header>

      <section className="mk-hero">
        <HeroCarousel images={HERO_IMAGES} />
        <div className="mk-hero-inner">
          <Reveal>
            <div className="mk-hero-text">
              <div className="mk-hero-eyebrow"><Sparkles size={13} /> Regalos personalizados, Chile</div>
              <h1>No regalas un objeto.<br />Regalas un recuerdo, una emoción, un pedacito de ti.</h1>
              <div className="mk-hero-actions">
                <button className="btn-primary" onClick={() => scrollTo("catalogo")}>
                  Personalizar mi regalo <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mk-scroll-cue"><ArrowDown size={16} /> Descubre más</div>
      </section>

      <section className="mk-section mk-center">
        <Reveal>
          <h2 className="title-serif">Regalos con significado</h2>
          <p className="lede">Cada pieza se crea especialmente para una persona — no en serie, no en masa. Detrás de cada pedido hay tiempo, atención y cariño real.</p>
        </Reveal>
        <div className="mk-values">
          <Reveal delay={0}>
            <div className="mk-value">
              <div className="mk-value-icon"><Heart size={26} /></div>
              <h3 className="title-display">Hecho con dedicación</h3>
              <p>Cada encargo se trabaja a mano, con tiempo, sin apuro.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mk-value">
              <div className="mk-value-icon"><Gift size={26} /></div>
              <h3 className="title-display">Personalización única</h3>
              <p>Tu mensaje, tu foto, tu historia — nada genérico.</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="mk-value">
              <div className="mk-value-icon"><Sparkles size={26} /></div>
              <h3 className="title-display">Diseñado para emocionar</h3>
              <p>Buscamos esa reacción genuina al recibirlo.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mk-section mk-center" id="catalogo">
        <Reveal>
          <h2 className="title-serif">Encuentra ese regalo</h2>
          <p className="lede">Una selección pequeña, pensada con cuidado. Cada pieza se personaliza contigo antes de crearla.</p>
        </Reveal>
        <div className="mk-grid">
          {PRODUCTS.map((p, i) => (
            <Reveal delay={i * 100} key={p.id}>
              <div className="mk-card">
                {p.photo ? (
                  <div className="gift-art">
                    <img src={p.photo} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                ) : (
                  <GiftArt swatch={p.swatch} id={p.id} />
                )}
                <div className="mk-card-body">
                  <h3 className="title-display">{p.name}</h3>
                  <p className="desc">{p.desc}</p>
                  <div className="mk-card-foot">
                    <span className="mk-price">{clp(p.price)}</span>
                    <button
                      className={`btn-personalize ${justAdded === p.id ? "added" : ""}`}
                      onClick={() => addToCart(p.id)}
                    >
                      {justAdded === p.id ? "¡Listo!" : "Personalizar"}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mk-section mk-center">
        <Reveal>
          <h2 className="title-serif">Cómo funciona</h2>
          <p className="lede">En solo tres pasos, tu regalo está en camino.</p>
        </Reveal>
        <div className="mk-steps">
          {[
            { n: "1", t: "Elige tu regalo", d: "Explora la colección y elige la pieza que más se parece a lo que quieres decir." },
            { n: "2", t: "Personalízalo", d: "Cuéntanos el nombre, la foto o el mensaje que quieres incluir." },
            { n: "3", t: "Lo creamos con cariño", d: "Preparamos tu pedido a mano y te avisamos cuando esté listo." },
          ].map((s, i) => (
            <Reveal delay={i * 120} key={s.n}>
              <div className="mk-step">
                <div className="mk-step-num">{s.n}</div>
                <h3 className="title-display">{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mk-section">
        <Reveal>
          <div className="mk-why">
            <h2 className="title-serif">¿Por qué Meraki?</h2>
            <p>"No hacemos regalos en serie. Creamos detalles que cuentan historias. Cada pedido se realiza con dedicación para que la persona que lo reciba sienta exactamente lo que quieres expresar."</p>
          </div>
        </Reveal>
      </section>

      <section className="mk-section mk-center">
        <Reveal>
          <h2 className="title-serif">Lo que sienten quienes regalan Meraki</h2>
        </Reveal>
        <div className="mk-testimonials">
          {TESTIMONIALS.map((t, i) => (
            <Reveal delay={i * 100} key={t.name}>
              <div className="mk-testimonial">
                <div className="mk-stars">
                  {Array.from({ length: t.stars }).map((_, idx) => (
                    <Star key={idx} size={15} fill="currentColor" />
                  ))}
                </div>
                <p>"{t.text}"</p>
                <div className="who">{t.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mk-section mk-center">
        <Reveal>
          <h2 className="title-serif">Síguenos en Instagram</h2>
          <p className="lede">@merakicrea_cl — más momentos, más historias, más regalos.</p>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
            <a className="btn-primary" href="https://www.instagram.com/merakicrea_cl" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <Instagram size={16} /> Síguenos
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="mk-footer">
        <div className="mk-footer-inner">
          <div>
            <img src={LOGO_SRC} alt="Meraki Crea" style={{ height: 30, marginBottom: 14 }} />
            <p>Regalos hechos con alma, creados especialmente para alguien que quieres.</p>
            <div className="mk-social-row">
              <a href="https://www.instagram.com/merakicrea_cl" target="_blank" rel="noopener noreferrer"><Instagram size={16} /></a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /></a>
              <a href="mailto:hola@merakicrea.cl"><Mail size={16} /></a>
            </div>
          </div>
          <div>
            <h4>Contacto</h4>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="mailto:hola@merakicrea.cl">hola@merakicrea.cl</a>
          </div>
          <div>
            <h4>Información</h4>
            <a href="#">Preguntas frecuentes</a>
            <a href="#">Políticas de cambio</a>
            <a href="#">Tiempos de entrega</a>
          </div>
        </div>
        <div className="mk-footer-bottom">© {new Date().getFullYear()} Meraki Crea · hecho con cariño en Chile</div>
      </footer>

      <div className={`mk-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`mk-drawer ${cartOpen ? "open" : ""}`}>
        <div className="mk-drawer-head">
          <h3 className="title-display">Lo que vas a regalar</h3>
          <button className="mk-icon-btn" onClick={() => setCartOpen(false)}><X size={20} /></button>
        </div>
        <div className="mk-drawer-body">
          {items.length === 0 ? (
            <p className="mk-empty">Aún no eliges nada.<br />Busca ese algo que diga lo que sientes.</p>
          ) : (
            items.map((it) => (
              <div className="mk-line" key={it.id}>
                <div className="mk-line-art"><GiftArt swatch={it.swatch} id={`mini-${it.id}`} /></div>
                <div className="mk-line-info">
                  <h4>{it.name}</h4>
                  <div className="lp">{clp(it.price)} c/u</div>
                  <div className="mk-qty">
                    <button onClick={() => changeQty(it.id, -1)}><Minus size={12} /></button>
                    <span>{it.qty}</span>
                    <button onClick={() => changeQty(it.id, 1)}><Plus size={12} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mk-drawer-foot">
          <div className="mk-total"><span>Total</span><span>{clp(total)}</span></div>
          <a className="mk-checkout" href={checkoutUrl} target="_blank" rel="noopener noreferrer" aria-disabled={items.length === 0}>
            <MessageCircle size={18} /> Cuéntanos por WhatsApp
          </a>
          <p className="mk-drawer-note">Coordinamos juntas el diseño, el cariño y la entrega.</p>
        </div>
      </aside>
    </div>
  );
}
