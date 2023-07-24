import React from 'react';
import Block from './Block';
import Text from './Text';
import {useTheme, useTranslation} from '../hooks';
import Image from './Image';
import ETH from '../assets/images/eth.png';

const Transaction = ({to, from, value, asset, category}) => {
  const {t} = useTranslation();
  const {assets, colors, sizes} = useTheme();

  const isHorizontal = true;
  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;

  return (
    <Block
      card
      flex={0}
      row={isHorizontal}
      marginBottom={sizes.sm}
      width={isHorizontal ? CARD_WIDTH * 2 + sizes.sm : CARD_WIDTH}
    >
      <Block
        paddingTop={sizes.s}
        justify="space-between"
        paddingLeft={isHorizontal ? sizes.sm : 0}
        paddingBottom={isHorizontal ? sizes.s : 0}
      >
        <Text p marginBottom={sizes.s} color={colors.primary} bold>
          {value && value + ' ' + asset}
        </Text>

        <Block flex={0}>
          <Text
            p
            semibold
            color={colors.info}
            size={sizes.sm}
            marginRight={sizes.s}
            marginBottom={sizes.s}
          >
            Type: {category}
          </Text>
          <Text
            p
            color={colors.link}
            semibold
            size={sizes.sm}
            marginRight={sizes.s}
          >
            Address: 0x...{from?.slice(35)}
          </Text>
        </Block>
      </Block>
      {asset === 'ETH' && (
        <Image
          resizeMode="cover"
          source={ETH}
          style={{
            height: 75,
            width: 50,
          }}
        />
      )}
    </Block>
  );
};

export default Transaction;
