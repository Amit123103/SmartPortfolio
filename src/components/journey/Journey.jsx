import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Layout from '../layout/Layout';
import TimelineNode from './TimelineNode';
import JourneyModal from './JourneyModal';
import styles from './Journey.module.css';

const journeyData = [
    {
        title: 'The Beginning',
        description: 'Started my journey with curiosity and passion for technology.',
        year: '2021',
        image: `https://placehold.co/800x600/111/FFF?text=The+Beginning`,
    },
    {
        title: 'Learning the Foundations',
        description: 'Built strong foundations in programming and computer science logic.',
        year: '2022',
        image: `https://placehold.co/800x600/222/FFF?text=Foundations`,
    },
    {
        title: 'Exploring Web & AI',
        description: 'Discovered interest in web development and artificial intelligence.',
        year: '2023',
        image: `https://placehold.co/800x600/333/FFF?text=Web+%26+AI`,
    },
    {
        title: 'Building Real Projects',
        description: 'Created real-world projects and practical solutions using modern tech.',
        year: '2024',
        image: `https://placehold.co/800x600/444/FFF?text=Real+Projects`,
    },
    {
        title: 'Growing & Innovating',
        description: 'Continuously improving skills and exploring advanced technologies.',
        year: '2025',
        image: `https://placehold.co/800x600/555/FFF?text=Innovation`,
    },
];

const Journey = () => {
    const ref = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

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
                <h1 className={styles.pageTitle}>My Journey</h1>

                <div className={styles.timelineWrapper} ref={ref}>
                    {/* Animated Central Line */}
                    <motion.div
                        className={styles.line}
                        style={{ height: '100%', scaleY: scaleY }}
                    />

                    {journeyData.map((data, index) => (
                        <TimelineNode
                            key={index}
                            data={data}
                            index={index}
                            onImageClick={setSelectedImage}
                        />
                    ))}
                </div>

                <JourneyModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            </div>
        </Layout>
    );
};

export default Journey;
