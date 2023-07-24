import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import Text from './Text';
import Block from './Block';
import Image from './Image';
import {useTheme, useTranslation} from '../hooks/';

const Article = ({nft, onPress}) => {
  const {t} = useTranslation();
  const {colors, gradients, icons, sizes} = useTheme();

  // render card for Newest & Fashion

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Block card padding={sizes.sm} marginTop={sizes.sm}>
        <Image
          height={sizes.height / 3}
          resizeMode="cover"
          source={{uri: nft?.media[0]?.gateway}}
        />
        <Text
          h5
          bold
          size={13}
          marginTop={sizes.s}
          transform="uppercase"
          marginLeft={sizes.xs}
          gradient={gradients.primary}
        >
          {nft?.title}
        </Text>
      </Block>
    </TouchableWithoutFeedback>
  );
};

export default Article;
