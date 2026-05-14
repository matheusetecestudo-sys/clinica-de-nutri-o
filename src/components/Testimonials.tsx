import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Ana Paula",
      role: "Empresária",
      text: "A Dra. Luciana mudou minha relação com a comida. Perdi 12kg sem sofrimento e hoje tenho muito mais energia para o meu dia a dia.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format,compress&fit=crop&q=80&w=200&fm=webp"
    },
    {
      name: "Marcos Oliveira",
      role: "Atleta Amador",
      text: "O acompanhamento nutricional foi o diferencial para minha performance nas maratonas. O plano é muito bem estruturado e fácil de seguir.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format,compress&fit=crop&q=80&w=200&fm=webp"
    },
    {
      name: "Beatriz Santos",
      role: "Professora",
      text: "Sempre tive dificuldade em manter o peso. Com a DUNO Nutri, aprendi a comer de forma consciente e os resultados vieram naturalmente.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format,compress&fit=crop&q=80&w=200&fm=webp"
    },
    {
      name: "Ricardo Mendes",
      role: "Advogado",
      text: "Impressionado com o nível de detalhamento dos exames e do plano. É ciência aplicada de verdade, sem fórmulas mágicas.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format,compress&fit=crop&q=80&w=200&fm=webp"
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative">
      {/* Desktop Grid - High End Editorial */}
      <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
        {testimonials.slice(0, 3).map((t, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="bg-white p-10 lg:p-12 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-2 border-primary/5 hover:border-primary transition-all duration-700 flex flex-col relative group"
          >
            <div className="absolute -top-6 left-12 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <Quote size={24} />
            </div>
            
            <div className="flex gap-1 mb-8">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-accent text-accent" />
              ))}
            </div>

            <p className="text-secondary font-serif italic text-lg leading-relaxed mb-10 flex-grow">
              "{t.text}"
            </p>

            <div className="flex items-center gap-5 border-t border-gray-50 pt-8">
              <div className="relative">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-2xl border-2 border-white ring-4 ring-primary/5">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#25D366] text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                  <CheckCircle2 size={12} fill="white" className="text-[#25D366]" />
                </div>
              </div>
              <div>
                <div className="font-bold text-secondary text-base lg:text-lg mb-0.5">{t.name}</div>
                <div className="text-[10px] lg:text-xs text-primary font-black uppercase tracking-[0.2em]">{t.role} • Verificado</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Carousel - Premium Experience */}
      <div className="md:hidden relative px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "circOut" }}
            className="bg-white p-8 rounded-[32px] shadow-xl border border-primary/10 flex flex-col relative"
          >
             <div className="absolute -top-5 right-8 w-10 h-10 bg-primary/10 text-primary rounded-2xl flex items-center justify-center rotate-12">
              <Quote size={20} />
            </div>
            
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-accent text-accent" />
              ))}
            </div>

            <p className="text-secondary font-serif italic text-base leading-relaxed mb-8 flex-grow relative z-10">
              "{testimonials[activeIndex].text}"
            </p>

            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-white ring-2 ring-primary/5">
                  <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#25D366] text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  <CheckCircle2 size={10} fill="white" className="text-[#25D366]" />
                </div>
              </div>
              <div>
                <div className="font-bold text-secondary text-sm leading-tight">{testimonials[activeIndex].name}</div>
                <div className="text-[9px] text-primary font-black uppercase tracking-widest">{testimonials[activeIndex].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls - Faster response */}
        <div className="flex items-center justify-between mt-8 px-4">
          <button 
            onClick={prev}
            className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-primary shadow-lg active:scale-95 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-primary w-6" : "bg-gray-200 w-1.5"}`}
              />
            ))}
          </div>
          <button 
            onClick={next}
            className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-primary shadow-lg active:scale-95 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
