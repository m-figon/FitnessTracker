import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2';
function MacrosChart(props) {
    const [data,setData]= useState({
        labels: [
            'Carbohydrates',
            'Fats',
            'Protein'
        ],
        datasets: [{
            data: [props.users[props.id].carbs, props.users[props.id].fats, props.users[props.id].protein],
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
    })
    useEffect(()=>{
        setData({
            labels: [
                'Carbohydrates',
                'Fats',
                'Protein'
            ],
            datasets: [{
                data: [props.users[props.id].carbs, props.users[props.id].fats, props.users[props.id].protein],
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
        })
    },[props.users])
       
        return (
            <div>
                <Pie data={data} />
            </div>
        )
}
export default MacrosChart;