import React from 'react';
import Layout from '../layout/Layout';

const AnalyticsCharts = () => {
    return (
        <Layout>
            <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: 'white', marginBottom: '2rem' }}>Communication Analytics</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Stat Cards */}
                    <div style={cardStyle}>
                        <h3 style={titleStyle}>Total Messages</h3>
                        <p style={valueStyle}>1,248</p>
                    </div>
                    <div style={cardStyle}>
                        <h3 style={titleStyle}>Avg Response Time</h3>
                        <p style={valueStyle}>12m</p>
                    </div>
                    <div style={cardStyle}>
                        <h3 style={titleStyle}>AI Automation Rate</h3>
                        <p style={valueStyle}>85%</p>
                    </div>

                    {/* Charts (Mocked visual representation) */}
                    <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
                        <h3 style={titleStyle}>Message Volume (Last 7 Days)</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '10px', marginTop: '20px' }}>
                            {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                                <div key={i} style={{
                                    flex: 1,
                                    height: `${h}%`,
                                    background: '#00f0ff',
                                    borderRadius: '5px 5px 0 0',
                                    opacity: 0.7
                                }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const cardStyle = {
    background: 'rgba(255,255,255,0.05)',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid rgba(255,255,255,0.1)'
};

const titleStyle = {
    color: '#888',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    marginBottom: '0.5rem'
};

const valueStyle = {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 0
};

export default AnalyticsCharts;
