import React, { useState } from 'react';
import Layout from '../layout/Layout';
import CertificationCard from './CertificationCard';
import CertificateModal from './CertificateModal';
import styles from './Certifications.module.css';

const certificationsData = [
    {
        id: 0,
        title: 'Technology Job Simulation',
        issuer: 'Deloitte',
        date: 'June 2025',
        details: 'Completed practical tasks in Coding and Development modules.',
        image: 'https://i.vgy.me/YqAVcx.png' // User provided image placeholder
    },
    {
        id: 1,
        title: 'Data Analytics Job Simulation',
        issuer: 'Deloitte',
        date: 'January 2025',
        details: 'Completed practical tasks in Data Analytics modules.',
        image: 'https://i.vgy.me/G3D1a9.png'
    },
    {
        id: 2,
        title: 'GenAI Powered Data Analytics Job Simulation',
        issuer: 'Tata',
        date: 'January 2026',
        details: 'Completed practical tasks in GenAI Powered Data Analytics modules.',
        image: 'https://i.vgy.me/l6Klds.png'
    },
    {
        id: 3,
        title: 'Quantitative Research Job Simulation',
        issuer: 'JP Morgan Chase & Co.',
        date: 'January 2026',
        details: 'Completed practical tasks in Quantitative Research modules.',
        image: 'https://i.vgy.me/zLQJlt.png'
    },
    {
        id: 4,
        title: 'Software Engineering Job Simulation',
        issuer: 'JP Morgan Chase & Co.',
        date: 'January 2026',
        details: 'Completed practical tasks in Software Engineering modules.',
        image: 'https://i.vgy.me/9G1CmW.png'
    },
    {
        id: 5,
        title: 'CSE250: Python for Data Science',
        issuer: 'Saylor Academy',
        date: 'January 2026',
        details: 'Completed practical tasks in Python for Data Science modules.',
        image: 'https://i.vgy.me/KzMtzk.png'
    },
    {
        id: 6,
        title: 'AI-Machine Learning Engineer Foundation course',
        issuer: 'Reliance Foundation',
        date: 'January 2026',
        details: 'Completed practical tasks in AI-Machine Learning Engineer Foundation course modules.',
        image: 'https://i.vgy.me/TQlRoa.png'
    },
    {
        id: 7,
        title: 'Professional Networking for Career Growth',
        issuer: 'hp life',
        date: 'January 2026',
        details: 'Completed practical tasks in Professional Networking for Career Growth modules.',
        image: 'https://i.vgy.me/C7nEbC.png'
    },
    {
        id: 8,
        title: 'Introduction to Hardware and Operating Systems',
        issuer: 'Coursera',
        date: 'September 2024',
        details: 'Completed practical tasks in Introduction to Hardware and Operating Systems modules.',
        image: 'https://i.vgy.me/YuHfMV.png'
    },
    {
        id: 9,
        title: 'Digital Systems: From Logic Gates to Processors ',
        issuer: 'Coursera',
        date: 'October 2024',
        details: 'Completed practical tasks in Digital Systems: From Logic Gates to Processors modules.',
        image: 'https://i.vgy.me/vmF260.png'
    },
    {
        id: 10,
        title: 'Fundamental Of Network Communication',
        issuer: 'Coursera',
        date: 'October 2024',
        details: 'Completed practical tasks in Fundamental Of Network Communication modules.',
        image: 'https://i.vgy.me/jySJC7.png'
    },
    {
        id: 11,
        title: 'Packet Switching Network and Algorithms',
        issuer: 'Coursera',
        date: 'October 2024',
        details: 'Completed practical tasks in Packet Switching Network and Algorithms modules.',
        image: 'https://i.vgy.me/hxdm7G.png'
    },
    {
        id: 12,
        title: 'TCP/IP and Advanced Topics',
        issuer: 'Coursera',
        date: 'October 2024',
        details: 'Completed practical tasks in TCP/IP and Advanced Topics modules.',
        image: 'https://i.vgy.me/J0p6V8.png'
    },
    {
        id: 13,
        title: 'Peer-to-Peer Protocols and Local Area Networks',
        issuer: 'Coursera',
        date: 'October 2024',
        details: 'Completed practical tasks in Peer-to-Peer Protocols and Local Area Networks modules.',
        image: 'https://i.vgy.me/CKvo3X.png'
    },
    {
        id: 14,
        title: 'Computer Communication',
        issuer: 'Coursera',
        date: 'October 2024',
        details: 'Completed practical tasks in Computer Communication modules.',
        image: 'https://i.vgy.me/YanysZ.png'
    },
    {
        id: 15,
        title: 'The Bits and Bytes of Computer Networking',
        issuer: 'Coursera',
        date: 'September 2024',
        details: 'Completed practical tasks in The Bits and Bytes of Computer Networking modules.',
        image: 'https://i.vgy.me/7BI2sl.png'
    },
    {
        id: 16,
        title: 'Master Genrative AI & Genrative AI Tools',
        issuer: 'Infosys',
        date: 'September 2025',
        details: 'Completed practical tasks in Master Genrative AI & Genrative AI Tools modules.',
        image: 'https://i.vgy.me/v8AAQM.png'
    },
    {
        id: 17,
        title: 'Computational Theory: Language Principle & Finite Automata Theory',
        issuer: 'Infosys',
        date: 'July 2025',
        details: 'Completed practical tasks in Computational Theory: Language Principle & Finite Automata Theory modules.',
        image: 'https://i.vgy.me/FOECQg.png'
    },
    {
        id: 18,
        title: 'Build Genrative AI Apps and Solutions with No-Code Tools',
        issuer: 'Infosys',
        date: 'September 2025',
        details: 'Completed practical tasks in Build Genrative AI Apps and Solutions with No-Code Tools modules.',
        image: 'https://i.vgy.me/1S16Ly.png'
    },
    {
        id: 19,
        title: 'ChatGPT-4 Prompt Engineering: ChatGPT, Genrative AI & LLM',
        issuer: 'Infosys',
        date: 'August 2025',
        details: 'Completed practical tasks in ChatGPT-4 Prompt Engineering: ChatGPT, Genrative AI & LLM modules.',
        image: 'https://i.vgy.me/H2PqZp.png'
    },
    {
        id: 20,
        title: 'ChatGPT Made Easy: AI Essentials for Beginners',
        issuer: 'Infosys',
        date: 'August 2025',
        details: 'Completed practical tasks in ChatGPT Made Easy: AI Essentials for Beginners modules.',
        image: 'https://i.vgy.me/RZca6t.png'
    },
    {
        id: 21,
        title: 'AWS Cloud Practitioner Essentials',
        issuer: 'AWS',
        date: 'July 2025',
        details: 'Completed practical tasks in AWS Cloud Practitioner Essentials modules.',
        image: 'https://i.vgy.me/iiZ8Mz.png'
    },
    {
        id: 22,
        title: 'Data Science and Analytics',
        issuer: 'HP LIFE',
        date: 'July 2025',
        details: 'Completed practical tasks in Data Science and Analytics modules.',
        image: 'https://i.vgy.me/TJw2d4.png'
    },
    {
        id: 23,
        title: 'Python Programming',
        issuer: 'Reliance Foundation',
        date: 'July 2025',
        details: 'Completed practical tasks in Python Programming modules.',
        image: 'https://i.vgy.me/u6PkMZ.png'
    },
    {
        id: 24,
        title: 'Fundamentals of Machine Learning and Artifical Intelligence',
        issuer: 'AWS',
        date: 'July 2025',
        details: 'Completed practical tasks in Fundamentals of Machine Learning and Artifical Intelligence modules.',
        image: 'https://i.vgy.me/Ah7eWm.png'
    },
    {
        id: 25,
        title: 'Getting Started with DevOps on AWS',
        issuer: 'AWS',
        date: 'July 2025',
        details: 'Completed practical tasks in Getting Started with DevOps on AWS modules.',
        image: 'https://i.vgy.me/s8CBfU.png'
    },
    {
        id: 26,
        title: 'Solutions Architecture Job Simulation',
        issuer: 'AWS',
        date: 'June 2025',
        details: 'Completed practical tasks in Solutions Architecture Job Simulation modules.',
        image: 'https://i.vgy.me/ZNoPKD.png'
    },
    {
        id: 27,
        title: 'Java Programming',
        issuer: 'Lovely Professional University',
        date: 'May 2025',
        details: 'Completed practical tasks in Java Programming modules.',
        image: 'https://i.vgy.me/TnxOD3.png'
    },
    {
        id: 28,
        title: 'Object Oriented Programming',
        issuer: 'Lovely Professional University',
        date: 'December 2024',
        details: 'Completed practical tasks in Object Oriented Programming modules.',
        image: 'https://i.vgy.me/G6GtIH.png'
    },
    {
        id: 29,
        title: 'Data Structures and Algorithms',
        issuer: 'Lovely Professional University',
        date: 'December 2024',
        details: 'Completed practical tasks in Data Structures and Algorithms modules.',
        image: 'https://i.vgy.me/kvETNt.png'
    },
    {
        id: 30,
        title: 'Cyber Hygiene Practices',
        issuer: 'Ministry of Electronics and Information Technology',
        date: 'November 2023',
        details: 'Completed practical tasks in Cyber Hygiene Practices modules.',
        image: 'https://i.vgy.me/K4TI9h.png'
    },
    {
        id: 31,
        title: 'Python Fundamentals for Beginners',
        issuer: 'Great Learning',
        date: 'December 2023',
        details: 'Completed practical tasks in Python Fundamentals for Beginners modules.',
        image: 'https://i.vgy.me/qPdQ6z.png'
    },
    {
        id: 32,
        title: 'Responsive Web Design',
        issuer: 'Free Code Camp',
        date: 'October 2023',
        details: 'Completed practical tasks in Responsive Web Design modules.',
        image: 'https://i.vgy.me/FuJTPQ.png'
    },
    {
        id: 33,
        title: 'Business Analysis Foundation',
        issuer: 'LinkedIn Learning',
        date: 'June 2025',
        details: 'Completed practical tasks in Business Analysis Foundation modules.',
        image: 'https://i.vgy.me/GGdl1R.png'
    },
    {
        id: 34,
        title: 'Compelete Linux Training Course to Get Your Idea IT Job',
        issuer: 'Udemy',
        date: 'November 2023',
        details: 'Completed practical tasks in Compelete Linux Training Course to Get Your Idea IT Job modules.',
        image: 'https://i.vgy.me/rBJO7x.png'
    }
];

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Certifications</h1>

                <div className={styles.grid}>
                    {certificationsData.map((cert, index) => (
                        <CertificationCard
                            key={cert.id}
                            cert={cert}
                            customDelay={index * 0.1}
                            onSelect={setSelectedCert}
                        />
                    ))}
                </div>

                {selectedCert && (
                    <CertificateModal
                        isOpen={!!selectedCert}
                        onClose={() => setSelectedCert(null)}
                        cert={selectedCert}
                    />
                )}
            </div>
        </Layout>
    );
};

export default Certifications;
