import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../layout/Layout';
import SkillCard from './SkillCard';
import styles from './Skills.module.css';

const skillsData = [
    // Frontend
    { name: 'HTML & CSS', category: 'Frontend', level: 90 },
    { name: 'JavaScript', category: 'Frontend', level: 85 },
    { name: 'React.js', category: 'Frontend', level: 80 },
    { name: 'TypeScript', category: 'Frontend', level: 70 },
    // Backend
    { name: 'Node.js', category: 'Backend', level: 70 },
    { name: 'Express.js', category: 'Backend', level: 65 },
    { name: 'MongoDB', category: 'Backend', level: 65 },
    { name: 'PostgreSQL', category: 'Backend', level: 60 },
    // AI
    { name: 'Python', category: 'AI', level: 85 },
    { name: 'Machine Learning', category: 'AI', level: 85 },
    { name: 'OpenCV', category: 'AI', level: 70 },
    { name: 'TensorFlow', category: 'AI', level: 60 },
    { name: 'C++', category: 'AI', level: 80 },
    // Tools
    { name: 'Git & GitHub', category: 'Tools', level: 85 },
    { name: 'Docker', category: 'Tools', level: 80 },
    { name: 'Jenkins', category: 'Tools', level: 40 },
    { name: 'Nginx', category: 'Tools', level: 50 },
    { name: 'Linux', category: 'Tools', level: 80 },
    { name: 'Kubernetes', category: 'Tools', level: 70 },
];

const categories = ['All', 'Frontend', 'Backend', 'AI', 'Tools'];

const Skills = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredSkills = activeFilter === 'All'
        ? skillsData
        : skillsData.filter(skill => skill.category === activeFilter);

    return (
        <Layout>
            <div className={styles.container}>
                <motion.h1
                    className={styles.pageTitle}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Technical Skills
                </motion.h1>

                <div className={styles.filterBar}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`${styles.filterBtn} ${activeFilter === cat ? styles.activeFilter : ''}`}
                        >
                            {cat}
                            {activeFilter === cat && (
                                <motion.div
                                    className={styles.activeBackground}
                                    layoutId="activeFilter"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <motion.div className={styles.grid} layout>
                    <AnimatePresence mode='popLayout'>
                        {filteredSkills.map((skill) => (
                            <motion.div
                                key={skill.name}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <SkillCard skill={skill} index={skillsData.indexOf(skill)} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </Layout>
    );
};

export default Skills;
