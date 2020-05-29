import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2';
class FoodChart extends Component {
    render() {
        const data = {
            labels: [
                'Carbohydrates',
                'Fats',
                'Protein'
            ],
            datasets: [{
                data: [this.props.carbs, this.props.fats, this.props.protein],
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
                <Pie width="400"  data={data} />
            </div>
        )
    }
}
export default FoodChart;