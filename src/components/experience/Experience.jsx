import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Layout from '../layout/Layout';
import ExperienceTimelineNode from './ExperienceTimelineNode';
import ExperienceModal from './ExperienceModal';
import styles from './Experience.module.css';

const experienceData = [
    {
        id: 1,
        title: 'AI-Powered Data Insights Intern',
        company: 'RIT & Excelerate',
        location: 'New York, USA',
        date: 'June 2025 – July 2025',
        description: 'The Data Insights Virtual Internship is a comprehensive online training program designed to build real-world data analytics and data interpretation skills. The internship focuses on empowering students with practical experience in extracting meaningful insights from data using analytical tools and techniques.',
        image: 'https://img.sanishtech.com/u/fee4d97f5b5755a054f00ef3963d8eec.png',
        certificate: 'Internship Completion Certificate',
        certificateImage: 'https://img.sanishtech.com/u/fee4d97f5b5755a054f00ef3963d8eec.png'
    },
    {
        id: 2,
        title: 'Data Visualization Intern',
        company: 'SlU ',
        location: 'California, USA',
        date: 'Feb 2026 – Present',
        description: 'As a Data Visualization Intern, I work on transforming raw and complex datasets into clear, meaningful, and visually engaging representations. The role focuses on analyzing data trends, designing interactive dashboards, and presenting insights that support data-driven decision-making.',
        certificate: 'Internship Continuation Certificate'
    },
    {
        id: 3,
        title: 'Web Developer (Freelance)',
        company: 'NA',
        location: 'NA',
        date: 'N',
        description: 'NA',
        certificate: 'NA'
    }
];

const Experience = () => {
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Work Experience</h1>

                <div className={styles.timelineWrapper} ref={ref}>
                    {/* Animated Central Line */}
                    <motion.div
                        className={styles.line}
                        style={{ height: '100%', scaleY: scaleY }}
                    />

                    {experienceData.map((item, index) => (
                        <ExperienceTimelineNode
                            key={item.id}
                            item={item}
                            index={index}
                            onViewCertificate={setSelectedCertificate}
                        />
                    ))}
                </div>

                <ExperienceModal
                    isOpen={!!selectedCertificate}
                    onClose={() => setSelectedCertificate(null)}
                    certificateName={selectedCertificate}
                />
            </div>
        </Layout>
    );
};

export default Experience;
