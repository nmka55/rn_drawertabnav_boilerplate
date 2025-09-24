import { FormProvider, useForm } from 'react-hook-form';
import { Icons, RHFTextInput } from '@app/components';
import React, { useMemo } from 'react';

import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { UserDataType } from '@app/screens/home/types';
import { createGlobalStyles } from '@app/constants';
import { useDispatch } from 'react-redux';
import useTheme from '@app/constants/Theme';
import { userLogin } from '@app/redux/actions';

const Login = (): React.JSX.Element => {
  const theme = useTheme();
  const GlobalStyles = useMemo(() => createGlobalStyles(theme), [theme]);

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
        size={16}
        style={styles.inputLeftIcon}
      />
    ),
    password: (
      <Icons
        iconSet="Ionicons"
        name="lock-closed-outline"
        size={16}
        style={styles.inputLeftIcon}
      />
    ),
  };

  return (
    <SafeAreaView style={GlobalStyles?.containerBase}>
      <FormProvider {...form}>
        <RHFTextInput
          name="username"
          rules={{ required: 'Enter any username please!' }}
          leadingAccessory={icons.username}
          inputProps={{
            placeholder: 'username',
          }}
        />
        <RHFTextInput
          name="password"
          rules={{ required: 'Enter any password please!' }}
          leadingAccessory={icons.password}
          inputProps={{
            placeholder: 'password',
            secureTextEntry: true,
          }}
        />
      </FormProvider>

      <Button onPress={form.handleSubmit(onLoginPress)} title="Login" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputLeftIcon: {
    marginRight: 8,
  },
});

export default Login;
