import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ArrowRight, Dog, Loader2, ShieldAlert, Heart, CheckCircle2 } from 'lucide-react';
import { QuizResponses } from './types';

// Constants and Questions
const QUESTIONS = [
  {
    key: 'age',
    question: "Qual a idade do seu cachorro?",
    options: ['Filhote (0–1 ano)', 'Jovem (1–5 anos)', 'Adulto (5–10 anos)', 'Idoso (10+)']
  },
  {
    key: 'aloneFrequency',
    question: "Ele fica sozinho com frequência?",
    options: ['Sim, muitas horas', 'Algumas horas', 'Quase nunca']
  },
  {
    key: 'behaviorWhenOut',
    question: "Quando você sai, ele costuma:",
    options: ['Latir ou uivar', 'Destruir objetos', 'Ficar quieto, mas estranho', 'Ficar normal']
  },
  {
    key: 'generalBehavior',
    question: "Ele demonstra algum desses comportamentos?",
    options: ['Ansiedade', 'Agressividade', 'Tristeza', 'Nenhum']
  },
  {
    key: 'reactionAtArrival',
    question: "Como ele reage quando você chega em casa?",
    options: ['Muito agitado/desesperado', 'Feliz, mas controlado', 'Normal']
  },
  {
    key: 'sleepQuality',
    question: "Ele dorme bem?",
    options: ['Não, agitado', 'Mais ou menos', 'Sim, tranquilo']
  },
  {
    key: 'signsNoticed',
    question: "Você já percebeu algum desses sinais?",
    options: ['Latidos excessivos', 'Destruição de objetos', 'Mudança de comportamento', 'Não percebi nada']
  }
];

export default function App() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'processing' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponses>({});
  const [processingTextIndex, setProcessingTextIndex] = useState(0);

  const processingTexts = [
    "Analisando comportamento...",
    "Comparando com milhares de cães...",
    "Detectando padrões ocultos..."
  ];

  const handleStart = () => setStep('quiz');

  const handleOptionSelect = (option: string) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    setResponses((prev) => ({ ...prev, [currentQuestion.key]: option }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setStep('processing');
      }, 300);
    }
  };

  useEffect(() => {
    if (step === 'processing') {
      const timer = setInterval(() => {
        setProcessingTextIndex((prev) => {
          if (prev >= processingTexts.length - 1) {
            clearInterval(timer);
            setTimeout(() => setStep('result'), 1500);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center font-sans overflow-x-hidden p-4 md:p-8">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Desktop Info Panel - Hidden on Mobile */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block space-y-10"
        >
          <div>
            <span className="text-red-500 font-bold text-sm uppercase tracking-widest mb-3 block">
              Ferramenta de Diagnóstico Pet
            </span>
            <h1 className="text-5xl font-display font-extrabold text-[#0F172A] leading-[1.1] mb-6">
              Crie Urgência Emocional e Gere Conversões
            </h1>
            <p className="text-xl text-[#475569] leading-relaxed max-w-lg">
              Interface otimizada para quizzes psicológicos de alta conversão. Design focado em dispositivos móveis, transições fluidas e gatilhos de saúde animal.
            </p>
          </div>

          <ul className="space-y-4">
            {[
              "Micro-interações de feedback instantâneo",
              "Barra de progresso de retenção psicológica",
              "Visualização de risco baseada em algoritmos",
              "Chamada para ação de alto impacto (CTA)"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-[#334155] font-semibold text-lg">
                <div className="w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">
                  ✓
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* App Container / Phone Mockup */}
        <div className="w-full flex justify-center">
          <div className="phone-mockup relative w-[340px] h-[680px] bg-[#0A0F1A] rounded-[40px] p-2.5 shadow-2xl border-4 border-[#1E293B]">
            <div className="screen w-full h-full screen-bg rounded-[32px] overflow-hidden flex flex-col relative">
              
              {/* Phone Status Bar Simulation */}
              <div className="px-6 pt-5 pb-2 flex justify-between items-center text-xs font-bold text-[#0F172A]">
                <span>9:41</span>
                <div className="flex gap-1.5">
                  <div className="w-4 h-2 rounded-[1px] border border-current opacity-50" />
                  <div className="w-3 h-2 rounded-[1px] bg-current" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col scrollbar-hide">
                <AnimatePresence mode="wait">
                  {step === 'intro' && (
                    <motion.div
                      key="intro"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col p-8 text-center space-y-10 justify-center"
                    >
                      <div className="space-y-6">
                        <h2 className="text-3xl font-display font-black text-[#0F172A] leading-tight flex flex-col items-center gap-2">
                          <span className="text-3xl">⚠️</span>
                          <span>Seu cachorro pode estar sofrendo em silêncio</span>
                        </h2>
                        <p className="text-lg text-[#475569] font-medium leading-relaxed px-2">
                          Descubra em 60 segundos com esse teste rápido
                        </p>
                      </div>

                      <div className="px-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleStart}
                          className="w-full bg-[#B91C1C] text-white font-bold py-5 rounded-2xl btn-shadow text-xl tracking-tight transition-transform"
                        >
                          COMEÇAR AGORA
                        </motion.button>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-[11px] text-[#64748B] font-black uppercase tracking-widest">
                        <span>⏰</span> 10K+ AVALIAÇÕES REAIS
                      </div>
                    </motion.div>
                  )}

                  {step === 'quiz' && (
                    <motion.div
                      key="quiz"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex-1 flex flex-col p-6"
                    >
                      <div className="mb-6 space-y-2">
                        <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-[#EF4444]"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-[#94A3B8] uppercase">
                          <span>Pergunta {currentQuestionIndex + 1} de {QUESTIONS.length}</span>
                        </div>
                      </div>

                      <div className="space-y-6 flex-1">
                        <h3 className="text-xl font-display font-extrabold text-[#0F172A] leading-snug">
                          {QUESTIONS[currentQuestionIndex].question}
                        </h3>

                        <div className="space-y-3">
                          {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                            <motion.button
                              key={idx}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleOptionSelect(option)}
                              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${
                                responses[QUESTIONS[currentQuestionIndex].key as keyof QuizResponses] === option
                                  ? 'border-[#EF4444] bg-[#FEF2F2] text-[#0F172A]'
                                  : 'border-[#E2E8F0] bg-white text-[#475569]'
                              }`}
                            >
                              <span className="text-sm font-bold">{option}</span>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                responses[QUESTIONS[currentQuestionIndex].key as keyof QuizResponses] === option
                                  ? 'border-[#EF4444] bg-[#EF4444] shadow-[inset_0_0_0_4px_white]'
                                  : 'border-[#CBD5E1]'
                              }`} />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 'processing' && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6"
                    >
                      <Loader2 className="w-12 h-12 text-[#EF4444] animate-spin" />
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={processingTextIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-lg font-bold text-[#1E293B]"
                        >
                          {processingTexts[processingTextIndex]}
                        </motion.p>
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {step === 'result' && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col p-6 items-center text-center space-y-6 overflow-y-auto scrollbar-hide"
                    >
                      <div className="bg-[#FEF2F2] text-[#B91C1C] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#FEE2E2]">
                        ⚠️ Alerta de Saúde
                      </div>

                      <div className="relative pt-4">
                        <div className="w-40 h-20 relative overflow-hidden">
                          <div className="w-40 h-40 border-[15px] border-[#F1F5F9] rounded-full" />
                          <motion.div 
                            initial={{ rotate: -45 }}
                            animate={{ rotate: 135 }}
                            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                            className="absolute top-0 w-40 h-40 border-[15px] border-transparent border-t-[#EF4444] border-r-[#EF4444] rounded-full"
                          />
                        </div>
                        <div className="text-4xl font-black text-[#1E293B] -mt-2">87%</div>
                        <div className="text-[10px] font-black text-[#64748B] uppercase tracking-wider">Risco Elevado</div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-lg font-display font-extrabold text-[#0F172A] leading-tight">
                          Sinais de sofrimento silencioso identificados
                        </h4>
                        <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                          Seu cachorro apresenta padrões de ansiedade severa que podem evoluir para problemas crônicos de saúde se não forem tratados agora.
                        </p>
                      </div>

                      <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl text-left space-y-2">
                        <div className="flex items-center gap-2 text-[#EF4444] font-bold text-xs uppercase">
                          <Heart className="w-3 h-3 fill-current" /> Plano de Reversão
                        </div>
                        <p className="text-[10px] text-[#475569] leading-relaxed">
                          A boa notícia é que isso pode ser revertido com um método simples que você pode aplicar ainda hoje.
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = 'https://pay.cakto.com.br/32jojdc_874837'}
                        className="w-full bg-[#EF4444] text-white font-bold py-5 rounded-2xl shadow-xl shadow-red-200 text-sm tracking-wide mt-auto cursor-pointer"
                      >
                        VER COMO AJUDAR MEU CÃO
                      </motion.button>
                      
                      <div className="flex gap-4 opacity-50">
                        <ShieldAlert className="w-4 h-4 text-slate-400" />
                        <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Mobile-only Footer info snippet */}
      <div className="lg:hidden mt-8 text-center text-[#64748B] text-sm px-6">
        <p className="font-medium italic leading-relaxed">
          "Identifique padrões de ansiedade em minutos e proteja o bem-estar do seu melhor amigo."
        </p>
      </div>
    </div>
  );
}
