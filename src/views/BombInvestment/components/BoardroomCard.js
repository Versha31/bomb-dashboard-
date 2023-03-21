import React, { useMemo } from 'react';
import styled from 'styled-components';
import bombFinance from '../../../bomb-finance';
import useBombStats from '../../../hooks/useBombStats';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useModal from '../../../hooks/useModal';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import { getDisplayBalance } from '../../../utils/formatBalance';
import DepositModal from '../../Boardroom/components/DepositModal';
import WithdrawModal from '../../Boardroom/components/WithdrawModal';
import bshare from '../../../assets/img/bshares.png';
import bomb from '../../../assets/img/bomb.png';
import CountUp from 'react-countup';

const BoardroomCard = () => {
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
  const tokenBalance = useTokenBalance(bombFinance.BSHARE);
  const { onStake } = useStakeToBoardroom();
  const { onWithdraw } = useWithdrawFromBoardroom();
  const bombStats = useBombStats();

  const TVL = useTotalValueLocked();
  const totalStaked = useTotalStakedOnBoardroom();
  //   console.log(TVL);
  //   console.log(totalStaked);
  //   console.log(getDisplayBalance(totalStaked, 18, 0));
  const stakedBalance = useStakedBalanceOnBoardroom();
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  //   console.log(stakedBalance, tokenPriceInDollars)

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'BShare'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'BShare'}
    />,
  );

  const earnings = useEarningsOnBoardroom();
  const earnedTokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const earnedInDollars = (Number(earnedTokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const { onReward } = useHarvestFromBoardroom();

  return (
    <div style={{ border: '1px solid cyan', padding: '0.5rem', fontSize: '1rem' }}>
      <CardHeader>
        <img src={bshare} style={{ width: '48px', height: '48px' }} alt="" />
        <TitleContainer>
          <Title>
            <p style={{ padding: '0.1rem', fontWeight: 600, fontSize: '1.5rem' }}>Boardroom</p>
            <Recommended>Recommended</Recommended>
          </Title>
          <SubTitle>
            <div style={{ flex: 1, textAlign: 'left' }}>Stake BHSARE and earn BOMB every epoch</div>
            <span>TVL:</span>
            <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
          </SubTitle>
        </TitleContainer>
      </CardHeader>

      <TotalStaked>
        <span>Total Stacked:</span>
        <span>
          <img src={bshare} style={{ width: '24px', height: '24px' }} alt="" />
        </span>
        <Bolder>{getDisplayBalance(totalStaked, 18, 0)}</Bolder>
      </TotalStaked>

      <Collection>
        <Columner>
          Daily Returns:
          <Bolder style={{ fontSize: '2rem', fontWeight: '500' }}>2%</Bolder>
        </Columner>
        <Columner>
          <div>Your Stake:</div>
          <div>
            <img src={bshare} style={{ width: '24px', height: '24px' }} alt="" />
            <Bolder>{getDisplayBalance(stakedBalance)}</Bolder>
          </div>
          <div>
            {'  '} ≈ ${tokenPriceInDollars}
          </div>
        </Columner>

        <Columner>
          <div>Earned:</div>
          <div>
            <img src={bomb} style={{ width: '24px', height: '24px' }} alt="" />
            <Bolder>{getDisplayBalance(earnings)}</Bolder>
          </div>
          <div>
            {'  '} ≈ ${earnedInDollars}
          </div>
        </Columner>

        <Columner>
          <ButtonContainer>
            <Button onClick={onPresentDeposit}>Deposit</Button>
            <Button onClick={onPresentWithdraw}>Withdraw</Button>
          </ButtonContainer>
          <Button onClick={onReward}>
            Claim Rewards <img src={bshare} style={{ width: '24px', height: '24px' }} alt="" />
          </Button>
        </Columner>
      </Collection>
    </div>
  );
};

export default BoardroomCard;

const CardHeader = styled.div`
  display: flex;
  color: white;
  width: 100%;
`;

const TitleContainer = styled.div`
  flex: 1;
  border-bottom: 0.5px solid white;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 2rem;
  padding: 0.1rem 0;
`;

const Recommended = styled.div`
  padding: 0.1rem 1rem;
  margin: 0 1rem;
  background-color: green;
  border-radius: 3%;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 2rem;
  padding: 0.1rem 0;
  width: 100%;
`;

const Bolder = styled.span`
  font-weight: 700;
`;

const TotalStaked = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: white;
  width: 100%;
`;

const Collection = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  margin-top: 1rem;
`;

const Columner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.div`
  border: 1px solid white;
  border-radius: 5%;
  background: transparent;
  font-size: 1.2rem;
  text-align: center;
  color: white;
  padding: 0.2rem 1rem;
  margin: 0.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    background: gray;
  }
`;
