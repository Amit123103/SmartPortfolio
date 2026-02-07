/**
 * On-Device AI Layer (Privacy First)
 * Uses lightweight heuristic models to infer mood and interaction intent
 * without uploading data to the cloud.
 */

import { useUniverseState } from '../store/useUniverseState';

class OnDeviceAI {
    constructor() {
        this.interactions = [];
        this.lastProcessTime = Date.now();
        this.inferenceInterval = 2000; // 2 seconds
    }

    // Capture input signals (clicks, scrolls, dwell time)
    logInteraction(type, data = {}) {
        const { consent } = useUniverseState.getState();
        if (!consent.ai) return;

        this.interactions.push({ type, time: Date.now(), ...data });

        // Prune old data
        if (this.interactions.length > 50) this.interactions.shift();

        this.processMood();
    }

    // Heuristic Model: "Rhythm Classifier"
    // Infers mood based on speed and erraticness of inputs
    processMood() {
        const now = Date.now();
        if (now - this.lastProcessTime < this.inferenceInterval) return;
        this.lastProcessTime = now;

        const recent = this.interactions.filter(i => now - i.time < 5000); // Last 5s
        if (recent.length === 0) {
            useUniverseState.getState().setMood('calm');
            return;
        }

        // Calculate KPM (Keystrokes/Clicks Per Minute equivalent)
        const density = recent.length;

        // Calculate Variance (Jitter)
        // In a real model, this would be a tensor op
        let mood = 'calm';
        if (density > 10) mood = 'energetic';
        else if (density > 4) mood = 'focused';

        // Update Store
        useUniverseState.getState().setMood(mood);
    }
}

export const aiLayer = new OnDeviceAI();
