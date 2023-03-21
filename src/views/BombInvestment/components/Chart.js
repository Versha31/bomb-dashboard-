import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';
import bshare from '../../../assets/img/bshares.png';
import bomb from '../../../assets/img/bomb.png';
import bbond from '../../../assets/img/bbond.png';
import BombBTCB from '../../../assets/img/bomb-bitcoin-LP.png';
import BshareBNB from '../../../assets/img/bshare-bnb-LP.png';

const Chart = () => {
  return (
    <div style={{ flex: 2 }}>
      <div style={{ position: 'relative' }}>
        <PieChart
          lineWidth={20}
          style={{ height: '10rem' }}
          data={[
            { value: 17, color: 'green', style: { strokeWidth: 10 } },
            { value: 12, color: 'blue', style: { strokeWidth: 10 } },
            { value: 20, color: 'red', style: { strokeWidth: 10 } },
            { value: 17, color: 'cyan', style: { strokeWidth: 10 } },
            { value: 17, color: 'gray', style: { strokeWidth: 10 } },
            { value: 17, color: 'purple', style: { strokeWidth: 10 } },
          ]}
        ></PieChart>
        <Dollar>
          <div>${10451}</div>
          <Percentage>+22%</Percentage>
        </Dollar>
      </div>
      <Wrapper>
        <Row>
          <Flexer>
            <Img src={bomb} style={{ width: '20px', height: '20px' }} alt="" />
            Bomb:
            <Bolder>17%</Bolder>
          </Flexer>
          <Flexer>
            <Img src={BombBTCB} style={{ width: '20px', height: '20px' }} alt="" />
            Bomb-BTCB:
            <Bolder>17%</Bolder>
          </Flexer>
        </Row>
        <Row>
          <Flexer>
            <Img src={bshare} style={{ width: '20px', height: '20px' }} alt="" />
            BShare:
            <Bolder>12%</Bolder>
          </Flexer>
          <Flexer>
            <Img src={BshareBNB} style={{ width: '20px', height: '20px' }} alt="" />
            BShare-BNB:
            <Bolder>17%</Bolder>
          </Flexer>
        </Row>
        <Row>
          <Flexer>
            <Img src={bbond} style={{ width: '20px', height: '20px' }} alt="" />
            BBond:
            <Bolder>20%</Bolder>
          </Flexer>
          <Flexer>
            {'  '}
            Others:
            <Bolder>17%</Bolder>
          </Flexer>
        </Row>
      </Wrapper>
    </div>
  );
};

export default Chart;

const Dollar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 14.5%;
  left: 35.8%;
  text-align: center;
  font-size: 1.3rem;
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
  border: none;
  background-color: #23284b;
`;

const Percentage = styled.div`
  color: lightgreen;
`;

const Wrapper = styled.div`
  width: 100%;
  font-size: 0.8rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.3rem;
`;

const Flexer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 2rem;
`;

const Bolder = styled.div`
  font-weight: 700;
  margin-left: 0.5rem;
`;

const Img = styled.img`
  margin-right: 0.5rem;
`;
