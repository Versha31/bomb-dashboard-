import React from 'react';
import styled from 'styled-components';
import BoardroomCard from './components/BoardroomCard';
import BombFarms from './components/BombFarms';
import FinanceSummary from './components/FinanceSummary';
import background from "../../assets/img/background.jpg";
import BondCard from './components/BondCard';
import discord from "../../assets/img/discord.svg";

const BombInvestment = () => {
  return (
    <Container>
      <FinanceSummary />
      <BoardMiddle>
        <Left>
          <div style={{color:'#9ee6ff', width:'100%',textAlign:'right', fontSize:'1rem'}}>Read Investment Strategy {'>'}</div>
          <Invest>Invest Now</Invest>
          <Flexer>
            <Linker>
            <img src={discord} height={20} width={20} style={{backgroundColor:'gray', border:'1px solid black',borderRadius:'50%',objectFit:'cover', marginRight:'0.2rem'}}></img>
            Chat on Discord
            </Linker>
            <Linker>Read Docs</Linker>
          </Flexer>
          <BoardroomCard />
        </Left>
        <Right>
          Latest News
        </Right>
      </BoardMiddle>
      <BombFarms />
      <BondCard />
    </Container>
  );
};

export default BombInvestment;

const Container = styled.div`
  width: 100%;
  color:white;
  background-image:url(${background});
`;

const BoardMiddle = styled.div`
  display: flex;
  justify-content: space-between;
  margin:1rem 5rem;
`;

const Left = styled.div`
  flex: 6;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin:0.5rem;
`;

const Right = styled.div`
  flex: 4;
  border: 1px solid cyan;
  margin:0.5rem;
  padding:1rem;
  font-size: 1.4rem;
`;

const Invest = styled.div`
  background: radial-gradient(
    59345.13% 4094144349.28% at 39511.5% -2722397851.45%,
    rgba(0, 245, 171, 0.5) 0%,
    rgba(0, 173, 232, 0.5) 100%
  );
  width: 100%;
  border: 0.5px solid #e41a1a;
  margin: 0.3rem 0;
`;

const Flexer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color:black;
  margin: 0.3rem 0;
`;

const Linker = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #728cdf;
  backdrop-filter: blur(25px);
  width:45%;
  display:flex;
  align-items: center;
  justify-content: center;
`;
