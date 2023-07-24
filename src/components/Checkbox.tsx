import React, {useCallback, useState} from 'react';
import {Platform, Pressable} from 'react-native';

import * as Haptics from 'expo-haptics';

import {useTheme} from '../hooks/';
import Block from '../components/Block';
import Image from '../components/Image';
import {ICheckboxProps} from '../constants/types';

const Checkbox = ({
  onPress,
  haptic = true,
  id = 'Checkbox',
  radius = 10,
  disabled = false,
  checked = false,
  ...props
}: ICheckboxProps) => {
  const {colors, icons, sizes} = useTheme();
  const [_checked, setChecked] = useState(checked);

  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress?.(!_checked);
      setChecked(!_checked);

      /* haptic feedback onPress */
      if (haptic) {
        Haptics.selectionAsync();
      }
    }
  }, [_checked, haptic, setChecked, onPress]);

  // generate component testID or accessibilityLabel based on Platform.OS
  const checkboxID =
    Platform.OS === 'android' ? {accessibilityLabel: id} : {testID: id};

  return (
    <Pressable {...checkboxID} hitSlop={sizes.s} onPress={handlePress}>
      <Block
        flex={0}
        align="center"
        justify="center"
        gray={!checked}
        outlined={!checked}
        width={sizes.checkboxWidth}
        height={sizes.checkboxHeight}
        radius={radius}
        gradient={checked ? colors.checkbox : undefined}
        {...props}
      >
        {checked && (
          <Image
            source={icons.check}
            color={colors.checkboxIcon}
            width={sizes.checkboxIconWidth}
            height={sizes.checkboxIconHeight}
          />
        )}
      </Block>
    </Pressable>
  );
};

export default React.memo(Checkbox);
