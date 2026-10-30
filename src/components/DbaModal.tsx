import React from 'react';
import { DBA_STANDARDS } from '../data/curriculum';
import { X, BookMarked, CheckCircle2, Globe, Sparkles } from 'lucide-react';

interface DbaModalProps {
  onClose: () => void;
  activeGrade: '4th' | '5th';
}

export const DbaModal: React.FC<DbaModalProps> = ({ onClose, activeGrade }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative my-8 animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Ministerio de Educación Nacional (MEN) · Colombia
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Alineación Curricular DBA (Grados 4° y 5°)
            </h2>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          Esta aplicación pedagógica apoya a docentes y estudiantes de básica primaria en colegios colombianos, fundamentándose en los <strong>Derechos Básicos de Aprendizaje (DBA)</strong> y los <strong>Estándares Básicos de Competencias en Lenguas Extranjeras: Inglés (Guía 22)</strong>.
        </p>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {DBA_STANDARDS.map((std, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {std.code}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {std.grade === '4th' ? 'Básica Primaria 4°' : 'Básica Primaria 5°'}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900">
                {std.titleEs} · <span className="text-slate-600 font-medium">{std.titleEn}</span>
              </h3>

              <p className="text-xs text-slate-600">
                {std.descriptionEs}
              </p>

              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">
                  Evidencias de Aprendizaje desarrolladas en la App:
                </span>
                <ul className="space-y-1">
                  {std.evidence.map((ev, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition"
          >
            Entendido (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
