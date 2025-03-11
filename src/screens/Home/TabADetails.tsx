import React from 'react';
import {Button, Text, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  RHFCheckbox,
  RHFDatePicker,
  RHFPicker,
  RHFTextField,
} from '@app/components';
import {StoreRootState} from '@app/redux/store';
import {HomeTabAStackParamList} from '@app/navigators/types';
import {UserDataType} from './types';
import {ConstantValues} from '@app/constants';
import {GlobalStyles} from '@app/constants';
import {userLogin} from '@app/redux/actions';

const TabADetails = (): React.JSX.Element => {
  const userData = useSelector(
    (state: StoreRootState) => state?.user?.userData ?? {},
  );

  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabAStackParamList>>();

  const form = useForm<UserDataType>({defaultValues: userData});

  const onSavePress = (formData: UserDataType) => {
    dispatch(userLogin(formData));
    navigation.goBack();
  };

  return (
    <View style={styles.containerBase}>
      <Text marginB-16>User Details</Text>
      <FormProvider {...form}>
        <RHFTextField
          name="firstname"
          placeholder="First name"
          rules={{required: 'Enter first name please!'}}
        />
        <RHFTextField
          name="lastname"
          placeholder="Last name"
          rules={{required: 'Enter last name please!'}}
        />
        <RHFDatePicker
          name="dob"
          placeholder="Date of birth"
          label="Date of birth"
          rules={{required: 'Enter dob please!'}}
        />
        <RHFPicker
          name="gender"
          placeholder="Gender"
          optionList={ConstantValues?.genderOptionList}
          labelProperty="label"
          rules={{required: 'Select gender please!'}}
        />
        <RHFCheckbox name="hasDriversLicense" label="Has Drivers License" />
      </FormProvider>
      <Button onPress={form.handleSubmit(onSavePress)} label="Save" />
    </View>
  );
};

const styles = StyleSheet.flatten([
  GlobalStyles,
  {
    containerBase: {
      padding: 16,
      flex: 1,
      justifyContent: 'center',
    },
  },
]) as StyleSheet.NamedStyles<any>;

export default TabADetails;
