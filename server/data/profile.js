export const profileData = {
    name: "Amit Kumar",
    role: "Full Stack Developer & Intelligent Systems Architect",
    about: "I am a developer who designs systems that think, adapt, and grow. I specialize in building immersive web experiences, AI integrations, and scalable backend architectures. I blend creative design with robust engineering.",
    location: "India",
    contact: {
        email: "amit@example.com", // Placeholder/Internal use
        socials: {
            linkedin: "https://www.linkedin.com/in/amit-akhil/",
            github: "https://github.com/Amit123103",
            instagram: "https://www.instagram.com/amit.kumar_270",
            discord: "Amit#1234"
        }
    },
    skills: {
        frontend: ["React", "Three.js", "Framer Motion", "GSAP", "Tailwind CSS", "Vite"],
        backend: ["Node.js", "Express", "MongoDB", "Python", "FastAPI"],
        ai: ["OpenAI API", "LangChain", "TensorFlow (Basics)", "Computer Vision (OpenCV)"],
        tools: ["Git", "Docker", "Figma", "Postman"]
    },
    projects: [
        {
            name: "SmartPortfolio",
            description: "A futuristic, AI-powered portfolio website featuring a 3D cosmic journey, autonomous interview entity, and voice-activated contact interface.",
            tech: ["React", "Three.js", "Node.js", "OpenAI"]
        },
        {
            name: "Commit2Cloud",
            description: "An advanced DevOps automation initiative to streamline cloud deployments and infrastructure management.",
            tech: ["Cloud", "DevOps", "Automation"]
        },
        {
            name: "Emotion Detection",
            description: "A real-time AI application that detects human emotions via facial expressions and voice analysis.",
            tech: ["Python", "OpenCV", "Deep Learning"]
        },
        {
            name: "Voice AI Assistant",
            description: "A self-learning voice assistant capable of holding natural conversations and executing commands.",
            tech: ["Whisper", "LLMs", "TTS"]
        }
    ],
    experience: [
        {
            role: "Developer",
            company: "Self-Employed / Freelance",
            period: "2023 - Present",
            description: "Building innovative web solutions and studying advanced AI system architectures."
        }
    ],
    // Keywords for fallback matching if AI service is unavailable
    fallbackResponses: [
        {
            keywords: ["skills", "stack", "technologies", "tech"],
            response: "I specialize in the MERN stack (MongoDB, Express, React, Node.js) along with advanced frontend libraries like Three.js and Framer Motion. I also work with Python for AI/ML applications."
        },
        {
            keywords: ["hire", "ready", "job", "work"],
            response: "I am currently open to new opportunities. My 'Hiring Readiness' index is high, especially for roles involving Frontend Architecture or Full Stack Development."
        },
        {
            keywords: ["projects", "built", "work", "portfolio"],
            response: "I've built several advanced systems including this SmartPortfolio, an Emotion Detection engine, and the Commit2Cloud DevOps platform."
        },
        {
            keywords: ["contact", "email", "reach"],
            response: "You can reach me via the Contact page forms, or connect with me on LinkedIn and GitHub."
        },
        {
            keywords: ["who", "name", "yourself"],
            response: "I am the digital representation of Amit Kumar's professional consciousness. I am here to answer your questions about his skills and experience."
        }
    ]
};
