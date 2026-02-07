import React, { useState, useMemo } from 'react';
import Layout from '../layout/Layout';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';

// Using placeholders for now, in a real app these would be imports
const placeholderImage = (text) => `https://placehold.co/600x400/1a1a1a/FFF?text=${encodeURIComponent(text)}`;

const projectsData = [
    {
        id: 1,
        title: 'Face Recognition Attendance System',
        description: 'Hybrid face recognition and QR-based attendance system using AI. Features real-time tracking and automated reporting.',
        details: 'A comprehensive solution designed to modernize attendance tracking in educational institutions. It leverages face recognition for secure verification and QR codes for quick entry, ensuring efficiency and accuracy. The system includes a dashboard for admins to generate attendance reports in real-time.',
        date: 'Jan 2026',
        image: placeholderImage('Face Recognition Attendance System'),
        githubLink: 'https://github.com/Amit123103/realtimefaceattendace',
        liveLink: 'https://amit123103.github.io/realtimefaceattendace/',
        techStack: ['Python', 'OpenCV', 'React', 'Node.js', 'MongoDB'],
        category: 'Machine Learning',
    },
    {
        id: 2,
        title: 'Smart Portfolio Website',
        description: 'Interactive developer portfolio with cinematic animations, 3D intro using Three.js, and modern React best practices.',
        details: 'My personal portfolio built to demonstrate advanced frontend skills. It features a custom-built 3D introductory scene, smooth page transitions, and a modular component architecture. The site is fully responsive and accessible.',
        date: 'Dec 2025',
        image: placeholderImage('Smart Portfolio'),
        githubLink: 'https://github.com/Amit123103/myportfolio1',
        liveLink: 'https://amit123103.github.io/myportfolio1/',
        techStack: ['HTML', 'React.js', 'javaScript', 'CSS Modules', 'Render'],
        category: 'Fullstack',
    },
    {
        id: 3,
        title: 'Music Playlist Application',
        description: 'The Music Playlist Application is a user-friendly platform that allows users to explore, play, and manage music playlists seamlessly. The project focuses on delivering an engaging audio experience with organized playlists, smooth playback controls, and an intuitive interface.',
        details: 'Users can browse songs, create custom playlists, play or pause tracks, skip songs, and enjoy uninterrupted music streaming. The application emphasizes performance, usability, and responsiveness across devices.',
        date: 'Nov 2024',
        image: placeholderImage('Music Playlist Application'),
        githubLink: 'https://github.com/Amit123103/music-playlist',
        liveLink: 'https://amit123103.github.io/music-playlist/',
        techStack: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'MongoDB'],
        category: 'Web Application / Media Streaming / Full-Stack Project',
    },
    {
        id: 4,
        title: 'Livestock Management System',
        description: 'Livestock Management System is a comprehensive application designed to streamline and optimize the management of livestock operations. The system provides tools for tracking animal health, managing breeding cycles, monitoring feeding schedules, and maintaining detailed records of livestock assets.',
        details: 'Livestock Management System is a comprehensive application designed to streamline and optimize the management of livestock operations. The system provides tools for tracking animal health, managing breeding cycles, monitoring feeding schedules, and maintaining detailed records of livestock assets.',
        date: 'Oct 2024',
        image: placeholderImage('Livestock Management System'),
        githubLink: 'https://github.com/Amit123103/livestock',
        liveLink: 'https://amit123103.github.io/livestock/',
        techStack: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'MongoDB'],
        category: 'Web Application / Full-Stack Project',
    },
    {
        id: 5,
        title: 'Multimodal Emotion, Gender, and Age Detection System',
        description: 'This project focuses on building an intelligent system capable of detecting human emotions, gender, and age using multiple input sources such as facial expressions, eye features, and voice signals. By combining computer vision and audio processing techniques, the system analyzes visual and vocal cues to accurately understand human behavior.',
        details: 'The system captures real-time or pre-recorded data and processes it using trained machine learning and deep learning models. It identifies emotions such as happiness, sadness, anger, surprise, fear, and neutrality, while also estimating the person’s gender and age group.',
        date: 'Jan 2026',
        image: placeholderImage('Multimodal Emotion, Gender, and Age Detection System'),
        githubLink: 'https://github.com/Amit123103/EmotionDetection',
        liveLink: 'https://amit123103.github.io/EmotionDetection/',
        techStack: ['Python', 'TensorFlow', 'CNN', 'RNN', 'OpenCV', 'React', 'Numpy'],
        category: 'Machine Learning / Computer Vision / Artificial Intelligence',
    },
];

const categories = ['All', 'Fullstack', 'Machine Learning', 'Data Science', 'Full-Stack Project', 'other'];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = useMemo(() => {
        if (activeCategory === 'All') return projectsData;
        return projectsData.filter(project => project.category === activeCategory);
    }, [activeCategory]);

    const handleOpenModal = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>My Projects</h1>

                {/* Filter Tabs */}
                <div className={styles.filterContainer}>
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`${styles.filterBtn} ${activeCategory === category ? styles.activeFilter : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className={styles.grid}>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            customDelay={index * 0.1} // Reduce delay for smoother filtering
                            onOpenModal={handleOpenModal}
                        />
                    ))}
                    {filteredProjects.length === 0 && (
                        <div style={{ color: '#aaa', textAlign: 'center', gridColumn: '1 / -1', padding: '2rem' }}>
                            No projects found in this category.
                        </div>
                    )}
                </div>
            </div>

            <ProjectModal
                isOpen={!!selectedProject}
                onClose={handleCloseModal}
                project={selectedProject}
            />
        </Layout>
    );
};

export default Projects;
