import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import {useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import * as SecureStore from 'expo-secure-store';
import {registerUser} from '../services';

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  agreed: boolean;
}
interface IRegistrationValidation {
  name: boolean;
  agreed: boolean;
}

const Register = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [mnemonic, setMnemonic] = useState<string>('');
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    agreed: false,
  });
  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  const handleSignUp = async () => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registration data */
      try {
        console.log('handleSignUp', registration);

        // returns _id
        const user = await registerUser(registration.name);

        await save('userId', user._id);

        setMnemonic(user.mnemonic);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  const getValueFor = async (key: string) => {
    const userId = await SecureStore.getItemAsync(key);

    if (userId) {
      alert('🔐 Wallet exists 🔐');
      navigation.navigate('Screens', {
        screen: 'Login',
      });
    }

    return null;
  };

  useEffect(() => {
    if (mnemonic?.length < 1) {
      getValueFor('userId');
    }
  }, [mnemonic]);

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
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('common.goBack')}
              </Text>
            </Button>

            <Text h4 center white marginBottom={sizes.md}>
              Create Wallet
            </Text>
          </Image>
        </Block>
        {/* register form */}
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
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
              <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[1, 0]}
                  start={[0, 1]}
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
              {/* form inputs */}

              {mnemonic?.length > 1 ? (
                <>
                  <Block paddingHorizontal={sizes.sm}>
                    <Text p center white marginBottom={sizes.sm}>
                      Please safely store the seed phrase below. This is the
                      only way to restore your wallet.
                    </Text>
                  </Block>

                  <Block paddingHorizontal={sizes.sm}>
                    <Input
                      value={mnemonic}
                      multiline={true}
                      numberOfLines={7}
                    />
                  </Block>
                  <Button
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}
                    gradient={gradients.primary}
                    onPress={() =>
                      navigation.navigate('Screens', {
                        screen: 'CreatePin',
                      })
                    }>
                    <Text bold white transform="uppercase">
                      Continue
                    </Text>
                  </Button>
                </>
              ) : (
                <>
                  <Block paddingHorizontal={sizes.sm}>
                    <Input
                      autoCapitalize="none"
                      marginBottom={sizes.m}
                      label={t('common.name')}
                      placeholder={t('common.namePlaceholder')}
                      success={Boolean(registration.name && isValid.name)}
                      danger={Boolean(registration.name && !isValid.name)}
                      onChangeText={(value) => handleChange({name: value})}
                    />
                  </Block>
                  {/* checkbox terms */}
                  <Block
                    row
                    flex={0}
                    align="center"
                    paddingHorizontal={sizes.sm}>
                    <Checkbox
                      marginRight={sizes.sm}
                      checked={registration?.agreed}
                      onPress={(value) => handleChange({agreed: value})}
                    />
                    <Text paddingRight={sizes.s}>
                      {t('common.agree')}
                      <Text
                        semibold
                        onPress={() => {
                          Linking.openURL('https://www.creative-tim.com/terms');
                        }}>
                        {t('common.terms')}
                      </Text>
                    </Text>
                  </Block>
                  <Button
                    onPress={handleSignUp}
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}
                    gradient={gradients.primary}
                    disabled={Object.values(isValid).includes(false)}>
                    <Text bold white transform="uppercase">
                      Create Wallet
                    </Text>
                  </Button>
                </>
              )}
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Register;
