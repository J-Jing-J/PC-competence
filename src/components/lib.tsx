import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";

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

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

`

// loading状态展示的组件
export const FullPageLoading = () => <FullPage>
  <Spin size={"large"} />
</FullPage>



// 没有padding的按钮需要多次使用
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`

export const SubmitButton = styled(Button)`
  position: absolute;
  left: 50%;
  transform: translate(0, 50%);
  margin: 20px 0 20px 0;
`

// 只要是error类型，才返回错误组件
// 类型守卫，是否是error类型(鸭子类型))
const isError = (value: any): value is Error => value?.message
export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
  }
  return null;
}

// 提示系统维护显示错误信息
export const FullPageErrorFallBack = ({ error }: { error: Error | null }) =>
  <FullPage>
    <ErrorBox error={error} />
  </FullPage>



export const ScreenContainer = styled.div`
  padding: 0 3rem 0 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`