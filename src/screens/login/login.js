import {Button, Colors} from 'react-native-ui-lib';
import {FormProvider, useForm} from 'react-hook-form';
import {Icons, RHFTextField} from '@app/components';
import {StyleSheet, View} from 'react-native';

import React from 'react';
import globalStyles from '@app/constants/globalStyles';
import {useDispatch} from 'react-redux';
import {userLogin} from '@app/redux/actions';

export default function Login() {
  const form = useForm();

  const dispatch = useDispatch();

  const onLoginPress = formData => {
    console.log('VALIDATED !');
    dispatch(userLogin(formData));
  };

  const usernameIcon = (
    <Icons
      iconSet="Ionicons"
      name="person-outline"
      color={Colors?.primary}
      size={16}
      style={styles.inputLeftIcon}
    />
  );

  const passwordIcon = (
    <Icons
      iconSet="Ionicons"
      name="lock-closed-outline"
      color={Colors?.primary}
      size={16}
      style={styles.inputLeftIcon}
    />
  );

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
        fullWidth
        onPress={() => form?.handleSubmit(onLoginPress)()}
        label="Login"
      />
    </View>
  );
}

const styles = StyleSheet.flatten([
  globalStyles,
  {
    inputLeftIcon: {
      marginRight: 8,
    },
  },
]);
