import React from 'react';
import styled from 'styled-components';
import bshare from '../../../assets/img/bshares.png';
import BombBtcbCard from './BombBtcbCard';
import BshareBnbCard from './BshareBnbCard';

const BombFarms = () => {
  return (
    <div style={{ margin: '1rem 5rem', border: '1px solid lightblue', padding: '1rem' }}>
      <Heading>
        <TitleContainer>
          <Title>Bomb Farms</Title>
          <SubTitle>Stake your LP tokens in our farms to start earning $BSHARE</SubTitle>
        </TitleContainer>
        <Button>
          Claim All <img src={bshare} style={{ width: '20px', height: '20px' }} alt="" />
        </Button>
      </Heading>
      <BombBtcbCard />
      <Spacer />
      <BshareBnbCard />
    </div>
  );
};

export default BombFarms;

const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const TitleContainer = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const SubTitle = styled.div`
  font-size: 0.9rem;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid white;
  padding: 0.2rem 1rem;
  border-radius: 5%;
  font-size: 1.2rem;
  cursor: pointer;
  :hover {
    background: gray;
  }
`;

const Spacer = styled.div`
  border-top: 1px solid lightblue;
  margin: 1rem 0;
  width: 102.6%;
  position:relative;
  left:-1.3%;
`
