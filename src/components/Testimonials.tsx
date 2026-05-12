import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.slice(0, 3).map((t, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-xl shadow-gray-100 border-2 border-primary/20 hover:border-primary transition-all duration-500 flex flex-col relative"
          >
            <div className="absolute top-8 right-8 md:top-10 md:right-10 text-primary/10">
              <Quote size={40} className="md:w-12 md:h-12" />
            </div>
            
            <div className="flex gap-1 mb-4 md:mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-accent text-accent md:w-4 md:h-4" />
              ))}
            </div>

            <p className="text-gray-600 italic leading-relaxed mb-8 md:mb-10 flex-grow text-sm md:text-base">
              "{t.text}"
            </p>

            <div className="flex items-center gap-4 border-t border-gray-100 pt-6 md:pt-8">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-lg border-2 border-white">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </div>
              <div>
                <div className="font-bold text-secondary text-sm md:text-base">{t.name}</div>
                <div className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-widest">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-[24px] shadow-xl border-2 border-primary/30 flex flex-col relative"
          >
             <div className="absolute top-6 right-6 text-primary/10">
              <Quote size={32} />
            </div>
            
            <div className="flex gap-1 mb-4">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} size={12} className="fill-accent text-accent" />
              ))}
            </div>

            <p className="text-gray-600 italic leading-relaxed mb-6 flex-grow text-xs line-clamp-4">
              "{testimonials[activeIndex].text}"
            </p>

            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-md border-2 border-white">
                <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-secondary text-xs">{testimonials[activeIndex].name}</div>
                <div className="text-[8px] text-gray-400 font-medium uppercase tracking-widest">{testimonials[activeIndex].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button 
            onClick={prev}
            className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary active:bg-primary active:text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-primary w-4" : "bg-gray-200"}`}
              />
            ))}
          </div>
          <button 
            onClick={next}
            className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary active:bg-primary active:text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
