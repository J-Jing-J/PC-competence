import {
  Form,
  Button,
  Card
} from 'antd';
import { testTypes } from '../../common/constants/test';
import { resetRoute, useDocumentTitle } from '../../utils'
import { ReactComponent as RadioSVG } from '../../assets/radio.svg'
import { ReactComponent as MultiRadioSVG } from '../../assets/multiRadio.svg'
import { ReactComponent as InputSVG } from '../../assets/input.svg'
import { ReactComponent as TextareaSVG } from '../../assets/textarea.svg'
import { ReactComponent as SelectSVG } from '../../assets/select.svg'
import { ReactComponent as GaugeSVG } from '../../assets/gauge.svg'
import styled from '@emotion/styled';




export const TestTypeColumn = () => {

  const svgStyle = { verticalAlign: 'middle' }
  return <TestTypeContainer>
    <Button style={{ marginBottom: '1rem' }} type='primary' size='large'>题目控件</Button>
    {
      testTypes.map(type => <TypeItemCard style={{ marginBottom: '0.5rem' }} key={type.id}>
        {
          type.icon === 'Radio' ? <RadioSVG style={svgStyle} height={'3.5rem'} width={'3.5rem'} /> :
            type.icon === 'MultiRadio' ? <MultiRadioSVG style={svgStyle} height={'3rem'} width={'3rem'} /> :
              type.icon === 'Gauge' ? <GaugeSVG style={svgStyle} height={'2.5rem'} width={'2.5rem'} /> :
                type.icon === 'Input' ? <InputSVG style={svgStyle} height={'2.5rem'} width={'2.5rem'} /> :
                  type.icon === 'Textarea' ? <TextareaSVG style={svgStyle} height={'2.5rem'} width={'2.5rem'} /> :
                    type.icon === 'Select' ? <SelectSVG style={svgStyle} height={'2.5rem'} width={'2.5rem'} /> : null
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
