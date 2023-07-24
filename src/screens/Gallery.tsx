import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {FlatList} from 'react-native';

import {useData, useTheme} from '../hooks/';
import {Block, Button, Text} from '../components/';
import {NFT} from '../components/';
import {getAllNFTs, getNewNFTs} from '../services';
import {ICategory} from '../constants/types';

const Gallery = () => {
  const data = useData();
  const navigation = useNavigation();
  const [selected, setSelected] = useState<ICategory>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const {colors, gradients, sizes} = useTheme();
  const [fetched, setFetched] = useState<boolean>(false);
  const [newest, setNewest] = useState<boolean>(true);
  const [tokens, setTokens] = useState([]);

  const fetchNewTokens = async () => {
    try {
      const response = await getNewNFTs('socialblocks.eth');

      setTokens(response);
    } catch (err) {
      console.log(err);
    }
    setFetched(true);
  };

  const fetchCollection = async () => {
    try {
      const response = await getAllNFTs('socialblocks.eth');

      setTokens(response);
    } catch (err) {
      console.log(err);
    }
    setFetched(true);
  };

  // init articles
  useEffect(() => {
    if (!fetched && newest) {
      fetchNewTokens();
    } else if (!fetched && !newest) {
      fetchCollection();
    }
  }, [fetched, newest]);

  // init articles
  useEffect(() => {
    setCategories(data?.categories);
    setSelected(data?.categories[0]);
  }, [data.articles, data.categories]);

  useEffect(() => {
    if (selected?.name === 'Collection') {
      setFetched(false);
      setNewest(false);
    } else {
      setFetched(false);
      setNewest(true);
    }
  }, [selected]);

  return (
    <Block>
      {/* categories list */}
      <Block color={colors.card} row flex={0} paddingVertical={sizes.padding}>
        <Block
          scroll
          horizontal
          renderToHardwareTextureAndroid
          showsHorizontalScrollIndicator={false}
          contentOffset={{x: -sizes.padding, y: 0}}>
          {categories?.map((category) => {
            const isSelected = category?.id === selected?.id;
            return (
              <Button
                radius={sizes.m}
                marginHorizontal={sizes.s}
                key={`category-${category?.id}}`}
                onPress={() => setSelected(category)}
                gradient={gradients?.[isSelected ? 'primary' : 'light']}>
                <Text
                  p
                  bold={isSelected}
                  white={isSelected}
                  black={!isSelected}
                  transform="capitalize"
                  marginHorizontal={sizes.m}>
                  {category?.name}
                </Text>
              </Button>
            );
          })}
        </Block>
      </Block>

      {tokens[0] && (
        <FlatList
          data={tokens}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item?.contract?.address}
          style={{paddingHorizontal: sizes.padding}}
          contentContainerStyle={{paddingBottom: sizes.l}}
          renderItem={({item}) => (
            <NFT
              nft={item}
              onPress={() =>
                navigation.navigate('ViewNFT', {
                  address: item?.contract?.address,
                  token: item?.tokenId,
                })
              }
            />
          )}
        />
      )}
    </Block>
  );
};

export default Gallery;
