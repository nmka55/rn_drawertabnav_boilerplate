import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Button} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import {userLogin} from '@app/redux/actions';
import {useForm, FormProvider} from 'react-hook-form';
import {Icons, RHFTextInput} from '@app/components';
import globalStyles from '@app/constants/globalStyles';

export default function Login() {
  const form = useForm({});

  const dispatch = useDispatch();

  const onLoginPress = formData => {
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      }}>
      <FormProvider {...form}>
        <RHFTextInput
          name="username"
          placeholder="Username"
          rules={{required: 'Enter username please!'}}
          leadingAccessory={usernameIcon}
        />
        <RHFTextInput
          name="password"
          placeholder="Password"
          rules={{required: 'Enter password please!'}}
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
