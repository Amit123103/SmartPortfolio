import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useMetaverseState = create(
    persist(
        (set, get) => ({
            // --- IDENTITY & FEDERATED AI ---
            identity: {
                id: 'user_' + Math.random().toString(36).substr(2, 9),
                federatedId: null, // Assigned after local training
            },
            aiModel: {
                weights: {}, // Local learned weights (mock)
                generation: 0,
            },

            // --- WORLD STATUS ---
            currentBiome: 'emerald_forest', // emerald_forest, bio_grove, sakura_highlands
            timeOfDay: 0.5, // 0.0 - 1.0
            weatherIntensity: 0.2,

            // --- BIO-PHYSICS STATE ---
            treeHealth: 1.0,
            nutrients: 100,

            // --- CREATOR MODE ---
            isCreatorMode: false,
            activeTool: null, // 'shader', 'biome', 'narrative'

            // --- ACTIONS ---
            setBiome: (biome) => set({ currentBiome: biome }),
            updateNutrients: (delta) => set((s) => ({ nutrients: Math.max(0, s.nutrients + delta) })),
            toggleCreatorMode: () => set((s) => ({ isCreatorMode: !s.isCreatorMode })),

            // Federated Update (Mock)
            updateLocalModel: (gradients) => {
                // In real app: Apply gradients to local weights using TF.js
                set((s) => ({
                    aiModel: { ...s.aiModel, generation: s.aiModel.generation + 1 }
                }));
            }
        }),
        {
            name: 'metaverse-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
