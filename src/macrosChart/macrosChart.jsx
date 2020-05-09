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
                    '#2e6eb3',
                    '#49c4b4',
                    '#47bf4f'
                ],
                hoverBackgroundColor: [
                    '#2e6eb3',
                    '#49c4b4',
                    '#47bf4f'
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