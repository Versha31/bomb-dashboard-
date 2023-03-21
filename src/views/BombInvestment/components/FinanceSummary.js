import moment from 'moment';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import { getDisplayBalance } from '../../../utils/formatBalance';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import Chart from './Chart';
import Table from './Table';

const FinanceSummary = () => {
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();

  const cashStat = useCashPriceInEstimatedTWAP();
  const scalingFactor = useMemo(() => {
    return cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null
  }, [cashStat]);

  const lastCashStat = useCashPriceInLastTWAP();
  const lastScaling = getDisplayBalance(lastCashStat,14,4);

  const TVL = useTotalValueLocked();
  return (
    <div style={{ color: 'white', padding: '1rem', border:'1px solid cyan', margin:'1rem 5rem' }}>
      <Title>Bomb Finance Summary</Title>
      <Body>
        <Table style={{ flex: 2 }} />
        <Info>
          <Middle>Current Epoch</Middle>
          <Bolder>{Number(currentEpoch)}</Bolder>
          <SpacerLong />
          <Bolder >
            <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
          </Bolder>
          <Middle style={{marginTop:'-0.4rem'}}>Next Epoch in</Middle>
          <SpacerShort />
          <Lighter>
            Live TWAP: <Green>{scalingFactor ? scalingFactor : '----'}</Green>
          </Lighter>
          <Lighter>
            TVL: <Green>${TVL}</Green>
          </Lighter>
          <Lighter>
            Last Epoch TWAP: <Green>{lastScaling ? lastScaling : '----'}</Green>
          </Lighter>
        </Info>
        <Chart style={{ flex: 2 }} />
      </Body>
    </div>
  );
};

export default FinanceSummary;

const Title = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 0.5px solid white;
  font-size: 1.5rem;
`;

const Body = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  margin: 1rem;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Middle = styled.div`
  font-size: 1rem;
  margin: 0.2rem;
`;

const Bolder = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.2rem;
`;

const Lighter = styled.div`
  font-size: 0.8rem;
  /* font-weight: 700; */
  margin: 0.2rem;
  display: flex;
`;

const Green = styled.div`
  color: lightgreen;
  margin-left: 0.3rem;
`;

const SpacerLong = styled.div`
  width: 60%;
  border: 0.5px solid gray;
  margin: 0.2rem;
`;

const SpacerShort = styled.div`
  width: 40%;
  border: 0.5px solid gray;
  margin: 0.2rem;
`;
