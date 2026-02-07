class SoundManager {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.isMuted = false;
        this.activeSounds = {
            wind: null,
            engine: null
        };
    }

    init() {
        if (!this.ctx) {
            try {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                this.masterGain = this.ctx.createGain();
                this.masterGain.connect(this.ctx.destination);
                this.masterGain.gain.value = 0.1; // Safe volume
            } catch (e) {
                console.error("AudioContext init failed", e);
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(e => console.error("Audio resume failed", e));
        }
    }

    createOscillator(type, freq, start, stop, vol = 0.1) {
        if (!this.ctx) return { osc: null, gain: null };
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (stop - start));

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(this.ctx.currentTime + start);
        osc.stop(this.ctx.currentTime + stop);
        return { osc, gain };
    }

    createNoise(duration) {
        if (!this.ctx) return { noise: null, gain: null };
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        noise.connect(gain);
        gain.connect(this.masterGain);
        return { noise, gain };
    }

    // --- SOUND FX METHODS ---

    playHover() {
        if (this.isMuted) return;
        this.init(); // Auto-init on interaction
        if (!this.ctx) return;

        try {
            // High pitched tech blip
            const { gain } = this.createOscillator('sine', 800, 0, 0.15, 0.05);
        } catch (e) { console.warn(e); }
    }

    playLockOn() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        try {
            this.createOscillator('square', 1200, 0, 0.1, 0.02);
        } catch (e) { console.warn(e); }
    }

    playEngineIdle() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        // Prevent stacking
        if (this.activeSounds.engine) return;

        try {
            const { noise, gain } = this.createNoise(5);
            if (!noise) return;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 100;

            noise.disconnect();
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            noise.loop = true;
            noise.start();

            this.activeSounds.engine = { noise, gain };
            this.engineNoise = noise; // Backwards compat
            this.engineGain = gain;
        } catch (e) { console.warn(e); }
    }

    stopEngine() {
        if (this.activeSounds.engine) {
            const { noise, gain } = this.activeSounds.engine;
            try {
                if (this.ctx) {
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1);
                    noise.stop(this.ctx.currentTime + 1);
                }
            } catch (e) { }
            this.activeSounds.engine = null;
            this.engineNoise = null;
        }
    }

    playLaunch() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            // 1. Sonic Boom
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.setValueAtTime(200, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 1);
            gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start();
            osc.stop(this.ctx.currentTime + 2);

            // 2. Rush
            const { noise, gain: nGain } = this.createNoise(2);
            if (noise) {
                nGain.gain.setValueAtTime(0.1, this.ctx.currentTime);
                nGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.5);
                nGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2);
                noise.start();
            }
        } catch (e) { console.warn(e); }
    }

    playWarp() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(2000, this.ctx.currentTime + 3);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 2);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 4);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start();
            osc.stop(this.ctx.currentTime + 4);
        } catch (e) { console.warn(e); }
    }

    playThwip() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const { noise, gain } = this.createNoise(0.3);
            if (!noise) return;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 1000;

            noise.disconnect();
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
            noise.start();
        } catch (e) { console.warn(e); }
    }

    playWind() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        if (this.activeSounds.wind) return;

        try {
            const { noise, gain } = this.createNoise(5);
            if (!noise) return;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400;

            noise.disconnect();
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 2);

            noise.loop = true;
            noise.start();

            this.activeSounds.wind = { noise, gain };
        } catch (e) { console.warn(e); }
    }

    stopWind() {
        if (this.activeSounds.wind) {
            const { noise, gain } = this.activeSounds.wind;
            try {
                if (this.ctx) {
                    gain.gain.setValueAtTime(gain.gain.value, this.ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1);
                    noise.stop(this.ctx.currentTime + 1);
                }
            } catch (e) { }
            this.activeSounds.wind = null;
        }
    }

    playSwing() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const { noise, gain } = this.createNoise(1.5);
            if (!noise) return;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 100;
            filter.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.5);
            filter.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 1.5);
            noise.disconnect();
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.5);
            gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);
            noise.start();
        } catch (e) { console.warn(e); }
    }

    playImpact() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const { gain } = this.createOscillator('triangle', 100, 0, 0.5, 0.3);
            if (gain) {
                gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
            }
        } catch (e) { console.warn(e); }
    }

    stopAll() {
        this.stopWind();
        this.stopEngine();
        if (this.ctx) this.ctx.suspend();
    }
}

export const soundManager = new SoundManager();
