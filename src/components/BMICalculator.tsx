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

  return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
      <div className="grid md:grid-cols-2">
        <div className="p-8 md:p-16 bg-secondary text-white">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 md:mb-8">
            <Calculator size={28} className="md:w-8 md:h-8" />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 md:mb-6">Calculadora de IMC</h3>
          <p className="text-sm md:text-base text-gray-400 mb-8 md:mb-10 leading-relaxed">
            O Índice de Massa Corporal (IMC) é um cálculo simples que permite avaliar se você está em um peso ideal. Use nossa ferramenta gratuita.
          </p>
          
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 md:mb-3">Peso (kg)</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 75"
                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-6 text-white focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 md:mb-3">Altura (cm)</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ex: 175"
                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-6 text-white focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
              />
            </div>
            <button 
              onClick={calculateBMI}
              className="w-full bg-primary text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
            >
              Calcular Agora
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 md:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2" />
          
          {!result ? (
            <div className="relative z-10">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4 md:mb-6 mx-auto">
                <Info size={40} className="md:w-12 md:h-12" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-secondary mb-3 md:mb-4">Aguardando dados...</h4>
              <p className="text-gray-500 text-xs md:text-sm">Insira seu peso e altura para ver o resultado e receber uma breve orientação nutricional.</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 md:mb-2">Seu IMC é</div>
              <div className={`text-6xl md:text-8xl font-serif font-bold mb-2 md:mb-4 ${result.color}`}>
                {result.bmi}
              </div>
              <div className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 ${result.color}`}>
                {result.category}
              </div>
              
              <div className="bg-gray-50 p-6 md:p-8 rounded-2xl md:rounded-3xl text-left mb-8 md:mb-10">
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {result.bmi < 25 
                    ? "Parabéns! Você está dentro da faixa ideal. Manter uma alimentação equilibrada é a chave para a longevidade." 
                    : "Seu IMC indica que podemos otimizar sua saúde. Pequenas mudanças na rotina podem trazer grandes resultados."}
                </p>
              </div>

              <a 
                href={`https://wa.me/5511992876219?text=Olá! Calculei meu IMC no site e deu ${result.bmi}. Gostaria de agendar uma consulta.`}
                className="text-primary font-bold hover:underline flex items-center gap-2 justify-center"
              >
                Falar com a Dra. Luciana
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
