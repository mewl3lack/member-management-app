import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['1-7', '8-14', '15-21', '22-30' ],
  datasets: [
    {
      label: 'Withdraw',
      data: [12, 19, 3, 5 ],
      backgroundColor: '#E52E55',
    },
    {
      label: 'Deposit',
      data: [2, 3, 20, 30 ],
      backgroundColor: '#23C19A',
    },
 
  ],
};

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
};

const GroupedBar = () => (
  <>
 
    <Bar data={data} options={options}   options={{
        
            legend:{
              display:true,
              position:'bottom'
            }
          }} />
  </>
);

export default GroupedBar;