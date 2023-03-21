import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Bond from '../../../assets/img/bbond.png';
import useBombFinance from '../../../hooks/useBombFinance';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import useBondStats from '../../../hooks/useBondStats';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import { getDisplayBalance } from '../../../utils/formatBalance';
import ExchangeModal from '../../Bond/components/ExchangeModal';

const BondCard = () => {
  const bombFinance = useBombFinance();
  const addTransaction = useTransactionAdder();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const bondStat = useBondStats();
  const bondsPurchasable = useBondsPurchasable();
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const price=Number(bondStat?.tokenInFtm).toFixed(4) || '-';

  const handleBuyBonds = useCallback(
    async (amount) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount) => {
      const tx = await bombFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
    },
    [bombFinance, addTransaction],
  );

  const balancePurchase = useTokenBalance(bombFinance.BOMB);
  const balanceRedeem = useTokenBalance(bombFinance.BBOND);
  const [onPresentPurchase, onDismiss] = useModal(
    <ExchangeModal
      title="Purchase"
      description={
        !isBondPurchasable
          ? 'BOMB is over peg'
          : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
      }
      max={balancePurchase}
      onConfirm={(value) => {
        handleBuyBonds(value);
        onDismiss();
      }}
      action="Purchase"
      tokenName="BOMB"
    />,
  );

  const [onPresentRedeem, onDismissRedeem] = useModal(
    <ExchangeModal
      title="Redeem"
      description={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`}
      max={balanceRedeem}
      onConfirm={(value) => {
        handleRedeemBonds(value);
        onDismissRedeem();
      }}
      action="Redeem"
      tokenName="BBOND"
    />,
  );
  return (
    <div style={{ border: '1px solid lightblue', margin: '1rem 5rem', padding: '1rem', fontSize: '1.1rem' }}>
      <Heading>
        <img src={Bond} alt="" height={40} width={40} />
        <TitleContainer>
          <Title>Bonds</Title>
          <SubTitle>BBond can be purchased only on contraction periods, when TWAP of BOMB is below 1</SubTitle>
        </TitleContainer>
      </Heading>
      <Body>
        <Left>
          <SubTitle>Current Price: (Bomb)^2</SubTitle>
          <Title>BBond = {price} BTCB</Title>
        </Left>
        <Middle>
          <SubTitle style={{ textAlign: 'center' }}>Available to redeem:</SubTitle>
          <Flexer>
            <img src={Bond} alt="" height={30} width={30} />
            <Redeem>456</Redeem>
          </Flexer>
        </Middle>
        <Right>
          <RightFlexer>
            <div>
              <BoldSubTitle>Purchase BBond</BoldSubTitle>
              <SubTitle>Bomb is over peg</SubTitle>
            </div>
            <Button onClick={onPresentPurchase}>Purchase</Button>
          </RightFlexer>
          <Spacer />
          <RightFlexer>
            <BoldSubTitle>Redeem Bomb</BoldSubTitle>
            <Button onClick={onPresentRedeem}>Redeem</Button>
          </RightFlexer>
        </Right>
      </Body>
    </div>
  );
};

export default BondCard;

const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
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

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
`;

const Left = styled.div`
  flex: 2;
`;

const Middle = styled.div`
  flex: 1;
  margin: 0 4rem 0 -8rem;
`;

const Flexer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Redeem = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Right = styled.div`
  flex: 2.5;
`;

const RightFlexer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoldSubTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

const Button = styled.div`
  border: 1px solid white;
  border-radius: 5%;
  padding: 0.2rem 1rem;
  :hover {
    background: gray;
  }
`;

const Spacer = styled.div`
  border-top: 1px solid white;
  margin: 0.4rem;
  width: 106%;
  position: relative;
  left: -3%;
`;
