import styled from "@emotion/styled";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;  //子元素垂直居中
  justify-content: ${props => props.between ? 'space-between' : undefined};  //是否靠两边要传进来
  margin-bottom: ${props => props.marginBottom + 'rem'};
  /*
  子元素如果有marginTop或Bottom会影响垂直居中
  设置所有直接子元素的margin */
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined
  };
  }
` 