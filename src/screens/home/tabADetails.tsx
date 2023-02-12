import {Button, Text, View} from 'react-native-ui-lib';
import {FormProvider, useForm} from 'react-hook-form';
import {
  RHFCheckbox,
  RHFDatePicker,
  RHFPicker,
  RHFTextField,
} from '@app/components';
import {useDispatch, useSelector} from 'react-redux';

import {HomeTabAStackParamList} from '@app/navigators/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StoreRootState} from '@app/redux/store';
import {StyleSheet} from 'react-native';
import {UserDataType} from './types';
import {constantValues} from '@app/constants';
import globalStyles from '@app/constants/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {userLogin} from '@app/redux/actions';

export default function TabADetails(): JSX.Element {
  const userData = useSelector(
    (state: StoreRootState) => state?.user?.userData ?? {},
  );

  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabAStackParamList>>();

  const form = useForm<UserDataType>({
    defaultValues: userData,
  });

  const onSavePress = (formData: UserDataType) => {
    dispatch(userLogin(formData));
    navigation?.goBack();
  };

  return (
    <View style={styles?.containerBase}>
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
          optionList={constantValues?.genderOptionList}
          labelProperty="label"
          rules={{required: 'Select gender please!'}}
        />
        <RHFCheckbox name="hasDriversLicense" label="Has Drivers License" />
      </FormProvider>

      <Button
        fullWidth
        onPress={() => form?.handleSubmit(onSavePress)()}
        label="Save"
      />
    </View>
  );
}

const styles = StyleSheet.flatten([globalStyles, {}]);
