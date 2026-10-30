import React, { useState } from 'react';
import { Occupation } from '../types';
import { OCCUPATIONS } from '../data/occupations';
import { JobIcon } from './JobIcon';
import { soundEffects, speakEnglish } from '../utils/audio';
import { 
  BookOpen, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Star, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReadingSectionProps {
  onEarnStars: (count: number) => void;
  onActivityComplete: (activityId: string) => void;
  showSpanishHelp: boolean;
}

type ReadingTab = 'match' | 'cloze' | 'stories';

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  onEarnStars,
  onActivityComplete,
  showSpanishHelp
}) => {
  const [activeTab, setActiveTab] = useState<ReadingTab>('match');

  // --- Activity 1: Read and Match State ---
  const [matchIndex, setMatchIndex] = useState(0);
  const matchItems = [
    {
      textEn: 'I put on a yellow helmet and use a big hose to extinguish fires.',
      textEs: 'Me pongo un casco amarillo y uso una gran manguera para apagar incendios.',
      target: OCCUPATIONS.find(o => o.id === 'firefighter')!,
      options: [
        OCCUPATIONS.find(o => o.id === 'firefighter')!,
        OCCUPATIONS.find(o => o.id === 'police_officer')!,
        OCCUPATIONS.find(o => o.id === 'baker')!,
        OCCUPATIONS.find(o => o.id === 'pilot')!
      ]
    },
    {
      textEn: 'I wake up at 5:00 AM on the farm to harvest delicious red coffee beans.',
      textEs: 'Madrugo a las 5:00 AM en la finca para recolectar granos rojos de café.',
      target: OCCUPATIONS.find(o => o.id === 'farmer')!,
      options: [
        OCCUPATIONS.find(o => o.id === 'chef')!,
        OCCUPATIONS.find(o => o.id === 'farmer')!,
        OCCUPATIONS.find(o => o.id === 'dentist')!,
        OCCUPATIONS.find(o => o.id === 'doctor')!
      ]
    },
    {
      textEn: 'I work in a school with books and a board to teach reading and science to children.',
      textEs: 'Trabajo en un colegio con libros y tablero para enseñar a los niños.',
      target: OCCUPATIONS.find(o => o.id === 'teacher')!,
      options: [
        OCCUPATIONS.find(o => o.id === 'singer')!,
        OCCUPATIONS.find(o => o.id === 'nurse')!,
        OCCUPATIONS.find(o => o.id === 'teacher')!,
        OCCUPATIONS.find(o => o.id === 'gardener')!
      ]
    },
    {
      textEn: 'I wear a white coat and examine your teeth so you have a bright healthy smile.',
      textEs: 'Uso bata blanca y reviso tus dientes para que tengas una sonrisa sana.',
      target: OCCUPATIONS.find(o => o.id === 'dentist')!,
      options: [
        OCCUPATIONS.find(o => o.id === 'dentist')!,
        OCCUPATIONS.find(o => o.id === 'engineer')!,
        OCCUPATIONS.find(o => o.id === 'carpenter')!,
        OCCUPATIONS.find(o => o.id === 'driver')!
      ]
    }
  ];
  const currentMatch = matchItems[matchIndex % matchItems.length];
  const [matchSelected, setMatchSelected] = useState<string | null>(null);
  const [matchFeedback, setMatchFeedback] = useState<'correct' | 'wrong' | null>(null);

  // --- Activity 2: Complete the Sentence (Cloze) ---
  const [clozeIndex, setClozeIndex] = useState(0);
  const clozeQuestions = [
    {
      promptEn: 'A doctor works in a ________ and cures sick people.',
      promptEs: 'Un médico trabaja en un ________ y cura a las personas.',
      answer: 'hospital',
      options: ['hospital', 'kitchen', 'farm', 'airport']
    },
    {
      promptEn: 'A chef uses pots and knives in a ________ to cook food.',
      promptEs: 'Un chef usa ollas y cuchillos en un(a) ________ para cocinar.',
      answer: 'restaurant',
      options: ['restaurant', 'school', 'bus', 'park']
    },
    {
      promptEn: 'Carlos is a ________. He drives an airplane high in the sky.',
      promptEs: 'Carlos es un(a) ________. Vuela un avión en el cielo.',
      answer: 'pilot',
      options: ['pilot', 'fisherman', 'scientist', 'dentist']
    },
    {
      promptEn: 'Maria loves wood. She uses a hammer and a saw. She is a ________.',
      promptEs: 'A María le encanta la madera. Usa martillo y serrucho. Es ________.',
      answer: 'carpenter',
      options: ['carpenter', 'singer', 'police officer', 'nurse']
    }
  ];
  const currentCloze = clozeQuestions[clozeIndex % clozeQuestions.length];
  const [clozeSelected, setClozeSelected] = useState<string | null>(null);
  const [clozeFeedback, setClozeFeedback] = useState<'correct' | 'wrong' | null>(null);

  // --- Activity 3: Who is this Person? (Short Reading Passage) ---
  const [storyIndex, setStoryIndex] = useState(0);
  const stories = [
    {
      id: 'maria_school',
      title: 'Maria in Armenia, Quindío',
      passageEn: 'Maria wakes up early every morning. She carries colorful books and markers in her backpack. She arrives at her classroom at 7:00 AM. She smiles and says: "Good morning, students!" She loves reading stories and teaching math.',
      passageEs: 'María madruga todas las mañanas. Lleva libros coloridos y marcadores en su morral. Llega a su salón a las 7:00 AM. Sonríe y dice: "¡Buenos días, estudiantes!". Le encanta leer historias y enseñar matemáticas.',
      questionEn: 'What is Maria’s job?',
      questionEs: '¿Cuál es la profesión de María?',
      correctAnswer: 'Teacher',
      options: ['Teacher', 'Chef', 'Police officer', 'Pilot'],
      icon: 'GraduationCap'
    },
    {
      id: 'don_pedro_farm',
      title: 'Don Pedro in the Colombian Mountains',
      passageEn: 'Don Pedro lives in the green mountains of Antioquia. He wears a traditional straw hat and rubber boots. Every day, he tends to the coffee plants and picks ripe red berries. He carries his heavy woven basket with pride.',
      passageEs: 'Don Pedro vive en las verdes montañas de Antioquia. Usa un sombrero tradicional y botas de caucho. Todos los días cuida los cafetales y recolecta granos rojos maduros.',
      questionEn: 'What does Don Pedro do?',
      questionEs: '¿A qué se dedica Don Pedro?',
      correctAnswer: 'Farmer',
      options: ['Farmer', 'Dentist', 'Doctor', 'Singer'],
      icon: 'Tractor'
    },
    {
      id: 'nurse_paola',
      title: 'Nurse Paola at the Health Clinic',
      passageEn: 'Paola works in a busy municipal hospital. She checks children’s body temperature with a thermometer. She prepares vaccines gently so boys and girls do not cry. She always wears a clean blue uniform and a friendly smile.',
      passageEs: 'Paola trabaja en un hospital municipal. Toma la temperatura de los niños con un termómetro. Prepara las vacunas con mucho cariño para que no lloren.',
      questionEn: 'Where does Paola work?',
      questionEs: '¿Dónde trabaja Paola?',
      correctAnswer: 'In a hospital',
      options: ['In a hospital', 'In a bakery', 'On a plane', 'On a soccer pitch'],
      icon: 'HeartPulse'
    }
  ];
  const currentStory = stories[storyIndex % stories.length];
  const [storySelected, setStorySelected] = useState<string | null>(null);
  const [storyFeedback, setStoryFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Handlers for Match
  const handleMatchSelect = (job: Occupation) => {
    if (matchFeedback) return;
    setMatchSelected(job.id);
    if (job.id === currentMatch.target.id) {
      soundEffects.playSuccess();
      setMatchFeedback('correct');
      onEarnStars(3);
      if (matchIndex >= 3) {
        onActivityComplete('reading_match');
        try { confetti({ particleCount: 40, spread: 60 }); } catch {}
      }
    } else {
      soundEffects.playGentleTryAgain();
      setMatchFeedback('wrong');
    }
  };

  // Handlers for Cloze
  const handleClozeSelect = (opt: string) => {
    if (clozeFeedback) return;
    setClozeSelected(opt);
    if (opt === currentCloze.answer) {
      soundEffects.playSuccess();
      setClozeFeedback('correct');
      onEarnStars(3);
      if (clozeIndex >= 3) {
        onActivityComplete('reading_cloze');
        try { confetti({ particleCount: 40, spread: 60 }); } catch {}
      }
    } else {
      soundEffects.playGentleTryAgain();
      setClozeFeedback('wrong');
    }
  };

  // Handlers for Story
  const handleStorySelect = (opt: string) => {
    if (storyFeedback) return;
    setStorySelected(opt);
    if (opt === currentStory.correctAnswer) {
      soundEffects.playSuccess();
      setStoryFeedback('correct');
      onEarnStars(5);
      onActivityComplete('reading_story');
      try { confetti({ particleCount: 50, spread: 70 }); } catch {}
    } else {
      soundEffects.playGentleTryAgain();
      setStoryFeedback('wrong');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Sección D · Reading Adventures (Comprensión Lectora)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Aventuras de Lectura en Inglés
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {showSpanishHelp
                ? 'Lee pistas, reconoce palabras de profesiones y comprende pequeñas historias sobre trabajadores colombianos.'
                : 'Read short clues, complete sentences, and solve story comprehension challenges!'}
            </p>
          </div>
        </div>

        {/* Sub tabs */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('match');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              activeTab === 'match'
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>1. Read &amp; Match</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('cloze');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              activeTab === 'cloze'
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>2. Complete Sentence</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('stories');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              activeTab === 'stories'
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>3. Who Is This Person?</span>
          </button>
        </div>
      </div>

      {/* ACTIVITY 1: Read & Match */}
      {activeTab === 'match' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-sm space-y-6 max-w-3xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Desafío {matchIndex + 1} de {matchItems.length}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Lee la descripción y escoge la ocupación
            </h2>
          </div>

          {/* Reading Card */}
          <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 flex flex-col items-center gap-3 text-center">
            <button
              onClick={() => speakEnglish(currentMatch.textEn, 0.85)}
              className="py-1.5 px-3 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1.5 transition self-end"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              Escuchar lectura
            </button>
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed max-w-xl">
              &ldquo;{currentMatch.textEn}&rdquo;
            </p>
            {showSpanishHelp && (
              <p className="text-xs text-slate-600 italic">
                ({currentMatch.textEs})
              </p>
            )}
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {currentMatch.options.map((job) => {
              const isSelected = matchSelected === job.id;
              const isTarget = job.id === currentMatch.target.id;
              let border = 'border-slate-200 hover:border-emerald-300';

              if (matchFeedback && isSelected) {
                border = matchFeedback === 'correct' ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-200' : 'border-rose-400 bg-rose-50 ring-2 ring-rose-200';
              } else if (matchFeedback === 'wrong' && isTarget) {
                border = 'border-emerald-500 bg-emerald-50';
              }

              return (
                <button
                  key={job.id}
                  disabled={!!matchFeedback}
                  onClick={() => handleMatchSelect(job)}
                  className={`bg-white rounded-3xl p-4 border-2 text-center transition flex flex-col items-center justify-between gap-3 shadow-xs hover:shadow-md ${border}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${job.accentBg} flex items-center justify-center text-2xl`}
                    style={{ color: job.color }}
                  >
                    <JobIcon name={job.svgIconKey} className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-sm font-extrabold text-slate-900 block">{job.nameEn}</span>
                    <span className="text-xs text-slate-500">{job.nameEs}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {matchFeedback && (
            <div className="pt-3 max-w-md mx-auto text-center flex flex-col items-center gap-3">
              {matchFeedback === 'correct' ? (
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ¡Comprensión perfecta! Great reading! (+3★)
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                  <XCircle className="w-4 h-4" />
                  La respuesta correcta era: &ldquo;{currentMatch.target.nameEn}&rdquo;.
                </div>
              )}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setMatchIndex(prev => prev + 1);
                  setMatchSelected(null);
                  setMatchFeedback(null);
                }}
                className="py-2.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                Siguiente Texto (Next)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ACTIVITY 2: Complete the Sentence */}
      {activeTab === 'cloze' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Pregunta {clozeIndex + 1} de {clozeQuestions.length}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Completa la Oración (Complete the Sentence)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Selecciona la palabra que completa correctamente el espacio en blanco:
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <p className="text-xl font-black text-slate-900">
              {currentCloze.promptEn.split('________').map((part, idx) => (
                <React.Fragment key={idx}>
                  {part}
                  {idx === 0 && (
                    <span className="px-3 py-1 mx-1 rounded-xl bg-amber-200 text-amber-900 border border-amber-300 underline font-mono text-base">
                      {clozeSelected || '______'}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </p>
            {showSpanishHelp && (
              <p className="text-xs text-slate-600 italic">
                ({currentCloze.promptEs})
              </p>
            )}
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {currentCloze.options.map((opt) => {
              const isSelected = clozeSelected === opt;
              let btnClass = 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200';

              if (clozeFeedback && isSelected) {
                btnClass = clozeFeedback === 'correct' ? 'bg-emerald-500 text-white border-emerald-500 ring-4 ring-emerald-200' : 'bg-rose-500 text-white border-rose-500';
              } else if (clozeFeedback === 'wrong' && opt === currentCloze.answer) {
                btnClass = 'bg-emerald-100 text-emerald-900 border-emerald-400';
              }

              return (
                <button
                  key={opt}
                  disabled={!!clozeFeedback}
                  onClick={() => handleClozeSelect(opt)}
                  className={`py-3.5 px-4 rounded-2xl border-2 font-extrabold text-sm capitalize transition ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {clozeFeedback && (
            <div className="pt-3 max-w-md mx-auto text-center flex flex-col items-center gap-3">
              {clozeFeedback === 'correct' ? (
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ¡Oración completada con éxito! (+3★)
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                  <XCircle className="w-4 h-4" />
                  La palabra correcta era &ldquo;{currentCloze.answer}&rdquo;.
                </div>
              )}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setClozeIndex(prev => prev + 1);
                  setClozeSelected(null);
                  setClozeFeedback(null);
                }}
                className="py-2.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                Siguiente Oración (Next)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ACTIVITY 3: Who Is This Person? */}
      {activeTab === 'stories' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-sm space-y-6 max-w-3xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Lectura y Comprensión #{storyIndex + 1}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              {currentStory.title}
            </h2>
          </div>

          <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-amber-800">
                Texto en Inglés (English Passage):
              </span>
              <button
                onClick={() => speakEnglish(currentStory.passageEn, 0.85)}
                className="py-1 px-3 rounded-xl bg-white hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 flex items-center gap-1.5 transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                Escuchar audio
              </button>
            </div>
            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
              {currentStory.passageEn}
            </p>
            {showSpanishHelp && (
              <p className="text-xs text-slate-600 italic pt-2 border-t border-amber-100">
                Traducción: {currentStory.passageEs}
              </p>
            )}
          </div>

          <div className="text-center pt-2">
            <h3 className="text-lg font-extrabold text-slate-900">
              {currentStory.questionEn}
            </h3>
            {showSpanishHelp && (
              <p className="text-xs text-slate-500 font-medium">{currentStory.questionEs}</p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {currentStory.options.map((opt) => {
              const isSelected = storySelected === opt;
              let btnClass = 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200';

              if (storyFeedback && isSelected) {
                btnClass = storyFeedback === 'correct' ? 'bg-emerald-500 text-white border-emerald-500 ring-4 ring-emerald-200' : 'bg-rose-500 text-white border-rose-500';
              } else if (storyFeedback === 'wrong' && opt === currentStory.correctAnswer) {
                btnClass = 'bg-emerald-100 text-emerald-900 border-emerald-400';
              }

              return (
                <button
                  key={opt}
                  disabled={!!storyFeedback}
                  onClick={() => handleStorySelect(opt)}
                  className={`p-3.5 rounded-2xl border-2 font-bold text-sm transition ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {storyFeedback && (
            <div className="pt-3 max-w-md mx-auto text-center flex flex-col items-center gap-3">
              {storyFeedback === 'correct' ? (
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ¡Excelente comprensión lectora! (+5★)
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                  <XCircle className="w-4 h-4" />
                  Respuesta correcta: &ldquo;{currentStory.correctAnswer}&rdquo;.
                </div>
              )}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setStoryIndex(prev => prev + 1);
                  setStorySelected(null);
                  setStoryFeedback(null);
                }}
                className="py-2.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                Siguiente Historia (Next)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
