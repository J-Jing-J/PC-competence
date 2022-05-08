import React from 'react';
import { Carousel } from 'antd';
import styled from '@emotion/styled';

export const Banner = () => {
  return (
    <BannerBox>
      <Carousel autoplay>
        <div>
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.doubanio.com%2Fview%2Frichtext%2Flarge%2Fpublic%2Fp223951361.jpg&refer=http%3A%2F%2Fimg2.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654613888&t=dfc9005f6e3651f3fe54ce75dd773516" alt="" />
        </div>
        <div>
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2734735271.jpg&refer=http%3A%2F%2Fimg2.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654614031&t=d0868f4cba3f432256036d93d79432e0" alt="" />
        </div>
      </Carousel>
    </BannerBox>
  );
}

const BannerBox = styled.div`
  border-radius: 8px;
    overflow: hidden;
    img {
        width: 100%;
        height: 148px;
        line-height: 148px;
        text-align: center;
        color: #fff;
        background: #364d79;
    }
`

