import React, {useCallback, useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/core';

import {useTheme} from '../hooks';
import {Block, Button, Image, Text, Input} from '../components';
import {getOneNFT} from '../services';

interface INFTRoute {
  route: RouteProp<{params: {address: string; token: string}}, 'params'>;
}

const Transfer = () => {
  const navigation = useNavigation();
  const {gradients, sizes} = useTheme();
  const {params} = useRoute<INFTRoute['route']>();
  const [fetched, setFetched] = useState<boolean>(false);
  const [nft, setNFT] = useState<any>({});
  const {address, token} = params;

  const fetchToken = async () => {
    const response = await getOneNFT(address, token);

    setNFT(response);
    setFetched(true);
  };

  useEffect(() => {
    if (!fetched) {
      fetchToken();
    }
  }, [fetched]);

  return (
    <>
      {nft?.contract && address && (
        <Block
          scroll
          padding={sizes.padding}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: sizes.xxl}}>
          <Image source={{uri: nft?.media[0]?.gateway}} height={260} />

          <Block row marginVertical={sizes.sm}>
            <Block row>
              <Block marginLeft={sizes.s}>
                <Text h4>{nft?.title || '-'}</Text>
              </Block>
            </Block>
          </Block>

          <Block card paddingVertical={sizes.sm} paddingHorizontal={sizes.sm}>
            <Input icon="hotel" label={'Receiving Address:'} />

            <Button gradient={gradients.primary} marginTop={sizes.m}>
              <Text white semibold transform="uppercase">
                Transfer NFT
              </Text>
            </Button>
          </Block>
        </Block>
      )}
    </>
  );
};

export default Transfer;
