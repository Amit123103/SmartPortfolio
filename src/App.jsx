import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Core Components
import IntroScene from './components/intro/IntroScene';
import Home from './components/home/Home';
import Projects from './components/projects/Projects';
import Certifications from './components/certifications/Certifications';
import Achievements from './components/achievements/Achievements';
import Journey from './components/journey/Journey';
import Experience from './components/experience/Experience';
import Skills from './components/skills/Skills';
import CV from './components/cv/CV';
import Contact from './components/contact/Contact';

// Layout & Context
import { TransitionProvider } from './context/TransitionContext';
import Navbar from './components/layout/Navbar';

// Cinematic System
import { CinematicProvider, useCinematic } from './context/CinematicContext';
import JetScene from './components/transition/JetScene';
import HUDOverlay from './components/transition/HUDOverlay';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { soundManager } from './audio/SoundManager';
import CinematicBackground from './components/background/CinematicBackground';

// Analytics
import { AnalyticsProvider } from './context/AnalyticsContext';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';

import './index.css';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

// Wrapper to handle the 3D Layer logic
const CinematicWrapper = () => {
  const { isTransitioning, phase } = useCinematic();

  useEffect(() => {
    try {
      if (phase === 'BRIEFING') {
        soundManager.playHover();
      } else if (phase === 'LOCK_ON') {
        soundManager.playLockOn();
        soundManager.playEngineIdle();
      } else if (phase === 'LAUNCH') {
        soundManager.playLaunch();
      } else if (phase === 'WARP') {
        soundManager.playWarp();
      } else if (phase === 'IDLE') {
        soundManager.stopEngine();
      }
    } catch (e) { console.warn("Audio error", e); }
  }, [phase]);

  if (!isTransitioning) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <JetScene phase={phase} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={phase === 'WARP' ? 20 : 1} />
      </Canvas>
      <HUDOverlay />
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error("App Crash:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '20px', zIndex: 99999, position: 'relative' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  // DEBUG: Force Intro every time for now
  useEffect(() => { localStorage.removeItem('cine_intro_shown'); }, []);

  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <ErrorBoundary>
      <Router>
        <TransitionProvider>
          <CinematicProvider>
            <AnalyticsProvider>

              {/* Debug Indicator */}
              <div style={{ position: 'fixed', top: 5, left: 5, zIndex: 9999, color: 'cyan', fontSize: '10px', pointerEvents: 'none' }}>
                Mode: {introComplete ? 'Main App' : 'Intro Sequence'}
              </div>

              {!introComplete ? (
                <AnimatePresence>
                  <IntroScene onComplete={handleIntroComplete} />
                </AnimatePresence>
              ) : (
                <>
                  <CinematicWrapper />
                  <CinematicBackground />
                  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
                    <Navbar />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1, paddingTop: '80px' }}>
                    <AnimatedRoutes />
                  </div>
                </>
              )}

            </AnalyticsProvider>
          </CinematicProvider>
        </TransitionProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
