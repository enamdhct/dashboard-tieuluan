import React from 'react'
import dynamic from 'next/dynamic'
const ApexChart = dynamic(()=>import ('react-apexcharts'), {ssr: false})

export default function Chart({typeChart, type, data}) {
  var options = {}
  var series = []
  let category
  if(typeChart === "line"){
    options = {
      chart: {
      id: 'basic-bar',
      },
      xaxis: {
      categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      },
    };
  
    series = [
        {
        name: 'Doanh số',
        data: [30, 40, 45, 50, 49, 30, 40, 45, 50, 49, 45, 67],
        },
    ];
  } 
  if (typeChart === "bar") {
    options = {
      chart: {
      id: 'basic-bar',
      },
      xaxis: {
      categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      },
    };
    
    series = [
        {
        name: 'Sl',
        data: [30, 40, 45, 50, 49, 30, 40, 45, 50, 49, 45, 67],
        },
        {
          name: 'Sl',
          data: [35, 44, 45, 58, 49, 35, 49, 47, 40, 89, 45, 77],
        },
    ];
  }
  if (typeChart === "pie"){
    options = {
        chart: {
            width: 200,
            type: 'pie',
        },
        labels: ['1 Sao', '2 Sao', '3 Sao', '4 Sao', '5 Sao'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 200
                },
                legend: {
                position: 'bottom'
                }
            }
        }]
    },
    series = data
  }
  if (typeChart === "bar" && type === "week1") {
    if(data){
      options = {
        chart: {
        id: 'basic-bar',
        },
        xaxis: {
        categories: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
        },
      };
      
      series = [
          {
          name: 'Sl',
          data: data,
          },
      ];
    }
  }
  return (
    <ApexChart options={options} series={series} type={typeChart} width={typeChart === 'pie' ? '80%' : '100%'} height={'400px'}/>
  )
}
