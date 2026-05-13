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
  Star,
  Brain,
  Dna
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 30px 60px -15px rgba(5, 150, 105, 0.25)"
      }}
      className="group bg-white rounded-[32px] overflow-hidden flex flex-col aspect-[4/5] md:aspect-[3/4.5] shadow-lg border border-gray-100 transition-all duration-500 relative"
    >
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-[32px] transition-all duration-500 pointer-events-none z-20" />
      
      {/* Top Image Section - Exactly 50% */}
      <div className="h-1/2 overflow-hidden relative shrink-0">
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Content Block Below - Exactly 50% & Centralized */}
      <div className="p-6 md:p-8 flex flex-col h-1/2 items-center text-center">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-secondary mb-3 leading-tight group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        
        <p className="text-gray-500 text-[11px] md:text-sm leading-relaxed mb-4 flex-grow max-w-[240px]">
          {service.description}
        </p>
        
        {/* Footer Section - Standardized Button */}
        <div className="pt-6 border-t border-gray-50 flex items-center justify-center mt-auto w-full">
          <a 
            href={`https://wa.me/5511992876219?text=Olá! Gostaria de saber mais sobre o ${service.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-secondary transition-all shadow-lg shadow-primary/20"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </motion.div>
  );
};
;


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
  const [activeResultIndex, setActiveResultIndex] = useState(0);

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
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[35%] h-[35%] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <Header onNavClick={handleGlobalNavClick} />

          <section id="inicio" className="relative min-h-[600px] md:min-h-screen flex flex-col pt-28 md:pt-32 pb-12 md:pb-20">
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
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/85 md:from-black/95 via-black/60 to-black/20" />
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
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[0.95] md:leading-[0.9] mb-6 md:mb-8 tracking-tighter drop-shadow-2xl">
                  Domine sua <span className="text-primary italic">biologia</span>. Transforme sua vida.
                </h1>
                <p className="text-base md:text-2xl text-white/90 mb-8 md:mb-12 leading-relaxed max-w-2xl font-light drop-shadow-lg">
                  Esqueça as dietas genéricas. Desenvolvemos estratégias de elite baseadas em precisão genética e reprogramação metabólica para resultados permanentes.
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
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                    Agendar Consulta VIP
                    <ArrowRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.a 
                    href="#servicos" 
                    onClick={(e) => handleGlobalNavClick(e, "#servicos")}
                    whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 backdrop-blur-xl text-white border border-white/30 px-8 md:px-12 py-5 md:py-6 rounded-full font-black uppercase tracking-widest text-sm md:text-lg hover:bg-white hover:text-secondary transition-all flex items-center justify-center"
                  >
                    Ver Programas
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
                  <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Autoridade Médica & Científica</span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 md:mb-8 leading-tight text-secondary">
                    Reprogramação Biológica: O fim do <span className="text-primary italic">efeito sanfona</span>.
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                    A <strong>Dra. Luciana Duno</strong> não entrega apenas planos alimentares; ela projeta novas realidades biológicas. Com 15 anos de expertise clínica, seu método é a união definitiva entre alta tecnologia diagnóstica e nutrição comportamental humanizada.
                  </p>
                  <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed">
                    Nossa missão é devolver a você o controle total sobre o seu corpo. Através da modulação hormonal e otimização enzimática, garantimos que sua jornada seja sustentável, prazerosa e, acima de tudo, extraordinária.
                  </p>
                  
                  <div className="flex mb-12">
                    <a href="https://wa.me/5511992876219" className="bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary transition-all flex items-center gap-2 group shadow-xl shadow-secondary/10">
                      Conhecer a Metodologia
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                </motion.div>
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
                  <p className="text-white/80 text-lg md:text-xl mb-12 leading-relaxed">
                    Nossa metodologia foi desenhada para quem já tentou de tudo e busca uma solução definitiva, baseada no que há de mais moderno na ciência nutricional mundial.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { t: "Ciência & Bioindividualidade", d: "Mapeamento genético e metabólico profundo para entender o que o seu corpo realmente precisa para queimar gordura.", i: <Dna size={24} /> },
                      { t: "Reprogramação Comportamental", d: "Técnicas avançadas para dominar a ansiedade e os gatilhos emocionais, transformando sua relação com a comida.", i: <Brain size={24} /> },
                      { t: "Performance Humana", d: "Monitoramento contínuo e ajustes dinâmicos no protocolo para garantir que sua evolução nunca encontre um platô.", i: <Activity size={24} /> }
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-primary/30 backdrop-blur-md transition-all duration-500 group"
                      >
                        <motion.div 
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5, ease: "easeInOut" }}
                          className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform"
                        >
                          {item.i}
                        </motion.div>
                        <div>
                          <h4 className="text-white font-bold text-xl mb-2 group-hover:text-primary transition-colors">{item.t}</h4>
                          <p className="text-white/70 text-sm leading-relaxed max-w-md font-medium">{item.d}</p>
                        </div>
                      </motion.div>
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
                <div className="md:hidden flex gap-4">
                  <div 
                    onClick={() => setActiveResultIndex((prev) => (prev - 1 + results.length) % results.length)}
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary cursor-pointer transition-all active:scale-95"
                  >
                    <ChevronRight size={24} className="rotate-180" />
                  </div>
                  <div 
                    onClick={() => setActiveResultIndex((prev) => (prev + 1) % results.length)}
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary cursor-pointer transition-all active:scale-95"
                  >
                    <ChevronRight size={24} />
                  </div>
                </div>
              </motion.div>

              <div className="relative">
                {/* Desktop Grid (Hidden on Mobile) */}
                <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16">
                  {results.map((result, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15 }}
                      className="group relative rounded-[40px] overflow-hidden aspect-[3/4.5] shadow-2xl border-2 border-primary/20 hover:border-primary transition-all duration-700 bg-secondary"
                    >
                      <img 
                        src={result.image} 
                        alt={`Resultado real - ${result.name}`}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      
                      {/* Floating Badges */}
                      <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                        <div className="bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                          -{result.lost} Eliminados
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-500 p-10 flex flex-col justify-end">
                        <div className="text-white drop-shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="bg-primary text-white inline-block px-4 py-2 rounded-xl text-lg font-black mb-6 shadow-2xl relative overflow-hidden group/badge">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/badge:animate-shine" />
                            -{result.lost} Eliminados
                          </div>
                          <div className="text-3xl font-serif font-bold mb-2">{result.name}</div>
                          <div className="text-white/60 font-bold text-sm uppercase tracking-[0.2em]">{result.age} Anos • Resultado Real</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Carousel - More compact */}
                <div className="md:hidden relative px-2 mb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeResultIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="relative bg-secondary rounded-[24px] overflow-hidden shadow-xl aspect-[4/5]"
                    >
                      <img 
                        src={results[activeResultIndex].image} 
                        alt={results[activeResultIndex].name}
                        className="w-full h-full object-cover opacity-90"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent p-6 flex flex-col justify-end">
                        <div className="text-white drop-shadow-xl">
                          <div className="bg-primary text-white inline-block px-4 py-2 rounded-xl text-lg font-black mb-4 shadow-xl">
                            -{results[activeResultIndex].lost}
                          </div>
                          <div className="text-3xl font-serif font-bold mb-1">{results[activeResultIndex].name}</div>
                          <div className="text-white/60 font-bold text-sm uppercase tracking-widest">{results[activeResultIndex].age} Anos</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full left-0 px-2 pointer-events-none">
                    <button 
                      onClick={() => setActiveResultIndex((prev) => (prev - 1 + results.length) % results.length)}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white pointer-events-auto active:bg-primary transition-all shadow-2xl"
                    >
                      <ChevronRight className="rotate-180" size={24} />
                    </button>
                    <button 
                      onClick={() => setActiveResultIndex((prev) => (prev + 1) % results.length)}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white pointer-events-auto active:bg-primary transition-all shadow-2xl"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>

                {/* Be the Next CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <a 
                    href="https://wa.me/5511992876219" 
                    className="inline-flex flex-col items-center group gap-4"
                  >
                    <div className="bg-secondary text-white px-10 py-6 rounded-[24px] font-black uppercase tracking-[0.2em] text-sm group-hover:bg-primary transition-all duration-500 shadow-2xl flex items-center gap-4">
                      Quero ser a próxima transformação
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>
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

          {/* Instagram Section Redesigned */}
          <section className="py-12 md:py-24 bg-light-bg overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-16 gap-6">
                <div className="max-w-2xl">
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Comunidade DUNO</span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary leading-tight">
                    Transformações reais no <span className="text-primary italic">Dia a Dia</span>
                  </h2>
                  <p className="text-gray-500 mt-4 text-sm md:text-base">
                    Acompanhe bastidores, dicas exclusivas e resultados de pacientes que decidiram mudar de vida. 
                  </p>
                </div>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-secondary px-8 py-4 rounded-2xl font-bold border border-gray-100 hover:border-primary hover:text-primary transition-all flex items-center gap-2 shadow-sm"
                >
                  <Instagram size={20} />
                  Ver Instagram
                </a>
              </div>
 
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
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
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Instagram size={32} className="text-white" />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Added WhatsApp CTA below Instagram */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-secondary rounded-[32px] p-8 md:p-12 text-center text-white relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">Inspirado por esses resultados?</h3>
                  <p className="text-gray-400 mb-10 max-w-xl mx-auto">Sua transformação pode ser a próxima. Agende uma conversa inicial e descubra o caminho para o seu melhor corpo.</p>
                  <a 
                    href="https://wa.me/5511992876219" 
                    className="inline-flex bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 items-center gap-3"
                  >
                    Quero meus resultados
                    <ArrowRight size={20} />
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Patient Journey - Step by Step */}
          <section className="py-12 md:py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">A Jornada DUNO</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary">Sua evolução em <span className="text-primary italic">4 etapas</span></h2>
              </div>

              <div className="grid md:grid-cols-4 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gray-100 hidden md:block -z-0" />
                
                {[
                  { t: "Mapeamento", d: "Avaliação profunda de bioimpedância, exames e rotina biológica.", n: "01" },
                  { t: "Estratégia Elite", d: "Criação do seu protocolo exclusivo focado em reprogramação metabólica.", n: "02" },
                  { t: "Fase Ativa", d: "Acesso ao app e início da modulação hormonal via alimentação.", n: "03" },
                  { t: "Domínio", d: "Ajustes de alta performance para consolidação do novo peso definitivo.", n: "04" }
                ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-xl shadow-gray-100 relative z-10 group hover:border-primary/20 transition-all"
                  >
                    <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      {step.n}
                    </div>
                    <h4 className="text-xl font-bold text-secondary mb-3">{step.t}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.d}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <a href="https://wa.me/5511992876219" className="text-primary font-bold hover:underline flex items-center justify-center gap-2">
                  Ver disponibilidade na agenda <ArrowRight size={18} />
                </a>
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
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#25D366]">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
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

          {/* Contact & Location Redesigned */}
          <section id="contato" className="py-20 md:py-32 bg-light-bg scroll-mt-24">
            <div className="container mx-auto px-6">
              <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-stretch">
                {/* Info Block */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:w-[45%] flex flex-col"
                >
                  <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Venha nos Visitar</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary mb-12 leading-tight">Sua jornada começa no <span className="text-primary italic">nosso espaço</span>.</h2>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 mb-12">
                    {[
                      { icon: <MapPin />, title: "Localização", content: "Av. Paulista, 1000 • Sala 1205\nSão Paulo, SP", color: "bg-primary/5 text-primary" },
                      { icon: <Clock />, title: "Atendimento", content: "Seg a Sex: 08h às 20h\nSábado: 09h às 13h", color: "bg-secondary/5 text-secondary" },
                      { 
                        icon: <div className="w-6 h-6 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="fill-[#25D366]">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>, 
                      title: "WhatsApp", content: "(11) 99287-6219", color: "bg-[#25D366]/5 text-[#25D366]" 
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 p-6 rounded-[24px] bg-white border border-white shadow-xl shadow-gray-100 group hover:border-primary/20 transition-all">
                        <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-bold text-secondary text-sm mb-1 uppercase tracking-widest">{item.title}</div>
                          <p className="text-gray-500 text-sm md:text-base whitespace-pre-line leading-relaxed font-medium">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a 
                    href="https://wa.me/5511992876219" 
                    className="bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group"
                  >
                    Agendar Consulta VIP
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </a>
                </motion.div>

                {/* Map Container */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:w-[55%] h-[500px] lg:h-auto min-h-[500px] relative rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white"
                >
                  <Suspense fallback={<div className="w-full h-full bg-gray-50 animate-pulse flex items-center justify-center text-gray-300 font-bold tracking-widest">Carregando Mapa Estelar...</div>}>
                    <InteractiveMap />
                  </Suspense>
                  
                  {/* Floating Social Badge */}
                  <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-white/20 shadow-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                        <Instagram size={20} />
                      </div>
                      <div className="text-secondary font-bold text-xs uppercase tracking-widest">@lucianadunonutri</div>
                    </div>
                    <a href="https://instagram.com" target="_blank" className="bg-secondary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors">Seguir</a>
                  </div>
                </motion.div>
              </div>
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
              className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 group transition-transform duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white drop-shadow-sm">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              
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
