import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useTheme} from '../hooks';
import {Block, Button, Checkbox, Image, Text} from '../components';
import * as SecureStore from 'expo-secure-store';
import {addPin} from '../services';

const isAndroid = Platform.OS === 'android';

const CreatePin = () => {
  const navigation = useNavigation();
  const [pin, setPinData] = useState<string>('');
  const [confirm, setConfirmData] = useState<string>('');
  const [checked, setChecked] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });

  const {assets, colors, gradients, sizes} = useTheme();

  async function getValueFor(key: string) {
    const userId = await SecureStore.getItemAsync(key);

    if (userId) {
      return userId;
    }

    return null;
  }

  const handleChange = (value: string) => {
    if (pin.length < 4) {
      setPinData(pin + value);

      switch (pin.length) {
        case 0:
          setChecked({
            first: true,
            second: false,
            third: false,
            fourth: false,
          });
          break;
        case 1:
          setChecked({
            first: true,
            second: true,
            third: false,
            fourth: false,
          });
          break;
        case 2:
          setChecked({
            first: true,
            second: true,
            third: true,
            fourth: false,
          });
          break;
        case 3:
          setChecked({
            first: true,
            second: true,
            third: true,
            fourth: true,
          });
          break;
      }
    }

    if (pin.length === 4 && confirm.length < 4) {
      setConfirmData(confirm + value);

      switch (confirm.length) {
        case 0:
          setChecked({
            first: true,
            second: false,
            third: false,
            fourth: false,
          });
          break;
        case 1:
          setChecked({
            first: true,
            second: true,
            third: false,
            fourth: false,
          });
          break;
        case 2:
          setChecked({
            first: true,
            second: true,
            third: true,
            fourth: false,
          });
          break;
        case 3:
          setChecked({
            first: true,
            second: true,
            third: true,
            fourth: true,
          });
          break;
      }
    }
  };

  const handleSignIn = async () => {
    const userId = await getValueFor('userId');

    if (pin.length === 4 && pin === confirm && userId) {
      try {
        await addPin(userId, pin);

        setPinData('');
        setConfirmData('');
        setChecked({
          first: false,
          second: false,
          third: false,
          fourth: false,
        });
        navigation.navigate('Screens', {
          screen: 'Login',
        });
      } catch (err) {
        setPinData('');
        setChecked({
          first: false,
          second: false,
          third: false,
          fourth: false,
        });
        console.log(err);
      }
    } else {
      setPinData('');
      setChecked({
        first: false,
        second: false,
        third: false,
        fourth: false,
      });
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      setTimeout(() => {
        setChecked({
          first: false,
          second: false,
          third: false,
          fourth: false,
        });
      }, 500);
    }
  }, [pin]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}} marginTop={sizes.md}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}>
            <Text h4 center white marginBottom={sizes.md}>
              Create Pin
            </Text>
          </Image>
        </Block>
        {/* login form */}
        <Block
          keyboard
          marginTop={-(sizes.height * 0.25 - sizes.l)}
          behavior={!isAndroid ? 'padding' : 'height'}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Block row center paddingVertical={sizes.s}>
                <Checkbox
                  disabled={true}
                  checked={checked.first}
                  radius={50}
                  margin={sizes.s}
                />
                <Checkbox
                  disabled={true}
                  checked={checked.second}
                  radius={50}
                  margin={sizes.s}
                />
                <Checkbox
                  disabled={true}
                  checked={checked.third}
                  radius={50}
                  margin={sizes.s}
                />
                <Checkbox
                  disabled={true}
                  checked={checked.fourth}
                  radius={50}
                  margin={sizes.s}
                />
              </Block>
              {/* login keypad */}
              <Block
                row
                center
                justify="space-evenly"
                marginVertical={sizes.sm}>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => handleChange('1')}>
                  <Text>1</Text>
                </Button>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => handleChange('2')}>
                  <Text>2</Text>
                </Button>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => handleChange('3')}>
                  <Text>3</Text>
                </Button>
              </Block>

              <Block
                row
                center
                justify="space-evenly"
                marginVertical={sizes.sm}>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => handleChange('4')}>
                  <Text>4</Text>
                </Button>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => handleChange('5')}>
                  <Text>5</Text>
                </Button>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => handleChange('6')}>
                  <Text>6</Text>
                </Button>
              </Block>

              <Block
                row
                center
                justify="space-evenly"
                marginVertical={sizes.sm}>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => handleChange('7')}>
                  <Text>7</Text>
                </Button>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => handleChange('8')}>
                  <Text>8</Text>
                </Button>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => handleChange('9')}>
                  <Text>9</Text>
                </Button>
              </Block>

              <Block
                row
                center
                justify="space-evenly"
                marginVertical={sizes.sm}>
                <Button
                  white
                  shadow={!isAndroid}
                  onPress={() => {
                    setPinData('');
                    setConfirmData('');
                    setChecked({
                      first: false,
                      second: false,
                      third: false,
                      fourth: false,
                    });
                  }}>
                  <Image source={assets.close} />
                </Button>
                <Button
                  outlined
                  gray
                  shadow={!isAndroid}
                  onPress={() => handleChange('0')}>
                  <Text>0</Text>
                </Button>
                <Button white shadow={!isAndroid} disabled>
                  <Image source={assets.arrow} />
                </Button>
              </Block>

              <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginTop={sizes.sm}
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[1, 0]}
                  start={[0, 1]}
                  gradient={gradients.divider}
                />
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[0, 1]}
                  start={[1, 0]}
                  gradient={gradients.divider}
                />
              </Block>

              <Button
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                onPress={handleSignIn}
                disabled={pin.length === 0 || pin !== confirm}>
                <Text bold white transform="uppercase">
                  Save Pin
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default CreatePin;
