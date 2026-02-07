import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUniverseState = create(
    persist(
        (set, get) => ({
            // --- VISITOR IDENTITY (Anonymous/Local) ---
            visitorId: 'vis_' + Math.random().toString(36).substr(2, 9),
            consent: {
                ai: false, // On-device learning
                presence: false, // Multiplayer
                xr: false, // Eye-tracking
            },

            // --- WORLD STATE ---
            season: 'spring', // spring, summer, autumn, winter
            timeOfDay: 'day', // day, night, goldenHour
            weather: 'clear', // clear, rain, storm, bloom

            // --- INTERACTION METRICS (Input for AI) ---
            mood: 'calm', // inferred state
            energyLevel: 0.5, // 0.0 to 1.0
            focusTarget: null, // Current node being looked at

            // --- STORY / MYTHOS ---
            mythsUnlocked: [], // ['seedbearer', 'night_walker']
            currentChapter: 0,

            // --- ACTIONS ---
            setConsent: (key, value) => set((s) => ({ consent: { ...s.consent, [key]: value } })),
            setWorldState: (updates) => set((s) => ({ ...s, ...updates })),
            setMood: (mood) => set({ mood }),
            unlockMyth: (mythId) => {
                const current = get().mythsUnlocked;
                if (!current.includes(mythId)) {
                    set({ mythsUnlocked: [...current, mythId] });
                    return true; // Newly unlocked
                }
                return false;
            },

            // Reset
            resetUniverse: () => {
                localStorage.removeItem('sentient-universe-storage');
                window.location.reload();
            }
        }),
        {
            name: 'sentient-universe-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
