/**
 * Bio-Physics Growth Engine
 * Simulates plant biology: Phototropism, Hydrotropism, and Pruning.
 */

export const simulateGrowth = (treeState, inputs) => {
    const { light, water, time } = inputs;

    // 1. Photosynthesis Rate
    // Opt: 0.8 intensity
    const photosynthesis = Math.max(0, 1.0 - Math.abs(light - 0.8)) * time;

    // 2. Root Absorption
    const absorption = Math.min(water, 1.0) * 0.5;

    // 3. New Growth Vector
    // Trees grow towards light (Phototropism)
    // Here we return a modifier for the shader sway/size
    const growthFactor = (photosynthesis + absorption) * 0.01;

    return {
        healthDelta: growthFactor,
        sizeModifier: 1.0 + growthFactor,
        swayModifier: 1.0 - (growthFactor * 0.2) // Sturdier as it grows
    };
};
