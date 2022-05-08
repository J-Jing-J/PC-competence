import { cloneDeep } from 'lodash';
import { CardTabs } from './components/CardTabs';
import { LineChart } from './components/LineChart';
import { CardItemType } from './components/CardTabs/types';
// import './style.scss';

import styled from "@emotion/styled";
import { useState } from 'react';





interface IProps {
  cardData?: any;
  store?: any;
}

interface IStates { }

// @inject('store', 'globalStore')
// @observer
export const DataTrendIndex = (props: IProps) => {

  // type _typeObj = {
  //   [anyKey: string]: any
  // }

  type ChartItemType = {
    year: string;
    value: number;
  }

  const defaultChartData: ChartItemType[] = [
    {
      year: '2011',
      value: 50,
    },
    {
      year: '2012',
      value: 60,
    },
    {
      year: '2013',
      value: 63,
    },
    {
      year: '2014',
      value: 65,
    },
    {
      year: '2015',
      value: 70,
    },
    {
      year: '2016',
      value: 80,
    },
    {
      year: '2017',
      value: 90,
    },
    {
      year: '2018',
      value: 93,
    },
    {
      year: '2019',
      value: 99,
    },
  ]

  const defaultCardData: CardItemType[] = [
    {
      id: '1',
      name: '心理评分1',
      value: 99,
      persent: '100',
      icon: 'assets/imgs/card-icon1',
      isSelected: true,
    },
    {
      id: '2',
      name: '心理评分2',
      value: 80,
      persent: 100,
      icon: 'assets/imgs/card-icon2',
      isSelected: false,
    },
    {
      id: '3',
      name: '心理评分3',
      value: 88,
      persent: 100,
      icon: 'assets/imgs/card-icon3',
      isSelected: false,
    },
  ];

  const [cardData, setCardData] = useState(defaultCardData);
  const [chartData, setChartData] = useState(defaultChartData);


  // const cloneDeep = (_object: _typeObj, _obj: _typeObj = {}): _typeObj => {
  //   if (!(Object.prototype === Object.getPrototypeOf(_object))) {
  //     return new Error('传入参数***_object***类型错误')
  //   }
  //   for (let key in _object) {
  //     if (Object.prototype === Object.getPrototypeOf(_object[key])) {
  //       _obj[key] = cloneDeep(_object[key])
  //     } else {
  //       _obj[key] = _object[key]
  //     }
  //   }
  //   return _obj
  // }

  const handleCardTabsChange = (selectedId: string) => {
    const newCardData = cardData.map((cardItem: CardItemType) => {
      const tempCardItem = cloneDeep(cardItem);
      if (tempCardItem.id === selectedId) {
        tempCardItem.isSelected = true;

      } else {
        tempCardItem.isSelected = false;
      }
      return tempCardItem;
    });
    const newChartData = chartData.map((chartItem: ChartItemType) => {
      const tempChartItem = cloneDeep(chartItem);

      tempChartItem.value += 2;
      return tempChartItem;
    });
    setCardData(newCardData);
    setChartData(newChartData);
  }

  return (
    <DataTrendComponentBox>
      <CardTabsBox>
        <CardTabs
          cardData={cardData}
          onChange={(selectedId: string) => { handleCardTabsChange(selectedId); }}
        />
      </CardTabsBox>
      <LineChartBox>
        <LineChart
          chartData={chartData}
        />
      </LineChartBox>
    </DataTrendComponentBox>
  );
}

const DataTrendComponentBox = styled.div`
    height: 437px;
    background-color: #ffffff;
    padding: 18px 20px 2px;
    // border-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 1px 1px 20px 0 rgba(183,183,188,.1);
`

const CardTabsBox = styled.div`
`

const LineChartBox = styled.div`
    margin-top: 30px;
`