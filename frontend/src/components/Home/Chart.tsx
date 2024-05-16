import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // This line is necessary to prevent issues with tree-shaking

const Chart = () => {
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Adjust as needed based on how you store the token
                const response = await axios.get('/portfolio/portfolio-graph', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = response.data;

                // Format the data for Chart.js
                const formattedData = formatDataForChart(data);
                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching portfolio graph data', error);
            }
        };

        fetchData();
    }, []);

    const formatDataForChart = (data: any) => {
        return {
            labels: data.labels,
            datasets: data.datasets.map((dataset: any) => ({
                ...dataset,
                fill: false,
                borderColor: getRandomColor(),
            })),
        };
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="chart">
            <h1>Portfolio Graph</h1>
            {chartData ? (
                <Line
                    data={chartData}
                    options={{
                        scales: {
                            x: {
                                type: 'category',
                                labels: chartData.labels,
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default Chart;
