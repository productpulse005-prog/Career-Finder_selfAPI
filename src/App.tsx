import React, { useState } from 'react';
import { UserProfile, JobMatch, AuthUser } from './types';
import {
  DEFAULT_USER_PROFILE,
  VERIFIED_INDIAN_JOBS,
  getInitialJobsForProfile
} from './data/pmEcosystemData';

import { LandingScreen } from './components/LandingScreen';
import { GoogleSignInModal } from './components/GoogleSignInModal';
import { CareerProfileWizard } from './components/CareerProfileWizard';
import { RadarPreviewScreen } from './components/RadarPreviewScreen';
import { GeminiActivationFlow } from './components/AIConnectFlow';
import { SimpleNavbar } from './components/SimpleNavbar';
import { JobRadarDashboard } from './components/JobRadarDashboard';
import { JobDetailModal } from './components/JobDetailModal';
import { PreferencesView } from './components/PreferencesView';
import { SecurityPrivacyModal } from './components/SecurityPrivacyModal';
import { CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation & Screen State:
  // 'landing' | 'profile_wizard' | 'radar_preview' | 'connect_gemini' | 'portal'
  const [currentView, setCurrentView] = useState<
    'landing' | 'profile_wizard' | 'radar_preview' | 'connect_gemini' | 'portal'
  >('landing');

  const [portalTab, setPortalTab] = useState<'home' | 'matches' | 'preferences'>('home');

  // Auth User Identity (Google Sign-In)
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [showGoogleSignInModal, setShowGoogleSignInModal] = useState(false);
  const [showSecurityVaultModal, setShowSecurityVaultModal] = useState(false);

  // BYOK In-Memory State (Never persisted to localStorage/cookies/backend db)
  const [userApiKey, setUserApiKey] = useState<string | null>(null);

  // Core Data State
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [jobs, setJobs] = useState<JobMatch[]>(() => getInitialJobsForProfile(DEFAULT_USER_PROFILE));
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);

  // Loading & Toast State
  const [isSearchingJobs, setIsSearchingJobs] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // COMPLETE DATA WIPE & RESET FOR NEW USERS
  const handleResetAllData = () => {
    setAuthUser(null);
    setUserApiKey(null);
    setProfile(DEFAULT_USER_PROFILE);
    setJobs(getInitialJobsForProfile(DEFAULT_USER_PROFILE));
    setSelectedJob(null);
    setCurrentView('landing');
    setPortalTab('home');
    showNotification('All session data, API credentials, and search history wiped completely.');
  };

  // STEP 1: User clicks "Get Started with Google"
  const handleStartGoogleSignIn = () => {
    if (authUser) {
      // Already signed in with Google
      setCurrentView('profile_wizard');
    } else {
      setShowGoogleSignInModal(true);
    }
  };

  // STEP 2: Google Sign-In Completed
  const handleGoogleSignedIn = (user: AuthUser) => {
    setAuthUser(user);
    setShowGoogleSignInModal(false);
    // Update profile full name if available
    setProfile((prev) => ({
      ...prev,
      fullName: user.name || prev.fullName
    }));
    // Move to 4-question career profile wizard
    setCurrentView('profile_wizard');
  };

  // STEP 3: Career Profile Wizard completed -> Show Preview Screen
  const handleWizardFinished = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    const tailored = getInitialJobsForProfile(updatedProfile);
    setJobs(tailored);
    setCurrentView('radar_preview');
  };

  // STEP 4: User clicks "Activate My Career Radar →" on Preview screen
  const handleActivateRadarFromPreview = () => {
    if (!userApiKey) {
      setCurrentView('connect_gemini');
    } else {
      setCurrentView('portal');
      setPortalTab('home');
      handleSearchJobs(profile);
    }
  };

  // STEP 5: Gemini connection completed -> Fast Search Launch
  const handleGeminiConnected = (key: string) => {
    setUserApiKey(key);
    setCurrentView('portal');
    setPortalTab('home');
    showNotification('Just My Type launching with your profile...');
    handleSearchJobs(profile, '', 'all', key);
  };

  // Job Search / Radar Scan using Gemini API (Fast Discovery Flow)
  const handleSearchJobs = async (
    targetProfile: UserProfile = profile,
    query: string = '',
    location: string = 'all',
    keyOverride?: string
  ) => {
    const activeKey = keyOverride || userApiKey;
    if (!activeKey) {
      showNotification('Please connect your Gemini account to search live jobs.');
      setCurrentView('connect_gemini');
      return;
    }

    setIsSearchingJobs(true);
    try {
      const response = await fetch('/api/pm/search-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-api-key': activeKey
        },
        body: JSON.stringify({
          profile: targetProfile,
          customQuery: query,
          locationFilter: location,
          limit: 8
        })
      });

      const data = await response.json();
      if (!data.success && data.error) {
        showNotification(data.error);
        return;
      }

      if (data.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
        setJobs(data.jobs);
        showNotification(`Found ${data.jobs.length} tailored opportunities in ${targetProfile.preferredLocations?.join(', ') || 'India'}!`);
      } else {
        const tailored = getInitialJobsForProfile(targetProfile);
        setJobs(tailored);
        showNotification('Just My Type results refreshed with verified opportunities.');
      }
    } catch {
      const tailored = getInitialJobsForProfile(targetProfile);
      setJobs(tailored);
      showNotification('Updated matching opportunities.');
    } finally {
      setIsSearchingJobs(false);
    }
  };

  const handleDisconnectAI = () => {
    setUserApiKey(null);
    showNotification('Gemini connection disconnected.');
  };

  const handleSignOut = () => {
    setAuthUser(null);
    setUserApiKey(null);
    setCurrentView('landing');
    showNotification('Signed out successfully.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Google Sign-In Dialog Modal */}
      <GoogleSignInModal
        isOpen={showGoogleSignInModal}
        onClose={() => setShowGoogleSignInModal(false)}
        onSignedIn={handleGoogleSignedIn}
        defaultEmail=""
      />

      {/* Security & Privacy Vault Modal */}
      <SecurityPrivacyModal
        isOpen={showSecurityVaultModal}
        onClose={() => setShowSecurityVaultModal(false)}
        onResetAllData={handleResetAllData}
      />

      {/* VIEW 1: LANDING PAGE */}
      {currentView === 'landing' && (
        <LandingScreen
          onGetStartedWithGoogle={handleStartGoogleSignIn}
          isSignedIn={!!authUser}
          userEmail={authUser?.email}
          userName={authUser?.name}
          onDirectEnterRadar={() => setCurrentView('portal')}
        />
      )}

      {/* VIEW 2: 4-QUESTION QUICK CAREER PROFILE */}
      {currentView === 'profile_wizard' && (
        <CareerProfileWizard
          initialProfile={profile}
          onFinishWizard={handleWizardFinished}
          onBackToLanding={() => setCurrentView('landing')}
        />
      )}

      {/* VIEW 3: CAREER RADAR PREVIEW SCREEN */}
      {currentView === 'radar_preview' && (
        <RadarPreviewScreen
          profile={profile}
          onActivateRadar={handleActivateRadarFromPreview}
          onEditProfile={() => setCurrentView('profile_wizard')}
        />
      )}

      {/* VIEW 4: GEMINI CONNECTION FLOW */}
      {currentView === 'connect_gemini' && (
        <GeminiActivationFlow
          onConnected={handleGeminiConnected}
          onBack={() => setCurrentView(userApiKey ? 'portal' : 'radar_preview')}
          initialKey={userApiKey}
        />
      )}

      {/* VIEW 5: MAIN PORTAL */}
      {currentView === 'portal' && (
        <div className="min-h-screen flex flex-col justify-between">
          <SimpleNavbar
            activeTab={portalTab}
            onSelectTab={(tab) => setPortalTab(tab)}
            profile={profile}
            authUser={authUser}
            hasApiKey={!!userApiKey}
            onOpenAIConnect={() => setCurrentView('connect_gemini')}
            onEditProfile={() => setCurrentView('profile_wizard')}
            onSignOut={handleSignOut}
            onOpenSecurityVault={() => setShowSecurityVaultModal(true)}
            onResetAllData={handleResetAllData}
          />

          <main className="flex-1 pb-16">
            {(portalTab === 'home' || portalTab === 'matches') && (
              <JobRadarDashboard
                jobs={jobs}
                profile={profile}
                hasApiKey={!!userApiKey}
                onOpenAIConnect={() => setCurrentView('connect_gemini')}
                onRefreshJobs={(q, loc) => handleSearchJobs(profile, q, loc)}
                onEditPreferences={() => setPortalTab('preferences')}
                isSearching={isSearchingJobs}
                onSelectJob={(job) => setSelectedJob(job)}
              />
            )}

            {portalTab === 'preferences' && (
              <PreferencesView
                profile={profile}
                authUser={authUser}
                onSaveProfile={(updated) => {
                  setProfile(updated);
                  showNotification('Preferences updated!');
                  if (userApiKey) {
                    handleSearchJobs(updated);
                  }
                }}
                hasApiKey={!!userApiKey}
                onOpenAIConnect={() => setCurrentView('connect_gemini')}
                onDisconnectAI={handleDisconnectAI}
                onSignOut={handleSignOut}
                onOpenSecurityVault={() => setShowSecurityVaultModal(true)}
                onResetAllData={handleResetAllData}
              />
            )}
          </main>

          {/* Simple Clean Footer */}
          <footer className="w-full max-w-6xl mx-auto px-6 py-6 border-t border-slate-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div>Just My Type 🎯 &copy; {new Date().getFullYear()} — Find jobs that are actually your type.</div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSecurityVaultModal(true)}
                className="hover:text-emerald-600 transition cursor-pointer flex items-center gap-1 font-semibold text-slate-500"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Security & Privacy Vault</span>
              </button>
              <span>•</span>
              <button
                onClick={() => setCurrentView('profile_wizard')}
                className="hover:text-slate-600 transition cursor-pointer"
              >
                Edit Target Profile
              </button>
              <span>•</span>
              <button
                onClick={() => setCurrentView('connect_gemini')}
                className="hover:text-slate-600 transition cursor-pointer"
              >
                Gemini Connection
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* Detailed Opportunity Modal */}
      <JobDetailModal
        job={selectedJob}
        profile={profile}
        userApiKey={userApiKey}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}
