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
                    '#fc2003',
                    '#d657f2',
                    '#4dd1cf'
                ],
                hoverBackgroundColor: [
                    '#fc2003',
                    '#d657f2',
                    '#4dd1cf'
                ]
            }]
        };
        return (
            <div>
                <Pie width="400" data={data} />
            </div>
        )
    }
}
export default FoodChart;