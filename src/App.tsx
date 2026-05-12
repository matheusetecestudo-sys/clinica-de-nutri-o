import React, { useState, useEffect, useRef, Suspense, lazy } from "react";

// Lazy load components that are below the fold
const InteractiveMap = lazy(() => import("./components/InteractiveMap"));
const BMICalculator = lazy(() => import("./components/BMICalculator"));
const Testimonials = lazy(() => import("./components/Testimonials"));
import { 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  CheckCircle2, 
  Award, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Plus,
  Minus,
  Apple,
  Dumbbell,
  Heart,
  Baby,
  Activity,
  Zap,
  Target,
  Calendar,
  Star
} from "lucide-react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";

// --- Components ---

const Header = ({ onNavClick }: { onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Resultados", href: "#resultados" },
    { name: "Depoimentos", href: "#depoimentos" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleInternalNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onNavClick(e, href);
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#inicio" onClick={(e) => handleInternalNavClick(e, "#inicio")} className="flex items-center gap-2">
          <div className={`text-2xl md:text-3xl font-serif font-bold tracking-tighter transition-colors ${isScrolled ? "text-secondary" : "text-white"}`}>
            <span className="text-primary">DUNO</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleInternalNavClick(e, link.href)}
              className={`text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors ${isScrolled ? "text-secondary" : "text-white"}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/5511992876219" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group"
          >
            Agendar
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-secondary" : "text-white"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-2xl"
          >
            <div className="container mx-auto px-6 py-10 flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleInternalNavClick(e, link.href)}
                  className="text-xl font-serif font-bold text-secondary hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://wa.me/5511992876219" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-white px-6 py-5 rounded-2xl text-center font-black uppercase tracking-widest flex items-center justify-center gap-3 group"
              >
                Agendar Consulta
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
;

const Counter = ({ value, suffix = "", label }: { value: number, suffix?: string, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ service: any; index: number }> = ({ service, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -12,
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-25px_rgba(5,150,105,0.2)] transition-all duration-700 flex flex-col h-full group"
    >
      <div className="aspect-[16/12] overflow-hidden relative">
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-secondary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Subtle Numbering for Editorial Look */}
        <div className="absolute top-6 right-8 text-white/20 font-serif italic text-4xl group-hover:text-primary/40 transition-colors duration-500">
          0{index + 1}
        </div>

        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          Exclusivo
        </div>
      </div>
      
      <div className="p-4 md:p-10 flex flex-col flex-grow items-start text-left relative">
        <div className="w-8 h-[1px] bg-primary mb-4 transition-all duration-500 group-hover:w-16" />
        
        <h3 className="text-base md:text-3xl font-serif font-bold text-secondary mb-2 group-hover:text-primary transition-colors leading-tight">
          {service.name}
        </h3>
        
        <p className="text-[10px] md:text-base text-gray-500 mb-4 flex-grow leading-relaxed font-medium opacity-80">
          {service.description}
        </p>
        
        <a 
          href={`https://wa.me/5511992876219?text=Olá! Gostaria de saber mais sobre o ${service.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-secondary group-hover:text-primary font-bold text-[10px] md:text-base transition-all duration-300 group/link"
        >
          <span>Agendar</span>
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-gray-200 group-hover/link:border-primary group-hover/link:bg-primary group-hover/link:text-white flex items-center justify-center transition-all duration-300">
            <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform md:size-[16px]" />
          </div>
        </a>
      </div>
    </motion.div>
  );
};


const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    
    if (nextState && itemRef.current) {
      // Small delay to allow the animation to start or for the state to update
      setTimeout(() => {
        itemRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  };

  return (
    <div ref={itemRef} className="border-b border-gray-100 last:border-0 scroll-mt-32">
      <button 
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={toggleOpen}
      >
        <h3 className={`text-lg font-semibold transition-colors ${isOpen ? "text-primary" : "text-secondary group-hover:text-primary"}`}>
          {question}
        </h3>
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}`}>
          <ChevronDown size={24} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {

  const handleGlobalNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      if (targetId === "faq") {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        const offset = 80; // Header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  const servicesList = [
    {
      name: "Emagrecimento Definitivo",
      description: "Emagrecimento sustentável sem restrições severas.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format,compress&fit=crop&q=80&w=800&fm=webp"
    },
    {
      name: "Performance Esportiva",
      description: "Estratégias de alto rendimento para seus treinos.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format,compress&fit=crop&q=80&w=800&fm=webp"
    },
    {
      name: "Saúde e Longevidade",
      description: "Prevenção e imunidade com densidade nutritiva.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format,compress&fit=crop&q=80&w=800&fm=webp"
    },
    {
      name: "Nutrição Comportamental",
      description: "Comer consciente, sem dietas e ansiedade.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format,compress&fit=crop&q=80&w=800&fm=webp"
    },
    {
      name: "Saúde Gastrointestinal",
      description: "Tratamento focado em digestão e saúde intestinal.",
      image: "https://images.unsplash.com/photo-1476224483472-18cfa58b6ad1?auto=format,compress&fit=crop&q=80&w=800&fm=webp"
    },
    {
      name: "Nutrição Estética",
      description: "Nutrição para pele, cabelos e beleza real.",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format,compress&fit=crop&q=80&w=800&fm=webp"
    },
    {
      name: "Nutrição Materno-Infantil",
      description: "Acompanhamento para gestantes e crianças.",
      image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format,compress&fit=crop&q=80&w=800&fm=webp"
    },
    {
      name: "Programas Premium",
      description: "Suporte VIP com bioimpedância e monitoramento.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format,compress&fit=crop&q=80&w=800&fm=webp"
    }
  ];

  const results = [
    {
      name: "Mariana S.",
      age: 32,
      lost: "15kg",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format,compress&fit=crop&q=80&w=800&fm=webp",
      before: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format,compress&fit=crop&q=80&w=400&fm=webp"
    },
    {
      name: "Ricardo M.",
      age: 45,
      lost: "22kg",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format,compress&fit=crop&q=80&w=800&fm=webp",
      before: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format,compress&fit=crop&q=80&w=400&fm=webp"
    },
    {
      name: "Juliana F.",
      age: 28,
      lost: "12kg",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format,compress&fit=crop&q=80&w=800&fm=webp",
      before: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format,compress&fit=crop&q=80&w=400&fm=webp"
    }
  ];

  const faqs = [
    {
      question: "Quanto tempo demora para ver os primeiros resultados?",
      answer: "Os primeiros resultados metabólicos (energia, sono, digestão) costumam aparecer na primeira semana. Resultados estéticos visíveis geralmente ocorrem entre 15 a 30 dias, dependendo da adesão ao plano."
    },
    {
      question: "Vou precisar contar calorias o tempo todo?",
      answer: "Não! Nossa filosofia foca na qualidade nutricional e saciedade. Ensinamos você a fazer escolhas inteligentes para que o emagrecimento seja natural e sem obsessão por números."
    },
    {
      question: "O plano alimentar é muito restritivo?",
      answer: "De forma alguma. Trabalhamos com reeducação alimentar humanizada. O plano é adaptado aos seus gostos e rotina, incluindo alimentos que você gosta de forma equilibrada."
    },
    {
      question: "Como funciona o acompanhamento online?",
      answer: "O acompanhamento online é feito via chamada de vídeo e suporte contínuo por aplicativo exclusivo, onde você registra suas refeições, tira dúvidas e recebe feedbacks constantes."
    }
  ];

  return (
    <div className="relative overflow-x-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[35%] h-[35%] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <Header onNavClick={handleGlobalNavClick} />

      {/* Hero Section */}
          <section id="inicio" className="relative min-h-[600px] md:h-screen flex flex-col pt-28 md:pt-32 pb-12 md:pb-20 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <picture>
                  <source 
                    media="(max-width: 768px)" 
                    srcSet="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format,compress&fit=crop&q=80&w=1200&fm=webp" 
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format,compress&fit=crop&q=80&w=2400&fm=webp" 
                    alt="Alimentação saudável e vibrante com frutas e vegetais - DUNO Nutri"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/75 md:from-black/90 via-black/40 to-transparent" />
              </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-3xl"
              >
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 mb-6 md:mb-8"
                >
                  <div className="h-[1px] w-10 md:w-12 bg-primary" />
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm">
                    Ciência e Acolhimento
                  </span>
                </motion.div>
                <h1 className="text-4xl md:text-8xl font-serif font-bold text-white leading-[0.95] md:leading-[0.9] mb-6 md:mb-8 tracking-tighter">
                  A ciência da <span className="text-primary italic">transformação</span> definitiva.
                </h1>
                <p className="text-base md:text-2xl text-white/80 mb-8 md:mb-12 leading-relaxed max-w-2xl font-light">
                  Abandone as dietas temporárias. Domine seu metabolismo com uma estratégia personalizada baseada em genética, comportamento e alta performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-12 relative z-50">
                  <motion.a 
                    href="https://wa.me/5511992876219" 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(121, 159, 12, 0.6)" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary text-white px-8 md:px-12 py-5 md:py-6 rounded-full font-black uppercase tracking-widest text-sm md:text-lg transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-primary/40 overflow-hidden"
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                    
                    Solicitar Orçamento
                    <ArrowRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.a 
                    href="#servicos" 
                    onClick={(e) => handleGlobalNavClick(e, "#servicos")}
                    whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-xl text-white border border-white/30 px-8 md:px-12 py-5 md:py-6 rounded-full font-black uppercase tracking-widest text-sm md:text-lg hover:bg-white hover:text-secondary transition-all flex items-center justify-center gap-2"
                  >
                    Nossos Serviços
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
            >
              <ChevronDown size={32} />
            </motion.div>
          </section>

          {/* About Section */}
          <section id="sobre" className="py-12 md:py-20 bg-white scroll-mt-24 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, x: -50 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="aspect-[4/5] rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format,compress&fit=crop&q=80&w=800&fm=webp" 
                      alt="Dra. Luciana Duno - Nutricionista Especialista em Emagrecimento e Saúde"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {/* Experience Badge */}
                  <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 rounded-3xl shadow-2xl z-20 hidden md:block">
                    <div className="text-4xl font-bold mb-1">15+</div>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-80">Anos de Experiência</div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-0" />
                  <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0" />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Autoridade Médica</span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 md:mb-8 leading-tight">
                    Expertise clínica focada em <span className="text-primary italic">resultados extraordinários</span>.
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                    A <strong>Dra. Luciana Duno</strong> é referência nacional em emagrecimento sustentável. Com mais de 15 anos de atuação, ela desenvolveu um método exclusivo que une precisão diagnóstica e acolhimento humano.
                  </p>
                  <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed">
                    Não entregamos apenas dietas; entregamos a liberdade de viver em seu melhor corpo. Nossa abordagem elimina o efeito sanfona através do equilíbrio hormonal e reprogramação metabólica.
                  </p>
                  
                  <div className="flex mb-12">
                    <a href="https://wa.me/5511992876219" className="bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary transition-all flex items-center gap-2 group shadow-xl shadow-secondary/10">
                      Conhecer a Metodologia
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-4 md:gap-8"
                  >
                    <Counter value={1800} suffix="+" label="Pacientes" />
                    <Counter value={15} suffix="+" label="Anos de Exp." />
                    <Counter value={98} suffix="%" label="Retenção" />
                    <Counter value={10} suffix="k+" label="Kg Perdidos" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Why DUNO Section */}
          <section className="py-12 md:py-20 bg-light-bg overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">O Padrão DUNO</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-6">Inovação e <span className="text-primary italic">Precisão</span> para sua saúde</h2>
                <p className="text-base md:text-lg text-gray-500">
                  Abandonamos o "achismo". Utilizamos tecnologia de ponta e análise de dados para mapear cada detalhe do seu metabolismo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {[
                  { title: "Bioimpedância Inclusa", desc: "Avaliação precisa da sua composição corporal em todas as consultas.", icon: <Activity /> },
                  { title: "App Exclusivo", desc: "Seu plano alimentar, metas e chat direto no seu celular.", icon: <Zap /> },
                  { title: "Suporte Diário", desc: "Tire suas dúvidas e receba motivação constante via WhatsApp.", icon: <MessageCircle /> },
                  { title: "Exames Laboratoriais", desc: "Análise profunda dos seus marcadores de saúde e metabolismo.", icon: <Heart /> },
                  { title: "Receitas Práticas", desc: "Acesso a um banco de dados com centenas de receitas saudáveis.", icon: <Apple /> },
                  { title: "Foco Comportamental", desc: "Trabalhamos sua relação com a comida para resultados duradouros.", icon: <Target /> }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.7, 
                      delay: index * 0.1,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    className="bg-white p-6 md:p-10 rounded-[24px] md:rounded-[32px] shadow-xl shadow-gray-100 border border-gray-50 hover:border-primary/20 transition-all group"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-secondary mb-2 md:mb-4">{item.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Success Stats - Authority Builder */}
          <section className="pb-12 md:pb-20 bg-light-bg">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {[
                  { n: "+10.000", t: "Vidas Transformadas", d: "Resultados comprovados" },
                  { n: "15", t: "Anos de Expertise", d: "Experiência clínica sólida" },
                  { n: "98%", t: "Taxa de Satisfação", d: "Pacientes fidelizados" },
                  { n: "+20kg", t: "Média de Perda", d: "Casos de obesidade" }
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center p-6 md:p-8 bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 group hover:border-primary/20 transition-all"
                  >
                    <div className="text-3xl md:text-5xl font-serif font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-500">{stat.n}</div>
                    <div className="text-secondary font-bold text-[10px] md:text-sm uppercase tracking-widest mb-1">{stat.t}</div>
                    <div className="text-gray-400 text-[8px] md:text-xs">{stat.d}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="servicos" className="py-12 md:py-20 bg-white scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Nossos Serviços e <span className="text-primary italic">Programas</span></h2>
                <p className="text-base md:text-lg text-gray-500">
                  Planos personalizados para emagrecer com saúde, ganhar energia e melhorar sua qualidade de vida de forma definitiva.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-20">
                {servicesList.map((service, index) => (
                  <ServiceCard key={index} service={service} index={index} />
                ))}
              </div>

              {/* BMI Calculator Section */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto"
              >
                <Suspense fallback={<div className="h-96 bg-gray-50 rounded-[40px] animate-pulse" />}>
                  <BMICalculator />
                </Suspense>
              </motion.div>

              {/* Mid-page CTA Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-20 md:mt-32 bg-primary rounded-[32px] md:rounded-[48px] p-8 md:p-16 text-white relative overflow-hidden group shadow-2xl shadow-primary/30"
              >
                {/* Decorative background for CTA */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10 grid lg:grid-cols-2 items-center gap-8 md:gap-12">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Pronto para assumir o <span className="italic underline underline-offset-8">controle</span> da sua vida?</h2>
                    <p className="text-white/80 text-base md:text-xl mb-0 leading-relaxed">
                      Não espere o momento perfeito. Ele não existe. Existe apenas a sua decisão de começar hoje com o suporte certo.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                    <a href="https://wa.me/5511992876219" className="bg-white text-primary px-8 md:px-10 py-4 md:py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary hover:text-white transition-all text-center shadow-xl">
                      Começar Agora
                    </a>
                    <a href="#inicio" onClick={(e) => handleGlobalNavClick(e, "#inicio")} className="bg-primary-dark/20 backdrop-blur-md border border-white/20 text-white px-8 md:px-10 py-4 md:py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all text-center">
                      Voltar ao Topo
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Methodology Section - New and Powerful */}
          <section className="py-12 md:py-32 bg-secondary relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">O Diferencial Competitivo</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                    Os 3 Pilares do <span className="text-primary italic">Método DUNO</span>
                  </h2>
                  <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed">
                    Nossa metodologia foi desenhada para quem já tentou de tudo e busca uma solução definitiva, baseada no que há de mais moderno na ciência nutricional mundial.
                  </p>
                  
                  <div className="space-y-8">
                    {[
                      { t: "Mapeamento Metabólico", d: "Análise profunda de exames e composição corporal para identificar gargalos que travam sua perda de gordura.", i: <Activity size={24} /> },
                      { t: "Estratégia Comportamental", d: "Reprogramação de hábitos através da nutrição consciente, eliminando o ciclo de ansiedade e compulsão.", i: <Target size={24} /> },
                      { t: "Suporte de Alta Performance", d: "Acompanhamento diário via app e suporte prioritário para garantir que você nunca perca o foco.", i: <Zap size={24} /> }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 group">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary border border-white/10 group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                          {item.i}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xl mb-2">{item.t}</h4>
                          <p className="text-gray-500 text-sm leading-relaxed">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                  <div className="aspect-square rounded-[48px] overflow-hidden border border-white/10 shadow-2xl relative">
                    <img 
                      src="https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format,compress&fit=crop&q=80&w=1000" 
                      alt="Metodologia Científica DUNO"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating Result Card */}
                  <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl max-w-[280px] hidden md:block">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <CheckCircle2 size={24} />
                      </div>
                      <div className="font-bold text-secondary">Aprovado por Especialistas</div>
                    </div>
                    <p className="text-gray-500 text-xs italic leading-relaxed">
                      "A abordagem da Dra. Luciana é o que há de mais avançado em termos de nutrição integrativa e emagrecimento."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section id="resultados" className="py-12 md:py-20 bg-white overflow-hidden scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-end justify-between mb-8 md:mb-12 gap-6"
              >
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6">Transformações Reais</h2>
                  <p className="text-base md:text-lg text-gray-500">
                    Histórias de superação e saúde que inspiram nossa dedicação diária.
                  </p>
                </div>
                <div className="hidden md:flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary cursor-pointer transition-all">
                    <ChevronRight size={24} className="rotate-180" />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary cursor-pointer transition-all">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {results.map((result, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    className="group relative rounded-[32px] overflow-hidden aspect-[3/4] shadow-xl"
                  >
                    <img 
                      src={result.image} 
                      alt={`Resultado real de emagrecimento de ${result.name} - Clínica DUNO Nutri`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                      <div className="text-white">
                        <div className="text-2xl font-bold mb-1">{result.name}, {result.age} anos</div>
                        <div className="text-primary font-bold text-lg mb-4">Menos {result.lost} eliminados</div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          "O acompanhamento da DUNO Nutri mudou minha vida. Aprendi a comer de verdade e recuperei minha autoestima."
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-secondary font-bold text-sm shadow-lg">
                      Resultado Real
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works / Programas */}
          <section id="programas" className="py-12 md:py-20 bg-secondary text-white scroll-mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="container mx-auto px-4 md:px-6"
            >
              <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6">Nossos Programas e Metodologia</h2>
                <p className="text-gray-400 text-base md:text-lg">
                  Um processo estruturado e científico para garantir que você alcance e mantenha seus objetivos de saúde.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 md:gap-12 relative">
                {[
                  { title: "Avaliação Inicial", desc: "Análise completa do seu histórico, exames e objetivos.", icon: <Users /> },
                  { title: "Plano Personalizado", desc: "Criação da estratégia nutricional exclusiva para você.", icon: <Target /> },
                  { title: "Acompanhamento", desc: "Suporte semanal para ajustes e motivação constante.", icon: <Clock /> },
                  { title: "Manutenção", desc: "Estratégias para manter os resultados por toda a vida.", icon: <Award /> }
                ].map((step, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-primary/20">
                      {step.icon}
                    </div>
                    <div className="text-primary font-bold mb-2">Passo 0{index + 1}</div>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Testimonials Section */}
          <section id="depoimentos" className="py-12 md:py-20 bg-white scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
              >
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6">O que dizem nossos pacientes</h2>
                <p className="text-base md:text-lg text-gray-500">Histórias reais de transformação e saúde.</p>
              </motion.div>

              <Suspense fallback={<div className="h-64 bg-gray-50 rounded-[40px] animate-pulse" />}>
                <Testimonials />
              </Suspense>
            </div>
          </section>

          {/* Instagram Feed Section */}
          <section className="py-12 md:py-20 bg-light-bg overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-end justify-between mb-8 md:mb-12 gap-6">
                <div className="max-w-2xl">
                  <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Acompanhe no Instagram</span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary">Vida Saudável no <span className="text-primary italic">Dia a Dia</span></h2>
                </div>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-secondary px-8 py-4 rounded-2xl font-bold border border-gray-100 hover:border-primary hover:text-primary transition-all flex items-center gap-2"
                >
                  <Instagram size={20} />
                  Seguir @dunonutri
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
                  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
                  "https://images.unsplash.com/photo-1494390248081-4e521a5940db",
                  "https://images.unsplash.com/photo-1466637574441-749b8f19452f",
                  "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af",
                  "https://images.unsplash.com/photo-1498837167922-ddd27525d352"
                ].map((img, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl overflow-hidden shadow-lg group relative"
                  >
                    <img 
                      src={`${img}?auto=format&fit=crop&q=80&w=300`} 
                      alt="Post do Instagram DUNO Nutri" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Instagram size={32} className="text-white" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-12 md:py-20 bg-light-bg scroll-mt-24">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 md:mb-8">Dúvidas Frequentes</h2>
                  <p className="text-base md:text-lg text-gray-500 mb-8 md:mb-10">
                    Ainda tem perguntas? Separamos as dúvidas mais comuns dos nossos pacientes para ajudar você a dar o primeiro passo.
                  </p>
                  <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-xl shadow-gray-100 flex items-center gap-4 md:gap-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="font-bold text-base md:text-lg mb-1">Ainda com dúvidas?</div>
                      <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3">Fale diretamente com nossa equipe no WhatsApp.</p>
                      <a href="https://wa.me/5511992876219" className="text-primary font-bold text-sm md:text-base flex items-center gap-2 hover:underline">
                        Chamar agora <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-gray-200"
                >
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FAQItem question={faq.question} answer={faq.answer} />
                  </motion.div>
                ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact & Location */}
          <section id="contato" className="py-12 md:py-20 bg-white scroll-mt-24">
            <div className="container mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-secondary rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
              >
                <div className="lg:w-1/2 p-8 md:p-16 lg:p-20 text-white">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 md:mb-10">Onde estamos</h2>
                  
                  <div className="space-y-6 md:space-y-8 mb-10 md:mb-12">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
                        <MapPin size={20} className="md:w-6 md:h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-base md:text-lg mb-1">Endereço</div>
                        <p className="text-gray-400 text-sm md:text-base">Av. Paulista, 1000 - Sala 1205<br />Bela Vista, São Paulo - SP</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
                        <Clock size={20} className="md:w-6 md:h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-base md:text-lg mb-1">Horário de Atendimento</div>
                        <p className="text-gray-400 text-sm md:text-base">Segunda a Sexta: 08h às 20h<br />Sábado: 09h às 13h</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5 brightness-0 invert" />
                      </div>
                      <div>
                        <div className="font-bold text-base md:text-lg mb-1">WhatsApp</div>
                        <p className="text-primary font-bold text-lg md:text-xl">(11) 99999-9999</p>
                      </div>
                    </div>
                  </div>

                  <a 
                    href="https://wa.me/5511992876219" 
                    className="inline-flex bg-primary text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 items-center gap-3"
                  >
                    Falar com Atendimento
                    <ArrowRight size={20} />
                  </a>
                </div>

                <div className="lg:w-1/2 h-[450px] lg:h-auto relative">
                  <Suspense fallback={<div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Carregando mapa...</div>}>
                    <InteractiveMap />
                  </Suspense>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-secondary text-white pt-20 pb-10"
          >
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                  <div className="text-3xl font-serif font-bold tracking-tighter mb-8">
                    <span className="text-primary">DUNO</span><span className="text-white">Nutri</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    Especializada em emagrecimento saudável e performance humana. Transformando vidas através da nutrição consciente e baseada em evidências.
                  </p>
                  <div className="flex gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all border border-white/10">
                      <Instagram size={20} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all border border-white/10">
                      <Facebook size={20} />
                    </a>
                    <a href="https://wa.me/5511992876219" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#25D366] transition-all border border-white/10">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Links Rápidos</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li><a href="#inicio" onClick={(e) => handleGlobalNavClick(e, "#inicio")} className="hover:text-primary transition-colors">Início</a></li>
                    <li><a href="#sobre" onClick={(e) => handleGlobalNavClick(e, "#sobre")} className="hover:text-primary transition-colors">Sobre</a></li>
                    <li><a href="#servicos" onClick={(e) => handleGlobalNavClick(e, "#servicos")} className="hover:text-primary transition-colors">Serviços</a></li>
                    <li><a href="#resultados" onClick={(e) => handleGlobalNavClick(e, "#resultados")} className="hover:text-primary transition-colors">Resultados</a></li>
                    <li><a href="#depoimentos" onClick={(e) => handleGlobalNavClick(e, "#depoimentos")} className="hover:text-primary transition-colors">Depoimentos</a></li>
                    <li><a href="#faq" onClick={(e) => handleGlobalNavClick(e, "#faq")} className="hover:text-primary transition-colors">FAQ</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Atendimento</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li className="flex items-start gap-3">
                      <MapPin size={18} className="text-primary shrink-0" />
                      <span>Av. Paulista, 1000 - Sala 1205<br />Bela Vista, São Paulo - SP</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone size={18} className="text-primary shrink-0" />
                      <span>(11) 99287-6219</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail size={18} className="text-primary shrink-0" />
                      <span>contato@dunonutri.com.br</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Horários</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li className="flex justify-between">
                      <span>Segunda - Sexta</span>
                      <span className="text-white">08:00 - 20:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sábado</span>
                      <span className="text-white">09:00 - 13:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Domingo</span>
                      <span className="text-primary font-bold">Fechado</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                <div>© 2026 DUNO Nutri. Dra. Luciana Duno - CRN 12345.</div>
                <div className="flex gap-8">
                  <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
                  <a href="#" className="hover:text-primary transition-colors">Termos</a>
                </div>
              </div>
            </div>
          </motion.footer>

          {/* Floating WhatsApp Button */}
          <div className="fixed bottom-8 right-8 z-50 flex items-center">
            <motion.a 
              href="https://wa.me/5511992876219"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{ 
                scale: [1, 1.05, 1], 
                opacity: 1,
                y: [0, -10, 0]
              }}
              transition={{ 
                scale: {
                  delay: 3,
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: { delay: 3, duration: 0.5, ease: "easeOut" },
                y: {
                  delay: 3.5,
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="relative w-16 h-16 bg-gradient-to-br from-[#34CB76] to-[#075E54] rounded-full flex items-center justify-center shadow-2xl shadow-[#075E54]/20 group transition-transform duration-300"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                alt="WhatsApp" 
                className="w-9 h-9 relative z-10 brightness-0 invert drop-shadow-sm" 
              />
              
              {/* Tooltip */}
              <div className="absolute right-20 px-5 py-3 bg-secondary text-white text-sm font-bold rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-md">
                <span>Agende sua consulta!</span>
                {/* Tooltip Arrow */}
                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-secondary rotate-45 border-r border-t border-white/10" />
              </div>
            </motion.a>
          </div>
    </div>
  );
}
