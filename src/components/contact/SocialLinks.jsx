import React from 'react';
import styles from './SocialLinks.module.css';

const SocialLinks = () => {
    const links = [
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/amit.kumar_270?igsh=MWQ2a3c4Zm1rZzNsdg==',
            icon: (
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/amit-akhil/',
            icon: (
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            )
        },
        {
            name: 'Discord',
            url: 'https://discord.com/channels/1448035445735948380/1448035446557773935',
            icon: (
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 5.1s-.6-1-1.7-1.3c0 0-1.8-1.5-6.5-.4 0 0-1.2 2-2 3.8-1.7 0-3.3 0-4.8 1.1-1.4 1.1-2.9 3.5-2.9 7 0 3.5 1.5 6.5 4.5 7.8 0 0 1.2 1.3 2.9 1.1.8-.1 1.4-.4 1.4-.4s.4-1 .8-1.8c-1.3-.4-1.9-1-1.9-1s.1 0 .2-.1c3.9 1.2 8.1 1.2 12 0 .1 0 .2 0 .2 0 0 0-.6.6-1.9 1 .4.8.8 1.7.8 1.7s.6.3 1.4.4c1.7.2 2.9-1.1 2.9-1.1 3-1.3 4.5-4.3 4.5-7.8 0-3.5-1.5-5.9-2.9-7-1.5-1.1-3.1-1.1-4.8-1.1-.8-1.8-2-3.8-2-3.8-4.7-1.1-6.5.4-6.5.4-1.1.3-1.7 1.3-1.7 1.3zM8.8 15.3c-1.1 0-1.9-1-1.9-2.2 0-1.2.9-2.2 1.9-2.2 1.1 0 1.9 1 1.9 2.2 0 1.2-.9 2.2-1.9 2.2zm6.5 0c-1.1 0-1.9-1-1.9-2.2 0-1.2.9-2.2 1.9-2.2 1.1 0 1.9 1 1.9 2.2 0 1.2-.9 2.2-1.9 2.2z"></path></svg>
            )
        },
    ];

    return (
        <div className={styles.socialContainer}>
            {links.map((link, index) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    aria-label={link.name}
                    data-name={link.name}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;
