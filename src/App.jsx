import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

/* ==================== Firebase Configuration ==================== */
const firebaseConfig = {
  apiKey: "AIzaSyDu6pVlIlEAnBj_EwSeB0sltWu2Ab2zykY",
  authDomain: "skyera.firebaseapp.com",
  projectId: "skyera",
  storageBucket: "skyera.firebasestorage.app",
  messagingSenderId: "176628264092",
  appId: "1:176628264092:web:293629a4b02e7257679159",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ─── Brand Palette ─────────────────────────────────────────────── */
const NAVY  = "#0B1F4B";
const GOLD  = "#C9A22A";
const GOLD2 = "#E6BF50";
const WHITE = "#FFFFFF";
const LIGHT = "#F4F7FF";

/* ─── CONTACT INFO (single source of truth) ────────────────────── */
const PHONE        = "+91 9987943524";
const PHONE_RAW    = "+919987943524";
const WHATSAPP_RAW = "+919987943524";
const EMAIL        = "info@skyerapharmalab.com";

/* ==================== SVG Icon Components ==================== */
export const LocationIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7" />
  </svg>
);

export const MailIcon = ({ size = 24, color = "currentColor", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} {...props}>
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 4.99L4 6zm0 12H4V8l8 5l8-5z" />
  </svg>
);

export const CallIcon = ({ size = 20, color = "currentColor", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...props}>
    <path d="m6.987 2.066l-.717.216a3.5 3.5 0 0 0-2.454 2.854c-.297 2.068.367 4.486 1.968 7.259c1.597 2.766 3.355 4.548 5.29 5.328a3.5 3.5 0 0 0 3.715-.705l.542-.514a2 2 0 0 0 .247-2.623l-1.356-1.88a1.5 1.5 0 0 0-1.655-.556l-2.051.627l-.053.01c-.226.033-.748-.456-1.398-1.582c-.68-1.178-.82-1.867-.633-2.045l1.043-.973a2.5 2.5 0 0 0 .575-2.85l-.662-1.471a2 2 0 0 0-2.4-1.095m1.49 1.505l.66 1.471a1.5 1.5 0 0 1-.344 1.71l-1.046.974C7.078 8.36 7.3 9.442 8.2 11c.846 1.466 1.618 2.19 2.448 2.064l.124-.026l2.088-.637a.5.5 0 0 1 .552.185l1.356 1.88a1 1 0 0 1-.123 1.312l-.543.514a2.5 2.5 0 0 1-2.653.503c-1.698-.684-3.303-2.311-4.798-4.9C5.152 9.3 4.545 7.093 4.806 5.278a2.5 2.5 0 0 1 1.753-2.039l.717-.216a1 1 0 0 1 1.2.548" />
  </svg>
);

export const MessageIcon = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" />
  </svg>
);

/* Building/CIN icon (simple SVG) */
const BuildingIcon = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M3 19V4.7a.7.7 0 0 1 .7-.7h7.6a.7.7 0 0 1 .7.7V9h4.3a.7.7 0 0 1 .7.7V19M1 19h22M9 9v2m0 4v2m4-6v2m0 4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

/* ─── Products ──────────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "SKESO D",
    subtitle: "Esomeprazole (EC) 40mg & Domperidone (SR) 30mg Capsules",
    category: "Gastro Care",
    tagline: "Beyond acid suppression, restoring gastric flow..!",
    indications: ["Hyperacidity","Dyspepsia","GERD","Reflux Esophagitis","Acid Peptic Ulcers","Gastritis"],
    color: "#1565C0",
    accent: "#42A5F5",
    icon: "🔵",
    badge: "Gastro",
  },
  {
    id: 2,
    name: "SKESO FAST",
    subtitle: "Esomeprazole 40mg + Sodium Bicarbonate",
    category: "Gastro Care",
    tagline: "60 Seconds to Start Acid Relief",
    indications: ["Acute Acidity","Heartburn","Erosive Esophagitis","NSAID-induced Ulcers"],
    color: "#0277BD",
    accent: "#4FC3F7",
    icon: "⚡",
    badge: "Fast Action",
  },
  {
    id: 3,
    name: "FLAMEXO-DS",
    subtitle: "Diclofenac Sodium 50mg + Serratiopeptidase 10mg",
    category: "Pain Management",
    tagline: "Dual Action For Pain And Swelling",
    indications: ["Musculoskeletal Pain","Rheumatoid Arthritis","Osteoarthritis","Low Back Pain","Post-Operative Pain","Periodontitis"],
    color: "#C62828",
    accent: "#EF5350",
    icon: "💊",
    badge: "Pain Relief",
  },
  {
    id: 4,
    name: "SKY LM",
    subtitle: "Montelukast 10mg & Levocetirizine 5mg Tablets",
    category: "Anti-Allergic",
    tagline: "Relief that works beyond visible symptoms..!",
    indications: ["Seasonal Allergic Rhinitis","Perennial Allergic Rhinitis","Rhinitis with Asthma"],
    color: "#2E7D32",
    accent: "#66BB6A",
    icon: "🌿",
    badge: "Allergy",
  },
  {
    id: 5,
    name: "SKYNURO D3",
    subtitle: "Methylcobalamin 1500mcg + Vit D3 1000IU + Pyridoxine + Folic Acid",
    category: "Neuro Support",
    tagline: "Sky High In Neuro Care And Vitality",
    indications: ["Peripheral Neuropathy","Diabetic Neuropathy","Vitamin B-Complex Deficiency","Megaloblastic Anemia","Bone & Muscle Support"],
    color: "#4A148C",
    accent: "#AB47BC",
    icon: "🧠",
    badge: "Neuro",
  },
  {
    id: 6,
    name: "GIENCVITT",
    subtitle: "Multivitamin with Amino Acids, Ginseng & Zinc",
    category: "Multivitamin",
    tagline: "Complete Energy & Immunity Support",
    indications: ["Energy Deficiency","Immunity Boost","Nutritional Gaps","General Wellness","Recovery Support"],
    color: "#E65100",
    accent: "#FFA726",
    icon: "⭐",
    badge: "Wellness",
  },
];

const stats = [
  { value: "6+", label: "Product Range" },
  { value: "5",  label: "Therapeutic Areas" },
  { value: "PAN", label: "India Network" },
  { value: "GMP", label: "Certified Mfg." },
];

/* ─── Hook: IntersectionObserver ────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(48px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
}

/* ─── WhatsApp Floating Button ──────────────────────────────────── */
function WhatsAppButton() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={`https://wa.me/${WHATSAPP_RAW}?text=Hello%20Skyera%20Pharmalab%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#25D366",
        color: WHITE,
        textDecoration: "none",
        borderRadius: 50,
        padding: hov ? "13px 20px 13px 16px" : "14px",
        boxShadow: "0 6px 28px rgba(37,211,102,0.5)",
        transform: hov ? "scale(1.06)" : "scale(1)",
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
        maxWidth: hov ? 220 : 52,
        whiteSpace: "nowrap",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="16" cy="16" r="16" fill="#25D366"/>
        <path d="M23.472 8.516A10.25 10.25 0 0 0 16.02 5.5C10.737 5.5 6.44 9.797 6.44 15.08c0 1.695.44 3.347 1.277 4.803L6.37 25.5l5.775-1.515a10.29 10.29 0 0 0 4.875 1.24h.004c5.28 0 9.578-4.297 9.58-9.58a9.528 9.528 0 0 0-2.132-6.13zm-7.452 14.743h-.003a8.55 8.55 0 0 1-4.354-1.19l-.312-.186-3.23.847.862-3.151-.203-.323a8.53 8.53 0 0 1-1.308-4.576c0-4.71 3.833-8.543 8.552-8.543a8.496 8.496 0 0 1 6.046 2.506 8.49 8.49 0 0 1 2.502 6.044c-.002 4.713-3.835 8.572-8.552 8.572zm4.693-6.41c-.257-.129-1.524-.752-1.76-.838-.237-.086-.41-.129-.582.13-.172.257-.665.837-.815 1.01-.15.171-.3.193-.557.064-.257-.129-1.083-.399-2.063-1.273-.762-.68-1.276-1.52-1.426-1.776-.15-.258-.016-.397.113-.525.116-.115.257-.3.386-.45.129-.15.172-.257.257-.429.086-.172.043-.322-.021-.45-.065-.13-.582-1.4-.797-1.917-.21-.503-.424-.435-.582-.443l-.497-.009c-.172 0-.45.065-.686.322-.236.257-.9.88-.9 2.146 0 1.268.921 2.493 1.05 2.665.128.171 1.812 2.765 4.39 3.877.614.265 1.093.424 1.466.543.616.196 1.177.168 1.62.102.494-.074 1.523-.623 1.738-1.225.214-.601.214-1.116.15-1.224-.065-.108-.236-.172-.493-.3z" fill="white"/>
      </svg>
      {hov && (
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.3 }}>
          Chat with Us
        </span>
      )}
    </a>
  );
}

/* ─── Product Card ──────────────────────────────────────────────── */
function ProductCard({ p, index }) {
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.6s ease ${index * 0.09}s, transform 0.6s ease ${index * 0.09}s`,
      }}
    >
      <div style={{
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        background: "#fff",
        border: `2px solid ${hov ? p.color : "#e0e8f5"}`,
        boxShadow: hov ? `0 24px 60px ${p.color}30` : "0 4px 20px rgba(11,31,75,0.08)",
        transform: hov ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{ height: 8, background: `linear-gradient(90deg, ${p.color}, ${p.accent})` }} />
        <div style={{ padding: isMobile ? "20px 18px" : "28px 26px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <span style={{
              background: `${p.color}15`, color: p.color,
              fontSize: 10, fontWeight: 800, padding: "4px 12px",
              borderRadius: 20, letterSpacing: 1, textTransform: "uppercase",
            }}>{p.badge}</span>
            <span style={{ fontSize: isMobile ? 28 : 36 }}>{p.icon}</span>
          </div>
          <div style={{
            fontSize: isMobile ? 20 : 26, fontWeight: 900, color: NAVY,
            letterSpacing: 1.5, marginBottom: 4,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>{p.name}</div>
          <div style={{ fontSize: 12, color: p.color, fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 }}>{p.category}</div>
          <div style={{ fontSize: 12, color: "#5a6880", fontStyle: "italic", marginBottom: 14, lineHeight: 1.5 }}>"{p.tagline}"</div>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, marginBottom: 16 }}>{p.subtitle}</div>
          <div style={{ borderTop: `1px solid ${p.color}20`, paddingTop: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: 1, marginBottom: 8 }}>INDICATIONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {p.indications.map((ind, i) => (
                <span key={i} style={{
                  background: `${p.color}10`, color: p.color,
                  fontSize: 10, padding: "3px 9px", borderRadius: 12,
                  fontWeight: 600, border: `1px solid ${p.color}25`,
                }}>{ind}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Counter Stat ──────────────────────────────────────────────── */
function CounterStat({ value, label, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      textAlign: "center",
      opacity: inView ? 1 : 0,
      transform: inView ? "scale(1)" : "scale(0.7)",
      transition: `all 0.6s ease ${delay}s`,
    }}>
      <div style={{ fontSize: 48, fontWeight: 900, color: GOLD2, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", letterSpacing: 1.5, marginTop: 6 }}>{label}</div>
    </div>
  );
}

/* ─── Nav ───────────────────────────────────────────────────────── */
function Nav({ scrollTo, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Home", "About", "Products", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 68,
      background: scrolled || menuOpen ? "rgba(11,31,75,0.97)" : "transparent",
      backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
      boxShadow: scrolled ? "0 2px 32px rgba(0,0,0,0.18)" : "none",
      transition: "all 0.4s",
      display: "flex", alignItems: "center",
      padding: "0 5%", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => { setPage("home"); scrollTo("hero"); setMenuOpen(false); }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, color: NAVY, fontSize: 20,
          boxShadow: "0 4px 16px rgba(201,162,42,0.5)",
        }}>S</div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 900, color: WHITE, letterSpacing: 1, fontFamily: "'Playfair Display', Georgia, serif" }}>SKYERA</div>
          <div style={{ fontSize: 8, color: GOLD, letterSpacing: 2, fontWeight: 700 }}>PHARMALAB PVT. LTD.</div>
        </div>
      </div>

      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map(l => (
            <button key={l} onClick={() => { setPage("home"); setTimeout(() => scrollTo(l.toLowerCase()), 50); }} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)",
              letterSpacing: 0.5, padding: 0,
            }}>{l}</button>
          ))}
          <button onClick={() => { setPage("home"); setTimeout(() => scrollTo("contact"), 50); }} style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
            color: NAVY, border: "none",
            padding: "9px 22px", borderRadius: 30,
            fontSize: 13, fontWeight: 800, cursor: "pointer",
            letterSpacing: 0.5, boxShadow: "0 4px 18px rgba(201,162,42,0.4)",
          }}>Enquire Now</button>
        </div>
      )}

      {isMobile && (
        <button onClick={() => setMenuOpen(m => !m)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 6 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 24, height: 2, background: WHITE, borderRadius: 2,
              transform: menuOpen && i===0 ? "rotate(45deg) translate(5px,5px)" : menuOpen && i===1 ? "scaleX(0)" : menuOpen && i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
              transition: "all 0.3s",
            }} />
          ))}
        </button>
      )}

      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: 68, left: 0, right: 0,
          background: "rgba(11,31,75,0.98)", backdropFilter: "blur(16px)",
          padding: "20px 5%", display: "flex", flexDirection: "column", gap: 0,
          borderTop: `1px solid rgba(201,162,42,0.2)`,
        }}>
          {links.map(l => (
            <button key={l} onClick={() => { setPage("home"); setTimeout(() => scrollTo(l.toLowerCase()), 50); setMenuOpen(false); }} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.85)",
              padding: "14px 0", textAlign: "left", letterSpacing: 0.5,
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>{l}</button>
          ))}
          <button onClick={() => { setPage("home"); setTimeout(() => scrollTo("contact"), 50); setMenuOpen(false); }} style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
            color: NAVY, border: "none",
            padding: "13px 0", borderRadius: 12, marginTop: 16,
            fontSize: 15, fontWeight: 800, cursor: "pointer",
          }}>Enquire Now</button>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────── */
function Hero({ scrollTo }) {
  const [tick, setTick] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3200);
    return () => clearInterval(id);
  }, []);

  const taglines = ["Science-Driven Formulations.", "Patient-Centric Innovation.", "Accessible Healthcare Solutions."];

  return (
    <section id="hero" style={{
      minHeight: "100vh", position: "relative",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: isMobile ? "110px 5% 70px" : "120px 6% 80px",
      overflow: "hidden", textAlign: "center",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #050e24 0%, #0a1a3f 40%, #071530 100%)" }} />
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700, background: "radial-gradient(circle, rgba(201,162,42,0.12) 0%, rgba(11,31,75,0.0) 70%)", animation: "orbPulse1 6s ease-in-out infinite", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "20%", left: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(30,80,200,0.18) 0%, transparent 70%)", animation: "orbPulse2 8s ease-in-out infinite", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "0%", right: "-5%", width: 450, height: 450, background: "radial-gradient(circle, rgba(0,180,150,0.1) 0%, transparent 70%)", animation: "orbPulse3 7s ease-in-out infinite", borderRadius: "50%" }} />
      </div>

      <style>{`
        @keyframes orbPulse1{0%,100%{transform:translateX(-50%) scale(1);opacity:0.8}50%{transform:translateX(-50%) scale(1.15);opacity:1}}
        @keyframes orbPulse2{0%,100%{transform:scale(1) translate(0,0);opacity:0.7}50%{transform:scale(1.2) translate(5%,5%);opacity:1}}
        @keyframes orbPulse3{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.15);opacity:1}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes goldShimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes taglineSlide{0%{opacity:0;transform:translateY(20px)}15%{opacity:1;transform:translateY(0)}85%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-20px)}}
        @keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes scrollBounce{0%,100%{transform:translateY(0) translateX(-50%)}50%{transform:translateY(8px) translateX(-50%)}}
        @keyframes waPulse{0%,100%{box-shadow:0 6px 28px rgba(37,211,102,0.5)}50%{box-shadow:0 6px 36px rgba(37,211,102,0.75)}}
      `}</style>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(201,162,42,0.1)", border: "1px solid rgba(201,162,42,0.35)", padding: "8px 20px", borderRadius: 30, marginBottom: 28, animation: "fadeSlideUp 0.8s ease both" }}>
          <span style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
          <span style={{ fontSize: 12, color: GOLD, fontWeight: 700, letterSpacing: 1 }}>GMP Certified · Pune, Maharashtra</span>
        </div>

        <h1 style={{ fontSize: isMobile ? 44 : 74, fontWeight: 900, lineHeight: 1.05, fontFamily: "'Playfair Display', Georgia, serif", animation: "fadeSlideUp 0.8s ease 0.1s both", marginBottom: 10, maxWidth: 860, margin: "0 auto 10px" }}>
          <span style={{ color: WHITE, display: "block" }}>Where Science</span>
          <span style={{ display: "block", background: `linear-gradient(90deg, ${GOLD}, ${GOLD2}, #fff5c0, ${GOLD})`, backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "goldShimmer 4s linear infinite" }}>Meets Healing</span>
        </h1>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 16, marginBottom: 20, animation: "fadeSlideUp 0.8s ease 0.15s both" }}>
          <div style={{ height: 1, width: isMobile ? 50 : 90, background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD }} />
          <div style={{ height: 1, width: isMobile ? 50 : 90, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
        </div>

        <div style={{ height: 30, overflow: "hidden", marginBottom: 24 }}>
          <p key={tick} style={{ fontSize: isMobile ? 15 : 18, color: "rgba(255,255,255,0.65)", fontWeight: 500, letterSpacing: 0.5, animation: "taglineSlide 3.2s ease forwards", margin: 0 }}>
            {taglines[tick % taglines.length]}
          </p>
        </div>

        <p style={{ fontSize: isMobile ? 14 : 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.85, maxWidth: isMobile ? "100%" : 600, marginBottom: 40, margin: "0 auto 40px", animation: "fadeSlideUp 0.8s ease 0.25s both" }}>
          Skyera Pharmalab Pvt. Ltd. is a patient-centric pharmaceutical company focused on innovation, quality, and accessibility — developing science-driven formulations that address real clinical needs.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", animation: "fadeSlideUp 0.8s ease 0.35s both" }}>
          <button onClick={() => scrollTo("products")} style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: NAVY, border: "none", padding: isMobile ? "13px 28px" : "15px 36px", borderRadius: 40, fontSize: isMobile ? 14 : 15, fontWeight: 800, cursor: "pointer", boxShadow: `0 8px 32px rgba(201,162,42,0.45)` }}>Explore Our Products</button>
          <button onClick={() => scrollTo("about")} style={{ background: "transparent", color: WHITE, border: "2px solid rgba(255,255,255,0.3)", padding: isMobile ? "13px 28px" : "15px 36px", borderRadius: 40, fontSize: isMobile ? 14 : 15, fontWeight: 700, cursor: "pointer" }}>About Skyera</button>
        </div>
      </div>

      {!isMobile && (
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "scrollBounce 2s ease-in-out infinite", cursor: "pointer", zIndex: 2 }} onClick={() => scrollTo("about")}>
          <div style={{ width: 1, height: 44, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 2 }}>SCROLL</span>
        </div>
      )}
    </section>
  );
}

/* ─── Stats Bar ─────────────────────────────────────────────────── */
function StatsBar() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: NAVY, borderTop: `4px solid ${GOLD}`, padding: isMobile ? "36px 5%" : "44px 6%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 28 : 24 }}>
        {stats.map((s, i) => <CounterStat key={i} {...s} delay={i * 0.12} />)}
      </div>
    </section>
  );
}

/* ─── About ─────────────────────────────────────────────────────── */
function About() {
  const isMobile = useIsMobile();
  const features = ["WHO-GMP Certified Manufacturing","Science-Driven R&D Formulations","Pan-India Distribution Network","Patient-Centric Quality Standards","Clinically Validated Products","Ethical Pharmaceutical Practices"];
  return (
    <section id="about" style={{ padding: isMobile ? "70px 5%" : "110px 6%", background: LIGHT }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
        <AnimatedSection delay={0}>
          <div style={{ background: `linear-gradient(145deg, ${NAVY}, #162d70)`, borderRadius: 32, padding: isMobile ? 28 : 48, boxShadow: `0 32px 80px rgba(11,31,75,0.25)`, position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: 2, marginBottom: 8 }}>ABOUT US</div>
            <div style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 20 }}>Skyera Pharmalab<br />Pvt. Ltd.</div>
            <div style={{ width: 60, height: 3, background: GOLD, borderRadius: 2, marginBottom: 24 }} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.9, marginBottom: 28 }}>
              A patient-centric pharmaceutical company focused on innovation, quality, and accessibility. We develop science-driven formulations that address real clinical needs across multiple therapeutic areas.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[{ v: "2025", l: "Est. Year" }, { v: "GMP", l: "Certified" }, { v: "PAN", l: "India" }, { v: "6+", l: "Products" }].map((s, i) => (
                <div key={i} style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "16px 8px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: GOLD2, fontFamily: "'Playfair Display', Georgia, serif" }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: 1, marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div style={{ fontSize: 12, fontWeight: 800, color: GOLD, letterSpacing: 2, marginBottom: 14 }}>WHY CHOOSE US</div>
          <h2 style={{ fontSize: isMobile ? 34 : 46, fontWeight: 900, color: NAVY, lineHeight: 1.15, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 20 }}>Committed to<br /><span style={{ color: GOLD }}>Clinical Excellence</span></h2>
          <p style={{ fontSize: 15, color: "#5a6880", lineHeight: 1.9, marginBottom: 36 }}>Our state-of-the-art manufacturing facility and dedicated R&D team continuously work to develop innovative solutions.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: WHITE, border: `1px solid ${GOLD}25`, borderRadius: 14, padding: "13px 16px", boxShadow: "0 2px 12px rgba(11,31,75,0.06)" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: NAVY, fontSize: 11, fontWeight: 900 }}>✓</span>
                </div>
                <span style={{ fontSize: 13, color: "#374151", fontWeight: 600, lineHeight: 1.4 }}>{f}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Products Section ──────────────────────────────────────────── */
function Products() {
  const [filter, setFilter] = useState("All");
  const isMobile = useIsMobile();
  const categories = ["All","Gastro Care","Pain Management","Anti-Allergic","Neuro Support","Multivitamin"];
  const filtered = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <section id="products" style={{ padding: isMobile ? "70px 5%" : "110px 6%", background: WHITE }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: GOLD, letterSpacing: 2 }}>OUR PORTFOLIO</div>
          </div>
          <h2 style={{ fontSize: isMobile ? 36 : 50, fontWeight: 900, color: NAVY, textAlign: "center", fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 14 }}>Premium Pharma Range</h2>
          <p style={{ textAlign: "center", color: "#5a6880", fontSize: 15, maxWidth: 560, margin: "0 auto 36px" }}>Carefully formulated, clinically tested products designed to improve quality of life across key therapeutic areas.</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 44 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                padding: "8px 16px", borderRadius: 30, border: "2px solid",
                borderColor: filter === cat ? NAVY : "#d0daea",
                background: filter === cat ? NAVY : "transparent",
                color: filter === cat ? WHITE : "#5a6880",
                fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.25s",
              }}>{cat}</button>
            ))}
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: isMobile ? 20 : 28 }}>
          {filtered.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>

        <AnimatedSection delay={0.2}>
          <div style={{ marginTop: 48, padding: "18px 24px", background: "#fff8e1", border: `1px solid ${GOLD}40`, borderRadius: 14, textAlign: "center" }}>
            <span style={{ fontSize: 13, color: "#7a6020", lineHeight: 1.7 }}>
              ⚕️ <strong>Medical Disclaimer:</strong> The above products are for informational purposes only and should be used under medical supervision.
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Marquee Strip ─────────────────────────────────────────────── */
function MarqueeStrip() {
  const items = ["SKESO D","SKESO FAST","FLAMEXO-DS","SKY LM","SKYNURO D3","GIENCVITT","GMP Certified","Pan-India","Patient-Centric","Quality First"];
  return (
    <div style={{ background: GOLD, padding: "14px 0", overflow: "hidden", whiteSpace: "nowrap", borderTop: `2px solid ${GOLD2}`, borderBottom: `2px solid ${GOLD2}` }}>
      <div style={{ display: "inline-block", animation: "marqueeScroll 22s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontSize: 12, fontWeight: 800, color: NAVY, letterSpacing: 1.5, marginRight: 36, textTransform: "uppercase" }}>◆ {item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Icon Box (reusable for contact info rows) ─────────────────── */
function IconBox({ icon, title, children }) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 22 }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14, flexShrink: 0,
        background: `linear-gradient(135deg, ${NAVY}, #1a3a8f)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 6px 20px rgba(11,31,75,0.18)`,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: 1, marginBottom: 4 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

/* ─── Contact ───────────────────────────────────────────────────── */
function Contact({ setPage }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isMobile = useIsMobile();

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); if (error) setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError("Please fill all required fields (*)"); return; }
    setLoading(true); setError("");
    try {
      await addDoc(collection(db, "enquiries"), { ...form, submittedAt: serverTimestamp(), status: "new" });
      setSent(true);
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally { setLoading(false); }
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 12,
    border: "1.5px solid #d0daea", fontSize: 14, color: NAVY,
    background: "#fafcff", outline: "none", transition: "border 0.2s", fontFamily: "inherit",
  };

  return (
    <section id="contact" style={{ padding: isMobile ? "70px 5%" : "110px 6%", background: LIGHT }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80 }}>
        <AnimatedSection>
          <div style={{ fontSize: 12, fontWeight: 800, color: GOLD, letterSpacing: 2, marginBottom: 14 }}>GET IN TOUCH</div>
          <h2 style={{ fontSize: isMobile ? 34 : 46, fontWeight: 900, color: NAVY, lineHeight: 1.2, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 20 }}>
            Let's Build a<br /><span style={{ color: GOLD }}>Healthier Future</span>
          </h2>
          <p style={{ color: "#5a6880", fontSize: 15, lineHeight: 1.9, marginBottom: 36 }}>
            Partner with Skyera Pharmalab for quality pharmaceutical solutions. Whether you're a healthcare professional, distributor, or investor — we'd love to hear from you.
          </p>

          {/* Address */}
          <IconBox icon={<LocationIcon size={22} color={WHITE} />} title="Corporate Office">
            <div style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.6 }}>Flat No. A11, Kumar Park, Bibewadi,</div>
            <div style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.6 }}>Bibewadi Kondwa Road, Pune – 411037</div>
          </IconBox>

          {/* Phone */}
          <IconBox icon={<CallIcon size={22} color={WHITE} />} title="Call Us">
            <a href={`tel:${PHONE_RAW}`} style={{ fontSize: 13.5, color: NAVY, textDecoration: "none", fontWeight: 600 }}>{PHONE}</a>
          </IconBox>

          {/* WhatsApp */}
          <IconBox icon={<MessageIcon size={22} color={WHITE} strokeWidth={2} />} title="WhatsApp">
            <a href={`https://wa.me/${WHATSAPP_RAW}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, color: "#25D366", textDecoration: "none", fontWeight: 600 }}>Chat on WhatsApp</a>
          </IconBox>

          {/* Email */}
          <IconBox icon={<MailIcon size={22} color={WHITE} />} title="Email Us">
            <div style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.6 }}>{EMAIL}</div>
          </IconBox>

          {/* CIN */}
          <IconBox icon={<BuildingIcon size={22} color={WHITE} />} title="Company Identification">
            <div style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.6 }}>CIN: U46497PN2025PTC247443</div>
          </IconBox>

          {/* Privacy Policy link */}
          <div style={{ marginTop: 12 }}>
            <button onClick={() => setPage("privacy")} style={{ background: "none", border: "none", cursor: "pointer", color: GOLD, fontWeight: 700, fontSize: 13, padding: 0, textDecoration: "underline" }}>
              Privacy Policy
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div style={{ background: WHITE, borderRadius: 28, padding: isMobile ? "28px 22px" : "44px 40px", boxShadow: "0 20px 72px rgba(11,31,75,0.1)", border: `1px solid ${GOLD}20` }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "50px 20px" }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 12 }}>Thank You!</div>
                <p style={{ color: "#5a6880", fontSize: 15 }}>Your enquiry has been submitted.<br />Our team will contact you soon.</p>
                <button onClick={() => setSent(false)} style={{ marginTop: 25, padding: "12px 32px", background: GOLD, color: NAVY, border: "none", borderRadius: 30, fontWeight: 700, cursor: "pointer" }}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Send an Enquiry</div>
                <div style={{ width: 40, height: 3, background: GOLD, borderRadius: 2, marginBottom: 24 }} />
                {error && <div style={{ color: "red", marginBottom: 16, fontSize: 14 }}>{error}</div>}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6, display: "block" }}>FULL NAME *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder="Your full name" />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6, display: "block" }}>EMAIL *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required style={inputStyle} placeholder="your@email.com" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginTop: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6, display: "block" }}>PHONE</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} style={inputStyle} placeholder="+91 XXXXXXXXXX" />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6, display: "block" }}>ORGANISATION</label>
                    <input type="text" name="company" value={form.company} onChange={handleChange} style={inputStyle} placeholder="Company / Hospital / Clinic" />
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6, display: "block" }}>MESSAGE *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} style={{ ...inputStyle, resize: "vertical" }} placeholder="How can we help you?" />
                </div>
                <button type="submit" disabled={loading} style={{ marginTop: 24, width: "100%", padding: "16px", borderRadius: 14, border: "none", background: loading ? "#94a3b8" : `linear-gradient(135deg, ${NAVY}, #1a3a8f)`, color: WHITE, fontSize: 16, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                  {loading ? "Sending Enquiry..." : "Send Enquiry →"}
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────── */
function Footer({ scrollTo, setPage }) {
  const isMobile = useIsMobile();
  const links = ["Home","About","Products","Contact"];
  return (
    <footer style={{ background: "#060F2A", padding: isMobile ? "52px 5% 0" : "72px 6% 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 36 : 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: NAVY, fontSize: 20 }}>S</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 900, color: WHITE, fontFamily: "'Playfair Display', Georgia, serif" }}>SKYERA</div>
                <div style={{ fontSize: 8, color: GOLD, letterSpacing: 2, fontWeight: 700 }}>PHARMALAB PVT. LTD.</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, maxWidth: 280 }}>
              Dedicated to delivering superior quality pharmaceutical products, improving lives across India.
            </p>
          </div>

          {!isMobile && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: 2, marginBottom: 18 }}>QUICK LINKS</div>
              {links.map(l => (
                <div key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 12, cursor: "pointer" }}>{l}</div>
              ))}
              <div onClick={() => setPage("privacy")} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 12, cursor: "pointer" }}>Privacy Policy</div>
            </div>
          )}

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: 2, marginBottom: 18 }}>CONTACT</div>

            {/* Address */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "flex-start" }}>
              <LocationIcon size={16} color={GOLD} />
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>Flat No. A11, Kumar Park, Bibewadi,<br />Pune – 411037</div>
            </div>

            {/* Email */}
            <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
              <MailIcon size={16} color={GOLD} />
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)" }}>{EMAIL}</div>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <CallIcon size={16} color={GOLD} />
              <a href={`tel:${PHONE_RAW}`} style={{ fontSize: 12.5, color: GOLD, textDecoration: "none", fontWeight: 600 }}>{PHONE}</a>
            </div>
          </div>
        </div>

        <div style={{ padding: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>© 2025 Skyera Pharmalab Pvt. Ltd. All rights reserved.</span>
          <button onClick={() => setPage("privacy")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 12, textDecoration: "underline", padding: 0, fontFamily: "inherit" }}>Privacy Policy</button>
        </div>
      </div>
    </footer>
  );
}

/* ─── Privacy Policy Page ───────────────────────────────────────── */
function PrivacyPolicy({ setPage }) {
  const isMobile = useIsMobile();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const sections = [
    {
      title: "1. Information We Collect",
      content: `When you submit an enquiry through our website, we collect the following personal information:\n• Full name\n• Email address\n• Phone number (optional)\n• Organisation / company name (optional)\n• Message content\n\nWe do not collect any sensitive personal data such as financial information, health records, or government identification numbers through this website.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information you provide solely for the following purposes:\n• To respond to your enquiries and provide requested information about our products\n• To contact you regarding business opportunities or distribution partnerships\n• To improve our products and services based on feedback\n• To comply with legal and regulatory obligations\n\nWe do not use your information for automated decision-making or profiling.`,
    },
    {
      title: "3. Data Storage & Security",
      content: `Your enquiry data is securely stored using Google Firebase Firestore, a cloud platform with industry-standard security measures. We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.\n\nData is stored on servers located within Google's secure infrastructure. We retain your enquiry data for a maximum period of 3 years, after which it is permanently deleted.`,
    },
    {
      title: "4. Sharing of Information",
      content: `We do not sell, trade, or rent your personal information to third parties. Your information may be shared only in the following limited circumstances:\n• With trusted service providers who assist us in operating our website or conducting business (subject to confidentiality agreements)\n• When required by law, court order, or governmental authority\n• To protect the rights, property, or safety of Skyera Pharmalab Pvt. Ltd., our customers, or others\n\nWe will never share your personal data for marketing purposes without your explicit consent.`,
    },
    {
      title: "5. Your Rights Under DPDP Act 2023",
      content: `Under India's Digital Personal Data Protection (DPDP) Act, 2023, you have the following rights:\n• Right to Access: Request a copy of the personal data we hold about you\n• Right to Correction: Request correction of inaccurate or incomplete personal data\n• Right to Erasure: Request deletion of your personal data (subject to legal obligations)\n• Right to Grievance Redressal: Lodge a complaint with our Data Protection Officer\n• Right to Nominate: Nominate an individual to exercise rights on your behalf\n\nTo exercise any of these rights, please contact our Data Protection Officer at ${EMAIL}.`,
    },
    {
      title: "6. Cookies & Analytics",
      content: `Our website does not currently use cookies for tracking or analytics purposes. If this changes in the future, we will update this policy and seek your consent where required.`,
    },
    {
      title: "7. Medical Disclaimer",
      content: `All product information displayed on this website is intended for informational purposes only and is directed at licensed healthcare professionals, distributors, and industry partners. The content on this website does not constitute medical advice and should not be used as a substitute for professional medical guidance.\n\nAll pharmaceutical products are to be used only under the supervision of a qualified healthcare professional.`,
    },
    {
      title: "8. Changes to This Policy",
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on this page with a revised effective date. We encourage you to review this page regularly.`,
    },
    {
      title: "9. Contact Us",
      content: `For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:\n\nSkyera Pharmalab Pvt. Ltd.\nFlat No. A11, Kumar Park, Bibewadi,\nBibewadi Kondwa Road, Pune – 411037, Maharashtra, India\n\nEmail: ${EMAIL}\nPhone: ${PHONE}\nCIN: U46497PN2025PTC247443`,
    },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: LIGHT, minHeight: "100vh" }}>
      <div style={{ background: `linear-gradient(160deg, ${NAVY}, #162d70)`, padding: isMobile ? "90px 5% 50px" : "100px 6% 60px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <button onClick={() => setPage("home")} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            color: WHITE, padding: "8px 18px", borderRadius: 30,
            fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 28, fontFamily: "inherit",
          }}>← Back to Website</button>
          <div style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: 2, marginBottom: 12 }}>LEGAL</div>
          <h1 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 900, color: WHITE, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.1, marginBottom: 16 }}>Privacy Policy</h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 620 }}>
            Skyera Pharmalab Pvt. Ltd. is committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information in accordance with the Digital Personal Data Protection (DPDP) Act, 2023.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}><span style={{ color: GOLD, fontWeight: 700 }}>Effective Date:</span> January 1, 2025</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}><span style={{ color: GOLD, fontWeight: 700 }}>Last Updated:</span> January 1, 2025</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: isMobile ? "40px 5% 60px" : "60px 6% 80px" }}>
        {sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: 40, background: WHITE, borderRadius: 20, padding: isMobile ? "24px 22px" : "32px 36px", boxShadow: "0 4px 20px rgba(11,31,75,0.06)", border: `1px solid ${GOLD}15` }}>
            <h2 style={{ fontSize: isMobile ? 17 : 20, fontWeight: 800, color: NAVY, marginBottom: 14, fontFamily: "'Playfair Display', Georgia, serif" }}>{sec.title}</h2>
            <div style={{ width: 36, height: 2, background: GOLD, borderRadius: 2, marginBottom: 16 }} />
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.9, whiteSpace: "pre-line" }}>{sec.content}</p>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 20, padding: "32px 24px", background: `linear-gradient(135deg, ${NAVY}, #162d70)`, borderRadius: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: WHITE, marginBottom: 8, fontFamily: "'Playfair Display', Georgia, serif" }}>Have Questions?</div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 20 }}>Our team is here to help with any privacy-related concerns.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`mailto:${EMAIL}`} style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: NAVY, padding: "11px 24px", borderRadius: 30, fontSize: 13, fontWeight: 800, textDecoration: "none" }}>Email Us</a>
            <button onClick={() => setPage("home")} style={{ background: "rgba(255,255,255,0.1)", color: WHITE, border: "1px solid rgba(255,255,255,0.2)", padding: "11px 24px", borderRadius: 30, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ──────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        button { font-family: inherit; }
        input, textarea { font-family: inherit; }
        input:focus, textarea:focus { border-color: #C9A22A !important; box-shadow: 0 0 0 3px rgba(201,162,42,0.15); }
      `}</style>

      {page === "privacy" ? (
        <PrivacyPolicy setPage={setPage} />
      ) : (
        <>
          <Nav scrollTo={scrollTo} setPage={setPage} />
          <Hero scrollTo={scrollTo} />
          <StatsBar />
          <About />
          <MarqueeStrip />
          <Products />
          <Contact setPage={setPage} />
          <Footer scrollTo={scrollTo} setPage={setPage} />
        </>
      )}

      <WhatsAppButton />
    </div>
  );
}