import { memo, useState, useCallback } from 'react';
import { Code, Shield, Server, Github, Mail, MessageSquare, Cloud, Palette, Network } from 'lucide-react';
import MatrixBackground from './MatrixBackground';
import ScanlineEffect from './ScanlineEffect';
import GlitchText from './GlitchText';
import CommandBox from './CommandBox';
import SkillBar from './SkillBar';
import ProjectCard from './ProjectCard';
import JinwooEasterEgg from './JinwooEasterEgg';
import logo from '@/assets/logo.png';

const Portfolio = memo(() => {
  const [initialBoxesComplete, setInitialBoxesComplete] = useState(0);

  const handlePriorityComplete = useCallback(() => {
    setInitialBoxesComplete(prev => prev + 1);
  }, []);

  const canAnimateScrollBoxes = initialBoxesComplete >= 3;

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

      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-40 animate-slide-down">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
              <img src={logo} alt="Onslaught2342 Logo" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <span className="text-sm sm:text-xl font-bold text-foreground glow-text font-display tracking-wider">
              <GlitchText text="./Onslaught2342" intensity="low" />
            </span>
          </div>
          <div className="flex text-[10px] sm:text-xs space-x-2 sm:space-x-4 text-muted-foreground">
            <span className="text-primary glow-text">[ONLINE]</span>
            <span className="hidden sm:inline text-accent">|</span>
            <span className="hidden sm:inline text-accent glow-text-accent">[SECURE]</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-8 sm:space-y-16">
        <section>
          <CommandBox
            command="whoami"
            glow
            delay={100}
            priority={true}
            onAnimationComplete={handlePriorityComplete}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground glow-text font-display tracking-wide">
              <GlitchText text="ONSLAUGHT2342" intensity="high" />
            </h1>

            <div className="text-sm sm:text-lg text-muted-foreground space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
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
                  className="px-2.5 sm:px-4 py-1 sm:py-1.5 border border-border/60 text-foreground text-[10px] sm:text-xs 
                    hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]
                    transition-all duration-300 cursor-default rounded-md animate-fade-in font-medium"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  [#{tag}]
                </span>
              ))}
            </div>
          </CommandBox>
        </section>

        <section className="grid md:grid-cols-2 gap-4 sm:gap-8">
          <div>
            <CommandBox
              command="cat /home/onslaught/bio.txt"
              delay={200}
              priority={true}
              onAnimationComplete={handlePriorityComplete}
            >
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <p className="text-muted-foreground leading-relaxed">
                  <span className="text-primary glow-text">Experimenting</span> – Self-hosted browsers, privacy-focused search engines, enterprise security systems.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I enjoy <span className="text-accent glow-text-accent">reverse engineering, penetration testing, and security research</span>, aiming to develop robust defenses against cyber threats.
                </p>
                <div className="p-3 bg-background/60 border-l-2 border-accent rounded-r-lg shadow-[inset_0_0_20px_hsl(var(--accent)/0.1)]">
                  <p className="text-accent text-[10px] sm:text-xs font-mono mb-1">$ echo $FOCUS</p>
                  <p className="text-foreground text-xs sm:text-sm">Ethical Hacking • Network Security • Vulnerability Assessment</p>
                </div>
              </div>
            </CommandBox>
          </div>

          <div>
            <CommandBox
              command="./skills --matrix"
              delay={300}
              priority={true}
              onAnimationComplete={handlePriorityComplete}
            >
              <div className="space-y-3 sm:space-y-4">
                <SkillBar skill="Python" level={95} delay={0} />
                <SkillBar skill="Cybersecurity" level={85} delay={0.1} />
                <SkillBar skill="Linux/DevOps" level={90} delay={0.2} />
                <SkillBar skill="Encryption" level={80} delay={0.3} />
              </div>
            </CommandBox>
          </div>
        </section>
        {canAnimateScrollBoxes && (
          <section>
            <CommandBox command="neofetch --tech-stack" delay={0}>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                {techCategories.map((category, i) => (
                  <div
                    key={category.title}
                    className="p-2.5 sm:p-3 border border-border/50 bg-background/40 rounded-lg 
                      hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]
                      transition-all duration-300 animate-fade-in card-glow"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <category.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-1 font-display">
                          <GlitchText text={category.title} intensity="low" />
                        </h3>
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed truncate sm:whitespace-normal">
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

        {canAnimateScrollBoxes && (
          <section>
            <CommandBox command="ls -la /projects/active" delay={0}>
              <div className="space-y-3 sm:space-y-4">
                {projects.map((project, i) => (
                  <div
                    key={project.title}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </CommandBox>
          </section>
        )}

        {canAnimateScrollBoxes && (
          <section>
            <CommandBox command="cat /etc/objectives.conf" delay={0}>
              <div className="space-y-3 sm:space-y-4">
                {goals.map((item, i) => (
                  <div
                    key={item.goal}
                    className="p-3 sm:p-4 border border-border/50 bg-background/40 rounded-lg animate-fade-in 
                      hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                      <span className="text-foreground text-xs sm:text-sm font-medium">{item.goal}</span>
                      <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded self-start sm:self-auto font-medium ${item.difficulty === 'EXTREME'
                        ? 'text-destructive bg-destructive/15 shadow-[0_0_10px_hsl(var(--destructive)/0.3)]'
                        : 'text-yellow-400 bg-yellow-500/15 shadow-[0_0_10px_hsl(45_100%_50%/0.3)]'
                        }`}>
                        [{item.difficulty}]
                      </span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-1000 ease-out progress-glow"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 text-right">{item.progress}% complete</p>
                  </div>
                ))}
              </div>
            </CommandBox>
          </section>
        )}

        {canAnimateScrollBoxes && (
          <section>
            <CommandBox command="curl -X GET https://onslaught2342.secure/contact" glow delay={0}>
              <div className="text-center">
                <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-base">
                  Interested in <span className="text-accent">security research</span>? Want to collaborate on something <span className="text-primary">epic</span>?
                </p>
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                  {[
                    { label: 'GITHUB', icon: Github },
                    { label: 'EMAIL', icon: Mail },
                    { label: 'DISCORD', icon: MessageSquare },
                  ].map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-border/60 
                        text-foreground text-[10px] sm:text-sm 
                        hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]
                        transition-all duration-300 rounded-md active:scale-95 cyber-button"
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      [{label}]
                    </button>
                  ))}
                </div>
              </div>
            </CommandBox>
          </section>
        )}
      </main>

      <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-lg mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8 text-xs sm:text-sm">
            <div>
              <p className="text-primary mb-2 font-display text-sm">
                <GlitchText text="root@onslaught:~$" intensity="low" />
              </p>
              <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                A young hacker on a mission to understand, secure, and architect the systems of tomorrow.
              </p>
            </div>
            <div>
              <p className="text-accent mb-2 font-display text-sm">STATUS</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs flex flex-wrap gap-1">
                <span className="text-primary">[ONLINE]</span>
                <span>•</span>
                <span>[LEARNING]</span>
                <span>•</span>
                <span className="text-accent">[BUILDING]</span>
              </p>
            </div>
            <div>
              <p className="text-secondary mb-2 font-display text-sm">PHILOSOPHY</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs italic">
                "To defend, first understand. To attack, test yourself."
              </p>
            </div>
          </div>
          <div className="border-t border-border/30 pt-4 sm:pt-6 text-center text-muted-foreground text-[10px] sm:text-xs">
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