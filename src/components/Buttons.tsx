import styled from "@emotion/styled"
import { Button } from "antd"
import { SizeType } from "antd/lib/config-provider/SizeContext"

export const SubmitButton = ({ size, style, children }: { size?: SizeType, style?: object, children?: string }) => {
  return <SubmitButtonStyle size={size} style={style}>{children}</SubmitButtonStyle>
}

const SubmitButtonStyle = styled(Button)`
  margin-top: 20px;
  position: absolute;
  left: 50%;
  transform: translate(0, 50%);
`