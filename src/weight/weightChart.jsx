import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
class WeightChart extends Component {
    constructor() {
        super();
        this.state = {
            weight: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:3000/GogobatmanWeight')
            .then(response => response.json())
            .then(data => this.setState({
                weight: data
            }));
    }
    render() {
        let weightDate = this.state.weight.map((item) => {
            return (item.date);
        });
        let weightValue = this.state.weight.map((item) => {
            return (item.weight);
        })
        const data = {
            labels: weightDate,
            datasets: [
                {
                    label: 'Body weight during this week',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: weightValue
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