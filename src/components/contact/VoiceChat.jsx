import React, { useState, useEffect, useRef } from 'react';
import AIAvatar from './AIAvatar';
import styles from './Contact.module.css';
import API_BASE_URL from '../../config/api';

const VoiceChat = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [status, setStatus] = useState('idle'); // idle, listening, processing, speaking

    const recognitionRef = useRef(null);
    const synthesisRef = useRef(window.speechSynthesis);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setStatus('listening');
                setIsListening(true);
            };

            recognition.onend = () => {
                setIsListening(false);
                if (status !== 'processing') setStatus('idle');
            };

            recognition.onresult = async (event) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                setStatus('processing');

                // Get AI Response
                await handleAIInteraction(text);
            };

            recognitionRef.current = recognition;
        } else {
            setAiResponse("Voice API not supported in this browser.");
        }
    }, [status]);

    const handleAIInteraction = async (text) => {
        try {
            // Simulated AI Call
            // const res = await fetch(`${API_BASE_URL}/api/ai/chat`, ...)

            // Mock Response for consistency in demo
            const responses = [
                "I've logged that request. Is there anything else?",
                "Connecting you to the right department.",
                "I can certainly help with that inquiry."
            ];
            const reply = responses[Math.floor(Math.random() * responses.length)];

            setAiResponse(reply);
            setStatus('speaking');
            speak(reply);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    const speak = (text) => {
        if (!synthesisRef.current) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setStatus('idle');

        // Select Voice
        const voices = synthesisRef.current.getVoices();
        utterance.voice = voices.find(v => v.lang === 'en-US') || voices[0];

        synthesisRef.current.speak(utterance);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
    };

    return (
        <div className={styles.voiceContainer}>
            <div className={styles.visualizer}>
                <AIAvatar mood={status === 'listening' ? 'listening' : status === 'speaking' ? 'speaking' : 'neutral'} />
            </div>

            <div className={styles.transcriptArea}>
                {transcript && <p className={styles.userText}>" {transcript} "</p>}
                {aiResponse && <p className={styles.aiText}>AI: {aiResponse}</p>}
            </div>

            <button
                className={`${styles.micBtn} ${isListening ? styles.active : ''}`}
                onClick={toggleListening}
            >
                {isListening ? '🛑 Stop' : '🎙️ Tap to Speak'}
            </button>
            <p className={styles.statusText}>Status: {status.toUpperCase()}</p>
        </div>
    );
};

export default VoiceChat;
