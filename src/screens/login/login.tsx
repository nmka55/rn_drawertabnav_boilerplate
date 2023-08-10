import {Button, Colors, View} from 'react-native-ui-lib';
import {FormProvider, useForm} from 'react-hook-form';
import {Icons, RHFTextField} from '@app/components';

import React from 'react';
import {StyleSheet} from 'react-native';
import {UserDataType} from '../home/types';
import globalStyles from '@app/constants/globalStyles';
import {useDispatch} from 'react-redux';
import {userLogin} from '@app/redux/actions';

export default function Login(): JSX.Element {
  const form = useForm<UserDataType>();

  const dispatch = useDispatch();

  const onLoginPress = (formData: UserDataType) => {
    dispatch(userLogin(formData));
  };

  // #region Text Input Icons
  const usernameIcon = (
    <Icons
      iconSet="Ionicons"
      name="person-outline"
      color={Colors?.$iconPrimary}
      size={16}
      style={styles.inputLeftIcon}
    />
  );

  const passwordIcon = (
    <Icons
      iconSet="Ionicons"
      name="lock-closed-outline"
      color={Colors?.$iconPrimary}
      size={16}
      style={styles.inputLeftIcon}
    />
  );
  // #endregion

  return (
    <View style={styles?.containerBase}>
      <FormProvider {...form}>
        <RHFTextField
          name="username"
          placeholder="Username"
          rules={{required: 'Enter any username please!'}}
          leadingAccessory={usernameIcon}
        />
        <RHFTextField
          name="password"
          placeholder="Password"
          rules={{required: 'Enter any password please!'}}
          leadingAccessory={passwordIcon}
          secureTextEntry={true}
        />
      </FormProvider>

      <Button
        onPress={() => form?.handleSubmit(onLoginPress)()}
        label="Login"
      />
    </View>
  );
}

const styles: any = StyleSheet.flatten([
  globalStyles,
  StyleSheet.create({
    inputLeftIcon: {
      marginRight: 8,
    },
  }),
]);
