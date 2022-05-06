import styled from '@emotion/styled';
import React from 'react';
import { Button } from 'antd'
import { MENU_FOOTER_CONFIG } from '../../common/constants/menu';

interface IProps { }
interface IStates { }

export const Footer = (props: IProps) => {
  return (
    <FooterComponentBox>
      <FooterMenu>
        {
          MENU_FOOTER_CONFIG.map((menuItem, index) => (
            <FooterMenuItem key={`footer-menu-item${index.toString()}`}>
              {/* <Button type={"link"} onClick={e => e.preventDefault()}>{menuItem.title}</Button> */}
              <a href={menuItem.link}>{menuItem.title}</a>
            </FooterMenuItem>
          ))
        }
      </FooterMenu>
      <FooterCopyRight>©2022 使用胜任力系统前必读 京公安网备 10100000号 互联网信息服务许可 我已阅读并接受慕课推广服务合同 欢迎访问胜任力推广政策中心</FooterCopyRight>
    </FooterComponentBox>
  );
}

const FooterComponentBox = styled.div` 
      color: #666;
      font-size: 8px;
      padding-top: 40px;
      padding-bottom: 10px;
`
const FooterMenu = styled.div` 
  display: flex;
        align-items: center;
        justify-content: center;
`
const FooterMenuItem = styled.div` 
  font-size: 10px;
  height: 16px;
            line-height: 10px;
            padding: 0 15px;
            border-right: 1px solid #ccc;
            &:last-child {
                border-right: none;
            }
`
const FooterCopyRight = styled.div` 
  margin-top: 20px;
        text-align: center;
        color: #999;
`