import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Download, GraduationCap, Award, Shield, Code, Server, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import MatrixBackground from '@/components/MatrixBackground';
import ScanlineEffect from '@/components/ScanlineEffect';
import GlitchText from '@/components/GlitchText';
import BackToTop from '@/components/BackToTop';
import ThemeToggle from '@/components/ThemeToggle';
import SkillBar from '@/components/SkillBar';
import CommandPalette from '@/components/CommandPalette';

const education = [
  {
    period: 'Present',
    title: 'Cambridge Assessment International Education (CAIE)',
    description: 'Currently pursuing IGCSE/O-Level studies with focus on Computer Science, Mathematics, and Sciences.',
    status: 'IN_PROGRESS',
  },
];

const certifications = [
  { name: 'Security Certifications', status: 'PLANNED', note: 'Targeting CompTIA Security+ and CEH' },
  { name: 'Cloud & DevOps', status: 'PLANNED', note: 'AWS / Azure fundamentals' },
];

const skills = [
  { skill: 'Python', level: 95 },
  { skill: 'Cybersecurity', level: 85 },
  { skill: 'Linux / DevOps', level: 90 },
  { skill: 'Encryption', level: 80 },
  { skill: 'Networking', level: 75 },
  { skill: 'Web Development', level: 70 },
];

const techHighlights = [
  { icon: Shield, label: 'Pen Testing & Vulnerability Assessment' },
  { icon: Code, label: 'Python, Bash, C++, JavaScript' },
  { icon: Server, label: 'Active Directory, SSO, Self-Hosting' },
  { icon: Cloud, label: 'Docker, Kasm, WSL, CI/CD' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const Resume = () => (
  <div className="relative min-h-screen bg-background overflow-x-hidden">
    <Helmet>
      <title>Resume | Onslaught2342</title>
      <meta name="description" content="Resume and skills of Onslaught2342 — cybersecurity, ethical hacking, and software development." />
      <meta property="og:title" content="Resume | Onslaught2342" />
    </Helmet>
    <MatrixBackground />
    <ScanlineEffect />
    <BackToTop />
    <CommandPalette />

    <header className="border-b border-border/20 glass sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>cd ..</span>
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-1.5 px-2.5 py-1.5 glass-subtle rounded-lg text-[10px] sm:text-xs
              text-muted-foreground hover:text-primary hover:border-primary/40 transition-all font-mono"
            aria-label="Download resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume.pdf</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main className="relative z-10 max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
      {/* Title */}
      <motion.div {...fadeUp()}>
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground font-display mb-2">
          <GlitchText text="RESUME" intensity="low" />
        </h1>
        <p className="text-sm text-muted-foreground/60 font-mono">
          $ cat /home/onslaught/resume.md
        </p>
      </motion.div>

      {/* Education Timeline */}
      <motion.section className="glass-intense rounded-2xl p-6 sm:p-8" {...fadeUp(0.1)}>
        <h2 className="flex items-center gap-2 text-sm sm:text-base font-display text-foreground mb-6">
          <GraduationCap className="w-5 h-5 text-primary" />
          <GlitchText text="EDUCATION" intensity="low" />
        </h2>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <motion.div
              key={edu.title}
              className="relative pl-6 border-l-2 border-primary/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                <span className="text-xs font-mono text-primary">{edu.period}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  edu.status === 'IN_PROGRESS'
                    ? 'text-accent bg-accent/10'
                    : 'text-muted-foreground bg-muted/20'
                }`}>
                  [{edu.status}]
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground font-body">{edu.title}</h3>
              <p className="text-xs text-muted-foreground/60 mt-1 font-body">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Matrix */}
      <motion.section className="glass-intense rounded-2xl p-6 sm:p-8" {...fadeUp(0.15)}>
        <h2 className="flex items-center gap-2 text-sm sm:text-base font-display text-foreground mb-6">
          <Code className="w-5 h-5 text-accent" />
          <GlitchText text="SKILLS MATRIX" intensity="low" />
        </h2>
        <div className="space-y-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.skill}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
            >
              <SkillBar skill={s.skill} level={s.level} delay={i * 0.1} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tech Highlights */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {techHighlights.map((item, i) => (
          <motion.div
            key={item.label}
            className="p-4 glass-subtle rounded-xl flex items-start gap-3
              hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <item.icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-muted-foreground font-body">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <motion.section className="glass-intense rounded-2xl p-6 sm:p-8" {...fadeUp(0.1)}>
        <h2 className="flex items-center gap-2 text-sm sm:text-base font-display text-foreground mb-6">
          <Award className="w-5 h-5 text-secondary" />
          <GlitchText text="CERTIFICATIONS" intensity="low" />
        </h2>
        <div className="space-y-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="p-3 sm:p-4 glass-subtle rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
            >
              <div>
                <h3 className="text-sm font-semibold text-foreground font-body">{cert.name}</h3>
                <p className="text-xs text-muted-foreground/60 font-body">{cert.note}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono text-accent bg-accent/10 self-start">
                [{cert.status}]
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  </div>
);

export default Resume;
