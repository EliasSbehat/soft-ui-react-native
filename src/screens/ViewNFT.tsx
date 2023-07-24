import React, {useEffect, useState} from 'react';

import dayjs from 'dayjs';
import {RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useTheme, useTranslation} from '../hooks';
import {Block, Button, Image, Text} from '../components';
import {getOneNFT} from '../services';

interface INFTRoute {
  route: RouteProp<{params: {address: string; token: string}}, 'params'>;
}

const ViewNFT = () => {
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

          <Block
            row
            flex={0}
            align="center"
            justify="space-between"
            marginVertical={sizes.sm}>
            <Block>
              <Text h4>{nft?.title}</Text>

              <Button
                gradient={gradients.primary}
                marginVertical={sizes.sm}
                onPress={() =>
                  navigation.navigate('Transfer', {
                    address: address,
                    token: token,
                  })
                }>
                <Text white semibold transform="uppercase">
                  Transfer
                </Text>
              </Button>

              <Text p>
                {dayjs(nft?.timeLastUpdated).format('MMM DD, YYYY')}
              </Text>

              <Text p marginVertical={sizes.sm}>
                {nft?.description}
              </Text>
            </Block>
          </Block>
        </Block>
      )}
    </>
  );
};

export default ViewNFT;
