import styled from '@emotion/styled';
import { CardItemType } from './types';


interface IProps extends CardItemType {
  onClick?: (id: string) => void;
}

interface IStates { }

export const CardItem = (props: IProps) => {

  const { name, value, persent, icon, id, isSelected, onClick } = props;

  // 切换卡片，子组件传id给父组件的回调函数
  const handleClick = (id: string) => {
    if (onClick) {
      onClick(id);
    }
  }

  const SelectedCarditemBoxStyle = {
    display: 'flex',
    background: '#f7f8f8',
    borderRadius: '6px',
    width: '100%',
    height: '79px',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '10px',
    backgroundImage: 'linear-gradient(137deg, #5f51ff, #326fff 76%)',
    paddingLeft: '30px',
    paddingRight: '10px'
  }

  const CarditemBoxStyle = {
    display: 'flex',
    background: '#f7f8f8',
    borderRadius: '6px',
    width: '100%',
    height: '79px',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '10px',
    paddingLeft: '30px',
    paddingRight: '10px'
  }

  const cardItemStyle = isSelected ? 'carditem-component-box carditem-selected' : 'carditem-component-box';
  const iconPath = isSelected ? `../../../../${icon}-selected.png` : `../../../../${icon}.png`;

  return (
    <div
      style={isSelected ? SelectedCarditemBoxStyle : CarditemBoxStyle}
      className={cardItemStyle}
      onClick={() => { handleClick(id); }}
    >
      {/* <Icon src='./card-icon1-selected.png' alt="" /> */}
      {/* {iconPath} */}
      <Info>
        <NamePersent>
          {isSelected ? <NameActive>{name}</NameActive> : <Name>{name}</Name>}
          {
            persent && isSelected ? <PersentActive>{`${persent} %`}</PersentActive> : <Persent>{`${persent} %`}</Persent>
          }
        </NamePersent>
        {
          isSelected ? <ValueActive>{value}</ValueActive> : <Value>{value}</Value>
        }
      </Info>
    </div>
  )
}

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 10px;
`

const Info = styled.div`
  width: 100%;
  padding-right: 15px;
`
const NamePersent = styled.div`
  display: flex;
  justify-content: space-between;
`

const NameActive = styled.div`
  font-size: 12px;
        color: #ffffff;
        opacity: 0.8;
        line-height: 18px;
`
const Name = styled.div`
  font-size: 12px;
        color: #999;
        line-height: 18px;
`

const PersentActive = styled.div`
  display: flex;
        font-size: 12px;
        color: #ffffff;
        line-height: 18px;
`

const Persent = styled.div`
  display: flex;
        font-size: 12px;
        color: #000;
        line-height: 18px;
`

const ValueActive = styled.div`
  font-size: 24px;
      color: #ffffff;
      line-height: 26px;
      margin-top: 3px;
      max-width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
`

const Value = styled.div`
  font-size: 24px;
      line-height: 26px;
      margin-top: 3px;
      max-width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
`