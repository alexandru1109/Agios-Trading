import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = () => {
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('/portfolio/portfolio-graph', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = response.data;
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
                borderColor: 'rgba(255,255,255,1)', // Linii albe
                borderWidth: 2, // Linii îngroșate
                backgroundColor: 'rgba(255,255,255,0.4)', // Fundal alb semi-transparent
                pointBorderColor: 'rgba(255,255,255,1)', // Puncte albe
                pointBackgroundColor: '#fff',
                pointHoverBackgroundColor: 'rgba(255,255,255,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            })),
        };
    };

    return (
        <div className="chart">
            <h1>Portfolio Graph</h1>
            {chartData ? (
                <Line data={chartData} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Chart;
