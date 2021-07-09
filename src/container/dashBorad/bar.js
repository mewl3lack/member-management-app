import React from 'react'
import { Bar } from 'react-chartjs-2'

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const GroupedBar = (props) => (
  <>
    <Bar
      data={props.data}
      options={options}
      options={{
        legend: {
          display: true,
          position: 'bottom',
        },
      }}
    />
  </>
)

export default GroupedBar
