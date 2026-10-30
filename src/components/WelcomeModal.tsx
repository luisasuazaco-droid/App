import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { AVATAR_OPTIONS } from '../data/curriculum';
import { soundEffects, speakSpanish } from '../utils/audio';
import { Sparkles, Compass, Check } from 'lucide-react';

interface WelcomeModalProps {
  onComplete: (profile: StudentProfile) => void;
  initialProfile?: StudentProfile;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onComplete, initialProfile }) => {
  const [nickname, setNickname] = useState(initialProfile?.nickname || '');
  const [grade, setGrade] = useState<'4th' | '5th'>(initialProfile?.grade || '4th');
  const [avatarId, setAvatarId] = useState(initialProfile?.avatarId || 'camilo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playSuccess();
    const finalNickname = nickname.trim() || 'Explorador';
    onComplete({
      nickname: finalNickname,
      grade,
      avatarId,
      stars: initialProfile?.stars || 15,
      completedActivities: initialProfile?.completedActivities || [],
      masteredWords: initialProfile?.masteredWords || [],
      badges: initialProfile?.badges || [],
      missionCompleted: initialProfile?.missionCompleted || false
    });
  };

  const handleQuickGuest = () => {
    soundEffects.playPop();
    onComplete({
      nickname: 'Estudiante',
      grade: '4th',
      avatarId: 'camilo',
      stars: 15,
      completedActivities: [],
      masteredWords: [],
      badges: [],
      missionCompleted: false
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative my-8">
        {/* Decorative Colombian flag ribbon strip */}
        <div className="h-2 w-full flex rounded-t-xl overflow-hidden absolute top-0 left-0 right-0">
          <div className="h-full bg-amber-400 w-1/2"></div>
          <div className="h-full bg-blue-600 w-1/4"></div>
          <div className="h-full bg-rose-600 w-1/4"></div>
        </div>

        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4 text-amber-600" />
            Aventura de Inglés Escolar · DBA 4° y 5°
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ¡Bienvenido a <span className="text-amber-600">Job Explorers</span>!
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
            Aprende las profesiones y ocupaciones en inglés con juegos divertidos, audios y misiones.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Student Nickname */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              ¿Cómo te llamas? (Tu nombre o apodo)
            </label>
            <input
              type="text"
              required
              maxLength={20}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Ej: Camilo, Valentina, Sofía..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none font-medium text-slate-800 transition"
            />
          </div>

          {/* Grade selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Selecciona tu grado escolar (Primaria)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setGrade('4th');
                }}
                className={`p-3.5 rounded-2xl border-2 text-center font-bold text-sm transition-all flex flex-col items-center gap-1 ${
                  grade === '4th'
                    ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm ring-2 ring-amber-300'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-lg">🎒 Grado 4°</span>
                <span className="text-xs font-normal text-slate-500">Pre-A1 Básico</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setGrade('5th');
                }}
                className={`p-3.5 rounded-2xl border-2 text-center font-bold text-sm transition-all flex flex-col items-center gap-1 ${
                  grade === '5th'
                    ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm ring-2 ring-amber-300'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-lg">📚 Grado 5°</span>
                <span className="text-xs font-normal text-slate-500">Nivel A1 Consolidación</span>
              </button>
            </div>
          </div>

          {/* Avatar selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Elige tu avatar colombiano
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setAvatarId(av.id);
                  }}
                  className={`p-2 rounded-2xl border-2 flex flex-col items-center gap-1 text-center transition ${
                    avatarId === av.id
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300 scale-105'
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <span className="text-3xl filter drop-shadow-sm">{av.emoji}</span>
                  <span className="text-xs font-semibold text-slate-800 truncate w-full">{av.name}</span>
                </button>
              ))}
            </div>
            {/* Avatar description */}
            {(() => {
              const selected = AVATAR_OPTIONS.find(a => a.id === avatarId);
              return selected ? (
                <p className="text-xs text-center text-slate-500 mt-2">
                  <span className="font-semibold text-slate-700">{selected.name}</span> · {selected.region} · {selected.description}
                </p>
              ) : null;
            })()}
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="w-full sm:w-2/3 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              ¡Iniciar Aventura! (Start)
            </button>
            <button
              type="button"
              onClick={handleQuickGuest}
              className="w-full sm:w-1/3 py-3.5 px-4 rounded-2xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition"
            >
              Entrar como invitado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
