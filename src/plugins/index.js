/**
 * Enterprise Plugin System
 * Allows hot-swapping behavior modules.
 */

const registry = new Map();

export const registerPlugin = (name, config) => {
    console.log(`🔌 [Plugin] Registering: ${name}`);
    registry.set(name, config);
};

export const getPlugin = (name) => registry.get(name);

// Example Registration
registerPlugin('theme-forest', {
    colors: { primary: '#1E6F4F', secondary: '#FACC15' },
    ambience: 'birds.mp3'
});
