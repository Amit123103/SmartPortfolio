/**
 * Generative Myth Engine
 * Procedurally generates lore fragments based on user exploration.
 */

import { useUniverseState } from '../store/useUniverseState';

const FRAGMENTS = {
    seeds: ["The First Seed", "Orbiting Starlight", "Deep Root"],
    actions: ["awoke", "drifted", "connected", "sang"],
    consequences: ["creating the canopy", "silencing the void", "bringing the rain"],
};

export const generateMyth = () => {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Simple deterministic grammar
    const myth = `In the beginning, ${pick(FRAGMENTS.seeds)} ${pick(FRAGMENTS.actions)}, ${pick(FRAGMENTS.consequences)}.`;

    return myth;
};

export const checkAchievements = (path) => {
    const { unlockMyth } = useUniverseState.getState();

    if (path === '/projects') {
        if (unlockMyth('seedbearer')) return { title: "Seedbearer", desc: "You have accessed the archive of creation." };
    }
    if (path === '/contact') {
        if (unlockMyth('voice_of_void')) return { title: "Voice of Void", desc: "You have reached out to the unknown." };
    }

    return null;
};
