import React, { useMemo } from 'react';
import styled from 'styled-components';
import useBombStats from '../../../hooks/useBombStats';
import useModal from '../../../hooks/useModal';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import { getDisplayBalance } from '../../../utils/formatBalance';
import bshare from '../../../assets/img/bshares.png';
import BshareBnb from '../../../assets/img/bshare-bnb-LP.png';
import CountUp from 'react-countup';
import useBank from '../../../hooks/useBank';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStake from '../../../hooks/useStake';
import useWithdraw from '../../../hooks/useWithdraw';
import DepositModal from '../../Bank/components/DepositModal';
import WithdrawModal from '../../Bank/components/WithdrawModal';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';
import useShareStats from '../../../hooks/usebShareStats';

const BshareBnbCard = () => {
  const bankId = 'BshareBnbLPBShareRewardPool';
  const bank = useBank(bankId);

  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );
  const stackedInDollars = (
    Number(tokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal))
  ).toFixed(2);
  const { onStake } = useStake(bank);
  const { onWithdraw } = useWithdraw(bank);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const TVL = useTotalValueLocked();
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const { onReward } = useHarvest(bank);
  const bombStats = useBombStats();
  const tShareStats = useShareStats();

  const tokenStats = bank.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const tokenPriceInDollarsEarned = useMemo(
    () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
    [tokenStats],
  );
  const earnedInDollars = (Number(tokenPriceInDollarsEarned) * Number(getDisplayBalance(earnings))).toFixed(2);

  return (
    <div style={{  padding: '0.5rem', fontSize: '1rem' }}>
      <CardHeader>
        <img src={BshareBnb} style={{ width: '48px', height: '48px' }} alt="" />
        <TitleContainer>
          <Title>
            <p style={{ padding: '0.1rem', fontWeight: 600, fontSize: '1.5rem' }}>BOMB-BTCB</p>
            <Recommended>Recommended</Recommended>
            <SubTitle>
              <span>TVL:</span>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </SubTitle>
          </Title>
        </TitleContainer>
      </CardHeader>

      <Collection>
        <Columner>
          Daily Returns:
          <Bolder style={{ fontSize: '2rem', fontWeight: '500' }}>2%</Bolder>
        </Columner>
        <Columner>
          <div>Your Stake:</div>
          <div>
            <img src={BshareBnb} style={{ width: '24px', height: '24px' }} alt="" />
            <Bolder>{getDisplayBalance(stakedBalance, bank.depositToken.decimal)}</Bolder>
          </div>
          <div>
            {'  '} ≈ ${stackedInDollars}
          </div>
        </Columner>

        <Columner>
          <div>Earned:</div>
          <div>
            <img src={bshare} style={{ width: '24px', height: '24px' }} alt="" />
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
            <Button onClick={onReward}>
              Claim Rewards <img src={bshare} style={{ width: '24px', height: '24px' }} alt="" />
            </Button>
          </ButtonContainer>
        </Columner>
      </Collection>
    </div>
  );
};

export default BshareBnbCard;

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
  justify-content: flex-end;
  padding: 0.1rem 0;
  flex: 1;
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
  align-items:center;
  cursor: pointer;
  :hover {
    background: gray;
  }
`;
