import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { AnimatePresence } from 'framer-motion';
import EmailSuccessBlast from './EmailSuccessBlast';
import styles from './Contact.module.css';
import API_BASE_URL from '../../config/api';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errorMessage, setErrorMessage] = useState('');

    // EMAILJS CONFIGURATION
    const SERVICE_ID = 'service_mv2cnyk';
    const TEMPLATE_ID = 'template_rwyy0bs';
    const PUBLIC_KEY = 'MDWnyhbWxYstuLRvq';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // 1. Send Email via EmailJS (Frontend)
            const emailResult = await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    reply_to: formData.email,
                },
                PUBLIC_KEY
            );

            console.log('EmailJS Result:', emailResult.text);

            // 2. Optional: Still log to backend DB for safety (without sending email)
            // We fire-and-forget this to speed up UI
            fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, logOnly: true }) // Flag to skip backend email
            }).catch(console.warn);

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

        } catch (err) {
            console.error('EmailJS Error:', err);
            setStatus('error');
            setErrorMessage(err.text || err.message || 'Unknown Network Error');
        }
    };

    return (
        <>
            <AnimatePresence>
                {status === 'success' && (
                    <EmailSuccessBlast onComplete={() => setStatus('idle')} />
                )}
            </AnimatePresence>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label>Message</label>
                    <textarea
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        required
                    />
                </div>

                {/* Spam Protection Honeypot - Invisible to users */}
                <input
                    type="text"
                    name="honeypot"
                    style={{ display: 'none' }}
                    value={formData.honeypot || ''}
                    onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
                />

                <button type="submit" disabled={status === 'sending'} className={styles.submitBtn}>
                    {status === 'sending' ? 'Sending via Neural Net...' : 'Send Transmission'}
                </button>
                {status === 'error' && (
                    <div style={{ marginTop: '1rem', color: '#ff4444', background: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '4px' }}>
                        <p style={{ fontWeight: 'bold' }}>Transmission Failed.</p>
                        <p style={{ fontSize: '0.9em' }}>{errorMessage}</p>
                    </div>
                )}
            </form>
        </>
    );
};

export default ContactForm;
