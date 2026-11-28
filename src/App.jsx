import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Command,
  Search,
  Cpu,
  Shield,
  Database,
  ArrowUpRight,
  Download,
  FileText,
  Mail,
  Send,
  CheckCircle2,
  GitBranch,
  Globe,
  GraduationCap,
  Award,
  BookOpen,
  Menu,
  X,
  Play,
  Activity,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import {
  PROFILE,
  ABOUT,
  ARCHITECTURE_NODES,
  EDUCATION,
  SKILLS,
  PROJECTS,
  EXPERIENCE,
  CERTIFICATIONS,
  ACHIEVEMENTS,
} from './data/portfolioData';
import ThreadPoolSimulator from './components/ThreadPoolSimulator';

const SECTIONS = [
  { id: 'overview', label: 'Overview', shortcut: 'G H' },
  { id: 'architecture', label: 'System Topology', shortcut: 'G A' },
  { id: 'projects', label: 'Projects & Case Study', shortcut: 'G P' },
  { id: 'pdc-lab', label: 'Concurrency Lab', shortcut: 'G L' },
  { id: 'experience', label: 'Experience', shortcut: 'G E' },
  { id: 'credentials', label: 'Credentials & CV', shortcut: 'G C' },
  { id: 'contact', label: 'Contact', shortcut: 'G M' },
];

const NODE_ICONS = [Globe, Shield, Cpu, Database];

const PHOTO_CANDIDATES = [
  '/profile.jpg',
  '/profile.jpg.jpg',
  '/profile.jpeg',
  '/profile.png',
];

const HACKERRANK_CERT_URLS = {
  restApiIntermediate: 'https://www.hackerrank.com/certificates/eca66d133309',
  sqlIntermediate: 'https://www.hackerrank.com/certificates/14746e1575a6',
  problemSolvingIntermediate: 'https://www.hackerrank.com/certificates/6395ea977a2e',
  javaBasic: 'https://www.hackerrank.com/certificates/84cd2c6e2563',
};

function getCertificationVerifyUrl(cert) {
  if (cert?.url) return cert.url;
  const key = `${cert?.id || ''} ${cert?.title || ''}`.toLowerCase();
  if (key.includes('rest') && key.includes('api')) {
    return HACKERRANK_CERT_URLS.restApiIntermediate;
  }
  if (key.includes('sql')) {
    return HACKERRANK_CERT_URLS.sqlIntermediate;
  }
  if (key.includes('problem') && key.includes('solving')) {
    return HACKERRANK_CERT_URLS.problemSolvingIntermediate;
  }
  if (key.includes('java')) {
    return HACKERRANK_CERT_URLS.javaBasic;
  }
  return '#credentials';
}

const API_TRACE_STEPS = [
  { step: '1. Edge Ingress & CORS Check', service: 'Vercel Edge / API Gateway', latency: '4 ms', status: '200 OK' },
  { step: '2. Stateless JWT Signature & RBAC', service: 'Spring Security FilterChain', latency: '7 ms', status: 'AUTHORIZED' },
  { step: '3. DTO Validation & Service Logic', service: 'Spring Boot Worker Thread', latency: '9 ms', status: 'VALIDATED' },
  { step: '4. ACID Commit & Indexed Lookup', service: 'Aiven Cloud MySQL', latency: '14 ms', status: '201 CREATED' },
];

export default function App() {
  const [activeNav, setActiveNav] = useState('overview');
  const [selectedNodeId, setSelectedNodeId] = useState(ARCHITECTURE_NODES[0].id);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [traceRunning, setTraceRunning] = useState(false);
  const [traceStep, setTraceStep] = useState(API_TRACE_STEPS.length);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sentNotice, setSentNotice] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0.05 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!traceRunning) return;
    if (traceStep >= API_TRACE_STEPS.length) {
      setTraceRunning(false);
      return;
    }
    const timer = setTimeout(() => {
      setTraceStep((prev) => prev + 1);
    }, 420);
    return () => clearTimeout(timer);
  }, [traceRunning, traceStep]);

  const triggerTrace = () => {
    setTraceStep(0);
    setTraceRunning(true);
  };

  const jumpToSection = (id) => {
    setActiveNav(id);
    setCmdOpen(false);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePhotoError = () => {
    setPhotoIdx((prev) => prev + 1);
  };

  const currentPhotoSrc = PHOTO_CANDIDATES[photoIdx] || null;

  const selectedNode =
    ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) || ARCHITECTURE_NODES[0];
  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];

  const domains = ['All', ...new Set(PROJECTS.map((p) => p.domain))];
  const visibleProjects =
    selectedDomain === 'All' ? PROJECTS : PROJECTS.filter((p) => p.domain === selectedDomain);

  const filteredCommands = SECTIONS.filter((s) =>
    s.label.toLowerCase().includes(cmdQuery.toLowerCase())
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = PROFILE.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleContact = (e) => {
    e.preventDefault();
    setSentNotice(true);
    const subject = encodeURIComponent(`Software Engineering Inquiry — ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 bg-precision-grid relative selection:bg-sky-400/20 selection:text-sky-200">
      {/* Top Scroll Progress Line */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 origin-left z-50"
      /> 
      {/* Sticky Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050811]/85 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="#overview" className="flex items-center gap-3 shrink-0">
            <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center font-mono text-xs font-bold text-sky-400">
              {PROFILE.initials}
            </span>
            <div className="leading-tight">
              <span className="font-display font-bold text-sm text-white block">
                {PROFILE.fullName}
              </span>
              <span className="font-mono text-[10px] text-slate-400 tracking-wider uppercase">
                {PROFILE.roleTitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation with Scroll-Spy Pill */}
          <nav aria-label="Primary sections" className="hidden lg:flex items-center gap-1">
            {SECTIONS.map((sec) => {
              const isActive = activeNav === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => jumpToSection(sec.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-slate-800/95 border border-slate-700/80 -z-10"
                    />
                  )}
                  {sec.label}
                </button>
              );
            })}
          </nav>

          {/* Command Palette & Mobile Drawer Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition cursor-pointer"
              title="Open Command Palette (Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Command</span>
              <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-slate-950 text-slate-400 border border-slate-800">
                Ctrl K
              </kbd>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#080d1a] border-b border-slate-800 px-4 py-3 space-y-1"
            >
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => jumpToSection(sec.id)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  {sec.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Command Palette Modal (Ctrl+K) */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCmdOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-[#0b1120] border border-slate-700/80 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
                <Search className="w-4 h-4 text-sky-400" />
                <input
                  autoFocus
                  type="text"
                  value={cmdQuery}
                  onChange={(e) => setCmdQuery(e.target.value)}
                  placeholder="Jump to section (Projects, Topology, Concurrency Lab, CV)..."
                  className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  onClick={() => setCmdOpen(false)}
                  className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
                >
                  ESC
                </button>
              </div>
              <div className="p-2 max-h-72 overflow-y-auto space-y-1">
                {filteredCommands.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => jumpToSection(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-slate-800/80 transition cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <span className="text-[11px] font-mono text-slate-500">{item.shortcut}</span>
                  </button>
                ))}
                <a
                  href={PROFILE.resumePath}
                  download="Muhammad_Akram_Resume.pdf"
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-sky-300 hover:bg-slate-800/80 transition"
                >
                  <span>Download Resume (PDF)</span>
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-12 space-y-14 md:space-y-16">
        {/* 01–04. HERO WITH LARGE PORTRAIT, BIOGRAPHY, CAREER OBJECTIVE & EDUCATION */}
        <section id="overview" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Introduction Column */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {PROFILE.statusText}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white leading-[1.08]">
                {PROFILE.fullName}
              </h1>

              <p className="text-base sm:text-xl font-mono text-sky-400">
                {PROFILE.headline}
              </p>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {PROFILE.heroSummary}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => jumpToSection('projects')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-semibold text-sm transition cursor-pointer"
                >
                  Explore Systems &amp; Case Study
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <a
                  href={PROFILE.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl enterprise-card text-sm font-medium text-white"
                >
                  <FileText className="w-4 h-4 text-sky-400" />
                  Open CV (PDF)
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl enterprise-card text-sm font-medium text-slate-300"
                >
                  <GitBranch className="w-4 h-4 text-slate-400" />
                  GitHub
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl enterprise-card text-sm font-medium text-slate-300"
                >
                  <Globe className="w-4 h-4 text-slate-400" />
                  LinkedIn
                </a>
              </div>

              {/* Compact Key Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
                <div className="enterprise-card rounded-xl p-3.5">
                  <div className="font-display font-bold text-xl text-white">3.54</div>
                  <div className="font-mono text-[11px] text-slate-400">CGPA / 4.00</div>
                </div>
                <div className="enterprise-card rounded-xl p-3.5">
                  <div className="font-display font-bold text-xl text-sky-400">10Pearls</div>
                  <div className="font-mono text-[11px] text-slate-400">SHINE Alumni</div>
                </div>
                <div className="enterprise-card rounded-xl p-3.5">
                  <div className="font-display font-bold text-xl text-emerald-400">5+</div>
                  <div className="font-mono text-[11px] text-slate-400">Verified Certs</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Prominent Executive Portrait Card */}
            <motion.aside
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-5"
            >
              <div className="enterprise-card rounded-3xl p-3.5 border border-slate-700/70 shadow-2xl relative group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-800">
                  {currentPhotoSrc ? (
                    <img
                      src={currentPhotoSrc}
                      alt="Muhammad Akram — Software Engineer with 10Pearls SHINE Certificate"
                      onError={handlePhotoError}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 to-slate-950">
                      <div className="w-20 h-20 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center font-display font-bold text-2xl text-sky-400 mb-3">
                        MA
                      </div>
                      <p className="text-xs font-mono text-slate-400">
                        Ensure photo is saved as <span className="text-sky-400">public/profile.jpg</span>
                      </p>
                    </div>
                  )}

                  {/* Subtle Bottom Executive Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050811] via-[#050811]/85 to-transparent p-5 pt-14">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-display font-bold text-white text-base">
                          {PROFILE.fullName}
                        </p>
                        <p className="font-mono text-xs text-sky-300">
                          10Pearls SHINE Graduate • BSSE
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-400/15 border border-sky-400/30 text-[11px] font-mono text-sky-300">
                        <Sparkles className="w-3 h-3" /> Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div> 
          {/* About Me, Career Objective & Education Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-7 enterprise-card rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-xs text-sky-400 uppercase tracking-wider">
                  About &amp; Career Objective
                </span>
                <h2 className="text-2xl font-display font-bold text-white">Engineering Philosophy</h2>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {ABOUT.biography}
              </p>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90">
                <span className="font-mono text-[11px] text-sky-400 uppercase block mb-1">
                  Career Objective
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">{ABOUT.objective}</p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {ABOUT.principles.map((p) => (
                  <li key={p} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 enterprise-card rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sky-400" />
                <h2 className="text-2xl font-display font-bold text-white">Education</h2>
              </div>
              <div className="space-y-5">
                {EDUCATION.map((ed) => (
                  <div key={ed.degree} className="border-l border-slate-700 pl-4 space-y-1">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-slate-400">{ed.period}</span>
                      <span className="text-sky-400 font-semibold">{ed.metric}</span>
                    </div>
                    <h3 className="font-display font-bold text-white text-base">{ed.degree}</h3>
                    <p className="text-xs text-slate-400">{ed.institution}</p>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">{ed.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE DISTRIBUTED SYSTEM TOPOLOGY + LIVE REQUEST TRACER */}
        <section id="architecture" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs text-sky-400 uppercase tracking-wider">
                System Architecture Blueprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Interactive Full-Stack &amp; Distributed Topology
              </h2>
            </div>

            <button
              onClick={triggerTrace}
              disabled={traceRunning}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-sky-400/40 text-xs font-mono text-sky-300 transition cursor-pointer self-start sm:self-auto"
            >
              <Play className="w-3.5 h-3.5" />
              {traceRunning ? 'Tracing Request...' : 'Simulate POST /api/v1/contacts'}
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {ARCHITECTURE_NODES.map((node, idx) => {
              const Icon = NODE_ICONS[idx % NODE_ICONS.length];
              const active = node.id === selectedNode.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`text-left p-4 rounded-xl border transition cursor-pointer ${
                    active
                      ? 'bg-sky-950/35 border-sky-400/70 text-white'
                      : 'enterprise-card text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${active ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span className="font-mono text-[10px] text-slate-400">TIER 0{idx + 1}</span>
                  </div>
                  <div className="font-display font-bold text-sm">{node.label}</div>
                  <div className="font-mono text-[11px] text-slate-400 mt-0.5">{node.layer}</div>
                </button>
              );
            })}
          </div>

          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="enterprise-card rounded-2xl p-6 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <span className="font-mono text-xs text-sky-400">{selectedNode.tech}</span>
              <h3 className="text-xl font-display font-bold text-white">{selectedNode.label}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedNode.summary}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <span className="font-mono text-xs text-amber-300 uppercase">
                Engineering Trade-Off
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedNode.tradeoff}</p>
            </div>
          </motion.div>

          {/* Distributed Request Telemetry Strip */}
          <div className="enterprise-card rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                END-TO-END REQUEST PIPELINE TELEMETRY
              </span>
              <span className="text-emerald-400">Total Roundtrip: 34 ms</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {API_TRACE_STEPS.map((item, idx) => {
                const done = idx < traceStep;
                return (
                  <div
                    key={item.step}
                    className={`p-3 rounded-xl border text-xs font-mono transition ${
                      done
                        ? 'bg-slate-950/90 border-emerald-500/35 text-slate-200'
                        : 'bg-slate-950/40 border-slate-800/60 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={done ? 'text-sky-400' : 'text-slate-600'}>{item.latency}</span>
                      <span className={done ? 'text-emerald-400' : 'text-slate-600'}>{item.status}</span>
                    </div>
                    <div className="font-semibold mt-1 truncate">{item.step}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{item.service}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 05. TECHNICAL SKILLS */}
        <section id="skills" className="space-y-5">
          <div className="space-y-1">
            <span className="font-mono text-xs text-sky-400 uppercase tracking-wider">
              Technical Competencies
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Core Engineering Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((col) => (
              <div key={col.group} className="enterprise-card rounded-2xl p-5 space-y-3">
                <h3 className="font-mono text-xs font-semibold text-sky-300 uppercase tracking-wider">
                  {col.group}
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section> 
        {/* 06 & 07. PROJECTS PORTFOLIO + FEATURED CASE STUDY */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs text-sky-400 uppercase tracking-wider">
                Systems &amp; Architectural Case Study
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Selected Engineering Work
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {domains.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDomain(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                    selectedDomain === d
                      ? 'bg-sky-400 text-slate-950 font-semibold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleProjects.map((proj) => (
              <article
                key={proj.id}
                className="enterprise-card rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-sky-400">{proj.domain}</span>
                    {proj.featured && (
                      <span className="text-amber-300">FEATURED CASE STUDY</span>
                    )}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">{proj.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-white">Problem:</strong> {proj.problem}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-white">Solution:</strong> {proj.solution}
                  </p>
                  <p className="text-xs font-mono text-emerald-300/90 pt-1">{proj.impact}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-400 hover:underline inline-flex items-center gap-1"
                    >
                      GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white inline-flex items-center gap-1"
                    >
                      Repository / Demo <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 07. Featured Project Case Study Breakdown */}
          <div className="enterprise-card rounded-2xl p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-xs text-sky-400 uppercase">
                  Case Study Deep-Dive
                </span>
                <h3 className="text-xl font-display font-bold text-white">
                  {featuredProject.title}
                </h3>
              </div>
              <span className="font-mono text-xs text-slate-400">
                {featuredProject.caseStudy.role}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <div className="font-mono text-xs text-sky-400">Engineering Process</div>
                <p className="text-slate-300 leading-relaxed">{featuredProject.caseStudy.process}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <div className="font-mono text-xs text-sky-400">Implementation Choices</div>
                <p className="text-slate-300 leading-relaxed">{featuredProject.caseStudy.choices}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <div className="font-mono text-xs text-amber-300">Challenges Resolved</div>
                <p className="text-slate-300 leading-relaxed">{featuredProject.caseStudy.challenges}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <div className="font-mono text-xs text-emerald-400">Production Outcome</div>
                <p className="text-slate-300 leading-relaxed">{featuredProject.caseStudy.outcome}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PARALLEL & DISTRIBUTED COMPUTING CONCURRENCY SIMULATOR */}
        <section id="pdc-lab" className="space-y-5">
          <div className="space-y-1">
            <span className="font-mono text-xs text-sky-400 uppercase tracking-wider">
              Parallel &amp; Distributed Computing Lab
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Thread-Pool Execution &amp; Speedup Simulator
            </h2>
          </div>
          <ThreadPoolSimulator />
        </section>

        {/* 08. EXPERIENCE / TRAINING */}
        <section id="experience" className="space-y-5">
          <div className="space-y-1">
            <span className="font-mono text-xs text-sky-400 uppercase tracking-wider">
              Industry &amp; Practical Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Experience &amp; Internships
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EXPERIENCE.map((item) => (
              <div key={item.org + item.period} className="enterprise-card rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sky-400 font-semibold">{item.org}</span>
                  <span className="text-slate-400">{item.period}</span>
                </div>
                <h3 className="font-display font-bold text-white text-base">{item.role}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 09. CERTIFICATIONS, 10. ACHIEVEMENTS & 11. RESUME / CV */}
        <section id="credentials" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 enterprise-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl font-display font-bold text-white">Certifications &amp; Courses</h2>
            </div>
            <ul className="divide-y divide-slate-800/80">
              {CERTIFICATIONS.map((c) => {
                const verifyHref = getCertificationVerifyUrl(c);
                const isExternal = verifyHref.startsWith('http');
                return (
                  <li key={c.title} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">{c.title}</p>
                      <p className="text-xs font-mono text-slate-400">
                        {c.issuer} • {c.date}
                      </p>
                    </div>
                    <a
                      href={verifyHref}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noreferrer' : undefined}
                      className="text-xs font-mono text-sky-400 hover:underline shrink-0"
                    >
                      Verify
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="enterprise-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-300" />
                <h2 className="text-xl font-display font-bold text-white">Achievements &amp; Highlights</h2>
              </div>
              <ul className="space-y-3">
                {ACHIEVEMENTS.map((a) => (
                  <li key={a.title} className="text-xs sm:text-sm space-y-0.5">
                    <div className="font-semibold text-white">{a.title}</div>
                    <div className="text-slate-400 leading-relaxed">{a.detail}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 11. Resume / CV */}
            <div className="enterprise-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-sky-400 uppercase">Curriculum Vitae</span>
                <h3 className="font-display font-bold text-white text-lg">Muhammad_Akram_Resume.pdf</h3>
                <p className="text-xs text-slate-400">View online or download direct PDF copy</p>
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href={PROFILE.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white hover:border-sky-400"
                >
                  View
                </a>
                <a
                  href={PROFILE.resumePath}
                  download="Muhammad_Akram_Resume.pdf"
                  className="px-4 py-2 rounded-xl bg-sky-400 text-slate-950 text-xs font-semibold hover:bg-sky-300 inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 12 & 13. PROFILES & CONTACT SECTION */}
        <section id="contact" className="enterprise-card rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs text-sky-400 uppercase tracking-wider">
              Direct Connection
            </span>
            <h2 className="text-2xl font-display font-bold text-white">Get in Touch</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Available for full-time software engineering opportunities, backend roles, and technical discussions.
            </p>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-2 text-sky-400 hover:underline"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{PROFILE.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-[11px] text-slate-200 transition cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sky-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-4 pt-1 text-slate-300">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-sky-400">
                  GitHub
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-sky-400">
                  LinkedIn
                </a>
                <a href={PROFILE.leetcode} target="_blank" rel="noreferrer" className="hover:text-sky-400">
                  LeetCode
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleContact} className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your Name"
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-sky-400 focus:outline-none text-sm text-white"
              />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your Email"
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-sky-400 focus:outline-none text-sm text-white"
              />
            </div>
            <textarea
              rows="3"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Message regarding role, internship, or project..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-sky-400 focus:outline-none text-sm text-white"
            />
            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-semibold text-sm transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Compose Email
              </button>
              {sentNotice && (
                <span className="text-xs font-mono text-emerald-400">
                  Mail client opened for {PROFILE.email}
                </span>
              )}
            </div>
          </form>
        </section>
      </main>

      {/* 14. NAVIGATION & FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#04070f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            {PROFILE.fullName} • Software Engineering Portfolio
          </div>
          <div className="flex items-center gap-5">
            <a href="#overview" className="hover:text-white">Overview</a>
            <a href="#architecture" className="hover:text-white">Topology</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}