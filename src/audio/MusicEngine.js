/**
 * Adaptive Generative Music Engine
 * Uses Web Audio API to create ambient textures without external files.
 */
class MusicEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.oscillators = [];
        this.isPlaying = false;
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.1; // Low volume ambient
        this.masterGain.connect(this.ctx.destination);
    }

    playTone(freq, type = 'sine', duration = 2) {
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + duration * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);

        // Cleanup
        setTimeout(() => {
            osc.disconnect();
            gain.disconnect();
        }, duration * 1000 + 100);
    }

    startAmbient() {
        if (this.isPlaying) return;
        this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        this.isPlaying = true;

        this.loopId = setInterval(() => {
            // Pentatonic scale generation
            const baseFreq = 220;
            const ratios = [1, 1.125, 1.25, 1.5, 1.66];
            const freq = baseFreq * ratios[Math.floor(Math.random() * ratios.length)];

            this.playTone(freq, 'sine', 4);

            // Randomly add a higher sparkle
            if (Math.random() > 0.7) {
                this.playTone(freq * 2, 'triangle', 1);
            }
        }, 3000);
    }

    stop() {
        this.isPlaying = false;
        if (this.loopId) clearInterval(this.loopId);
        if (this.ctx) this.ctx.suspend();
    }

    setVolume(val) {
        if (this.masterGain) this.masterGain.gain.value = val;
    }
}

export const musicEngine = new MusicEngine();
