import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Code, Shield, Server, Github, MessageSquare, Cloud, Palette, Network, Volume2, VolumeX } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MatrixBackground from './MatrixBackground';
import ScanlineEffect from './ScanlineEffect';
import GlitchText from './GlitchText';
import CommandBox from './CommandBox';
import SkillBar from './SkillBar';
import ProjectCard from './ProjectCard';
import JinwooEasterEgg from './JinwooEasterEgg';
import { useAmbientAudio } from '@/hooks/useAmbientAudio';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = memo(() => {
  const [initialBoxesComplete, setInitialBoxesComplete] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { isMuted, toggleMute } = useAmbientAudio();
  
  const handlePriorityComplete = useCallback(() => {
    setInitialBoxesComplete(prev => prev + 1);
  }, []);

  const canAnimateScrollBoxes = initialBoxesComplete >= 3;

  
  useEffect(() => {
    if (!canAnimateScrollBoxes) return;

    const ctx = gsap.context(() => {
      
      gsap.utils.toArray<HTMLElement>('.gsap-section').forEach((section, i) => {
        gsap.fromTo(section, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      
      gsap.utils.toArray<HTMLElement>('.tech-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: i * 0.08,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      
      gsap.utils.toArray<HTMLElement>('.goal-item').forEach((item, i) => {
        gsap.fromTo(item,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      
      const footer = document.querySelector('.gsap-footer');
      if (footer) {
        gsap.fromTo(footer,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      
      if (headerRef.current) {
        ScrollTrigger.create({
          start: 'top top',
          end: '+=100',
          onUpdate: (self) => {
            if (headerRef.current) {
              const py = gsap.utils.interpolate(16, 8, self.progress);
              headerRef.current.style.paddingTop = `${py}px`;
              headerRef.current.style.paddingBottom = `${py}px`;
            }
          },
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, [canAnimateScrollBoxes]);

  const handleDiscordCopy = useCallback(() => {
    navigator.clipboard.writeText('onslaught2342').then(() => {
      toast({
        title: "Copied!",
        description: "Discord username copied to clipboard",
      });
    });
  }, []);

  const projects = [
    {
      title: 'Encryption-Based Security Tools',
      description: 'Developing hybrid AES + RSA encryption tools with data obfuscation techniques',
      status: 'COMPLETE' as const,
      code: [
        'from cryptography.hazmat.primitives import hashes',
        'aes_key = generate_aes_256_key()',
        'rsa_keypair = generate_rsa_4096()',
        'encrypted = hybrid_encrypt(data, aes_key, rsa_keypair)',
        'obfuscated = apply_obfuscation(encrypted)',
      ],
    },
    {
      title: 'Privacy-Focused Browser & Search Engine',
      description: 'Custom browser with strong privacy features and self-hosted secure search',
      status: 'RUNNING' as const,
      code: [
        'docker-compose up -d searxng',
        'nginx proxy_pass /search;',
        'tor_enabled: true',
        'tracking_protection: maximum',
        'dns_over_https: cloudflare',
      ],
    },
    {
      title: 'Automated Backup & Disaster Recovery',
      description: 'Real-time multi-site replication with secure encrypted backups',
      status: 'VALIDATED' as const,
      code: [
        'async def backup_critical_systems():',
        '    snapshot = create_incremental_snapshot()',
        '    encrypted = encrypt_aes256_gcm(snapshot)',
        '    await replicate_to_sites(["site_a", "site_b"])',
        '    verify_integrity(checksum)',
      ],
    },
    {
      title: 'Network Security Assessment Framework',
      description: 'Penetration testing toolkit for vulnerability assessment and exploit research',
      status: 'TESTING' as const,
      code: [
        'def security_audit(target_network):',
        '    vulnerabilities = scan_ports(target)',
        '    exploits = match_cve_database(vulnerabilities)',
        '    report = generate_pentest_report()',
        '    return remediation_steps(exploits)',
      ],
    },
  ];

  const goals = [
    { goal: 'Master Offensive Security & Obtain Certifications', progress: 45, difficulty: 'EXTREME' },
    { goal: 'Build Highly Secure Self-Hosted IT Ecosystem', progress: 70, difficulty: 'HIGH' },
    { goal: 'Contribute to Open-Source Security Projects', progress: 20, difficulty: 'HIGH' },
    { goal: 'Advanced Exploit Development & Research', progress: 35, difficulty: 'EXTREME' },
  ];

  const techCategories = [
    { title: 'Languages', items: 'Python • Bash • C++ • JavaScript', icon: Code },
    { title: 'Cybersecurity', items: 'Pen Testing • AES/RSA • IAM • VPN', icon: Shield },
    { title: 'Enterprise IT', items: 'Active Directory • SSO • DR • LB', icon: Server },
    { title: 'DevOps', items: 'Docker • Kasm • WSL • Self-Hosting', icon: Cloud },
    { title: 'Network', items: 'Security Auditing • Tunneling • Privacy', icon: Network },
    { title: 'Creative', items: 'Canva Pro • Adobe CC • UI/UX', icon: Palette },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <MatrixBackground />
      <ScanlineEffect />
      <JinwooEasterEgg />
      
      {}
      <header 
        ref={headerRef}
        className="border-b border-border/20 glass sticky top-0 z-40 animate-slide-down"
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
              <img src={logo} alt="Onslaught2342 Logo" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <span className="text-sm sm:text-xl font-bold text-foreground font-display tracking-wider">
              <GlitchText text="./Onslaught2342" intensity="low" />
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleMute}
              className="p-1.5 sm:p-2 rounded-lg glass-subtle hover:bg-primary/10 transition-all duration-300"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              )}
            </button>
            <div className="flex text-[10px] sm:text-xs space-x-2 text-muted-foreground font-mono">
              <span className="text-primary glow-text">[ONLINE]</span>
              <span className="hidden sm:inline text-accent/40">|</span>
              <span className="hidden sm:inline text-accent glow-text-accent">[SECURE]</span>
            </div>
          </div>
        </div>
      </header>

      <main ref={mainRef} className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-8 sm:space-y-16">
        {}
        <section>
          <CommandBox command="whoami" glow delay={100} priority={true} onAnimationComplete={handlePriorityComplete}>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground glow-text font-display tracking-wide">
              <GlitchText text="ONSLAUGHT2342" intensity="high" />
            </h1>

            <div className="text-sm sm:text-lg text-muted-foreground space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 font-body">
              <p className="flex items-start gap-2">
                <span className="text-primary">❯</span>
                <span>Security Enthusiast | <span className="text-accent">Ethical Hacker</span> | Code Architect</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">❯</span>
                <span>15y/o CAIE Student | Building at 2 AM | <span className="text-secondary">Breaking systems for fun</span></span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['ETHICAL', 'SECURE', 'CURIOUS', 'RELENTLESS'].map((tag, i) => (
                <span
                  key={tag}
                  className="px-2.5 sm:px-4 py-1 sm:py-1.5 glass-subtle text-foreground text-[10px] sm:text-xs 
                    hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)]
                    transition-all duration-300 cursor-default rounded-lg animate-fade-in font-mono"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  [#{tag}]
                </span>
              ))}
            </div>
          </CommandBox>
        </section>

        {}
        <section className="grid md:grid-cols-2 gap-4 sm:gap-8">
          <div>
            <CommandBox command="cat /home/onslaught/bio.txt" delay={200} priority={true} onAnimationComplete={handlePriorityComplete}>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm font-body">
                <p className="text-muted-foreground leading-relaxed">
                  <span className="text-primary glow-text">Experimenting</span> – Self-hosted browsers, privacy-focused search engines, enterprise security systems.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I enjoy <span className="text-accent glow-text-accent">reverse engineering, penetration testing, and security research</span>, aiming to develop robust defenses against cyber threats.
                </p>
                <div className="p-3 glass-subtle rounded-lg">
                  <p className="text-accent text-[10px] sm:text-xs font-mono mb-1">$ echo $FOCUS</p>
                  <p className="text-foreground text-xs sm:text-sm">Ethical Hacking • Network Security • Vulnerability Assessment</p>
                </div>
              </div>
            </CommandBox>
          </div>

          <div>
            <CommandBox command="./skills --matrix" delay={300} priority={true} onAnimationComplete={handlePriorityComplete}>
              <div className="space-y-3 sm:space-y-4">
                <SkillBar skill="Python" level={95} delay={0} />
                <SkillBar skill="Cybersecurity" level={85} delay={0.1} />
                <SkillBar skill="Linux/DevOps" level={90} delay={0.2} />
                <SkillBar skill="Encryption" level={80} delay={0.3} />
              </div>
            </CommandBox>
          </div>
        </section>

        {}
        {canAnimateScrollBoxes && (
          <section>
            <CommandBox command="neofetch --tech-stack" delay={0}>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                {techCategories.map((category) => (
                  <div
                    key={category.title}
                    className="tech-card p-3 sm:p-4 glass-subtle rounded-xl
                      hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)]
                      transition-all duration-500 perspective-card"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <category.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-1 font-display">
                          <GlitchText text={category.title} intensity="low" />
                        </h3>
                        <p className="text-[10px] sm:text-xs text-muted-foreground/70 leading-relaxed truncate sm:whitespace-normal font-body">
                          {category.items}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CommandBox>
          </section>
        )}

        {}
        {canAnimateScrollBoxes && (
          <section>
            <CommandBox command="ls -la /projects/active" delay={0}>
              <div className="space-y-3 sm:space-y-4">
                {projects.map((project) => (
                  <div key={project.title} className="project-card">
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </CommandBox>
          </section>
        )}

        {}
        {canAnimateScrollBoxes && (
          <section>
            <CommandBox command="cat /etc/objectives.conf" delay={0}>
              <div className="space-y-3 sm:space-y-4">
                {goals.map((item) => (
                  <div
                    key={item.goal}
                    className="goal-item p-3 sm:p-4 glass-subtle rounded-xl
                      hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all duration-500"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                      <span className="text-foreground text-xs sm:text-sm font-medium font-body">{item.goal}</span>
                      <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full self-start sm:self-auto font-mono ${
                        item.difficulty === 'EXTREME' 
                          ? 'text-destructive bg-destructive/10 shadow-[0_0_10px_hsl(var(--destructive)/0.2)]' 
                          : 'text-yellow-400 bg-yellow-500/10 shadow-[0_0_10px_hsl(45_100%_50%/0.2)]'
                      }`}>
                        [{item.difficulty}]
                      </span>
                    </div>
                    <div className="h-2 sm:h-2.5 bg-muted/20 rounded-full overflow-hidden glass-subtle">
                      <div
                        className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-1000 ease-out progress-glow"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground/60 mt-2 text-right font-mono">{item.progress}% complete</p>
                  </div>
                ))}
              </div>
            </CommandBox>
          </section>
        )}

        {}
        {canAnimateScrollBoxes && (
          <section>
            <CommandBox command="curl -X GET https://onslaught2342.secure/contact" glow delay={0}>
              <div className="text-center">
                <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-base font-body">
                  Interested in <span className="text-accent">security research</span>? Want to collaborate on something <span className="text-primary">epic</span>?
                </p>
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                  <a
                    href="https://github.com/onslaught2342"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 
                      glass-subtle rounded-xl text-foreground text-[10px] sm:text-sm 
                      hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_25px_hsl(var(--primary)/0.2)]
                      transition-all duration-300 active:scale-95 font-mono"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    [GITHUB]
                  </a>
                  <button
                    onClick={handleDiscordCopy}
                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 
                      glass-subtle rounded-xl text-foreground text-[10px] sm:text-sm 
                      hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_25px_hsl(var(--accent)/0.2)]
                      transition-all duration-300 active:scale-95 font-mono"
                  >
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    [DISCORD]
                  </button>
                </div>
              </div>
            </CommandBox>
          </section>
        )}
      </main>

      {}
      <footer className="gsap-footer relative z-10 border-t border-border/20 glass mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8 text-xs sm:text-sm">
            <div>
              <p className="text-primary mb-2 font-display text-sm">
                <GlitchText text="root@onslaught:~$" intensity="low" />
              </p>
              <p className="text-muted-foreground/60 text-[10px] sm:text-xs leading-relaxed font-body">
                A young hacker on a mission to understand, secure, and architect the systems of tomorrow.
              </p>
            </div>
            <div>
              <p className="text-accent mb-2 font-display text-sm">STATUS</p>
              <p className="text-muted-foreground/60 text-[10px] sm:text-xs flex flex-wrap gap-1 font-mono">
                <span className="text-primary">[ONLINE]</span>
                <span>•</span>
                <span>[LEARNING]</span>
                <span>•</span>
                <span className="text-accent">[BUILDING]</span>
              </p>
            </div>
            <div>
              <p className="text-secondary mb-2 font-display text-sm">PHILOSOPHY</p>
              <p className="text-muted-foreground/60 text-[10px] sm:text-xs italic font-body">
                "To defend, first understand. To attack, test yourself."
              </p>
            </div>
          </div>
          <div className="border-t border-border/15 pt-4 sm:pt-6 text-center text-muted-foreground/40 text-[10px] sm:text-xs font-mono">
            <p className="text-primary glow-text">$ exit 0</p>
            <p className="mt-2">CONNECTION CLOSED • <span className="text-accent">STAY CURIOUS</span> • STAY SECURE</p>
          </div>
        </div>
      </footer>
    </div>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
