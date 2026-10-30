import React, { useState, useRef, useEffect } from 'react';
import { Occupation } from '../types';
import { OCCUPATIONS } from '../data/occupations';
import { JobIcon } from './JobIcon';
import { soundEffects, speakEnglish } from '../utils/audio';
import { 
  Mic, 
  Volume2, 
  Square, 
  Play, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  Headphones,
  Award,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SpeakingSectionProps {
  onEarnStars: (count: number) => void;
  onActivityComplete: (activityId: string) => void;
  showSpanishHelp: boolean;
}

type SpeakingTab = 'repeat' | 'record' | 'sentences';

export const SpeakingSection: React.FC<SpeakingSectionProps> = ({
  onEarnStars,
  onActivityComplete,
  showSpanishHelp
}) => {
  const [activeTab, setActiveTab] = useState<SpeakingTab>('repeat');
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const currentJob = OCCUPATIONS[currentJobIndex % OCCUPATIONS.length];

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingFeedback, setRecordingFeedback] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordedAudioElementRef = useRef<HTMLAudioElement | null>(null);

  // Speech recognition state (browser native if supported)
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const [isListeningRecognition, setIsListeningRecognition] = useState(false);

  // Sentence frame state
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const sentenceList = [
    { target: 'She is a nurse.', clueEs: 'Ella es enfermera.', job: OCCUPATIONS.find(o => o.id === 'nurse')! },
    { target: 'He is a firefighter.', clueEs: 'Él es bombero.', job: OCCUPATIONS.find(o => o.id === 'firefighter')! },
    { target: 'A doctor works in a hospital.', clueEs: 'Un médico trabaja en un hospital.', job: OCCUPATIONS.find(o => o.id === 'doctor')! },
    { target: 'A farmer works on a farm.', clueEs: 'Un campesino trabaja en la finca.', job: OCCUPATIONS.find(o => o.id === 'farmer')! },
    { target: 'The teacher teaches children.', clueEs: 'El profesor enseña a los niños.', job: OCCUPATIONS.find(o => o.id === 'teacher')! }
  ];
  const currentSentenceObj = sentenceList[sentenceIndex % sentenceList.length];

  // Clean up recorded audio url on unmount
  useEffect(() => {
    return () => {
      if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl);
      }
    };
  }, [recordedAudioUrl]);

  // Start real audio recording
  const startRecording = async () => {
    try {
      soundEffects.playPop();
      setRecordedAudioUrl(null);
      setRecordingFeedback(null);
      setRecognizedText(null);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        setRecordingFeedback('¡Excelente grabación! Escúchate a continuación.');
        soundEffects.playSuccess();
        onEarnStars(3);

        // Stop stream tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Also try Speech Recognition if available in Chrome/Edge
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        try {
          const SpeechRecognition = (window as unknown as { SpeechRecognition: any; webkitSpeechRecognition: any }).SpeechRecognition ||
                                   (window as unknown as { webkitSpeechRecognition: any }).webkitSpeechRecognition;
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-US';
          recognition.interimResults = false;
          recognition.maxAlternatives = 1;

          recognition.onresult = (e: any) => {
            const transcript = e.results[0][0].transcript;
            setRecognizedText(transcript);
          };
          recognition.onerror = () => {};
          recognition.start();
        } catch {}
      }
    } catch {
      // If mic permission blocked or not available, provide friendly visual simulation fallback
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setRecordingFeedback('¡Muy bien practicado! Tu voz se escuchó fuerte y clara.');
        soundEffects.playSuccess();
        onEarnStars(3);
      }, 2500);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      setIsRecording(false);
      setRecordingFeedback('¡Bien dicho! Sigue practicando.');
      soundEffects.playSuccess();
      onEarnStars(3);
    }
  };

  const playRecordedAudio = () => {
    if (recordedAudioUrl) {
      soundEffects.playPop();
      if (!recordedAudioElementRef.current) {
        recordedAudioElementRef.current = new Audio(recordedAudioUrl);
      } else {
        recordedAudioElementRef.current.src = recordedAudioUrl;
      }
      recordedAudioElementRef.current.play();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-rose-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Mic className="w-3.5 h-3.5" />
              Sección C · Speaking Corner (Producción Oral)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Rincón de Pronunciación en Inglés
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {showSpanishHelp
                ? 'Practica hablar en voz alta, repite las palabras y graba tu propia voz en el micrófono.'
                : 'Listen to the native model, repeat out loud, and record your voice with confidence!'}
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('repeat');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              activeTab === 'repeat'
                ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>1. Listen &amp; Repeat</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('record');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              activeTab === 'record'
                ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>2. Mi Grabadora (Microphone)</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('sentences');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              activeTab === 'sentences'
                ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>3. Say a Sentence (Oraciones)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Listen and Repeat */}
      {activeTab === 'repeat' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              Palabra {currentJobIndex + 1} de {OCCUPATIONS.length}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Escucha y Repite en Voz Alta
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              1. Toca el botón azul para escuchar el modelo en inglés. 2. Repítelo fuerte.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-rose-50/50 border border-rose-100 gap-4">
            <div
              className={`w-28 h-28 rounded-3xl ${currentJob.accentBg} flex items-center justify-center text-5xl shadow-md`}
              style={{ color: currentJob.color }}
            >
              <JobIcon name={currentJob.svgIconKey} className="w-16 h-16" />
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                {currentJob.nameEn}
              </h3>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">
                {currentJob.nameEs}
              </p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose-200 text-xs font-mono font-bold text-rose-700">
                <span>Pronunciación:</span>
                <span>{currentJob.phoneticTip}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  speakEnglish(currentJob.nameEn, 0.7);
                }}
                className="py-3 px-5 rounded-2xl bg-white hover:bg-rose-100 text-rose-800 font-bold text-xs border border-rose-200 shadow-xs flex items-center gap-2 transition"
              >
                <Volume2 className="w-4 h-4 text-rose-600" />
                Lento (0.7x)
              </button>
              <button
                onClick={() => {
                  soundEffects.playPop();
                  speakEnglish(currentJob.nameEn, 0.85);
                }}
                className="py-3 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <Volume2 className="w-5 h-5 text-rose-200" />
                Escuchar Modelo
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                soundEffects.playPop();
                setCurrentJobIndex(prev => (prev - 1 + OCCUPATIONS.length) % OCCUPATIONS.length);
              }}
              className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
            >
              &lt; Anterior
            </button>

            <button
              onClick={() => {
                soundEffects.playStarChime();
                onEarnStars(2);
                setCurrentJobIndex(prev => (prev + 1) % OCCUPATIONS.length);
              }}
              className="py-2.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              ¡Ya lo dije! Siguiente (+2★)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Voice Recorder */}
      {activeTab === 'record' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              Práctica con Micrófono
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Graba Tu Propia Voz
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Presiona el botón rojo para grabar. Di la palabra en inglés y luego escucha cómo suena tu voz.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-4 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase">Palabra a practicar:</div>
            <div className="text-3xl font-black text-slate-900">{currentJob.nameEn}</div>
            <div className="text-xs font-semibold text-slate-600">{currentJob.nameEs} · ({currentJob.phoneticTip})</div>

            {/* Listen English model first */}
            <button
              onClick={() => speakEnglish(currentJob.nameEn, 0.85)}
              className="py-2 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-300 flex items-center gap-2 transition"
            >
              <Volume2 className="w-4 h-4 text-rose-600" />
              Escuchar cómo se dice
            </button>

            {/* Giant Record Button */}
            <div className="mt-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="w-24 h-24 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white flex flex-col items-center justify-center shadow-lg shadow-rose-600/30 transition group"
                >
                  <Mic className="w-10 h-10 group-hover:scale-110 transition" />
                  <span className="text-[10px] font-bold mt-1 uppercase">Grabar</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="w-24 h-24 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white flex flex-col items-center justify-center shadow-lg transition animate-pulse"
                >
                  <Square className="w-8 h-8 text-rose-400" />
                  <span className="text-[10px] font-bold mt-1 uppercase text-rose-400">Detener</span>
                </button>
              )}
            </div>

            {isRecording && (
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                Grabando tu voz... ¡Di &ldquo;{currentJob.nameEn}&rdquo;!
              </div>
            )}

            {/* Recognized voice text if available */}
            {recognizedText && (
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                <span className="font-bold">Te escuchamos decir:</span> &ldquo;{recognizedText}&rdquo;
              </div>
            )}

            {/* Playback of recorded audio */}
            {recordedAudioUrl && (
              <div className="mt-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center gap-3 w-full justify-between">
                <div className="text-left">
                  <div className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ¡Tu grabación está lista!
                  </div>
                  <div className="text-[11px] text-emerald-700">Compara tu voz con el modelo nativo.</div>
                </div>
                <button
                  onClick={playRecordedAudio}
                  className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition shrink-0"
                >
                  <Play className="w-4 h-4" />
                  Escuchar Mi Voz (Play)
                </button>
              </div>
            )}

            {recordingFeedback && (
              <p className="text-xs font-bold text-emerald-700">{recordingFeedback}</p>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                soundEffects.playPop();
                setCurrentJobIndex(prev => (prev + 1) % OCCUPATIONS.length);
                setRecordedAudioUrl(null);
                setRecordingFeedback(null);
                setRecognizedText(null);
              }}
              className="py-2.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              Practicar Otra Palabra
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Say a Sentence */}
      {activeTab === 'sentences' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              Oración {sentenceIndex + 1} de {sentenceList.length}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Say a Sentence · Di una Oración
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Practica estructuras completas como &ldquo;He is a...&rdquo; o &ldquo;A doctor works in a...&rdquo;
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200 flex flex-col items-center gap-4 text-center">
            <div
              className={`w-20 h-20 rounded-2xl ${currentSentenceObj.job.accentBg} flex items-center justify-center text-4xl shadow-xs`}
              style={{ color: currentSentenceObj.job.color }}
            >
              <JobIcon name={currentSentenceObj.job.svgIconKey} className="w-12 h-12" />
            </div>

            <div>
              <p className="text-2xl font-black text-slate-900">
                &ldquo;{currentSentenceObj.target}&rdquo;
              </p>
              {showSpanishHelp && (
                <p className="text-xs font-semibold text-slate-600 mt-1 italic">
                  ({currentSentenceObj.clueEs})
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  speakEnglish(currentSentenceObj.target, 0.75);
                }}
                className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md flex items-center gap-2 transition"
              >
                <Volume2 className="w-4 h-4" />
                Escuchar Oración Completa
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                soundEffects.playPop();
                setSentenceIndex(prev => (prev - 1 + sentenceList.length) % sentenceList.length);
              }}
              className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
            >
              &lt; Anterior
            </button>

            <button
              onClick={() => {
                soundEffects.playStarChime();
                onEarnStars(3);
                setSentenceIndex(prev => prev + 1);
                if (sentenceIndex >= 3) {
                  onActivityComplete('speaking_sentences');
                  try { confetti({ particleCount: 40, spread: 60 }); } catch {}
                }
              }}
              className="py-2.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              ¡La pronuncié! Siguiente (+3★)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
