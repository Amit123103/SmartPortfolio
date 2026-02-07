import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from '../layout/Layout';
import AIAvatar from './AIAvatar';
import ContactForm from './ContactForm';
import VoiceChat from './VoiceChat';
import SocialButton from './SocialButton';
import SocialTransition from './SocialTransition';
import styles from './Contact.module.css';

const Contact = () => {
    const [activeMode, setActiveMode] = useState('form'); // form | voice
    const [socialTransition, setSocialTransition] = useState(null); // { platform, url, color }

    const socialLinks = [
        { platform: 'Instagram', icon: '📸', color: '#E1306C', url: 'https://www.instagram.com/amit.kumar_270?igsh=MWQ2a3c4Zm1rZzNsdg==' },
        { platform: 'Discord', icon: '🎮', color: '#5865F2', url: 'https://discord.com/channels/1448035445735948380/1448035446557773935' },
        { platform: 'LinkedIn', icon: '💼', color: '#0A66C2', url: 'https://www.linkedin.com/in/amit-akhil/' },
    ];

    const handleSocialClick = (link) => {
        setSocialTransition(link);
    };

    const handleTransitionComplete = () => {
        if (socialTransition?.url) {
            window.open(socialTransition.url, '_blank');
        }
        setSocialTransition(null);
    };

    return (
        <Layout>
            <AnimatePresence>
                {socialTransition && (
                    <SocialTransition
                        platform={socialTransition.platform}
                        color={socialTransition.color}
                        onComplete={handleTransitionComplete}
                    />
                )}
            </AnimatePresence>

            <div className={styles.container}>
                <h1 className={styles.title}>Contact HQ</h1>

                {/* Social Grid */}
                <div className={styles.socialGrid}>
                    {socialLinks.map(link => (
                        <SocialButton
                            key={link.platform}
                            {...link}
                            onClick={() => handleSocialClick(link)}
                        />
                    ))}
                </div>

                <div className={styles.grid}>
                    {/* Left: AI Agent */}
                    <div className={styles.agentCol}>
                        <AIAvatar mood="listening" />
                        <div className={styles.modeSwitch}>
                            <button
                                className={`${styles.modeBtn} ${activeMode === 'form' ? styles.active : ''}`}
                                onClick={() => setActiveMode('form')}
                            >
                                ✉️ Text Mode
                            </button>
                            <button
                                className={`${styles.modeBtn} ${activeMode === 'voice' ? styles.active : ''}`}
                                onClick={() => setActiveMode('voice')}
                            >
                                🎙️ Voice Mode
                            </button>
                        </div>
                    </div>

                    {/* Right: Interaction Area */}
                    <div className={styles.interactionCol}>
                        {activeMode === 'form' ? (
                            <ContactForm />
                        ) : (
                            <VoiceChat />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
