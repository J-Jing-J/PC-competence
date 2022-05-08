import { CardItem } from './CardItem';
import { CardItemType } from './types';
import styled from '@emotion/styled';

interface IProps {
  cardData: CardItemType[];
  onChange?: (selectedId: string) => void;
}

interface IStates { }

export const CardTabs = (props: IProps) => {
  const { cardData, onChange } = props

  const handleChange = (selectedId: string) => {
    if (onChange) {
      onChange(selectedId);
    }
  }

  return (
    <CardtabsComponentBox>
      {
        cardData.map((cardItem: CardItemType, index: number) => (
          <CardItem
            name={cardItem.name}
            value={cardItem.value}
            persent={cardItem.persent}
            icon={cardItem.icon}
            isSelected={cardItem.isSelected}
            id={cardItem.id}
            onClick={(selectedId: string) => { handleChange(selectedId); }}
            key={`carditem${index.toString()}`}
          />
        ))
      }
    </CardtabsComponentBox>
  );
}

const CardtabsComponentBox = styled.div`
  display: flex;
    justify-content: space-between;

    :last-child {
        margin-right: 0px;
    }
`

