import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useVisitorProfile = create(
    persist(
        (set, get) => ({
            // Preferences
            language: 'en',
            reducedMotion: false,
            soundEnabled: false,
            highContrast: false,

            // Visitor State
            mood: 'calm', // calm, focused, energetic
            visitedNodes: [],
            sessionStartTime: Date.now(),

            // Actions
            setLanguage: (lang) => set({ language: lang }),
            toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
            setMood: (mood) => set({ mood }),
            visitNode: (nodeId) => set((state) => ({
                visitedNodes: [...new Set([...state.visitedNodes, nodeId])]
            })),

            // Consent
            consentGiven: false,
            giveConsent: () => set({ consentGiven: true }),
        }),
        {
            name: 'sentient-tree-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
