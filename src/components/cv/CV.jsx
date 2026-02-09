import React, { useState } from 'react';
import Layout from '../layout/Layout';
import CVCard from './CVCard';
import CVModal from './CVModal';
import styles from './CV.module.css';

const documentsData = [
    {
        id: 1,
        type: 'general',
        title: 'General CV',
        description: 'Comprehensive curriculum vitae detailing my entire professional history, education, and complete skill set.',
        date: 'Updated – January 2025',
        image: 'https://image2url.com/r2/default/images/1770463703361-286cd851-4f6c-490d-9928-aaf25cf1ec39.png',
        downloadUrl: 'https://image2url.com/r2/default/images/1770463703361-286cd851-4f6c-490d-9928-aaf25cf1ec39.png'
    },
    {
        id: 2,
        type: 'specialized',
        title: 'Specialized CV (AI/ML)',
        description: 'Focused document highlighting Deep Learning projects, research, and advanced AI competencies.',
        date: 'Updated – February 2025',
        image: 'https://i.vgy.me/HfxqQQ.png',
        downloadUrl: 'https://i.vgy.me/HfxqQQ.png'
    },
    {
        id: 3,
        type: 'resume',
        title: 'Professional Resume',
        description: 'One-page executive summary designed for quick scanning by recruiters and hiring managers.',
        date: 'Updated – March 2025'
    },
    {
        id: 4,
        type: 'video',
        title: 'Video CV',
        description: 'A brief 2-minute video introduction showcasing my communication skills and passion for technology.',
        date: 'Recorded – March 2025'
    }
];

const CV = () => {
    const [selectedDoc, setSelectedDoc] = useState(null);

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>CV & Resume</h1>

                <div className={styles.grid}>
                    {documentsData.map((doc, index) => (
                        <CVCard
                            key={doc.id}
                            item={doc}
                            index={index}
                            onView={setSelectedDoc}
                        />
                    ))}
                </div>

                <CVModal
                    isOpen={!!selectedDoc}
                    onClose={() => setSelectedDoc(null)}
                    document={selectedDoc}
                />
            </div>
        </Layout>
    );
};

export default CV;
