import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AIHome.module.css';
import Layout from '../layout/Layout';

// Sections
import GalaxyBackground from './background/GalaxyBackground';
import HumanLayer from './ai-sections/HumanLayer';
import Awakening from './ai-sections/Awakening';
import DataCollection from './ai-sections/DataCollection';
import PerceptionLayer from './ai-sections/PerceptionLayer';
import ReasoningEngine from './ai-sections/ReasoningEngine';
import CollectiveIntelligence from './ai-sections/CollectiveIntelligence';
import FutureTimeline from './ai-sections/FutureTimeline';
import RecruiterView from './ai-sections/RecruiterView';
import HiringReadiness from './ai-sections/HiringReadiness';
import DecisionEngine from './ai-sections/DecisionEngine';
import InterviewModule from './ai-sections/InterviewModule';
import FeedbackLoop from './ai-sections/FeedbackLoop';

const Home = () => {
    const [awakened, setAwakened] = useState(false);

    return (
        <Layout>
            <GalaxyBackground />
            <div className={styles.aiContainer}>

                {/* ZONE 1: THE HUMAN (Always Visible) */}
                <HumanLayer />

                {/* ZONE 2: THE AWAKENING (Scroll Trigger) */}
                {!awakened ? (
                    <motion.div
                        onViewportEnter={() => !awakened && setAwakened(true)} // Simple trigger point
                        viewport={{ margin: "-200px" }}
                        style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        {/* This Awakening component handles the animation and then "vanishes" or stays as a header */}
                        <Awakening onComplete={() => { }} />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {/* THE INTELLIGENCE ECOSYSTEM */}

                        {/* 1. Inputs */}
                        <DataCollection />
                        <PerceptionLayer />

                        {/* 2. Processing */}
                        <ReasoningEngine />

                        {/* 3. Global Context */}
                        <CollectiveIntelligence />
                        <RecruiterView />

                        {/* 4. Outputs & Decisions */}
                        <FutureTimeline />
                        <HiringReadiness />
                        <DecisionEngine />

                        {/* 5. Interaction */}
                        <InterviewModule />
                        <FeedbackLoop />

                        <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem', fontFamily: 'monospace' }}>
                            <p style={{ margin: 0, color: '#0ff' }}>SYSTEM ARCHITECTURE: TRANSCENDENT_CORE_V1</p>
                            <p style={{ margin: '0.5rem 0', color: '#888' }}>&copy; {new Date().getFullYear()} Amit. All Rights Reserved.</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

export default Home;
