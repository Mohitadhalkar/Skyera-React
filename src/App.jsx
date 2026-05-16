import { useState, useEffect, useRef, useCallback, memo } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import skyeraLogo from "./Skyeralogo.png";
import heroBackgroundImage from "./herobgimage.png";
import {
  PersonIcon,
  HeartRateIcon,
  GrowthIcon,
  ProductIcon,
  HandshakeIcon,
} from "./SvgIcon";

// ── Firebase ──
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

// ── Constants ──
const NAVY  = "#0B1F4B";
const GOLD  = "#C9A22A";
const GOLD2 = "#E6BF50";
const WHITE = "#FFFFFF";
const LIGHT = "#F4F7FF";

const PHONE        = "+91 9987943524";
const PHONE_RAW    = "+919987943524";
const WHATSAPP_RAW = "+919987943524";
const EMAIL        = "SKYERAPHARMALAB@gmail.com";

// ── SVG Icons ──
export const LocationIcon = memo(({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7" />
  </svg>
));

export const MailIcon = memo(({ size = 24, color = "currentColor", ...p }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} {...p}>
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 4.99L4 6zm0 12H4V8l8 5l8-5z" />
  </svg>
));

export const CallIcon = memo(({ size = 20, color = "currentColor", ...p }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...p}>
    <path d="m6.987 2.066l-.717.216a3.5 3.5 0 0 0-2.454 2.854c-.297 2.068.367 4.486 1.968 7.259c1.597 2.766 3.355 4.548 5.29 5.328a3.5 3.5 0 0 0 3.715-.705l.542-.514a2 2 0 0 0 .247-2.623l-1.356-1.88a1.5 1.5 0 0 0-1.655-.556l-2.051.627l-.053.01c-.226.033-.748-.456-1.398-1.582c-.68-1.178-.82-1.867-.633-2.045l1.043-.973a2.5 2.5 0 0 0 .575-2.85l-.662-1.471a2 2 0 0 0-2.4-1.095m1.49 1.505l.66 1.471a1.5 1.5 0 0 1-.344 1.71l-1.046.974C7.078 8.36 7.3 9.442 8.2 11c.846 1.466 1.618 2.19 2.448 2.064l.124-.026l2.088-.637a.5.5 0 0 1 .552.185l1.356 1.88a1 1 0 0 1-.123 1.312l-.543.514a2.5 2.5 0 0 1-2.653.503c-1.698-.684-3.303-2.311-4.798-4.9C5.152 9.3 4.545 7.093 4.806 5.278a2.5 2.5 0 0 1 1.753-2.039l.717-.216a1 1 0 0 1 1.2.548" />
  </svg>
));

export const MessageIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 2, ...p }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" />
  </svg>
));

const BuildingIcon = memo(({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 19V4.7a.7.7 0 0 1 .7-.7h7.6a.7.7 0 0 1 .7.7V9h4.3a.7.7 0 0 1 .7.7V19M1 19h22M9 9v2m0 4v2m4-6v2m0 4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
));

// ── FIX: Missing TeamIcon and NetworkIcon ──
const TeamIcon = memo(({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
));

const NetworkIcon = memo(({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
  </svg>
));

// ── Emoji Icons ──
const StomachIcon = memo(({ size = 20 }) => <span style={{ fontSize: size, lineHeight: 1 }}>🧪</span>);
const EnergyIcon   = memo(({ size = 20 }) => <span style={{ fontSize: size, lineHeight: 1 }}>⚡</span>);
const MuscleIcon  = memo(({ size = 20 }) => <span style={{ fontSize: size, lineHeight: 1 }}>💊 </span>);
const LungsIcon   = memo(({ size = 20 }) => <span style={{ fontSize: size, lineHeight: 1 }}>🌿 </span>);
const BrainIcon   = memo(({ size = 20 }) => <span style={{ fontSize: size, lineHeight: 1 }}>🧠</span>);
const HeartIcon   = memo(({ size = 20 }) => <span style={{ fontSize: size, lineHeight: 1 }}>❤️</span>);

// ── Data (defined outside component to avoid recreation) ──
const products = [
  { id:1, name:"SKESO D",    subtitle:"Esomeprazole + Domperidone – For the management of GERD, acidity, and gastric motility disorders", category:"Gastro Care",     tagline:"Advanced gastric care solution",         color:"#1565C0", accent:"#42A5F5", badge:"Gastro",       Icon: StomachIcon },
  { id:2, name:"SKESO FAST", subtitle:"Esomeprazole with buffering agent – For faster onset relief in acid-related conditions",                  category:"Gastro Care",     tagline:"Fast-acting acid relief",                color:"#0277BD", accent:"#4FC3F7", badge:"Fast Action",  Icon: EnergyIcon },
  { id:3, name:"FLAMEXO-DS", subtitle:"Diclofenac Sodium 50 mg + Serratiopeptidase 10 mg – Used in the management of pain and inflammation",         category:"Pain Management", tagline:"Powerful pain and inflammation relief",   color:"#C62828", accent:"#EF5350", badge:"Pain Relief",  Icon: MuscleIcon },
  { id:4, name:"SKY LM",     subtitle:"Montelukast + Levocetirizine – Used for allergic and respiratory conditions",           category:"Anti-Allergic",   tagline:"Allergy and respiratory support",         color:"#2E7D32", accent:"#66BB6A", badge:"Allergy",      Icon: LungsIcon },
  { id:5, name:"SKYNURO D3", subtitle:"Methylcobalamin, Vitamin D3, Pyridoxine & Folic Acid – Supports nerve health and nutritional deficiencies", category:"Neuro Support",   tagline:"Complete neuro-nutritional support",      color:"#4A148C", accent:"#AB47BC", badge:"Neuro",        Icon: BrainIcon },
  { id:6, name:"GIENCVITT",  subtitle:"Multivitamin with amino acids, ginseng & zinc – To support energy and immunity",           category:"Multivitamin",    tagline:"Energy and immunity enhancement",         color:"#E65100", accent:"#FFA726", badge:"Wellness",     Icon: HeartIcon },
];

const stats = [
  { value:"6",    label:"Product Range" },
  { value:"5",    label:"Therapeutic Areas" },
  { value:"2025", label:"Established" },
  { value:"Pune", label:"Maharashtra" },
];

const advantageFeatures = [
  {
    icon: <ProductIcon color="#E0C868" />,
    title: "5+ Premium Brands",
    desc: "Curated portfolio of high-quality pharmaceutical products trusted for safety, effectiveness, and reliability."
  },
  {
    icon: <GrowthIcon color="#E0C868" />,
    title: "Market Expertise",
    desc: "Deep understanding of pharmaceutical market trends and customer needs to deliver the right products."
  },
  {
    icon: <HandshakeIcon color="#E0C868" />,
    title: "Trusted Partnerships",
    desc: "Strong relationships with healthcare professionals, distributors, and retailers across the region."
  },
  {
    icon: <TeamIcon  color="#E0C868" />,
    title: "Dedicated Team",
    desc: "Passionate marketing professionals committed to bringing quality healthcare solutions to you."
  },
  {
    icon: <NetworkIcon  color="#E0C868" />,
    title: "Wide Reach",
    desc: "Extensive distribution network ensuring product availability when and where you need them."
  },
  {
    icon: <HeartRateIcon color="#E0C868" />,
    title: "Patient-First Approach",
    desc: "Every decision we make is guided by the well-being of patients who rely on our products."
  },
];

const ADVANTAGE_COLORS = [
  { bg:"#EFF6FF", accent:"#1565C0", border:"#BFDBFE" },
  { bg:"#FFF7ED", accent:"#C2410C", border:"#FED7AA" },
  { bg:"#F0FDF4", accent:"#166534", border:"#BBF7D0" },
  { bg:"#FAF5FF", accent:"#6B21A8", border:"#E9D5FF" },
  { bg:"#FFF1F2", accent:"#9F1239", border:"#FECDD3" },
  { bg:"#FFFBEB", accent:"#92400E", border:"#FDE68A" },
];

const CATEGORIES = ["All","Gastro Care","Pain Management","Anti-Allergic","Neuro Support","Multivitamin"];

const NAV_LINKS = ["Home","About","Products","Contact"];

const ABOUT_HIGHLIGHTS = [
  "Science-Driven R&D Formulations",
  "Distribution Network",
  "Clinically Validated Products",
  "Ethical Pharmaceutical Practices",
];

const ABOUT_STATS = [
  {v:"2025",l:"Est. Year"},
  {v:"Pune",l:"Maharashtra"},
  {v:"6+",l:"Products"},
  {v:"5",l:"Therapy Areas"},
];

const MARQUEE_ITEMS = ["SKESO D","SKESO FAST","FLAMEXO-DS","SKY LM","SKYNURO D3","GIENCVITT","Science Driven","Quality First","Certified Formulations"];

const TAGLINES = ["Science-Driven Formulations.","Accessible Healthcare Solutions."];

const HERO_BG_STYLE = {
  position:"absolute", inset:0,
  backgroundSize: "cover, cover",
  backgroundPosition: "center, center",
  backgroundRepeat: "no-repeat, no-repeat",
  backgroundBlendMode: "overlay",
  opacity: 0.92,
};

// ── Hooks ──
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    let raf;
    const h = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setIsMobile(window.innerWidth < 768)); };
    window.addEventListener("resize", h, { passive: true });
    return () => { window.removeEventListener("resize", h); cancelAnimationFrame(raf); };
  }, []);
  return isMobile;
}

// ── AnimatedSection ──
const AnimatedSection = memo(({ children, delay = 0, style = {} }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
});

// ── Success Modal ──
const SuccessModal = memo(({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(11,31,75,0.75)", backdropFilter:"blur(8px)", padding:"20px" }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background:"#fff", borderRadius:28, padding:"48px 40px", maxWidth:440, width:"100%", textAlign:"center", boxShadow:"0 32px 100px rgba(11,31,75,0.25)", animation:"popIn 0.5s cubic-bezier(.34,1.56,.64,1) both" }}
      >
        <div style={{ width:90, height:90, margin:"0 auto 24px", position:"relative" }}>
          <svg viewBox="0 0 90 90" style={{ width:90, height:90 }}>
            <circle cx="45" cy="45" r="42" fill="none" stroke={GOLD} strokeWidth="4" strokeDasharray="264" strokeDashoffset="0" style={{ animation:"circleIn 0.7s ease both" }}/>
            <path d="M28 45 L40 57 L62 33" fill="none" stroke={NAVY} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset="0" style={{ animation:"checkIn 0.5s ease 0.4s both" }}/>
          </svg>
        </div>
        <div style={{ fontSize:28, fontWeight:900, color:NAVY, fontFamily:"'Playfair Display', Georgia, serif", marginBottom:12 }}>Enquiry Sent!</div>
        <p style={{ color:"#5a6880", fontSize:15, lineHeight:1.7, marginBottom:28 }}>
          Thank you for reaching out to Skyera Pharmalab.<br/>Our team will contact you within 24 hours.
        </p>
        <button
          onClick={onClose}
          style={{ background:`linear-gradient(135deg,${GOLD},${GOLD2})`, color:NAVY, border:"none", padding:"12px 28px", borderRadius:30, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}
        >
          Done
        </button>
        <div style={{ marginTop:20 }}>
          <div style={{ width:"100%", height:3, background:"#f0f0f0", borderRadius:3, overflow:"hidden" }}>
            <div style={{ height:"100%", background:GOLD, borderRadius:3, animation:"progressBar 5s linear both" }}/>
          </div>
          <p style={{ fontSize:11, color:"#aaa", marginTop:6 }}>Auto-closes in 5 seconds</p>
        </div>
      </div>
    </div>
  );
});

// ── WhatsApp Button ──
const WhatsAppButton = memo(() => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={`https://wa.me/${WHATSAPP_RAW}?text=Hello%20Skyera%20Pharmalab%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:"fixed", bottom:28, right:28, zIndex:998,
        display:"flex", alignItems:"center", gap:10,
        background:"#25D366", color:WHITE, textDecoration:"none",
        borderRadius:50, padding:hov ? "13px 20px 13px 16px" : "14px",
        boxShadow:"0 6px 28px rgba(37,211,102,0.5)",
        transform:hov ? "scale(1.06)" : "scale(1)",
        transition:"all 0.3s cubic-bezier(.4,0,.2,1)",
        overflow:"hidden", maxWidth:hov ? 220 : 52,
        whiteSpace:"nowrap",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" style={{ flexShrink:0 }}>
        <circle cx="16" cy="16" r="16" fill="#25D366"/>
        <path d="M23.472 8.516A10.25 10.25 0 0 0 16.02 5.5C10.737 5.5 6.44 9.797 6.44 15.08c0 1.695.44 3.347 1.277 4.803L6.37 25.5l5.775-1.515a10.29 10.29 0 0 0 4.875 1.24h.004c5.28 0 9.578-4.297 9.58-9.58a9.528 9.528 0 0 0-2.132-6.13zm-7.452 14.743h-.003a8.55 8.55 0 0 1-4.354-1.19l-.312-.186-3.23.847.862-3.151-.203-.323a8.53 8.53 0 0 1-1.308-4.576c0-4.71 3.833-8.543 8.552-8.543a8.496 8.496 0 0 1 6.046 2.506 8.49 8.49 0 0 1 2.502 6.044c-.002 4.713-3.835 8.572-8.552 8.572zm4.693-6.41c-.257-.129-1.524-.752-1.76-.838-.237-.086-.41-.129-.582.13-.172.257-.665.837-.815 1.01-.15.171-.3.193-.557.064-.257-.129-1.083-.399-2.063-1.273-.762-.68-1.276-1.52-1.426-1.776-.15-.258-.016-.397.113-.525.116-.115.257-.3.386-.45.129-.15.172-.257.257-.429.086-.172.043-.322-.021-.45-.065-.13-.582-1.4-.797-1.917-.21-.503-.424-.435-.582-.443l-.497-.009c-.172 0-.45.065-.686.322-.236.257-.9.88-.9 2.146 0 1.268.921 2.493 1.05 2.665.128.171 1.812 2.765 4.39 3.877.614.265 1.093.424 1.466.543.616.196 1.177.168 1.62.102.494-.074 1.523-.623 1.738-1.225.214-.601.214-1.116.15-1.224-.065-.108-.236-.172-.493-.3z" fill="white"/>
      </svg>
      {hov && <span style={{ fontSize:13, fontWeight:700, letterSpacing:0.3 }}>Chat with Us</span>}
    </a>
  );
});

// ── Logo ──
const SkyeraLogo = memo(({ height = 44 }) => (
  <img
    src={skyeraLogo}
    alt="Skyera Pharmalab"
    style={{ height, width:"auto", objectFit:"contain", display:"block", maxWidth:"100%" }}
    loading="eager"
  />
));

// ── Nav ──
function Nav({ scrollTo, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    let raf;
    const h = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setScrolled(window.scrollY > 60)); };
    window.addEventListener("scroll", h, { passive: true });
    return () => { window.removeEventListener("scroll", h); cancelAnimationFrame(raf); };
  }, []);

  const handleLogoClick = useCallback(() => { setPage("home"); scrollTo("hero"); setMenuOpen(false); }, [setPage, scrollTo]);
  const handleEnquireClick = useCallback(() => { setPage("home"); setTimeout(() => scrollTo("contact"), 50); }, [setPage, scrollTo]);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen(m => !m), []);

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      height:68,
      background: scrolled || menuOpen ? "rgba(11,31,75,0.97)" : "transparent",
      backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
      boxShadow: scrolled ? "0 2px 32px rgba(0,0,0,0.18)" : "none",
      transition:"all 0.4s",
      display:"flex", alignItems:"center",
      padding:"0 5%",
      justifyContent:"space-between",
    }}>
      <div
        style={{ cursor:"pointer", display:"flex", alignItems:"center", height:"100%", flexShrink:0 }}
        onClick={handleLogoClick}
      >
        <SkyeraLogo height={"160%"} />
      </div>

      {!isMobile && (
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {NAV_LINKS.map(l => (
            <button
              key={l}
              onClick={() => { setPage("home"); setTimeout(() => scrollTo(l.toLowerCase()), 50); }}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, fontWeight:600, color:"rgba(255,255,255,0.85)", letterSpacing:0.5, padding:0 }}
            >
              {l}
            </button>
          ))}
          <button
            onClick={handleEnquireClick}
            style={{ background:`linear-gradient(135deg,${GOLD},${GOLD2})`, color:NAVY, border:"none", padding:"9px 22px", borderRadius:30, fontSize:13, fontWeight:800, cursor:"pointer", letterSpacing:0.5 }}
          >
            Enquire Now
          </button>
        </div>
      )}

      {isMobile && (
        <button onClick={toggleMenu} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", gap:5, padding:6 }}>
          {[0,1,2].map(i => (
            <div
              key={i}
              style={{
                width:24, height:2, background:WHITE, borderRadius:2,
                transform: menuOpen && i===0 ? "rotate(45deg) translate(5px,5px)"
                         : menuOpen && i===1 ? "scaleX(0)"
                         : menuOpen && i===2 ? "rotate(-45deg) translate(5px,-5px)"
                         : "none",
                transition:"all 0.3s",
              }}
            />
          ))}
        </button>
      )}

      {isMobile && menuOpen && (
        <div style={{
          position:"absolute", top:68, left:0, right:0,
          background:"rgba(11,31,75,0.98)", backdropFilter:"blur(16px)",
          padding:"20px 5%", display:"flex", flexDirection:"column",
          borderTop:`1px solid rgba(201,162,42,0.2)`,
        }}>
          {NAV_LINKS.map(l => (
            <button
              key={l}
              onClick={() => { setPage("home"); setTimeout(() => scrollTo(l.toLowerCase()), 50); closeMenu(); }}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, fontWeight:600, color:"rgba(255,255,255,0.85)", padding:"14px 0", textAlign:"left", letterSpacing:0.5, borderBottom:"1px solid rgba(255,255,255,0.07)" }}
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => { setPage("home"); setTimeout(() => scrollTo("contact"), 50); closeMenu(); }}
            style={{ background:`linear-gradient(135deg,${GOLD},${GOLD2})`, color:NAVY, border:"none", padding:"13px 0", borderRadius:12, marginTop:16, fontSize:15, fontWeight:800, cursor:"pointer" }}
          >
            Enquire Now
          </button>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──
function Hero({ scrollTo }) {
  const [tick, setTick] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3200);
    return () => clearInterval(id);
  }, []);

  const heroBgStyle = {
    ...HERO_BG_STYLE,
    backgroundImage: `url(${heroBackgroundImage}), linear-gradient(135deg, #050d1a 0%, #0f1e3d 50%, #061129 100%)`,
  };

  return (
    <section id="hero" style={{
      minHeight:"100vh",
      position:"relative",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding: isMobile ? "110px 5% 80px" : "120px 6% 100px",
      overflow:"hidden",
      textAlign:"center",
    }}>
      <div style={heroBgStyle} />

      {/* DNA left */}
      <svg style={{ position:"absolute", left: isMobile ? -20 : 20, top:"5%", opacity:0.18, height:"90%" }} width="90" viewBox="0 0 90 900" preserveAspectRatio="none">
        {Array.from({length:45}).map((_,i) => {
          const y = i*20+10;
          const x1 = 15 + 30*Math.sin(i*0.45);
          const x2 = 75 - 30*Math.sin(i*0.45);
          const prog = (i%5===0) ? 1 : 0.4;
          return (
            <g key={i} opacity={prog}>
              <circle cx={x1} cy={y} r={i%5===0?4:2.5} fill={GOLD} opacity="0.8"/>
              <circle cx={x2} cy={y} r={i%5===0?4:2.5} fill="#4FC3F7" opacity="0.8"/>
              {i%5===0 && <line x1={x1} y1={y} x2={x2} y2={y} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>}
            </g>
          );
        })}
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-20; 0,0" dur="8s" repeatCount="indefinite"/>
      </svg>

      {/* DNA right */}
      {!isMobile && (
        <svg style={{ position:"absolute", right:20, top:"5%", opacity:0.18, height:"90%" }} width="90" viewBox="0 0 90 900" preserveAspectRatio="none">
          {Array.from({length:45}).map((_,i) => {
            const y = i*20+10;
            const x1 = 15 + 30*Math.cos(i*0.45);
            const x2 = 75 - 30*Math.cos(i*0.45);
            const prog = (i%5===0) ? 1 : 0.4;
            return (
              <g key={i} opacity={prog}>
                <circle cx={x1} cy={y} r={i%5===0?4:2.5} fill="#C084FC" opacity="0.8"/>
                <circle cx={x2} cy={y} r={i%5===0?4:2.5} fill={GOLD} opacity="0.8"/>
                {i%5===0 && <line x1={x1} y1={y} x2={x2} y2={y} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>}
              </g>
            );
          })}
          <animateTransform attributeName="transform" type="translate" values="0,-20; 0,0; 0,-20" dur="8s" repeatCount="indefinite"/>
        </svg>
      )}

      {/* Molecule network background */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.13, pointerEvents:"none" }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="orbA" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.4"/>
            <stop offset="100%" stopColor={GOLD} stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="orbB" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a5bbf" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="#1a5bbf" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="orbC" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
          </radialGradient>
          <filter id="gblur"><feGaussianBlur stdDeviation="50"/></filter>
        </defs>
        <ellipse cx="720" cy="450" rx="580" ry="480" fill="url(#orbA)" filter="url(#gblur)">
          <animate attributeName="rx" values="580;680;560;630;580" dur="12s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="200" cy="200" rx="320" ry="290" fill="url(#orbB)" filter="url(#gblur)">
          <animate attributeName="cx" values="200;300;160;250;200" dur="14s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="1200" cy="700" rx="360" ry="280" fill="url(#orbC)" filter="url(#gblur)">
          <animate attributeName="cy" values="700;610;760;680;700" dur="10s" repeatCount="indefinite"/>
        </ellipse>
      </svg>

      {/* Molecule atoms & bonds */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.2, pointerEvents:"none" }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g transform="translate(140,160)" opacity="0.7">
          {[0,1,2,3,4,5].map(i => { const a=(i*60-90)*Math.PI/180,a2=((i+1)*60-90)*Math.PI/180,r=38; return <line key={i} x1={Math.cos(a)*r} y1={Math.sin(a)*r} x2={Math.cos(a2)*r} y2={Math.sin(a2)*r} stroke={GOLD} strokeWidth="2"/>; })}
          {[0,1,2,3,4,5].map(i => { const a=(i*60-90)*Math.PI/180,r=38; return <circle key={i} cx={Math.cos(a)*r} cy={Math.sin(a)*r} r="4" fill={GOLD}/>; })}
        </g>
        <g transform="translate(1300,740)" opacity="0.6">
          {[0,1,2,3,4,5].map(i => { const a=(i*60-90)*Math.PI/180,a2=((i+1)*60-90)*Math.PI/180,r=32; return <line key={i} x1={Math.cos(a)*r} y1={Math.sin(a)*r} x2={Math.cos(a2)*r} y2={Math.sin(a2)*r} stroke="#4FC3F7" strokeWidth="1.5"/>; })}
          {[0,1,2,3,4,5].map(i => { const a=(i*60-90)*Math.PI/180,r=32; return <circle key={i} cx={Math.cos(a)*r} cy={Math.sin(a)*r} r="3.5" fill="#4FC3F7"/>; })}
        </g>
        {[
          {cx:380,cy:80,r:5,c:GOLD},{cx:700,cy:140,r:7,c:"#4FC3F7"},{cx:1060,cy:200,r:5,c:"#C084FC"},
          {cx:1320,cy:100,r:4,c:GOLD},{cx:80,cy:700,r:4,c:"#4FC3F7"},{cx:420,cy:800,r:6,c:GOLD},
          {cx:800,cy:760,r:4,c:"#C084FC"},{cx:600,cy:400,r:3,c:GOLD},{cx:900,cy:300,r:3.5,c:"#4FC3F7"},
        ].map((a,i) => (
          <circle key={i} cx={a.cx} cy={a.cy} r={a.r} fill={a.c}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur={`${7+i}s`} repeatCount="indefinite"/>
            <animate attributeName="r" values={`${a.r};${a.r*1.7};${a.r}`} dur={`${7+i}s`} repeatCount="indefinite"/>
          </circle>
        ))}
        <line x1="380" y1="80" x2="700" y2="140" stroke={GOLD} strokeWidth="0.8" opacity="0.4"/>
        <line x1="700" y1="140" x2="1060" y2="200" stroke="#4FC3F7" strokeWidth="0.8" opacity="0.3"/>
        <line x1="600" y1="400" x2="900" y2="300" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6"/>
        <line x1="420" y1="800" x2="800" y2="760" stroke={GOLD} strokeWidth="0.6" opacity="0.3"/>
      </svg>

      {/* Hex grid */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.04, pointerEvents:"none" }} viewBox="0 0 200 200">
        <defs>
          <pattern id="hexPat" width="28" height="24" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon points="14,2 26,9 26,21 14,28 2,21 2,9" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#hexPat)"/>
      </svg>

      <div style={{ position:"relative", zIndex:2, width:"100%" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(201,162,42,0.1)", border:"1px solid rgba(201,162,42,0.35)", padding:"8px 20px", borderRadius:30, marginBottom:28, animation:"fadeSlideUp 0.8s ease both" }}>
          <span style={{ width:8, height:8, background:"#4ade80", borderRadius:"50%", display:"inline-block", animation:"pulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize:12, color:GOLD, fontWeight:700, letterSpacing:1 }}>Science Driven · Pune, Maharashtra</span>
        </div>

        <div style={{ overflow:"visible", paddingBottom: isMobile ? 4 : 8, marginBottom:10 }}>
          <h1 style={{
            fontSize: isMobile ? 38 : 68,
            fontWeight:900,
            lineHeight:1.12,
            fontFamily:"'Playfair Display', Georgia, serif",
            animation:"fadeSlideUp 0.8s ease 0.1s both",
            maxWidth:900,
            margin:"0 auto",
            overflow:"visible",
          }}>
            <span style={{ color:WHITE, display:"block" }}>Where Science</span>
            <span style={{
              display:"block",
              background:`linear-gradient(90deg,${GOLD},${GOLD2},#fff5c0,${GOLD})`,
              backgroundSize:"300% auto",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
              animation:"goldShimmer 4s linear infinite",
              paddingBottom:"0.12em",
              paddingTop: isMobile ? 2 : 6,
            }}>
              Meets Healing
            </span>
          </h1>
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:20, animation:"fadeSlideUp 0.8s ease 0.15s both" }}>
          <div style={{ height:1, width: isMobile ? 50 : 90, background:`linear-gradient(90deg,transparent,${GOLD})` }} />
          <div style={{ width:6, height:6, borderRadius:"50%", background:GOLD }} />
          <div style={{ height:1, width: isMobile ? 50 : 90, background:`linear-gradient(90deg,${GOLD},transparent)` }} />
        </div>

        <div style={{ height:30, overflow:"hidden", marginBottom:24 }}>
          <p
            key={tick}
            style={{ fontSize: isMobile ? 15 : 18, color:"rgba(255,255,255,0.72)", fontWeight:500, letterSpacing:0.5, animation:"taglineSlide 3.2s ease forwards", margin:0 }}
          >
            {TAGLINES[tick % TAGLINES.length]}
          </p>
        </div>

        <p style={{ fontSize: isMobile ? 14 : 16, color:"rgba(255,255,255,0.55)", lineHeight:1.85, maxWidth: isMobile ? "100%" : 600, margin:"0 auto 40px", animation:"fadeSlideUp 0.8s ease 0.25s both" }}>
          Skyera Pharmalab Pvt. Ltd. offers a focused portfolio of quality pharmaceutical products across key therapeutic areas including multivitamins, gastro care, anti-allergic therapy, pain management, and neuro-nutritional support.
        </p>

        <div style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center", animation:"fadeSlideUp 0.8s ease 0.35s both" }}>
          <button
            onClick={() => scrollTo("products")}
            style={{ background:`linear-gradient(135deg,${GOLD},${GOLD2})`, color:NAVY, border:"none", padding: isMobile ? "13px 28px" : "15px 36px", borderRadius:40, fontSize: isMobile ? 14 : 15, fontWeight:800, cursor:"pointer", boxShadow:`0 8px 32px rgba(201,162,42,0.45)` }}
          >
            Explore Our Products
          </button>
          <button
            onClick={() => scrollTo("about")}
            style={{ background:"transparent", color:WHITE, border:"2px solid rgba(255,255,255,0.3)", padding: isMobile ? "13px 28px" : "15px 36px", borderRadius:40, fontSize: isMobile ? 14 : 15, fontWeight:700, cursor:"pointer" }}
          >
            About Skyera
          </button>
        </div>
      </div>

      {!isMobile && (
        <div
          style={{ position:"absolute", bottom:36, left:"50%", display:"flex", flexDirection:"column", alignItems:"center", gap:8, animation:"scrollBounce 2s ease-in-out infinite", cursor:"pointer", zIndex:2 }}
          onClick={() => scrollTo("about")}
        >
          <div style={{ width:1, height:44, background:"rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:2 }}>SCROLL</span>
        </div>
      )}
    </section>
  );
}

// ── Stats Bar ──
const CounterStat = memo(({ value, label, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ textAlign:"center", opacity:inView?1:0, transform:inView?"scale(1)":"scale(0.7)", transition:`all 0.6s ease ${delay}s` }}>
      <div style={{ fontSize:48, fontWeight:900, color:GOLD2, fontFamily:"'Playfair Display', Georgia, serif", lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", letterSpacing:1.5, marginTop:6 }}>{label}</div>
    </div>
  );
});

const StatsBar = memo(() => {
  const isMobile = useIsMobile();
  return (
    <section style={{ background:NAVY, borderTop:`4px solid ${GOLD}`, padding: isMobile ? "36px 5%" : "44px 6%" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 28 : 24 }}>
        {stats.map((s,i) => <CounterStat key={i} {...s} delay={i*0.12} />)}
      </div>
    </section>
  );
});

// ── About ──
const About = memo(() => {
  const isMobile = useIsMobile();
  return (
    <section id="about" style={{ padding: isMobile ? "70px 5%" : "110px 6%", background:LIGHT }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems:"center" }}>
        <AnimatedSection delay={0}>
          <div style={{ background:`linear-gradient(145deg,${NAVY},#162d70)`, borderRadius:32, padding: isMobile ? 28 : 48, boxShadow:`0 32px 80px rgba(11,31,75,0.25)` }}>
            <div style={{ fontSize:11, fontWeight:800, color:GOLD, letterSpacing:2, marginBottom:8 }}>ABOUT US</div>
            <div style={{ fontSize: isMobile ? 26 : 34, fontWeight:900, color:WHITE, lineHeight:1.2, fontFamily:"'Playfair Display', Georgia, serif", marginBottom:20 }}>
              Skyera Pharmalab<br />Pvt. Ltd.
            </div>
            <div  style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <p style={{ fontSize:11, color:GOLD2, fontStyle:"italic", fontWeight:600, margin:0, lineHeight:1.6 }}>
                "समर्पणं सर्वसिद्धये, कर्मणि यत्र युक्तिः"
              </p>
              </div>
              
            <div style={{ width:60, height:3, background:GOLD, borderRadius:2, marginBottom:24 }} />
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.72)", lineHeight:1.9, marginBottom:28 }}>
              Skyera Pharmalab Pvt. Ltd. offers a focused portfolio of quality pharmaceutical products across key therapeutic areas including multivitamins, gastro care, anti-allergic therapy, pain management, and neuro-nutritional support.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {ABOUT_STATS.map((s,i) => (
                <div key={i} style={{ textAlign:"center", background:"rgba(255,255,255,0.05)", borderRadius:14, padding:"16px 8px", border:"1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize:24, fontWeight:900, color:GOLD2, fontFamily:"'Playfair Display', Georgia, serif" }}>{s.v}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", letterSpacing:1, marginTop:4 }}>{s.l}</div>
                </div>
              ))}
            </div>
            
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div style={{ fontSize:12, fontWeight:800, color:GOLD, letterSpacing:2, marginBottom:14 }}>OUR PROMISE</div>
          <h2 style={{ fontSize: isMobile ? 34 : 46, fontWeight:900, color:NAVY, lineHeight:1.15, fontFamily:"'Playfair Display', Georgia, serif", marginBottom:20 }}>
            Committed to<br /><span style={{ color:GOLD }}>Clinical Excellence</span>
          </h2>
          <p style={{ fontSize:15, color:"#5a6880", lineHeight:1.9, marginBottom:36 }}>
            Our state-of-the-art manufacturing partners and dedicated team continuously work to develop innovative pharmaceutical solutions that put patient well-being first.
          </p>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:12 }}>
            {ABOUT_HIGHLIGHTS.map((f,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background:WHITE, border:`1px solid ${GOLD}25`, borderRadius:14, padding:"13px 16px", boxShadow:"0 2px 12px rgba(11,31,75,0.06)" }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:`linear-gradient(135deg,${GOLD},${GOLD2})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ color:NAVY, fontSize:11, fontWeight:900 }}>✓</span>
                </div>
                <span style={{ fontSize:13, color:"#374151", fontWeight:600, lineHeight:1.4 }}>{f}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
});

// ── Skyera Advantage ──
const AdvantageCard = memo(({ feature, index }) => {
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  const c = ADVANTAGE_COLORS[index % ADVANTAGE_COLORS.length];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(48px)", transition:`opacity 0.6s ease ${index*0.08}s, transform 0.6s ease ${index*0.08}s` }}
    >
      <div style={{
        background: hov ? NAVY : WHITE,
        border: `2px solid ${hov ? NAVY : c.border}`,
        borderRadius:22,
        padding: isMobile ? "24px 20px" : "30px 28px",
        height:"100%",
        boxShadow: hov ? `0 20px 52px rgba(11,31,75,0.18)` : "0 4px 16px rgba(11,31,75,0.07)",
        transform: hov ? "translateY(-6px)" : "none",
        transition:"all 0.35s cubic-bezier(.4,0,.2,1)",
        cursor:"default",
      }}>
        <div style={{
          width:56, height:56, borderRadius:16,
          background: hov ? "rgba(201,162,42,0.15)" : c.bg,
          display:"flex", alignItems:"center", justifyContent:"center",
          marginBottom:20,
          fontSize:28,
          border: hov ? `1px solid rgba(201,162,42,0.3)` : `1px solid ${c.border}`,
          transition:"all 0.35s",
        }}>
          {feature.icon}
        </div>
        <div style={{ fontSize:17, fontWeight:800, color: hov ? WHITE : NAVY, fontFamily:"'Playfair Display', Georgia, serif", marginBottom:10, transition:"color 0.35s" }}>
          {feature.title}
        </div>
        <p style={{ fontSize:13.5, color: hov ? "rgba(255,255,255,0.72)" : "#5a6880", lineHeight:1.75, margin:0, transition:"color 0.35s" }}>
          {feature.desc}
        </p>
      </div>
    </div>
  );
});

const SkyeraAdvantage = memo(() => {
  const isMobile = useIsMobile();
  return (
    <section id="advantage" style={{ padding: isMobile ? "70px 5%" : "110px 6%", background:WHITE, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, opacity:0.025, backgroundImage:`radial-gradient(circle at 2px 2px, ${NAVY} 1px, transparent 0)`, backgroundSize:"32px 32px", pointerEvents:"none" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
        <AnimatedSection>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ fontSize:12, fontWeight:800, color:GOLD, letterSpacing:2, marginBottom:12 }}>THE SKYERA ADVANTAGE</div>
            <h2 style={{ fontSize: isMobile ? 34 : 52, fontWeight:900, color:NAVY, fontFamily:"'Playfair Display', Georgia, serif", lineHeight:1.1, marginBottom:16 }}>
              Why Choose<br /><span style={{ color:GOLD }}>Skyera Pharmalab?</span>
            </h2>
            <p style={{ fontSize:15, color:"#5a6880", maxWidth:560, margin:"0 auto", lineHeight:1.8 }}>
              Partner with a newly launched pharmaceutical marketing company that puts quality and patient care at the heart of everything we do.
            </p>
          </div>
        </AnimatedSection>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 20 : 28 }}>
          {advantageFeatures.map((f,i) => <AdvantageCard key={i} feature={f} index={i} />)}
        </div>
      </div>
    </section>
  );
});

// ── Product Card ──
const ProductCard = memo(({ p, index }) => {
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(60px)", transition:`opacity 0.6s ease ${index*0.09}s, transform 0.6s ease ${index*0.09}s` }}
    >
      <div style={{
        position:"relative", borderRadius:24, overflow:"hidden",
        background:WHITE, border:`2px solid ${hov ? p.color : "#e0e8f5"}`,
        boxShadow: hov ? `0 24px 60px ${p.color}30` : "0 4px 20px rgba(11,31,75,0.08)",
        transform: hov ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        transition:"all 0.4s cubic-bezier(.4,0,.2,1)",
        height:"100%",
      }}>
        <div style={{ height:6, background:`linear-gradient(90deg,${p.color},${p.accent})` }} />
        <div style={{ padding: isMobile ? "20px 18px" : "26px 26px 30px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
            <span style={{ background:`${p.color}15`, color:p.color, fontSize:10, fontWeight:800, padding:"4px 12px", borderRadius:20, letterSpacing:1, textTransform:"uppercase" }}>{p.badge}</span>
            <div style={{ width:44, height:44, borderRadius:12, background:`${p.color}10`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <p.Icon size={32} />
            </div>
          </div>
          <div style={{ fontSize: isMobile ? 20 : 24, fontWeight:900, color:NAVY, letterSpacing:1.2, marginBottom:4, fontFamily:"'Playfair Display', Georgia, serif" }}>{p.name}</div>
          <div style={{ fontSize:12, color:p.color, fontWeight:700, marginBottom:10, letterSpacing:0.5 }}>{p.category}</div>
          <div style={{ fontSize:12, color:"#5a6880", fontStyle:"italic", marginBottom:14, lineHeight:1.6 }}>"{p.tagline}"</div>
          <div style={{ fontSize:12.5, color:"#374151", lineHeight:1.7, fontWeight:500 }}>{p.subtitle}</div>
        </div>
      </div>
    </div>
  );
});

function Products() {
  const [filter, setFilter] = useState("All");
  const isMobile = useIsMobile();
  const filtered = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <section id="products" style={{ padding: isMobile ? "70px 5%" : "110px 6%", background:LIGHT }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign:"center", marginBottom:12 }}>
            <div style={{ fontSize:12, fontWeight:800, color:GOLD, letterSpacing:2 }}>OUR PORTFOLIO</div>
          </div>
          <h2 style={{ fontSize: isMobile ? 36 : 50, fontWeight:900, color:NAVY, textAlign:"center", fontFamily:"'Playfair Display', Georgia, serif", marginBottom:14 }}>Premium Pharma Range</h2>
          <p style={{ textAlign:"center", color:"#5a6880", fontSize:15, maxWidth:560, margin:"0 auto 36px" }}>
            Carefully formulated, clinically tested products designed to improve quality of life across key therapeutic areas.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:44 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{ padding:"8px 16px", borderRadius:30, border:"2px solid", borderColor:filter===cat ? NAVY : "#d0daea", background:filter===cat ? NAVY : "transparent", color:filter===cat ? WHITE : "#5a6880", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.25s" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(300px,1fr))", gap: isMobile ? 20 : 28 }}>
          {filtered.map((p,i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
        <AnimatedSection delay={0.2}>
          <div style={{ marginTop:48, padding:"18px 24px", background:"#fff8e1", border:`1px solid ${GOLD}40`, borderRadius:14, textAlign:"center" }}>
            <span style={{ fontSize:13, color:"#7a6020", lineHeight:1.7 }}>⚕️ <strong>Medical Disclaimer:</strong> The above products are for informational purposes only and should be used under medical supervision.</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ── Marquee ──
const MarqueeStrip = memo(() => (
  <div style={{ background:GOLD, padding:"14px 0", overflow:"hidden", whiteSpace:"nowrap", borderTop:`2px solid ${GOLD2}`, borderBottom:`2px solid ${GOLD2}` }}>
    <div style={{ display:"inline-block", animation:"marqueeScroll 22s linear infinite" }}>
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item,i) => (
        <span key={i} style={{ fontSize:12, fontWeight:800, color:NAVY, letterSpacing:1.5, marginRight:36, textTransform:"uppercase" }}>◆ {item}</span>
      ))}
    </div>
  </div>
));

// ── Contact ──
const IconBox = memo(({ icon, title, children }) => (
  <div style={{ display:"flex", gap:16, marginBottom:22 }}>
    <div style={{ width:48, height:48, borderRadius:14, flexShrink:0, background:`linear-gradient(135deg,${NAVY},#1a3a8f)`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 6px 20px rgba(11,31,75,0.18)` }}>{icon}</div>
    <div>
      <div style={{ fontSize:11, fontWeight:800, color:GOLD, letterSpacing:1, marginBottom:4 }}>{title}</div>
      {children}
    </div>
  </div>
));

const INPUT_STYLE = {
  width:"100%", padding:"13px 16px", borderRadius:12,
  border:"1.5px solid #d0daea", fontSize:14, color:NAVY,
  background:"#fafcff", outline:"none",
  transition:"border 0.2s", fontFamily:"inherit",
};

const INITIAL_FORM = { name:"", email:"", phone:"", company:"", message:"" };

function Contact({ setPage, onSuccess }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isMobile = useIsMobile();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  }, [error]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError("Please fill all required fields (*)"); return; }
    setLoading(true); setError("");
    try {
      await addDoc(collection(db, "enquiries"), { ...form, submittedAt: serverTimestamp(), status:"new" });
      setForm(INITIAL_FORM);
      onSuccess();
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [form, onSuccess]);

  return (
    <section id="contact" style={{ padding: isMobile ? "70px 5%" : "110px 6%", background:LIGHT }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80 }}>
        <AnimatedSection>
          <div style={{ fontSize:12, fontWeight:800, color:GOLD, letterSpacing:2, marginBottom:14 }}>GET IN TOUCH</div>
          <h2 style={{ fontSize: isMobile ? 34 : 46, fontWeight:900, color:NAVY, lineHeight:1.2, fontFamily:"'Playfair Display', Georgia, serif", marginBottom:20 }}>
            Let's Build a<br /><span style={{ color:GOLD }}>Healthier Future</span>
          </h2>
          <p style={{ color:"#5a6880", fontSize:15, lineHeight:1.9, marginBottom:36 }}>
            Partner with Skyera Pharmalab for quality pharmaceutical solutions. Whether you're a healthcare professional, distributor, or investor — we'd love to hear from you.
          </p>
          <IconBox icon={<LocationIcon size={22} color={WHITE}/>} title="Corporate Office">
            <div style={{ fontSize:13.5, color:"#374151", lineHeight:1.6 }}>Flat No. A11, Kumar Park, Bibewadi,</div>
            <div style={{ fontSize:13.5, color:"#374151", lineHeight:1.6 }}>Bibewadi Kondwa Road, Pune – 411037</div>
          </IconBox>
          <IconBox icon={<CallIcon size={22} color={WHITE}/>} title="Call Us">
            <a href={`tel:${PHONE_RAW}`} style={{ fontSize:13.5, color:NAVY, textDecoration:"none", fontWeight:600 }}>{PHONE}</a>
          </IconBox>
          <IconBox icon={<MessageIcon size={22} color={WHITE} strokeWidth={2}/>} title="WhatsApp">
            <a href={`https://wa.me/${WHATSAPP_RAW}`} target="_blank" rel="noopener noreferrer" style={{ fontSize:13.5, color:"#25D366", textDecoration:"none", fontWeight:600 }}>Chat on WhatsApp</a>
          </IconBox>
          <IconBox icon={<MailIcon size={22} color={WHITE}/>} title="Email Us">
            <div style={{ fontSize:13.5, color:"#374151", lineHeight:1.6 }}>{EMAIL}</div>
          </IconBox>
          <IconBox icon={<BuildingIcon size={22} color={WHITE}/>} title="Company Identification">
            <div style={{ fontSize:13.5, color:"#374151", lineHeight:1.6 }}>CIN: U46497PN2025PTC247443</div>
          </IconBox>
          <div style={{ marginTop:12 }}>
            <button onClick={() => setPage("privacy")} style={{ background:"none", border:"none", cursor:"pointer", color:GOLD, fontWeight:700, fontSize:13, padding:0, textDecoration:"underline" }}>
              Privacy Policy
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div style={{ background:WHITE, borderRadius:28, padding: isMobile ? "28px 22px" : "44px 40px", boxShadow:"0 20px 72px rgba(11,31,75,0.1)", border:`1px solid ${GOLD}20` }}>
            <div style={{ fontSize:20, fontWeight:800, color:NAVY, marginBottom:8 }}>Send an Enquiry</div>
            <div style={{ width:40, height:3, background:GOLD, borderRadius:2, marginBottom:24 }} />
            {error && <div style={{ color:"red", marginBottom:16, fontSize:14 }}>{error}</div>}
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:16 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:6, display:"block" }}>FULL NAME *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required style={INPUT_STYLE} placeholder="Your full name"/>
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:6, display:"block" }}>EMAIL *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required style={INPUT_STYLE} placeholder="your@email.com"/>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:16, marginTop:16 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:6, display:"block" }}>PHONE</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} style={INPUT_STYLE} placeholder="+91 XXXXXXXXXX"/>
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:6, display:"block" }}>ORGANISATION</label>
                  <input type="text" name="company" value={form.company} onChange={handleChange} style={INPUT_STYLE} placeholder="Company / Hospital / Clinic"/>
                </div>
              </div>
              <div style={{ marginTop:16 }}>
                <label style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:6, display:"block" }}>MESSAGE *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} style={{ ...INPUT_STYLE, resize:"vertical" }} placeholder="How can we help you?"/>
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ marginTop:24, width:"100%", padding:"16px", borderRadius:14, border:"none", background: loading ? "#94a3b8" : `linear-gradient(135deg,${NAVY},#1a3a8f)`, color:WHITE, fontSize:16, fontWeight:800, cursor: loading ? "not-allowed" : "pointer", fontFamily:"inherit" }}
              >
                {loading ? "Sending Enquiry..." : "Send Enquiry →"}
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ── Footer ──
const Footer = memo(({ scrollTo, setPage }) => {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background:"#060F2A", padding: isMobile ? "52px 5% 0" : "72px 6% 0" }}>
      <div style={{ maxWidth:1200, margin:"0" }}>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 36 : 48, paddingBottom:48, borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ marginBottom:-10 }}>
              <SkyeraLogo height={120} />
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.9, maxWidth:280 }}>
              Skyera Pharmalab Pvt. Ltd. offers a focused portfolio of quality pharmaceutical products across key therapeutic areas. Committed to innovation, quality, and accessibility.
            </p>
            <div style={{ marginTop:16, padding:"10px 14px", background:"rgba(201,162,42,0.06)", borderLeft:`3px solid ${GOLD}`, borderRadius:"0 8px 8px 0" }}>
              <p style={{ fontSize:11, color:GOLD2, fontStyle:"italic", fontWeight:600, margin:0, lineHeight:1.6 }}>
                "समर्पणं सर्वसिद्धये, कर्मणि यत्र युक्तिः"
              </p>
            </div>
          </div>
          {!isMobile && (
            <div>
              <div style={{ fontSize:11, fontWeight:800, color:GOLD, letterSpacing:2, marginBottom:18 }}>QUICK LINKS</div>
              {NAV_LINKS.map(l => (
                <div key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ fontSize:14, color:"rgba(255,255,255,0.6)", marginBottom:12, cursor:"pointer" }}>{l}</div>
              ))}
              <div onClick={() => setPage("privacy")} style={{ fontSize:14, color:"rgba(255,255,255,0.6)", marginBottom:12, cursor:"pointer" }}>Privacy Policy</div>
            </div>
          )}
          <div>
            <div style={{ fontSize:11, fontWeight:800, color:GOLD, letterSpacing:2, marginBottom:18 }}>CONTACT</div>
            <div style={{ display:"flex", gap:10, marginBottom:16, alignItems:"flex-start" }}>
              <LocationIcon size={16} color={GOLD}/>
              <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.6)", lineHeight:1.6 }}>Flat No. A11, Kumar Park, Bibewadi,<br/>Pune – 411037</div>
            </div>
            <div style={{ display:"flex", gap:10, marginBottom:12, alignItems:"center" }}>
              <MailIcon size={16} color={GOLD}/>
              <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.6)" }}>{EMAIL}</div>
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <CallIcon size={16} color={GOLD}/>
              <a href={`tel:${PHONE_RAW}`} style={{ fontSize:12.5, color:GOLD, textDecoration:"none", fontWeight:600 }}>{PHONE}</a>
            </div>
          </div>
        </div>
        <div style={{ padding:"20px 0", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:8 }}>
          <span style={{ color:"rgba(255,255,255,0.35)", fontSize:12 }}>© 2025 Skyera Pharmalab Pvt. Ltd. All rights reserved.</span>
          <button onClick={() => setPage("privacy")} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.4)", fontSize:12, textDecoration:"underline", padding:0, fontFamily:"inherit" }}>Privacy Policy</button>
        </div>
      </div>
    </footer>
  );
});

// ── Privacy Policy ──
function PrivacyPolicy({ setPage }) {
  const isMobile = useIsMobile();
  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, []);

  const sections = [
    { title:"1. Information We Collect", content:`When you submit an enquiry through our website, we collect the following personal information:\n• Full name\n• Email address\n• Phone number (optional)\n• Organisation / company name (optional)\n• Message content\n\nWe do not collect any sensitive personal data such as financial information, health records, or government identification numbers through this website.` },
    { title:"2. How We Use Your Information", content:`We use the information you provide solely for the following purposes:\n• To respond to your enquiries and provide requested information about our products\n• To contact you regarding business opportunities or distribution partnerships\n• To improve our products and services based on feedback\n• To comply with legal and regulatory obligations` },
    { title:"3. Data Storage & Security", content:`Your enquiry data is securely stored using Google Firebase Firestore, a cloud platform with industry-standard security measures. We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.\n\nData is retained for a maximum period of 3 years, after which it is permanently deleted.` },
    { title:"4. Sharing of Information", content:`We do not sell, trade, or rent your personal information to third parties. Your information may be shared only in the following limited circumstances:\n• With trusted service providers who assist us in operating our website\n• When required by law, court order, or governmental authority\n• To protect the rights, property, or safety of Skyera Pharmalab Pvt. Ltd.` },
    { title:"5. Your Rights Under DPDP Act 2023", content:`Under India's Digital Personal Data Protection (DPDP) Act, 2023, you have the following rights:\n• Right to Access: Request a copy of the personal data we hold about you\n• Right to Correction: Request correction of inaccurate or incomplete personal data\n• Right to Erasure: Request deletion of your personal data\n• Right to Grievance Redressal: Lodge a complaint with our Data Protection Officer\n\nTo exercise any of these rights, please contact us at ${EMAIL}.` },
    { title:"6. Medical Disclaimer", content:`All product information displayed on this website is intended for informational purposes only and is directed at licensed healthcare professionals, distributors, and industry partners. All pharmaceutical products are to be used only under the supervision of a qualified healthcare professional.` },
    { title:"7. Contact Us", content:`Skyera Pharmalab Pvt. Ltd.\nFlat No. A11, Kumar Park, Bibewadi,\nBibewadi Kondwa Road, Pune – 411037, Maharashtra, India\n\nEmail: ${EMAIL}\nPhone: ${PHONE}\nCIN: U46497PN2025PTC247443` },
  ];

  return (
    <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", background:LIGHT, minHeight:"100vh" }}>
      <div style={{ background:`linear-gradient(160deg,${NAVY},#162d70)`, padding: isMobile ? "90px 5% 50px" : "100px 6% 60px" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <button onClick={() => setPage("home")} style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:WHITE, padding:"8px 18px", borderRadius:30, fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:28, fontFamily:"inherit" }}>
            ← Back to Website
          </button>
          <div style={{ fontSize:11, fontWeight:800, color:GOLD, letterSpacing:2, marginBottom:12 }}>LEGAL</div>
          <h1 style={{ fontSize: isMobile ? 32 : 48, fontWeight:900, color:WHITE, fontFamily:"'Playfair Display', Georgia, serif", lineHeight:1.1, marginBottom:16 }}>Privacy Policy</h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", lineHeight:1.7, maxWidth:620 }}>
            Skyera Pharmalab Pvt. Ltd. is committed to protecting your personal data in accordance with the Digital Personal Data Protection (DPDP) Act, 2023.
          </p>
        </div>
      </div>
      <div style={{ maxWidth:860, margin:"0 auto", padding: isMobile ? "40px 5% 60px" : "60px 6% 80px" }}>
        {sections.map((sec,i) => (
          <div key={i} style={{ marginBottom:40, background:WHITE, borderRadius:20, padding: isMobile ? "24px 22px" : "32px 36px", boxShadow:"0 4px 20px rgba(11,31,75,0.06)", border:`1px solid ${GOLD}15` }}>
            <h2 style={{ fontSize: isMobile ? 17 : 20, fontWeight:800, color:NAVY, marginBottom:14, fontFamily:"'Playfair Display', Georgia, serif" }}>{sec.title}</h2>
            <div style={{ width:36, height:2, background:GOLD, borderRadius:2, marginBottom:16 }} />
            <p style={{ fontSize:14, color:"#374151", lineHeight:1.9, whiteSpace:"pre-line" }}>{sec.content}</p>
          </div>
        ))}
        <div style={{ textAlign:"center", padding:"32px 24px", background:`linear-gradient(135deg,${NAVY},#162d70)`, borderRadius:24 }}>
          <div style={{ fontSize:18, fontWeight:800, color:WHITE, marginBottom:8, fontFamily:"'Playfair Display', Georgia, serif" }}>Have Questions?</div>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.65)", marginBottom:20 }}>Our team is here to help with any privacy-related concerns.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={`mailto:${EMAIL}`} style={{ background:`linear-gradient(135deg,${GOLD},${GOLD2})`, color:NAVY, padding:"11px 24px", borderRadius:30, fontSize:13, fontWeight:800, textDecoration:"none" }}>Email Us</a>
            <button onClick={() => setPage("home")} style={{ background:"rgba(255,255,255,0.1)", color:WHITE, border:"1px solid rgba(255,255,255,0.2)", padding:"11px 24px", borderRadius:30, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── App ──
export default function App() {
  const [page, setPage] = useState("home");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:"smooth" });
  }, []);

  const handleSuccess = useCallback(() => setShowSuccessModal(true), []);
  const handleCloseModal = useCallback(() => setShowSuccessModal(false), []);

  return (
    <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        button { font-family: inherit; }
        input, textarea { font-family: inherit; }
        input:focus, textarea:focus { border-color: #C9A22A !important; box-shadow: 0 0 0 3px rgba(201,162,42,0.15); }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes goldShimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes taglineSlide { 0%{opacity:0;transform:translateY(20px)} 15%{opacity:1;transform:translateY(0)} 85%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-20px)} }
        @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0) translateX(-50%)} 50%{transform:translateY(8px) translateX(-50%)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes popIn { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
        @keyframes circleIn { from{stroke-dashoffset:264} to{stroke-dashoffset:0} }
        @keyframes checkIn { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
        @keyframes progressBar { from{width:100%} to{width:0%} }
      `}</style>

      {showSuccessModal && <SuccessModal onClose={handleCloseModal}/>}

      {page === "privacy" ? (
        <PrivacyPolicy setPage={setPage}/>
      ) : (
        <>
          <Nav scrollTo={scrollTo} setPage={setPage}/>
          <Hero scrollTo={scrollTo}/>
          <StatsBar/>
          <About/>
          <MarqueeStrip/>
          <SkyeraAdvantage/>
          <Products/>
          <Contact setPage={setPage} onSuccess={handleSuccess}/>
          <Footer scrollTo={scrollTo} setPage={setPage}/>
        </>
      )}
      <WhatsAppButton/>
    </div>
  );
}