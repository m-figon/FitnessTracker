import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
class WeightChart extends Component {
    render() {
        const data = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
            datasets: [
                {
                    label: 'Body weight during this week',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(76, 145, 235,0.4)',
                    borderColor: 'rgba(76, 145, 235,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(76, 145, 235,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(76, 145, 235,1)',
                    pointHoverBorderColor: 'rgba(76, 145, 235,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [68.6,69.0,68.5,69.0,69.0,69.6,69.6]
                }
            ]
        };
        return (
            <div>
                <Line data={data} />
            </div>
        )
    }
}
export default WeightChart;