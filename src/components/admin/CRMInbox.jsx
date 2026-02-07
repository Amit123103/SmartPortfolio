import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import API_BASE_URL from '../../config/api';

const CRMInbox = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/contact`);
                const data = await res.json();
                setMessages(data);
            } catch (err) {
                console.error("Failed to fetch CRM data", err);
            }
        };
        fetchMessages();
    }, []);

    return (
        <Layout>
            <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: 'white', marginBottom: '2rem' }}>CRM Inbox</h1>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {messages.length === 0 ? (
                        <p style={{ color: '#888' }}>No messages yet.</p>
                    ) : (
                        messages.map(msg => (
                            <div key={msg.id} style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '1.5rem',
                                borderRadius: '10px',
                                borderLeft: `4px solid ${msg.status === 'new' ? '#00f0ff' : '#888'}`
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ color: 'white', margin: 0 }}>{msg.name}</h3>
                                    <span style={{ color: '#888', fontSize: '0.9rem' }}>{new Date(msg.timestamp).toLocaleString()}</span>
                                </div>
                                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{msg.email}</p>
                                <p style={{ color: '#ddd', marginTop: '1rem' }}>{msg.message}</p>
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <button style={{ padding: '0.5rem 1rem', background: '#00f0ff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reply</button>
                                    <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #666', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}>Archive</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CRMInbox;
