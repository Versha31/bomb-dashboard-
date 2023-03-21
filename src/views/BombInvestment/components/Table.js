import React, { useMemo } from 'react';
import styled from 'styled-components';
import bshare from '../../../assets/img/bshares.png';
import bomb from '../../../assets/img/bomb.png';
import bbond from '../../../assets/img/bbond.png';
import metamask from '../../../assets/img/metamask-fox.svg';
import useBombStats from '../../../hooks/useBombStats';
import usebShareStats from '../../../hooks/usebShareStats';
import useBondStats from '../../../hooks/useBondStats';
import { roundAndFormatNumber } from '../../../0x';

const Table = () => {
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();

  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => {
    return bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null;
  }, [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  //   console.log(bSharePriceInDollars);
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  return (
    <div style={{ width: '100%', flex:3 }}>
      <Row>
        <FlexTwo></FlexTwo>
        <Flex>Current Suppply</Flex>
        <Flex>Total Supply</Flex>
        <Flex>Price</Flex>
        <FlexHalf></FlexHalf>
      </Row>
      <Row>
        <FlexTwo>
          <img src={bomb} style={{ width: '20px', height: '20px' }} alt="" />
          $BOMB
        </FlexTwo>
        <Flex>{roundAndFormatNumber(bombCirculatingSupply, 2)}</Flex>
        <Flex>{roundAndFormatNumber(bombTotalSupply, 2)}</Flex>
        <Flex>
          <div>${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'}</div>
          <div>{bombPriceInBNB ? bombPriceInBNB : '-.----'} BTCB</div>
        </Flex>
        <FlexHalf>
          <img src={metamask} style={{ width: '20px', height: '20px' }} alt="" />
        </FlexHalf>
      </Row>
      <Row>
        <FlexTwo>
          <img src={bshare} style={{ width: '20px', height: '20px' }} alt="" />
          $BSHARE
        </FlexTwo>
        <Flex>{roundAndFormatNumber(bShareCirculatingSupply, 2)}</Flex>
        <Flex>{roundAndFormatNumber(bShareTotalSupply, 2)}</Flex>
        <Flex>
          <div>${bSharePriceInDollars ? roundAndFormatNumber(bSharePriceInDollars, 2) : '-.--'}</div>
          <div>{bSharePriceInBNB ? bSharePriceInBNB : '-.----'} BTCB</div>
        </Flex>
        <FlexHalf>
          <img src={metamask} style={{ width: '20px', height: '20px' }} alt="" />
        </FlexHalf>
      </Row>

      <Row>
        <FlexTwo>
          <img src={bbond} style={{ width: '20px', height: '20px' }} alt="" />
          $BBOND
        </FlexTwo>
        <Flex>{roundAndFormatNumber(tBondCirculatingSupply, 2)}</Flex>
        <Flex>{roundAndFormatNumber(tBondTotalSupply, 2)}</Flex>
        <Flex>
          <div>${tBondPriceInDollars ? roundAndFormatNumber(tBondPriceInDollars, 2) : '-.--'}</div>
          <div>{tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTCB</div>
        </Flex>
        <FlexHalf>
          <img src={metamask} style={{ width: '20px', height: '20px' }} alt="" />
        </FlexHalf>
      </Row>
    </div>
  );
};

export default Table;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 0.1rem solid gray;
  padding:0.3rem 0;
`;

const FlexTwo = styled.div`
  flex: 1;
  display: flex;
`;

const Flex = styled.div`
  flex: 1;
`;

const FlexHalf = styled.div`
  flex: 0.3;
`;
