import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2';
class MacrosChart extends Component {
    render() {
        const data = {
            labels: [
                'Carbohydrates',
                'Fats',
                'Protein'
            ],
            datasets: [{
                data: [this.props.users[this.props.id].carbs, this.props.users[this.props.id].fats, this.props.users[this.props.id].protein],
                backgroundColor: [
                    '#fcd303',
                    '#0bb53b',
                    '#d4310d'
                ],
                hoverBackgroundColor: [
                    '#fcd303',
                    '#0bb53b',
                    '#d4310d'
                ]
            }]
        };
        return (
            <div>
                <Pie data={data} />
            </div>
        )
    }
}
export default MacrosChart;