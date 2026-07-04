import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectsData } from '../components/projects/Projects';
import { skillsData } from '../components/skills/Skills';
import { achievementsData } from '../components/achievements/Achievements';
import { experienceData } from '../components/experience/Experience';
import { certificationsData } from '../components/certifications/Certifications';
import { journeyData } from '../components/journey/Journey';

const AnalyticsContext = createContext();

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState(null);
    const [insights, setInsights] = useState([]);
    const [predictions, setPredictions] = useState(null);

    // AI Learning Process - Now reads REAL data from the application
    useEffect(() => {
        const analyzeData = async () => {
            setLoading(true);

            // Simulate processing delay for UI cinematic effect
            await new Promise(r => setTimeout(r, 1500));

            // --- 1. PARSE RAW REAL-TIME DATA ---
            const totalProjects = projectsData ? projectsData.length : 0;
            const totalSkills = skillsData ? skillsData.length : 0;
            const totalCerts = certificationsData ? certificationsData.length : 0;
            const totalExp = experienceData ? experienceData.length : 0;

            let pythonCount = 0;
            let reactCount = 0;
            let cvCount = 0;
            
            if (projectsData) {
                projectsData.forEach(p => {
                    const stack = p.techStack ? p.techStack.join(' ').toLowerCase() : '';
                    if (stack.includes('python')) pythonCount++;
                    if (stack.includes('react')) reactCount++;
                    if (stack.includes('opencv') || stack.includes('cv')) cvCount++;
                });
            }

            // Calculate Mastery dynamically based on real counts
            const aiMastery = Math.min(100, 50 + (pythonCount * 12) + (cvCount * 10));
            const frontendMastery = Math.min(100, 60 + (reactCount * 10));
            const backendMastery = Math.min(100, 50 + (totalProjects * 5));

            const rawMetrics = {
                consistency: Math.min(100, 60 + (totalProjects * 5) + (totalCerts * 5)), 
                problemSolving: Math.min(100, 70 + (pythonCount * 5)), 
                speed: Math.min(100, 65 + (totalExp * 10)), 
                mastery: {
                    ai: aiMastery,
                    frontend: frontendMastery,
                    backend: backendMastery,
                    systemDesign: 80,
                    dsa: 85
                },
                history: Array.from({ length: 30 }, (_, i) => ({
                    day: i,
                    performance: 50 + Math.random() * 50
                }))
            };

            setMetrics(rawMetrics);

            // --- 2. GENERATE DYNAMIC INSIGHTS FROM DATA ---
            const generatedInsights = [];

            if (pythonCount >= 2) {
                generatedInsights.push({
                    type: 'strength',
                    text: `Detected ${pythonCount} AI projects. High proficiency in scalable MLOps architecture and automated model deployment.`,
                    confidence: 96
                });
            }

            if (reactCount >= 2) {
                generatedInsights.push({
                    type: 'growth',
                    text: `Strong Fullstack foundation with ${reactCount} React projects. Ready to integrate AI models into scalable web infrastructures.`,
                    confidence: 92
                });
            }

            if (totalExp > 0) {
                generatedInsights.push({
                    type: 'experience',
                    text: `Professional experience identified. 'Enterprise MLOps Readiness' score significantly increased.`,
                    confidence: 98
                });
            }

            if (totalCerts > 0) {
                generatedInsights.push({
                    type: 'focus',
                    text: `${totalCerts} certifications verified. Continuous learning velocity in Cloud & MLOps is exceptionally high.`,
                    confidence: 88
                });
            }
            
            if (generatedInsights.length === 0) {
                generatedInsights.push({
                    type: 'observation',
                    text: `System observing portfolio data. Ready to process new project inputs.`,
                    confidence: 100
                });
            }

            setInsights(generatedInsights);

            // --- 3. PREDICTION ENGINE ---
            setPredictions({
                nextMasteryDate: 'Next Project Deployment',
                projectedGrowth: [
                    { week: 'Now', score: 85 },
                    { week: '+1W', score: 87 },
                    { week: '+2W', score: 90 },
                    { week: '+3W', score: 91 },
                    { week: '+4W', score: 95 }
                ],
                burnoutRisk: 'Low'
            });

            // --- 4. RECRUITER CONSCIOUSNESS ---
            const baseScore = 70 + (totalProjects * 3) + (totalExp * 5);
            const recruiterData = {
                score: Math.min(100, baseScore),
                hiringSignal: pythonCount > reactCount ? "Enterprise MLOps & Infrastructure Focus" : "AI-Powered Full Stack Focus",
                marketFit: {
                    "MLOps & CI/CD": aiMastery,
                    "Cloud Architecture": frontendMastery,
                    "Data Engineering": backendMastery
                },
                topSkills: skillsData ? skillsData.slice(0, 3).map(s => s.name) : ["Docker", "Kubernetes", "Python"]
            };

            // --- 5. SIMULATIONS ---
            const simulations = [
                { path: "Consistent Growth", probability: 85, outcome: "Senior MLOps Engineer in 2 Yrs" },
                { path: "Burnout Risk", probability: 5, outcome: "Stagnation" },
                { path: "Optimized Learning", probability: 10, outcome: "Lead AI Architect in 1.5 Yrs" }
            ];

            // --- 6. INTERVIEW KNOWLEDGE BASE ---
            const interviewQA = [
                { id: 1, trigger: ["weakness", "weak"], answer: "My analysis indicates continuous growth. Always looking to optimize CI/CD pipelines and model latency further." },
                { id: 2, trigger: ["ready", "hire", "interview"], answer: `Calculating... MLOps Readiness Index is ${recruiterData.score}%. Prepared for infrastructure and model deployment inquiries.` },
                { id: 3, trigger: ["projects", "work"], answer: `I have successfully deployed ${totalProjects} major projects and hold ${totalCerts} professional certifications.` },
                { id: 4, trigger: ["hello", "hi", "hey"], answer: "System online. I am the autonomous intelligence of this portfolio. I have parsed all MLOps and infrastructure data." }
            ];

            const collectiveTrends = [
                { trend: "AIOps & Self-Healing Ops", userRelevance: cvCount > 0 ? 98 : 60, marketHeat: 95, status: cvCount > 0 ? "Mastering" : "Observing" },
                { trend: "Kubernetes & Docker", userRelevance: reactCount > 0 ? 95 : 50, marketHeat: 90, status: "Integrating" }
            ];

            const decisions = [
                { id: 1, action: "Deepen MLOps Integration", priority: "High", reason: `Detected ${pythonCount} AI projects, prioritizing scalable containerization and CI/CD is recommended.` },
                { id: 2, action: "Expand Cloud Architecture", priority: "Done", reason: "Real-time MLOps analysis engine successfully integrated." }
            ];

            const hiringIndex = {
                score: Math.min(100, recruiterData.score + 2),
                delta: "+5% this week",
                factors: [
                    { name: "Technical Depth", score: Math.min(100, 80 + totalProjects * 2) },
                    { name: "Project Volume", score: Math.min(100, 70 + totalProjects * 5) },
                    { name: "Certifications", score: Math.min(100, 60 + totalCerts * 10) }
                ]
            };

            setMetrics({
                ...rawMetrics,
                recruiterData,
                simulations,
                interviewQA,
                collectiveTrends,
                decisions,
                hiringIndex
            });

            setLoading(false);
        };

        analyzeData();
    }, []);

    return (
        <AnalyticsContext.Provider value={{ loading, metrics, insights, predictions }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
