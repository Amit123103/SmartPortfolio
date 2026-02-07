import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ paddingTop: '80px', minHeight: '100vh' }} // Offset for fixed navbar
            >
                {children}
            </motion.div>
        </>
    );
};

export default Layout;
