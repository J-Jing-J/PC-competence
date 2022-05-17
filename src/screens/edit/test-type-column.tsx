import {
  Form,
  Button,
  Card
} from 'antd';
import { testTypes, testTypesType } from '../../common/constants/test';
import { resetRoute, useDocumentTitle } from '../../utils'
import { ReactComponent as RadioSVG } from '../../assets/test/radio.svg'
import { ReactComponent as MultiRadioSVG } from '../../assets/test/multiRadio.svg'
import { ReactComponent as InputSVG } from '../../assets/test/input.svg'
import { ReactComponent as TextareaSVG } from '../../assets/test/textarea.svg'
import { ReactComponent as SelectSVG } from '../../assets/test/select.svg'
import { ReactComponent as GaugeSVG } from '../../assets/test/gauge.svg'
import styled from '@emotion/styled';
import { useState } from 'react';
import { scrollToBottom } from '../../utils/scroll';


interface TestItemProps {
  setAddType: (typeId: number) => void;
}


export const TestTypeColumn = (props: TestItemProps) => {
  const { setAddType } = props;

  const svgStyle = {
    verticalAlign: 'middle',
    width: '3rem',
    height: '3rem'
  }

  const handleTypeCard = (typeId: number) => {
    setAddType(typeId);
    setTimeout(scrollToBottom, 0);
  }

  return <TestTypeContainer>
    <Button style={{ marginBottom: '1rem' }} type='primary' size='large'>题目控件</Button>
    {
      testTypes.map(type =>
        <TypeItemCard
          onClick={() => handleTypeCard(type.id)}
          hoverable
          style={{ marginBottom: '0.5rem' }}
          key={type.id}
        >
          {
            type.icon === 'Radio' ? <RadioSVG style={svgStyle} /> :
              type.icon === 'MultiRadio' ? <MultiRadioSVG style={svgStyle} /> :
                type.icon === 'Gauge' ? <GaugeSVG style={svgStyle} /> :
                  type.icon === 'Input' ? <InputSVG style={svgStyle} /> :
                    type.icon === 'Textarea' ? <TextareaSVG style={svgStyle} /> :
                      type.icon === 'Select' ? <SelectSVG style={svgStyle} /> : null
          }
          <TypeText>{type.name}</TypeText>
        </TypeItemCard>)
    }
  </TestTypeContainer>
};

const TestTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 25rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  padding: 0 0.7rem 0;
  margin-right: 1.5rem;
  position: sticky;
  top: 9rem;
  max-height: 85vh;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const TypeItemCard = styled(Card)`
  margin-bottom: 1rem;
  padding-left: 2rem;
`

const TypeText = styled.span`
  margin-left: 2rem;
`
