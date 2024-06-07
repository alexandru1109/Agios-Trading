import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './Chart.css';

interface GraphData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
    }[];
}

// Înregistrăm scale-urile
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [mode, setMode] = useState('week');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchGraphData = async (mode: string) => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                const response = await axios.get(`http://localhost:5869/api/portfolio/portfolio-graph`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        mode: mode,
                    },
                });
                if (response.data && response.data.labels && response.data.datasets) {
                    setGraphData(response.data);
                } else {
                    setError('Invalid response format');
                }
            } else {
                setError('No token found');
            }
        } catch (error) {
            console.error('Error fetching graph data:', error);
            setError('Error fetching graph data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;
        fetchGraphData(mode).then(() => {
            if (isMounted) setIsLoading(false);
        });
        return () => {
            isMounted = false;
        };
    }, [mode]);

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h1>Portfolio Graph</h1>
                <div className="chart-buttons">
                    <button className={mode === 'week' ? 'active' : ''} onClick={() => setMode('week')}>Week</button>
                    <button className={mode === 'month' ? 'active' : ''} onClick={() => setMode('month')}>Month</button>
                    <button className={mode === 'year' ? 'active' : ''} onClick={() => setMode('year')}>Year</button>
                </div>
            </div>
            {error && <div className="error">{error}</div>}
            {isLoading ? (
                <div>No transactions found...</div>
            ) : (
                <div className="chart-content">
                    {graphData && (
                        <Line
                            data={{
                                labels: graphData.labels,
                                datasets: graphData.datasets.map(dataset => ({
                                    ...dataset,
                                    borderColor: '#ffffff', // White border color
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // White background color with transparency
                                })),
                            }}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        ticks: { color: '#ffffff' }, // Dark color for x-axis labels
                                    },
                                    y: {
                                        ticks: { color: '#ffffff' }, // Dark color for y-axis labels
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#ffffff' // Dark color for legend text
                                        }
                                    }
                                }
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Chart;
