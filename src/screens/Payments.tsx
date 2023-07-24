import React from 'react';
import {useNavigation} from '@react-navigation/core';

import {useTheme} from '../hooks';
import {Block, Button, Text, Input} from '../components';

const Payments = () => {
  const navigation = useNavigation();
  const {gradients, sizes} = useTheme();

  return (
    <>
      <Block
        scroll
        padding={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.xxl}}>
        <Block card paddingVertical={sizes.sm} paddingHorizontal={sizes.sm}>
          <Input icon="hotel" label={'Your Address:'} disabled />

          <Input icon="hotel" label={'Amount To Send:'} marginTop={sizes.m} />
        </Block>

        <Block
          card
          paddingVertical={sizes.sm}
          paddingHorizontal={sizes.sm}
          marginTop={sizes.m}>
          <Input icon="hotel" label={'Receiving Address:'} />

          <Button gradient={gradients.primary} marginTop={sizes.m}>
            <Text white semibold transform="uppercase">
              Send Payment
            </Text>
          </Button>
        </Block>
      </Block>
    </>
  );
};

export default Payments;
