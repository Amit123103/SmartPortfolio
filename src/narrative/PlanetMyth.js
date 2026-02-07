/**
 * Planet Myth Engine
 * Generates lore based on Biome and World State.
 */

const MYTH_TEMPLATES = {
    emerald_forest: [
        "The canopy whispered of {ancient_event}.",
        "Roots entangled with the memory of {entity}."
    ],
    bioluminescent_grove: [
        "Light pulsed in rhythm with {cosmic_force}.",
        "Shadows fled from the {glowing_artifact}."
    ],
    sakura_highlands: [
        "Petals fell like {tears_of_gods}.",
        "The wind carried secrets of {forgotten_era}."
    ]
};

const TERMS = {
    ancient_event: ["the First Rain", "the Great Silence", "the Starfall"],
    entity: ["the World Soul", "the Void Walker", "the Solar King"],
    cosmic_force: ["the Pulsar", "the Nebula", "the Event Horizon"],
    glowing_artifact: ["Crystal Heart", "Star Shard", "Moon Tear"],
    tears_of_gods: ["silver rain", "golden dust", "frozen time"],
    forgotten_era: ["the Age of Roots", "the Era of Bloom", "the Cycle of Decay"]
};

export const generatePlanetMyth = (biome) => {
    const templates = MYTH_TEMPLATES[biome] || MYTH_TEMPLATES.emerald_forest;
    const template = templates[Math.floor(Math.random() * templates.length)];

    return template.replace(/\{(\w+)\}/g, (_, key) => {
        const options = TERMS[key] || ["mystery"];
        return options[Math.floor(Math.random() * options.length)];
    });
};
