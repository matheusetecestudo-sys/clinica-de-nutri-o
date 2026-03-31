import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
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
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
      {testimonials.map((t, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-xl shadow-gray-100 border border-gray-50 flex flex-col relative"
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
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-lg">
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
  );
};

export default Testimonials;
