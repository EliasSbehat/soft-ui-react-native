import React, {useEffect, useState} from 'react';

import {useTheme} from '../hooks';
import {Block, Loader} from '../components';
import {getTransfers} from '../services';
import {Transaction} from '../components/';

const Transactions = () => {
  const {sizes} = useTheme();
  const [loadFlag, setLoadFlag] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<any>(null);
  const [fetched, setFetched] = useState<boolean>(false);

  const fetchTransactions = async () => {
    try {
      const response = await getTransfers('socialblocks.eth');

      setTransactions(response.transfers);
    } catch (err) {
      console.log(err);
    }
    setFetched(true);
    setLoadFlag(false);
  };

  useEffect(() => {
    if (!fetched) {
      fetchTransactions();
    }
  }, [fetched]);

  return (
    <Block
      scroll
      paddingTop={sizes.sm}
      paddingHorizontal={sizes.padding}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: sizes.l}}>
      {loadFlag ? (
        <Loader />
      ) : (
        <Block row wrap="wrap" justify="space-between" marginTop={sizes.sm}>
          {transactions?.map((transaction: any) => {
            if (transaction?.uniqueId) {
              return (
                <Transaction {...transaction} key={transaction?.uniqueId} />
              );
            }

            return;
          })}
        </Block>
      )}
    </Block>
  );
};

export default Transactions;
