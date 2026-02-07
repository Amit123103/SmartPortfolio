/**
 * Presence System
 * Handles multiplayer awareness via WebRTC/WebSocket.
 * Shows "ambient silhouettes" of other visitors.
 */

import { useUniverseState } from '../store/useUniverseState';

class PresenceSystem {
    constructor() {
        this.peers = new Map(); // id -> { x, y, z, mood }
        this.connected = false;
        this.socket = null;
    }

    connect() {
        const { consent } = useUniverseState.getState();
        if (!consent.presence || this.connected) return;

        console.log('📡 [Presence] Connecting to Hive Mind...');

        // Mocking the connection for "Runnable Code" without a dedicated WS backend
        // In production: this.socket = io('wss://presence.yourdomain.com');

        this.connected = true;
        this.startBroadcasting();
        this.startMockTraffic(); // Simulates other users for the demo
    }

    disconnect() {
        this.connected = false;
        if (this.interval) clearInterval(this.interval);
    }

    startBroadcasting() {
        this.interval = setInterval(() => {
            if (!this.connected) return;
            // Broadcast local state (Mock)
            // const state = useUniverseState.getState();
            // this.socket.emit('frame', { mood: state.mood, ...cameraPos });
        }, 100);
    }

    startMockTraffic() {
        // Simulates ghosts of other users for the visual effect
        setInterval(() => {
            if (!this.connected) return;
            const mockId = 'ghost_' + Math.floor(Math.random() * 5);
            this.peers.set(mockId, {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10,
                z: (Math.random() - 0.5) * 10,
                mood: ['calm', 'focused', 'energetic'][Math.floor(Math.random() * 3)]
            });
        }, 2000);
    }

    getPeers() {
        return Array.from(this.peers.values());
    }
}

export const presenceSystem = new PresenceSystem();
