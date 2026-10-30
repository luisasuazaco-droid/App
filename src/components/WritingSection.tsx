import React, { useState } from 'react';
import { Occupation, StudentProfile } from '../types';
import { OCCUPATIONS } from '../data/occupations';
import { JobIcon } from './JobIcon';
import { soundEffects, speakEnglish } from '../utils/audio';
import { 
  Pencil, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  Star, 
  Volume2,
  Trash2,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WritingSectionProps {
  profile: StudentProfile;
  onEarnStars: (count: number) => void;
  onActivityComplete: (activityId: string) => void;
  onSaveDreamJob: (jobTitle: string, reason: string) => void;
  showSpanishHelp: boolean;
}

type WritingTab = 'missing' | 'unscramble' | 'sentence' | 'dream';

export const WritingSection: React.FC<WritingSectionProps> = ({
  profile,
  onEarnStars,
  onActivityComplete,
  onSaveDreamJob,
  showSpanishHelp
}) => {
  const [activeTab, setActiveTab] = useState<WritingTab>('missing');

  // --- 1. Missing Letters State ---
  const [missingRound, setMissingRound] = useState(0);
  const missingPool = [
    { targetWord: 'TEACHER', missingIndex: 1, prompt: 'T _ A C H E R', job: OCCUPATIONS.find(o => o.id === 'teacher')! },
    { targetWord: 'DOCTOR', missingIndex: 2, prompt: 'D O _ T O R', job: OCCUPATIONS.find(o => o.id === 'doctor')! },
    { targetWord: 'NURSE', missingIndex: 1, prompt: 'N _ R S E', job: OCCUPATIONS.find(o => o.id === 'nurse')! },
    { targetWord: 'PILOT', missingIndex: 3, prompt: 'P I L _ T', job: OCCUPATIONS.find(o => o.id === 'pilot')! },
    { targetWord: 'FARMER', missingIndex: 4, prompt: 'F A R M _ R', job: OCCUPATIONS.find(o => o.id === 'farmer')! },
    { targetWord: 'CHEF', missingIndex: 2, prompt: 'C H _ F', job: OCCUPATIONS.find(o => o.id === 'chef')! }
  ];
  const currentMissing = missingPool[missingRound % missingPool.length];
  const [missingSelectedLetter, setMissingSelectedLetter] = useState<string | null>(null);
  const [missingFeedback, setMissingFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Alphabet choices for missing letters (including the correct letter + 3 distractors)
  const getMissingLetterOptions = () => {
    const correct = currentMissing.targetWord[currentMissing.missingIndex];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l => l !== correct);
    const distractors = alphabet.sort(() => Math.random() - 0.5).slice(0, 3);
    return [correct, ...distractors].sort();
  };
  const [currentLetterOptions, setCurrentLetterOptions] = useState<string[]>(() => getMissingLetterOptions());

  // --- 2. Unscramble State ---
  const [unscrambleRound, setUnscrambleRound] = useState(0);
  const unscramblePool = [
    { word: 'DOCTOR', scrambled: ['C', 'O', 'D', 'R', 'T', 'O'], job: OCCUPATIONS.find(o => o.id === 'doctor')! },
    { word: 'ARTIST', scrambled: ['T', 'A', 'S', 'R', 'I', 'T'], job: OCCUPATIONS.find(o => o.id === 'artist')! },
    { word: 'BAKER', scrambled: ['K', 'E', 'B', 'R', 'A'], job: OCCUPATIONS.find(o => o.id === 'baker')! },
    { word: 'PILOT', scrambled: ['L', 'O', 'P', 'T', 'I'], job: OCCUPATIONS.find(o => o.id === 'pilot')! },
    { word: 'NURSE', scrambled: ['S', 'U', 'N', 'E', 'R'], job: OCCUPATIONS.find(o => o.id === 'nurse')! }
  ];
  const currentUnscramble = unscramblePool[unscrambleRound % unscramblePool.length];
  const [unscrambleChosen, setUnscrambleChosen] = useState<{ id: number; letter: string }[]>([]);
  const [unscrambleFeedback, setUnscrambleFeedback] = useState<'correct' | 'wrong' | null>(null);

  // --- 3. Build a Sentence State ---
  const [sentenceRound, setSentenceRound] = useState(0);
  const sentencePool = [
    {
      words: ['He', 'is', 'a', 'firefighter.'],
      scrambled: ['a', 'He', 'firefighter.', 'is'],
      target: 'He is a firefighter.',
      translation: 'Él es bombero.'
    },
    {
      words: ['She', 'is', 'a', 'teacher.'],
      scrambled: ['is', 'a', 'She', 'teacher.'],
      target: 'She is a teacher.',
      translation: 'Ella es profesora.'
    },
    {
      words: ['A', 'doctor', 'works', 'in', 'a', 'hospital.'],
      scrambled: ['works', 'A', 'hospital.', 'doctor', 'in', 'a'],
      target: 'A doctor works in a hospital.',
      translation: 'Un doctor trabaja en un hospital.'
    },
    {
      words: ['A', 'farmer', 'works', 'on', 'a', 'farm.'],
      scrambled: ['farm.', 'on', 'works', 'A', 'a', 'farmer'],
      target: 'A farmer works on a farm.',
      translation: 'Un campesino trabaja en una granja.'
    }
  ];
  const currentSentence = sentencePool[sentenceRound % sentencePool.length];
  const [selectedWordBlocks, setSelectedWordBlocks] = useState<string[]>([]);
  const [sentenceFeedback, setSentenceFeedback] = useState<'correct' | 'wrong' | null>(null);

  // --- 4. My Dream Job State ---
  const [dreamJobTitle, setDreamJobTitle] = useState(profile.dreamJob?.jobTitle || 'Doctor');
  const [dreamReason, setDreamReason] = useState(profile.dreamJob?.reason || 'I want to help people in my community');
  const [dreamSaved, setDreamSaved] = useState(false);

  // Handlers for Missing Letters
  const handleSelectMissingLetter = (letter: string) => {
    if (missingFeedback) return;
    setMissingSelectedLetter(letter);
    const correct = currentMissing.targetWord[currentMissing.missingIndex];

    if (letter === correct) {
      soundEffects.playSuccess();
      setMissingFeedback('correct');
      onEarnStars(3);
      if (missingRound >= 3) {
        onActivityComplete('writing_missing');
        try { confetti({ particleCount: 40, spread: 60 }); } catch {}
      }
    } else {
      soundEffects.playGentleTryAgain();
      setMissingFeedback('wrong');
    }
  };

  const nextMissingRound = () => {
    soundEffects.playPop();
    const nextR = missingRound + 1;
    setMissingRound(nextR);
    setMissingSelectedLetter(null);
    setMissingFeedback(null);
    const nextTarget = missingPool[nextR % missingPool.length];
    const correct = nextTarget.targetWord[nextTarget.missingIndex];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l => l !== correct);
    const distractors = alphabet.sort(() => Math.random() - 0.5).slice(0, 3);
    setCurrentLetterOptions([correct, ...distractors].sort());
  };

  // Handlers for Unscramble
  const handleAddLetter = (item: { id: number; letter: string }) => {
    soundEffects.playPop();
    if (unscrambleChosen.find(c => c.id === item.id)) return;
    const updated = [...unscrambleChosen, item];
    setUnscrambleChosen(updated);

    if (updated.length === currentUnscramble.word.length) {
      const assembled = updated.map(u => u.letter).join('');
      if (assembled === currentUnscramble.word) {
        soundEffects.playSuccess();
        setUnscrambleFeedback('correct');
        onEarnStars(4);
        if (unscrambleRound >= 3) {
          onActivityComplete('writing_unscramble');
          try { confetti({ particleCount: 50, spread: 70 }); } catch {}
        }
      } else {
        soundEffects.playGentleTryAgain();
        setUnscrambleFeedback('wrong');
      }
    }
  };

  const handleResetUnscramble = () => {
    soundEffects.playPop();
    setUnscrambleChosen([]);
    setUnscrambleFeedback(null);
  };

  const nextUnscrambleRound = () => {
    soundEffects.playPop();
    setUnscrambleRound(prev => prev + 1);
    setUnscrambleChosen([]);
    setUnscrambleFeedback(null);
  };

  // Handlers for Sentence Builder
  const handleAddWordBlock = (word: string, index: number) => {
    soundEffects.playPop();
    const updated = [...selectedWordBlocks, word];
    setSelectedWordBlocks(updated);

    if (updated.length === currentSentence.words.length) {
      const assembled = updated.join(' ');
      if (assembled === currentSentence.target) {
        soundEffects.playSuccess();
        setSentenceFeedback('correct');
        onEarnStars(4);
        if (sentenceRound >= 3) {
          onActivityComplete('writing_sentence');
          try { confetti({ particleCount: 50, spread: 70 }); } catch {}
        }
      } else {
        soundEffects.playGentleTryAgain();
        setSentenceFeedback('wrong');
      }
    }
  };

  const handleResetSentence = () => {
    soundEffects.playPop();
    setSelectedWordBlocks([]);
    setSentenceFeedback(null);
  };

  const nextSentenceRound = () => {
    soundEffects.playPop();
    setSentenceRound(prev => prev + 1);
    setSelectedWordBlocks([]);
    setSentenceFeedback(null);
  };

  // Handlers for Dream Job
  const handleSaveDreamJob = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playFanfare();
    onSaveDreamJob(dreamJobTitle, dreamReason);
    onEarnStars(10);
    setDreamSaved(true);
    onActivityComplete('writing_dream_job');
    try { confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } }); } catch {}
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Pencil className="w-3.5 h-3.5" />
              Sección E · Writing Workshop (Producción Escrita)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Taller de Escritura en Inglés
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {showSpanishHelp
                ? 'Completa letras que faltan, ordena palabras revueltas, arma oraciones completas y redacta tu profesión soñada.'
                : 'Spell words, unscramble letters, assemble sentences, and write about your dream job!'}
            </p>
          </div>
        </div>

        {/* 4 Writing subtabs */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('missing');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 border-2 ${
              activeTab === 'missing'
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>1. Missing Letters</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('unscramble');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 border-2 ${
              activeTab === 'unscramble'
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>2. Unscramble</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('sentence');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 border-2 ${
              activeTab === 'sentence'
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>3. Build Sentence</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('dream');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 border-2 ${
              activeTab === 'dream'
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>4. My Dream Job</span>
          </button>
        </div>
      </div>

      {/* 1. MISSING LETTERS */}
      {activeTab === 'missing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Palabra #{missingRound + 1}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Completa la Letra Faltante (Missing Letter)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Observa la ilustración y selecciona la letra que falta para completar la palabra.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200 flex flex-col items-center gap-4 text-center">
            <div
              className={`w-20 h-20 rounded-2xl ${currentMissing.job.accentBg} flex items-center justify-center text-4xl shadow-xs`}
              style={{ color: currentMissing.job.color }}
            >
              <JobIcon name={currentMissing.job.svgIconKey} className="w-12 h-12" />
            </div>

            {/* Word Display with Slot */}
            <div className="flex items-center gap-2 text-3xl sm:text-4xl font-mono font-black tracking-widest text-slate-900">
              {currentMissing.targetWord.split('').map((char, idx) => {
                const isTargetSlot = idx === currentMissing.missingIndex;
                if (!isTargetSlot) {
                  return <span key={idx}>{char}</span>;
                }
                return (
                  <span
                    key={idx}
                    className="w-10 sm:w-12 h-12 sm:h-14 rounded-2xl bg-white border-3 border-dashed border-amber-500 text-amber-600 flex items-center justify-center shadow-inner"
                  >
                    {missingSelectedLetter || '_'}
                  </span>
                );
              })}
            </div>

            <p className="text-xs font-semibold text-slate-600">
              Significado: {currentMissing.job.nameEs}
            </p>
          </div>

          {/* Letter Bank */}
          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto pt-2">
            {currentLetterOptions.map((letter) => {
              const isSelected = missingSelectedLetter === letter;
              let btnClass = 'bg-white hover:bg-amber-100 text-slate-800 border-slate-200';

              if (missingFeedback && isSelected) {
                btnClass = missingFeedback === 'correct' ? 'bg-emerald-500 text-white border-emerald-500 ring-4 ring-emerald-200' : 'bg-rose-500 text-white border-rose-500';
              }

              return (
                <button
                  key={letter}
                  disabled={!!missingFeedback}
                  onClick={() => handleSelectMissingLetter(letter)}
                  className={`h-16 rounded-2xl border-2 font-mono font-extrabold text-2xl transition shadow-xs hover:scale-105 active:scale-95 ${btnClass}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {missingFeedback && (
            <div className="pt-3 max-w-md mx-auto text-center flex flex-col items-center gap-3">
              {missingFeedback === 'correct' ? (
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ¡Ortografía correcta! Great spelling! (+3★)
                </div>
              ) : (
                <div className="text-rose-600 font-bold text-xs">
                  Intenta de nuevo en la siguiente ronda.
                </div>
              )}
              <button
                onClick={nextMissingRound}
                className="py-2.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                Siguiente Palabra (Next)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. UNSCRAMBLE */}
      {activeTab === 'unscramble' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Desafío #{unscrambleRound + 1}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Unscramble the Word · Ordena la Palabra
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Toca las letras en el orden correcto para formar la profesión en inglés.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-4 text-center">
            <div
              className={`w-16 h-16 rounded-2xl ${currentUnscramble.job.accentBg} flex items-center justify-center text-3xl shadow-xs`}
              style={{ color: currentUnscramble.job.color }}
            >
              <JobIcon name={currentUnscramble.job.svgIconKey} className="w-10 h-10" />
            </div>

            {/* Assembled Word Box */}
            <div className="flex items-center gap-2 min-h-[56px]">
              {unscrambleChosen.length === 0 ? (
                <span className="text-xs text-slate-400 italic">Toca las letras de abajo para formar la palabra...</span>
              ) : (
                unscrambleChosen.map((item) => (
                  <span
                    key={item.id}
                    className="w-10 sm:w-12 h-12 sm:h-14 rounded-2xl bg-amber-500 text-white font-mono font-black text-2xl flex items-center justify-center shadow-md animate-in zoom-in-75"
                  >
                    {item.letter}
                  </span>
                ))
              )}
            </div>

            <p className="text-xs font-semibold text-slate-600">
              Pista: {currentUnscramble.job.nameEs}
            </p>
          </div>

          {/* Scrambled letter tiles */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {currentUnscramble.scrambled.map((letter, idx) => {
              const isUsed = unscrambleChosen.some(u => u.id === idx);
              return (
                <button
                  key={idx}
                  disabled={isUsed || !!unscrambleFeedback}
                  onClick={() => handleAddLetter({ id: idx, letter })}
                  className={`w-12 sm:w-14 h-14 sm:h-16 rounded-2xl font-mono font-extrabold text-2xl border-2 transition ${
                    isUsed
                      ? 'bg-slate-100 text-slate-300 border-slate-200 opacity-40 cursor-not-allowed'
                      : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300 shadow-xs hover:scale-105 active:scale-95'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleResetUnscramble}
              className="py-2 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Borrar y reintentar
            </button>

            {unscrambleFeedback && (
              <button
                onClick={nextUnscrambleRound}
                className="py-2.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                Siguiente Palabra (Next)
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. BUILD SENTENCE */}
      {activeTab === 'sentence' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Oración #{sentenceRound + 1}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Build a Sentence · Construye la Oración
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Organiza los bloques de palabras para crear la oración en inglés correcta.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-3 text-center min-h-[100px] justify-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tu Oración Armada:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {selectedWordBlocks.length === 0 ? (
                <span className="text-xs text-slate-400 italic">Haz clic en los bloques de abajo en el orden correcto...</span>
              ) : (
                selectedWordBlocks.map((w, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 text-white font-extrabold text-base shadow-sm"
                  >
                    {w}
                  </span>
                ))
              )}
            </div>
            <p className="text-xs font-semibold text-slate-600 italic">
              Significado: &ldquo;{currentSentence.translation}&rdquo;
            </p>
          </div>

          {/* Scrambled word choices */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {currentSentence.scrambled.map((word, idx) => {
              // Count occurrences in selected vs total in scrambled to allow duplicate words like "a"
              const usedCount = selectedWordBlocks.filter(w => w === word).length;
              const totalOccurrencesInScrambledBeforeIdx = currentSentence.scrambled.slice(0, idx + 1).filter(w => w === word).length;
              const isUsed = usedCount >= totalOccurrencesInScrambledBeforeIdx;

              return (
                <button
                  key={idx}
                  disabled={isUsed || !!sentenceFeedback}
                  onClick={() => handleAddWordBlock(word, idx)}
                  className={`px-4 py-2.5 rounded-2xl font-extrabold text-sm border-2 transition ${
                    isUsed
                      ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                      : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300 shadow-xs hover:scale-105 active:scale-95'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleResetSentence}
              className="py-2 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar oración
            </button>

            {sentenceFeedback && (
              <button
                onClick={nextSentenceRound}
                className="py-2.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                Siguiente Oración (Next)
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. MY DREAM JOB */}
      {activeTab === 'dream' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Actividad Creativa Personal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              My Dream Job · Mi Profesión Soñada
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Escribe qué quieres ser cuando seas grande y por qué. ¡Crea tu diploma oficial de explorador!
            </p>
          </div>

          <form onSubmit={handleSaveDreamJob} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                When I grow up, I want to be a... (Profesión en inglés):
              </label>
              <select
                value={dreamJobTitle}
                onChange={(e) => setDreamJobTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-500 font-bold text-slate-800 outline-none"
              >
                {OCCUPATIONS.map((job) => (
                  <option key={job.id} value={job.nameEn}>
                    {job.nameEn} ({job.nameEs})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Because... (Razón o motivo en inglés o español):
              </label>
              <input
                type="text"
                required
                value={dreamReason}
                onChange={(e) => setDreamReason(e.target.value)}
                placeholder="Ej: I want to heal sick animals / Quiero construir puentes..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-500 font-medium text-slate-800 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-base shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5 text-amber-200" />
              Guardar y Generar Mi Diploma (+10★)
            </button>
          </form>

          {/* Generated Dream Job Card */}
          {dreamSaved && (
            <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-4 border-amber-300 text-center shadow-lg relative print:p-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-xs font-bold uppercase mb-3">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                Diploma Oficial de Explorador de Colombia
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {profile.nickname || 'Estudiante'}
              </h3>
              <p className="text-xs text-slate-600 font-semibold">
                Estudiante de {profile.grade === '4th' ? '4°' : '5°'} de Primaria
              </p>

              <div className="my-4 py-3 border-y border-amber-200 max-w-md mx-auto">
                <div className="text-xs text-amber-800 font-bold uppercase">Mi Sueño Profesional:</div>
                <div className="text-2xl font-extrabold text-amber-600 mt-1">
                  Future {dreamJobTitle}
                </div>
                <div className="text-xs text-slate-700 mt-1 font-medium italic">
                  &ldquo;When I grow up, I want to be a {dreamJobTitle} because {dreamReason}.&rdquo;
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => speakEnglish(`When I grow up, I want to be a ${dreamJobTitle} because ${dreamReason}`, 0.8)}
                  className="py-2 px-4 rounded-xl bg-white hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 flex items-center gap-1.5 transition"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Escuchar Mi Frase
                </button>
                <button
                  onClick={() => window.print()}
                  className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir Diploma
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
