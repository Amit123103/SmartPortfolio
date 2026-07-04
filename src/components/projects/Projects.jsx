import React, { useState, useMemo } from 'react';
import Layout from '../layout/Layout';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';

// Import project images
import faceRecognitionImg from '../../assets/projects/face_recognition_attendance.png';
import driverDrowsinessImg from '../../assets/projects/driver_drowsiness_detection.png';
import smartPortfolioImg from '../../assets/projects/smart_portfolio.png';
import musicPlaylistImg from '../../assets/projects/music_playlist.png';
import livestockManagementImg from '../../assets/projects/livestock_management.png';
import emotionDetectionImg from '../../assets/projects/emotion_detection.png';
import handDetectionImg from '../../assets/projects/hand_detection_drawing.png';
import placementReadyImg from '../../assets/projects/placement_ready_img_1783172861024.png';
import foodOrderImg from '../../assets/projects/food_order_img_1783172870341.png';
import imageFinderImg from '../../assets/projects/image_finder_img_1783172881586.png';
import internhubImg from '../../assets/projects/internhub_img_1783172892144.png';
import chromeExtImg from '../../assets/projects/chrome_ext_img_1783172902208.png';
import visionGuardImg from '../../assets/projects/vision_guard_img_1783172912537.png';
import futureAiImg from '../../assets/projects/future_ai_img_1783172925481.png';
import faceVoiceAuthImg from '../../assets/projects/face_voice_auth_img_1783172937084.png';
import devopsImg from '../../assets/projects/devops_img_1783172948129.png';
import aiopsImg from '../../assets/projects/aiops_img_1783172959643.png';
import trafficSignImg from '../../assets/projects/traffic_sign_ai_img_1783172970091.png';
import callerAiImg from '../../assets/projects/caller_ai_img_1783172980451.png';

// Fallback placeholder for missing images
const placeholderImage = (text) => `https://placehold.co/1200x800/1a1a1a/FFF?text=${encodeURIComponent(text)}`;

export const projectsData = [
    {
        id: 1,
        title: 'Face Recognition Attendance System',
        description: 'Hybrid face recognition and QR-based attendance system using AI. Features real-time tracking and automated reporting.',
        details: 'A comprehensive solution designed to modernize attendance tracking in educational institutions. It leverages face recognition for secure verification and QR codes for quick entry, ensuring efficiency and accuracy. The system includes a dashboard for admins to generate attendance reports in real-time.',
        date: 'Jan 2026',
        image: faceRecognitionImg,
        githubLink: 'https://github.com/Amit123103/realtimefaceattendace',
        liveLink: 'https://amit123103.github.io/realtimefaceattendace/',
        techStack: ['Python', 'OpenCV', 'React', 'Node.js', 'MongoDB'],
        category: 'Machine Learning',
    },
    {
        id: 2,
        title: 'DriverDrowsinessDetectionSystem',
        description: 'The Driver Drowsiness Detection System is a computer vision–based safety application designed to reduce road accidents caused by driver fatigue. The system continuously monitors the driver’s facial features through a camera and detects signs of drowsiness such as eye closure, frequent blinking, and yawning.',
        details: 'The Driver Drowsiness Detection System is a computer vision–based safety application designed to reduce road accidents caused by driver fatigue. The system continuously monitors the driver’s facial features through a camera and detects signs of drowsiness such as eye closure, frequent blinking, and yawning.',
        date: 'Feb 2026',
        image: driverDrowsinessImg,
        githubLink: 'https://github.com/Amit123103/DriverDrowsinessDetectionSystem',
        liveLink: 'https://amit123103.github.io/DriverDrowsinessDetectionSystem/',
        techStack: ['Python', 'OpenCV', 'SQL'],
        category: 'Machine Learning Computer Vision',
    },
    {
        id: 3,
        title: 'Smart Portfolio Website',
        description: 'Interactive developer portfolio with cinematic animations, 3D intro using Three.js, and modern React best practices.',
        details: 'My personal portfolio built to demonstrate advanced frontend skills. It features a custom-built 3D introductory scene, smooth page transitions, and a modular component architecture. The site is fully responsive and accessible.',
        date: 'Dec 2025',
        image: smartPortfolioImg,
        githubLink: 'https://github.com/Amit123103/myportfolio1',
        liveLink: 'https://amit123103.github.io/myportfolio1/',
        techStack: ['HTML', 'React.js', 'javaScript', 'CSS Modules', 'Render'],
        category: 'Fullstack, Artificial Intelligence',
    },
    {
        id: 4,
        title: 'Music Playlist Application',
        description: 'The Music Playlist Application is a user-friendly platform that allows users to explore, play, and manage music playlists seamlessly. The project focuses on delivering an engaging audio experience with organized playlists, smooth playback controls, and an intuitive interface.',
        details: 'Users can browse songs, create custom playlists, play or pause tracks, skip songs, and enjoy uninterrupted music streaming. The application emphasizes performance, usability, and responsiveness across devices.',
        date: 'Nov 2024',
        image: musicPlaylistImg,
        githubLink: 'https://github.com/Amit123103/music-playlist',
        liveLink: 'https://amit123103.github.io/music-playlist/',
        techStack: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'MongoDB'],
        category: 'Web Application / Media Streaming / Full-Stack Project',
    },
    {
        id: 5,
        title: 'Livestock Management System',
        description: 'Livestock Management System is a comprehensive application designed to streamline and optimize the management of livestock operations. The system provides tools for tracking animal health, managing breeding cycles, monitoring feeding schedules, and maintaining detailed records of livestock assets.',
        details: 'Livestock Management System is a comprehensive application designed to streamline and optimize the management of livestock operations. The system provides tools for tracking animal health, managing breeding cycles, monitoring feeding schedules, and maintaining detailed records of livestock assets.',
        date: 'Oct 2024',
        image: livestockManagementImg,
        githubLink: 'https://github.com/Amit123103/livestock',
        liveLink: 'https://amit123103.github.io/livestock/',
        techStack: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'MongoDB'],
        category: 'Web Application / Full-Stack Project',
    },
    {
        id: 6,
        title: 'Multimodal Emotion, Gender, and Age Detection System',
        description: 'This project focuses on building an intelligent system capable of detecting human emotions, gender, and age using multiple input sources such as facial expressions, eye features, and voice signals. By combining computer vision and audio processing techniques, the system analyzes visual and vocal cues to accurately understand human behavior.',
        details: 'The system captures real-time or pre-recorded data and processes it using trained machine learning and deep learning models. It identifies emotions such as happiness, sadness, anger, surprise, fear, and neutrality, while also estimating the person’s gender and age group.',
        date: 'Jan 2026',
        image: emotionDetectionImg,
        githubLink: 'https://github.com/Amit123103/EmotionDetection',
        liveLink: 'https://amit123103.github.io/EmotionDetection/',
        techStack: ['Python', 'TensorFlow', 'CNN', 'RNN', 'OpenCV', 'React', 'Numpy'],
        category: 'Machine Learning / Computer Vision / Artificial Intelligence',
    },
    {
        id: 7,
        title: 'Hand Detection Drawing',
        description: 'The Hand Gesture–Based Real-Time Drawing System is a computer vision application that allows users to draw on a virtual canvas using only their hand movements, without touching the screen or using a mouse. By tracking hand landmarks through a webcam, the system detects finger positions and converts gestures into drawing actions in real time.',
        details: 'The system captures real-time video input from a webcam and uses the MediaPipe Hands library to detect and track hand landmarks. It identifies the tip of the index finger and thumb to determine drawing and erasing actions. When the index finger is detected, the system draws lines on the canvas, while the thumb acts as an eraser when brought close to the index finger. The application also includes a color-changing feature that allows users to switch between different colors by holding their hand in a specific pose.',
        date: 'jan 2026',
        image: handDetectionImg,
        githubLink: 'https://github.com/Amit123103/HandDetectionDrawing',
        liveLink: 'https://amit123103.github.io/HandDetectionDrawing/',
        techStack: ['Python', 'OpenCV', 'MediaPipe', 'Numpy'],
        category: 'Machine Learning / Computer Vision / Artificial Intelligence',
    },
    {
        id: 8,
        title: 'PlacementReady',
        description: 'A modern DSA, Interview Preparation, Mock Test, Courses, Projects, and Internship Tracking Platform.',
        details: 'Built with Next.js 15, React 19, TypeScript, Firebase, and Tailwind CSS v4. Features comprehensive placement preparation tools including mock tests and internship tracking.',
        date: 'May 2026',
        image: placementReadyImg,
        githubLink: 'https://github.com/Amit123103/Placement-ready',
        liveLink: 'https://amit123103.github.io/Placement-ready/',
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Firebase', 'Tailwind CSS'],
        category: 'Fullstack',
    },
    {
        id: 9,
        title: 'FoodOrder (Ayush Food Junction)',
        description: 'Smart QR-based Food Ordering Platform for Ayush Food Junction.',
        details: 'Browse menu, order food online, scan QR, and enjoy a seamless customer experience.',
        date: 'Jun 2026',
        image: foodOrderImg,
        githubLink: 'https://github.com/Amit123103/FoodOrder',
        liveLink: '',
        techStack: ['Next.js', 'MongoDB', 'TailwindCSS'],
        category: 'Full-Stack Project',
    },
    {
        id: 10,
        title: 'ImageFinder',
        description: 'Reverse image search and image intelligence system built with Python, FastAPI, and OpenCV.',
        details: 'Performs face detection, EXIF metadata extraction, and perceptual image fingerprinting.',
        date: 'May 2026',
        image: imageFinderImg,
        githubLink: 'https://github.com/Amit123103/find_people',
        liveLink: '',
        techStack: ['Python', 'FastAPI', 'OpenCV', 'Machine Learning'],
        category: 'Machine Learning',
    },
    {
        id: 11,
        title: 'InternHub Pro App',
        description: 'AI-powered internship discovery platform built with Expo, React Native, and Supabase.',
        details: 'Designed with a mobile-first experience, it helps students and early-career professionals discover opportunities.',
        date: 'May 2026',
        image: internhubImg,
        githubLink: 'https://github.com/Amit123103/Internhub-app',
        liveLink: '',
        techStack: ['React Native', 'Expo', 'Supabase'],
        category: 'Full-Stack Project',
    },
    {
        id: 12,
        title: 'SecureInvisible Chrome Extension',
        description: 'Browser productivity and privacy-focused Chrome extension.',
        details: 'Designed to improve browsing resilience, session recovery, privacy protection, and secure networking using DNS over HTTPS.',
        date: 'May 2026',
        image: chromeExtImg,
        githubLink: 'https://github.com/Amit123103/SecureInvisible_Chrome-Extension',
        liveLink: '',
        techStack: ['JavaScript', 'HTML', 'CSS', 'Cybersecurity'],
        category: 'other',
    },
    {
        id: 13,
        title: 'VisionGuard AI',
        description: 'Production-grade web application powered by YOLOv8 and OpenCV for real-time logo and watermark detection.',
        details: 'Features complete removal, and media enhancement utilizing advanced computer vision deep learning.',
        date: 'May 2026',
        image: visionGuardImg,
        githubLink: 'https://github.com/Amit123103/Logo_watermark_detection',
        liveLink: '',
        techStack: ['Python', 'YOLOv8', 'OpenCV', 'Deep Learning'],
        category: 'Machine Learning',
    },
    {
        id: 14,
        title: 'Future AI Assistant',
        description: 'Advanced Android AI companion featuring multi-AI engine support.',
        details: 'Includes neural voice interaction, cognitive memory, smart automation, and futuristic device control powered by Gemini.',
        date: 'May 2026',
        image: futureAiImg,
        githubLink: 'https://github.com/Amit123103/AI_powered_app_voicecomand',
        liveLink: '',
        techStack: ['Android', 'Java', 'Machine Learning', 'Gemini'],
        category: 'Artificial Intelligence',
    },
    {
        id: 15,
        title: 'FaceVoiceAuth',
        description: 'Enterprise-grade tri-modal biometric authentication platform.',
        details: 'Built using FastAPI, face recognition, voice verification, JWT security, AES-256 encryption, liveness detection, Docker, and Jenkins.',
        date: 'May 2026',
        image: faceVoiceAuthImg,
        githubLink: 'https://github.com/Amit123103/Face-and-voice-auth',
        liveLink: '',
        techStack: ['Python', 'FastAPI', 'Docker', 'Jenkins', 'Machine Learning'],
        category: 'Machine Learning',
    },
    {
        id: 16,
        title: 'DevOps Practicals',
        description: 'End-to-end DevOps Course Practicals.',
        details: 'From Docker Basics to Advanced Jenkins & GitHub Actions Pipelines. Complete with study notes and project files.',
        date: 'May 2026',
        image: devopsImg,
        githubLink: 'https://github.com/Amit123103/Devops',
        liveLink: '',
        techStack: ['Docker', 'Jenkins', 'GitHub Actions', 'Maven'],
        category: 'other',
    },
    {
        id: 17,
        title: 'AIOps Self-Healing Infrastructure System',
        description: 'A Production-Ready AIOps Self-Healing Infrastructure System.',
        details: 'Implements a closed-loop Observe -> Detect -> Decide -> Act -> Learn architecture using Isolation Forests for anomaly detection, NLP for logs.',
        date: 'May 2026',
        image: aiopsImg,
        githubLink: 'https://github.com/Amit123103/AIOps_Self-Healing_Infrastructure_System',
        liveLink: '',
        techStack: ['Kubernetes', 'Elasticsearch', 'TensorFlow', 'Grafana', 'Python'],
        category: 'Data Science',
    },
    {
        id: 18,
        title: 'TrafficSign AI',
        description: 'Production-ready AI-powered Traffic Sign Recognition System.',
        details: 'Uses TensorFlow & MobileNetV2 with real-time webcam detection, video analysis, cyberpunk dark-mode UI, and multilingual support.',
        date: 'Apr 2026',
        image: trafficSignImg,
        githubLink: 'https://github.com/Amit123103/Traffic-Sign-AI',
        liveLink: '',
        techStack: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'Docker'],
        category: 'Machine Learning',
    },
    {
        id: 19,
        title: 'Caller AI Agent',
        description: 'AI-powered intelligent voice calling assistant built with NVIDIA Reasoning Models and Twilio Voice API.',
        details: 'Can answer phone calls, understand natural language conversations, and detect intent using speech-to-text and text-to-speech.',
        date: 'Apr 2026',
        image: callerAiImg,
        githubLink: 'https://github.com/Amit123103/Caller_AI_Agent',
        liveLink: '',
        techStack: ['Twilio', 'NVIDIA Reasoning', 'DevOps', 'Python'],
        category: 'Artificial Intelligence',
    }
];

const categories = ['All', 'Fullstack', 'Machine Learning', 'Artificial Intelligence', 'Data Science', 'Full-Stack Project', 'other'];

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
