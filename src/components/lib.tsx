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

// 提示系统维护显示错误信息
export const FullPageErrorFallBack = ({ error }: { error: Error | null }) => <FullPage>
  <Typography.Text type={"danger"}>请稍后再试：{error?.message}</Typography.Text>
</FullPage>


// 没有padding的按钮需要多次使用
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`