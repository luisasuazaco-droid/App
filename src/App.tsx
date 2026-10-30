import React, { useState, useEffect } from 'react';
import { ActiveSection, StudentProfile } from './types';
import { loadStudentProfile, saveStudentProfile, resetStudentProfile, DEFAULT_PROFILE } from './utils/storage';
import { soundEffects } from './utils/audio';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { ExploreSection } from './components/ExploreSection';
import { ListeningSection } from './components/ListeningSection';
import { SpeakingSection } from './components/SpeakingSection';
import { ReadingSection } from './components/ReadingSection';
import { WritingSection } from './components/WritingSection';
import { GamesSection } from './components/GamesSection';
import { ProgressSection } from './components/ProgressSection';
import { WelcomeModal } from './components/WelcomeModal';
import { DbaModal } from './components/DbaModal';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => loadStudentProfile());
  const [currentSection, setCurrentSection] = useState<ActiveSection>('home');
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(() => !profile.nickname);
  const [showDbaModal, setShowDbaModal] = useState<boolean>(false);
  const [showSpanishHelp, setShowSpanishHelp] = useState<boolean>(true);

  // Synchronize student profile to localStorage
  useEffect(() => {
    if (profile.nickname) {
      saveStudentProfile(profile);
    }
  }, [profile]);

  // Star earning helper
  const handleEarnStars = (count: number) => {
    soundEffects.playStarChime();
    setProfile(prev => ({
      ...prev,
      stars: prev.stars + count
    }));
  };

  // Activity completion helper
  const handleActivityComplete = (activityId: string) => {
    setProfile(prev => {
      if (prev.completedActivities.includes(activityId)) return prev;
      return {
        ...prev,
        completedActivities: [...prev.completedActivities, activityId]
      };
    });
  };

  // Mastered vocabulary toggle
  const handleToggleMastered = (jobId: string) => {
    setProfile(prev => {
      const isAlreadyMastered = prev.masteredWords.includes(jobId);
      const updated = isAlreadyMastered
        ? prev.masteredWords.filter(id => id !== jobId)
        : [...prev.masteredWords, jobId];
      
      const newStars = !isAlreadyMastered ? prev.stars + 5 : prev.stars;
      return {
        ...prev,
        masteredWords: updated,
        stars: newStars
      };
    });
  };

  // Save Dream Job
  const handleSaveDreamJob = (jobTitle: string, reason: string) => {
    setProfile(prev => ({
      ...prev,
      dreamJob: {
        jobTitle,
        reason,
        date: new Date().toLocaleDateString('es-CO')
      }
    }));
  };

  // Grand Mission Finished
  const handleMissionFinished = () => {
    setProfile(prev => ({
      ...prev,
      missionCompleted: true,
      stars: prev.stars + 25
    }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    resetStudentProfile();
    setProfile(DEFAULT_PROFILE);
    setShowWelcomeModal(true);
    setCurrentSection('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-900 selection:bg-amber-200 selection:text-amber-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        currentSection={currentSection}
        onNavigate={(sec) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentSection(sec);
        }}
        profile={profile}
        onOpenDbaModal={() => setShowDbaModal(true)}
        onOpenProfileModal={() => setShowWelcomeModal(true)}
        showSpanishHelp={showSpanishHelp}
        onToggleSpanishHelp={() => setShowSpanishHelp(prev => !prev)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentSection === 'home' && (
          <HomeDashboard
            profile={profile}
            onNavigate={(sec) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentSection(sec);
            }}
            onOpenDbaModal={() => setShowDbaModal(true)}
            showSpanishHelp={showSpanishHelp}
          />
        )}

        {currentSection === 'explore' && (
          <ExploreSection
            masteredWords={profile.masteredWords}
            onToggleMastered={handleToggleMastered}
            showSpanishHelp={showSpanishHelp}
          />
        )}

        {currentSection === 'listening' && (
          <ListeningSection
            onEarnStars={handleEarnStars}
            onActivityComplete={handleActivityComplete}
            showSpanishHelp={showSpanishHelp}
          />
        )}

        {currentSection === 'speaking' && (
          <SpeakingSection
            onEarnStars={handleEarnStars}
            onActivityComplete={handleActivityComplete}
            showSpanishHelp={showSpanishHelp}
          />
        )}

        {currentSection === 'reading' && (
          <ReadingSection
            onEarnStars={handleEarnStars}
            onActivityComplete={handleActivityComplete}
            showSpanishHelp={showSpanishHelp}
          />
        )}

        {currentSection === 'writing' && (
          <WritingSection
            profile={profile}
            onEarnStars={handleEarnStars}
            onActivityComplete={handleActivityComplete}
            onSaveDreamJob={handleSaveDreamJob}
            showSpanishHelp={showSpanishHelp}
          />
        )}

        {currentSection === 'games' && (
          <GamesSection
            onEarnStars={handleEarnStars}
            onActivityComplete={handleActivityComplete}
            onMissionFinished={handleMissionFinished}
            missionCompleted={profile.missionCompleted}
            showSpanishHelp={showSpanishHelp}
          />
        )}

        {currentSection === 'progress' && (
          <ProgressSection
            profile={profile}
            onOpenEditProfile={() => setShowWelcomeModal(true)}
            onResetProgress={handleResetProgress}
            showSpanishHelp={showSpanishHelp}
          />
        )}
      </main>

      {/* Educational Colombian School Footer */}
      <footer className="mt-auto border-t border-amber-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="font-extrabold text-slate-800">Job Explorers Colombia</span>
            <span className="hidden sm:inline">·</span>
            <span>Alineado con los Derechos Básicos de Aprendizaje (DBA) Grados 4° y 5°</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDbaModal(true)}
              className="text-amber-700 hover:text-amber-900 font-bold underline"
            >
              Guía Pedagógica MEN
            </button>
            <span>·</span>
            <span>Estándares Guía 22 MEN</span>
          </div>
        </div>
      </footer>

      {/* Onboarding Welcome / Profile Modal */}
      {showWelcomeModal && (
        <WelcomeModal
          initialProfile={profile}
          onComplete={(newProfile) => {
            setProfile(newProfile);
            saveStudentProfile(newProfile);
            setShowWelcomeModal(false);
          }}
        />
      )}

      {/* MEN DBA Curricular Alignment Modal */}
      {showDbaModal && (
        <DbaModal
          activeGrade={profile.grade}
          onClose={() => setShowDbaModal(false)}
        />
      )}
    </div>
  );
}
