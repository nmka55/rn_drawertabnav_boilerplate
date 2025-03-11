import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Colors, View} from 'react-native-ui-lib';
import {FormProvider, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Icons, RHFTextField} from '@app/components';
import {GlobalStyles} from '@app/constants';
import {UserDataType} from '@app/screens/Home/types';
import {userLogin} from '@app/redux/actions';

const Login = (): React.JSX.Element => {
  const form = useForm<UserDataType>();
  const dispatch = useDispatch();

  const onLoginPress = (formData: UserDataType) => {
    dispatch(userLogin(formData));
  };

  const icons = {
    username: (
      <Icons
        iconSet="Ionicons"
        name="person-outline"
        color={Colors.$iconPrimary}
        size={16}
        style={styles.inputLeftIcon}
      />
    ),
    password: (
      <Icons
        iconSet="Ionicons"
        name="lock-closed-outline"
        color={Colors.$iconPrimary}
        size={16}
        style={styles.inputLeftIcon}
      />
    ),
  };

  return (
    <View style={styles.containerBase}>
      <FormProvider {...form}>
        <RHFTextField
          name="username"
          placeholder="Username"
          rules={{required: 'Enter any username please!'}}
          leadingAccessory={icons.username}
        />
        <RHFTextField
          name="password"
          placeholder="Password"
          rules={{required: 'Enter any password please!'}}
          leadingAccessory={icons.password}
          secureTextEntry
        />
      </FormProvider>

      <Button onPress={form.handleSubmit(onLoginPress)} label="Login" />
    </View>
  );
};

const styles = StyleSheet.flatten([
  GlobalStyles,
  StyleSheet.create({
    inputLeftIcon: {
      marginRight: 8,
    },
  }),
]) as StyleSheet.NamedStyles<any>;

export default Login;
