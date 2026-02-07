import React, { useState } from 'react';
import Layout from '../layout/Layout';
import AchievementCard from './AchievementCard';
import AchievementModal from './AchievementModal';
import styles from './Achievements.module.css';

const placeholderImage = (text) => `https://placehold.co/600x400/101020/FFF?text=${encodeURIComponent(text)}`;

const achievementsData = [
    {
        id: 1,
        title: 'Travilled to 40 Beautiful Places',
        description: 'A land of timeless beauty featuring a city with a white marble symbol of eternal love, royal regions of grand forts and palaces, sunny coastal stretches with lively nightlife, lush backwaters lined with coconut trees, a high-altitude cold desert wrapped in snow, a sacred river city rich in ancient rituals, misty hill stations with tea gardens, golden deserts offering camel safaris, and a bustling metropolitan heart that drives the nation’s economy',
        date: '2024',
        image: placeholderImage('Hackathon Winner'),
    },
    {
        id: 2,
        title: 'Best Final Year Project',
        description: 'Recognized for outstanding final year engineering project. The project focused on scalable distributed systems.',
        date: '2025',
        image: placeholderImage('Best Project Award'),
    },
    {
        id: 3,
        title: 'Top Performer in AI Course',
        description: 'Ranked top performer in advanced AI and ML coursework among 500+ students.',
        date: '2024',
        image: placeholderImage('AI Course Top Rank'),
    },
    {
        id: 4,
        title: 'Open Source Contributor',
        description: 'Recognized for meaningful open-source contributions to major libraries in the React ecosystem.',
        date: '2023',
        image: placeholderImage('OS Contribution'),
    },
    {
        id: 5,
        title: 'Technical Event Speaker',
        description: 'Invited speaker at a technical event on modern web development trends and performance optimization.',
        date: '2024',
        image: placeholderImage('Tech Speaker'),
    },
];

const Achievements = () => {
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Achievements</h1>

                <div className={styles.grid}>
                    {achievementsData.map((item, index) => (
                        <AchievementCard
                            key={item.id}
                            item={item}
                            index={index}
                            onClick={setSelectedAchievement}
                        />
                    ))}
                </div>

                <AchievementModal
                    isOpen={!!selectedAchievement}
                    onClose={() => setSelectedAchievement(null)}
                    achievement={selectedAchievement}
                />
            </div>
        </Layout>
    );
};

export default Achievements;
