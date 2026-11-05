import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { ArrowUpRight, Mail, Sparkles, CheckCircle2, X } from 'lucide-react';

// ============================================================================
// DATA & ASSETS
// ============================================================================

const MARQUEE_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

interface ProjectItem {
  number: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const PROJECTS: ProjectItem[] = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: React.ElementType;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;
      const rect = magnetRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (
        distX < rect.width / 2 + padding &&
        distY < rect.height / 2 + padding
      ) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) / strength;
        const offsetY = (e.clientY - centerY) / strength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength]);

  return (
    <div ref={magnetRef} className={className}>
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface ContactButtonProps {
  onClick?: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  );
};

interface LiveProjectButtonProps {
  onClick?: () => void;
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer shrink-0"
    >
      Live Project
    </button>
  );
};

// Character-by-character scroll reveal
interface CharSpanProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const CharSpan: React.FC<CharSpanProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline">
      <span className="opacity-20 select-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charCursor = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wIdx) => {
        const wordChars = word.split('');
        const wordElement = (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {wordChars.map((char, cIdx) => {
              const start = charCursor / totalChars;
              const end = (charCursor + 1) / totalChars;
              charCursor++;
              return (
                <CharSpan
                  key={cIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
        // Advance cursor for space
        charCursor++;
        return (
          <React.Fragment key={wIdx}>
            {wordElement}
            {wIdx < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </p>
  );
};

// ============================================================================
// SECTIONS
// ============================================================================

// 1. HERO SECTION
const HeroSection: React.FC<{ onContactClick: () => void }> = ({
  onContactClick,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen w-full flex flex-col justify-between select-none pb-8"
      style={{ overflowX: 'clip', backgroundColor: '#0C0C0C' }}
    >
      {/* Top area: Navbar + Hero Heading */}
      <div className="w-full relative z-20">
        <FadeIn delay={0} y={-20}>
          <nav className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 max-w-7xl mx-auto">
            <button
              onClick={() => scrollToSection('about')}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.3rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.3rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.3rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0"
            >
              Projects
            </button>
            <button
              onClick={onContactClick}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.3rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0"
            >
              Contact
            </button>
          </nav>
        </FadeIn>

        <div className="overflow-hidden w-full">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[13.5vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
              Hi, i&apos;m EVIN
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Centered Hero Portrait */}
      <div className="relative sm:absolute sm:left-1/2 sm:-translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px] mx-auto sm:mx-0 my-4 sm:my-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="/evin-portrait.png"
              alt="EVIN 3D Creator Portrait"
              className="w-full h-auto object-contain block pointer-events-none drop-shadow-2xl"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-4 sm:pb-8 md:pb-10 relative z-20 max-w-7xl mx-auto">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.25rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};

// 2. MARQUEE SECTION
const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  const row1Images = MARQUEE_IMAGES.slice(0, 11);
  const row2Images = MARQUEE_IMAGES.slice(11, 21);

  const tripledRow1 = [...row1Images, ...row1Images, ...row1Images];
  const tripledRow2 = [...row2Images, ...row2Images, ...row2Images];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calculated =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculated);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-4">
        {/* Row 1: moves RIGHT on scroll */}
        <div
          className="flex gap-4"
          style={{
            transform: `translate3d(${offset - 1800}px, 0, 0)`,
            willChange: 'transform',
          }}
        >
          {tripledRow1.map((src, idx) => (
            <img
              key={`r1-${idx}`}
              src={src}
              alt={`Showcase work ${(idx % 11) + 1}`}
              loading="lazy"
              className="w-[320px] sm:w-[420px] h-[210px] sm:h-[270px] shrink-0 rounded-2xl object-cover bg-[#161616] border border-white/5 shadow-lg"
            />
          ))}
        </div>

        {/* Row 2: moves LEFT on scroll */}
        <div
          className="flex gap-4"
          style={{
            transform: `translate3d(${-(offset - 200)}px, 0, 0)`,
            willChange: 'transform',
          }}
        >
          {tripledRow2.map((src, idx) => (
            <img
              key={`r2-${idx}`}
              src={src}
              alt={`Showcase work ${(idx % 10) + 12}`}
              loading="lazy"
              className="w-[320px] sm:w-[420px] h-[210px] sm:h-[270px] shrink-0 rounded-2xl object-cover bg-[#161616] border border-white/5 shadow-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. ABOUT SECTION
const AboutSection: React.FC<{ onContactClick: () => void }> = ({
  onContactClick,
}) => {
  const aboutText =
    "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Top-left: Moon icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0 opacity-80"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon Icon"
          className="w-full h-auto object-contain"
        />
      </FadeIn>

      {/* Bottom-left: 3D object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none z-0 opacity-80"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Abstract Object"
          className="w-full h-auto object-contain"
        />
      </FadeIn>

      {/* Bottom-right: 3D group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none z-0 opacity-80"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Geometric Group"
          className="w-full h-auto object-contain"
        />
      </FadeIn>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-14 text-center">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text={aboutText}
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[620px] px-4"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)' }}
          />
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20">
          <FadeIn delay={0.2} y={20}>
            <ContactButton onClick={onContactClick} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// 4. SERVICES SECTION
const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32 relative z-10"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-10 py-8 sm:py-10 md:py-12 transition-colors hover:bg-black/[0.02] px-4 rounded-2xl"
              style={{
                borderTop: '1px solid rgba(12, 12, 12, 0.15)',
                borderBottom:
                  i === SERVICES.length - 1
                    ? '1px solid rgba(12, 12, 12, 0.15)'
                    : 'none',
              }}
            >
              {/* Number */}
              <span
                className="font-black text-[#0C0C0C] leading-none shrink-0 sm:w-44 md:w-56 tracking-tighter"
                style={{ fontSize: 'clamp(3rem, 9vw, 130px)' }}
              >
                {service.number}
              </span>

              {/* Name + Description */}
              <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                <h3
                  className="font-bold uppercase text-[#0C0C0C] leading-tight"
                  style={{ fontSize: 'clamp(1.2rem, 2.4vw, 2.2rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/70"
                  style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)' }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

// 5. PROJECTS SECTION
interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  onLiveClick: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onLiveClick,
}) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardContainerRef}
      className="min-h-[75vh] sm:min-h-[85vh] flex items-start justify-center sticky top-20 sm:top-24 md:top-28 pb-10"
      style={{
        paddingTop: `${index * 24}px`,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center',
        }}
        className="w-full max-w-6xl mx-auto rounded-[32px] sm:rounded-[44px] md:rounded-[56px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-sm"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 sm:pb-6 md:pb-8 px-2 sm:px-4 border-b border-[#D7E2EA]/15 mb-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <span
              className="font-black text-[#D7E2EA] leading-none tracking-tighter"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 95px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA] opacity-60 uppercase tracking-widest text-xs sm:text-sm font-light">
                {project.category}
              </span>
              <h3
                className="text-[#D7E2EA] font-medium uppercase tracking-wide leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton onClick={() => onLiveClick(project)} />
        </div>

        {/* Bottom Row: Two-column Image Grid (40% / 60%) */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          {/* Left Column (40%) */}
          <div className="w-full sm:w-[40%] flex flex-col gap-3 sm:gap-4">
            <img
              src={project.col1Img1}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full object-cover rounded-[24px] sm:rounded-[36px] md:rounded-[44px] bg-[#181818] border border-white/5"
              style={{ height: 'clamp(140px, 16vw, 230px)' }}
            />
            <img
              src={project.col1Img2}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full object-cover rounded-[24px] sm:rounded-[36px] md:rounded-[44px] bg-[#181818] border border-white/5"
              style={{ height: 'clamp(170px, 22vw, 320px)' }}
            />
          </div>

          {/* Right Column (60%) */}
          <div className="w-full sm:w-[60%]">
            <img
              src={project.col2Img}
              alt={`${project.name} main showcase`}
              loading="lazy"
              className="w-full object-cover rounded-[24px] sm:rounded-[36px] md:rounded-[44px] bg-[#181818] border border-white/5"
              style={{
                height: 'clamp(320px, 39vw, 566px)',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection: React.FC<{
  onLiveClick: (project: ProjectItem) => void;
}> = ({ onLiveClick }) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="relative flex flex-col gap-16 pb-12 max-w-6xl mx-auto">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
            onLiveClick={onLiveClick}
          />
        ))}
      </div>
    </section>
  );
};

// 6. FOOTER SECTION
const FooterSection: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#080808] border-t border-[#D7E2EA]/15 pt-16 pb-12 px-6 md:px-12 relative z-30">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-[#D7E2EA]/10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold mb-2 block">Available For Selected Projects</span>
            <h3 className="hero-heading text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Ready to create together?
            </h3>
          </div>
          <ContactButton onClick={onContactClick} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#D7E2EA]/60">
          <div className="flex items-center gap-4">
            <span className="font-medium text-[#D7E2EA]">EVIN © {new Date().getFullYear()}</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors uppercase tracking-wider text-xs"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors uppercase tracking-wider text-xs"
            >
              Instagram
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors uppercase tracking-wider text-xs"
            >
              GitHub
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="text-xs uppercase tracking-widest hover:text-white transition-colors cursor-pointer border border-[#D7E2EA]/20 px-4 py-2 rounded-full hover:bg-white/5"
          >
            Back To Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// INTERACTIVE MODALS (Contact & Project Preview)
// ============================================================================

const ContactModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="relative w-full max-w-lg rounded-[36px] border-2 border-[#D7E2EA]/40 bg-[#0C0C0C] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center gap-4">
            <CheckCircle2 className="w-14 h-14 text-[#B600A8]" />
            <h3 className="text-2xl font-bold uppercase tracking-wide">
              Message Sent!
            </h3>
            <p className="text-sm opacity-70 max-w-xs font-light">
              Thanks for reaching out. EVIN will get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B600A8] mb-2 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Start a Project</span>
            </div>
            <h3 className="hero-heading text-3xl sm:text-4xl font-black uppercase tracking-tight mb-6">
              Let&apos;s Collaborate
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider opacity-70 mb-1.5 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full rounded-2xl bg-[#161616] border border-[#D7E2EA]/20 px-4 py-3 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider opacity-70 mb-1.5 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@studio.com"
                  className="w-full rounded-2xl bg-[#161616] border border-[#D7E2EA]/20 px-4 py-3 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider opacity-70 mb-1.5 font-medium">
                  Project Details
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your 3D, branding, or web vision..."
                  className="w-full rounded-2xl bg-[#161616] border border-[#D7E2EA]/20 px-4 py-3 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#B600A8] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="mailto:evin@studio.design"
                  className="inline-flex items-center gap-1.5 text-xs text-[#D7E2EA]/60 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct Email</span>
                </a>
                <button
                  type="submit"
                  className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3.5 text-sm transition-transform hover:scale-105 cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

const ProjectPreviewModal: React.FC<{
  project: ProjectItem | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-4xl rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 text-[#D7E2EA] max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-6 border-b border-[#D7E2EA]/20">
          <div>
            <span className="text-xs uppercase tracking-widest opacity-60">
              {project.number} / {project.category}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              {project.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full border border-[#D7E2EA]/40 hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <img
            src={project.col2Img}
            alt={project.name}
            className="w-full h-64 sm:h-80 object-cover rounded-[28px] sm:col-span-2 bg-[#181818]"
          />
          <img
            src={project.col1Img1}
            alt={project.name}
            className="w-full h-52 object-cover rounded-[28px] bg-[#181818]"
          />
          <img
            src={project.col1Img2}
            alt={project.name}
            className="w-full h-52 object-cover rounded-[28px] bg-[#181818]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="text-sm font-light opacity-75 max-w-xl">
            Full 3D art direction, custom shader pipeline, and interactive web
            deployment crafted for {project.name}.
          </p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
          >
            <span>Close Preview</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    document.title = 'EVIN — 3D Creator & Visual Designer';
  }, []);

  return (
    <>
      <div
        className="min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA]"
        style={{ overflowX: 'clip', fontFamily: "'Kanit', sans-serif" }}
      >
        {/* 1. HERO SECTION */}
        <HeroSection onContactClick={() => setContactOpen(true)} />

        {/* 2. MARQUEE SECTION */}
        <MarqueeSection />

        {/* 3. ABOUT SECTION */}
        <AboutSection onContactClick={() => setContactOpen(true)} />

        {/* 4. SERVICES SECTION */}
        <ServicesSection />

        {/* 5. PROJECTS SECTION */}
        <ProjectsSection
          onLiveClick={(project) => setActiveProject(project)}
        />

        {/* 6. FOOTER SECTION */}
        <FooterSection onContactClick={() => setContactOpen(true)} />
      </div>

      {/* Modals for Contact & Live Project Preview */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
      <ProjectPreviewModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}

export default App;
