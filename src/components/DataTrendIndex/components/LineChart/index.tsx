import React from 'react';
import { Line } from '@ant-design/charts';
import styled from '@emotion/styled';


interface IProps {
  chartData: any[];
}



export const LineChart = (props: IProps) => {

  const { chartData } = props;
  const config = {
    // autoFit: true,
    height: 250,
    data: chartData,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 2,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
  };

  return (
    <LineChartComponentBox>
      {
        //eslint-disable-next-line
      }
      <Line {...config} />
    </LineChartComponentBox>
  );
}

const LineChartComponentBox = styled.div`
`