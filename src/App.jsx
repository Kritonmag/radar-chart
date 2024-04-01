import React from 'react';
import "./App.css"
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const data = {
    labels: ['Hard skills', 'Soft skills', 'English', 'EPS', 'Level of influence',],
    datasets: [
        {
            label: 'Jun',
            data: [1.8, 1.8, 2.8, 1.8, 1.8],
            backgroundColor: 'rgba(255,0,0,0.2)',
            borderColor: 'rgb(255,0,0)',
            borderWidth: 1,
        },
        {
            label: 'Mid',
            data: [2.8, 2.8, 2.8, 2.8, 1.8],
            backgroundColor: 'rgba(255,130,0,0.2)',
            borderColor: 'rgb(255,130,0)',
            borderWidth: 1,
        },
        {
            label: 'Mid+',
            data: [3.8, 3.8, 2.8, 3.8, 2.8],
            backgroundColor: 'rgba(0,73,255,0.2)',
            borderColor: 'rgb(0,73,255)',
            borderWidth: 1,
        },
        {
            label: 'Sen',
            data: [4.8, 4.8, 3.8, 4.8, 3.8],
            backgroundColor: 'rgba(5,255,0,0.2)',
            borderColor: 'rgb(5,255,0)',
            borderWidth: 1,
        },
    ],
};

export function App() {
    return (
        <div className={"wrapper-radar"}>
            <Radar data={data} options={{
                scales: {
                    r: {
                        min: 0, // Начинать от нуля
                        max: 5, // Максимальное значение
                        stepSize: 1, // Шаг на шкале
                        ticks: {
                            callback: function(value, index, values) {
                                switch(value) {
                                    case 2:
                                        return 'jun';
                                    case 3:
                                        return 'mid';
                                    case 4:
                                        return 'mid+';
                                    case 5:
                                        return 'sen';
                                    default:
                                        return '';
                                }
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.formattedValue}`;
                            }
                        }
                    }
                }
            }} />
        </div>
    )
}
