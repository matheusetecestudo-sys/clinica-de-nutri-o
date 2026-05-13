import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Info, ArrowRight } from 'lucide-react';

const BMICalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;

    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category = '';
      let color = '';

      if (bmi < 18.5) {
        category = 'Abaixo do peso';
        color = 'text-blue-500';
      } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Peso normal';
        color = 'text-primary';
      } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Sobrepeso';
        color = 'text-yellow-500';
      } else {
        category = 'Obesidade';
        color = 'text-red-500';
      }

      setResult({ bmi, category, color });
    }
  };

  const getStatusWidth = (bmi: number) => {
    const min = 15;
    const max = 40;
    const percentage = ((bmi - min) / (max - min)) * 100;
    return `${Math.min(Math.max(percentage, 5), 100)}%`;
  };

  return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
      <div className="grid md:grid-cols-2">
        <div className="p-8 md:p-16 bg-[#121212] text-white">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 md:mb-8 shadow-inner">
            <Calculator size={28} className="md:w-8 md:h-8" />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 md:mb-6">Análise de <span className="text-primary italic">Composição</span></h3>
          <p className="text-sm md:text-base text-gray-400 mb-8 md:mb-10 leading-relaxed">
            Descubra seu Índice de Massa Corporal e receba um diagnóstico preliminar baseado em protocolos de saúde integrativa.
          </p>
          
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 md:mb-3">Seu Peso Atual (kg)</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 75"
                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-6 text-white focus:outline-none focus:border-primary transition-colors text-sm md:text-base font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 md:mb-3">Sua Altura (cm)</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ex: 175"
                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-6 text-white focus:outline-none focus:border-primary transition-colors text-sm md:text-base font-medium"
              />
            </div>
            <button 
              onClick={calculateBMI}
              className="w-full bg-primary text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-white hover:text-primary transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
            >
              Iniciar Diagnóstico
              <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="p-8 md:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden bg-gray-50/30">
          {!result ? (
            <div className="relative z-10">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-gray-200 mb-4 md:mb-6 mx-auto shadow-sm">
                <Info size={40} className="md:w-12 md:h-12" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-secondary mb-3 md:mb-4 tracking-tight">Pronto para o próximo nível?</h4>
              <p className="text-gray-500 text-xs md:text-sm max-w-xs leading-relaxed">Preencha os dados ao lado para desbloquear sua análise metabólica instantânea.</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 w-full max-w-sm"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Resultado da Bioanálise</div>
              
              <div className="relative h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: getStatusWidth(result.bmi) }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_10px_rgba(5,150,105,0.5)]"
                />
              </div>

              <div className="text-6xl md:text-8xl font-serif font-bold text-secondary mb-2 drop-shadow-sm">
                {result.bmi}
              </div>
              <div className="text-primary font-black uppercase tracking-[0.2em] text-xs md:text-sm mb-10">
                {result.category}
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-[32px] text-left mb-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                <p className="text-secondary text-sm md:text-base leading-relaxed font-medium">
                  {result.bmi < 25 
                    ? "Excelente! Sua composição está na faixa de saúde. O próximo passo é otimizar sua micronutrição para máxima performance." 
                    : "Identificamos potencial de melhora. Com o protocolo certo de reprogramação metabólica, podemos transformar esses números em sua melhor versão."}
                </p>
              </div>

              <a 
                href={`https://wa.me/5511992876219?text=Olá Dra. Luciana! Meu IMC deu ${result.bmi} (${result.category}). Gostaria de agendar uma consulta.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-white px-7 py-3 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-secondary transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20 whitespace-nowrap"
              >
                Agendar Consulta VIP
                <ArrowRight size={16} />
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
