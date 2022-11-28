import {Button, Text, View} from 'react-native-ui-lib';
import {FormProvider, useForm} from 'react-hook-form';
import {
  RHFCheckbox,
  RHFDatePicker,
  RHFPicker,
  RHFTextField,
} from '@app/components';
import {useDispatch, useSelector} from 'react-redux';

import React from 'react';
import {StyleSheet} from 'react-native';
import globalStyles from '@app/constants/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {userLogin} from '@app/redux/actions';

const genderOptionList = [
  {id: 'm', label: 'Male'},
  {id: 'f', label: 'Female'},
];
export default function TabADetails() {
  const userData = useSelector(state => state?.user?.userData ?? {});
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const form = useForm({
    defaultValues: userData,
  });

  const onSavePress = formData => {
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
          optionList={genderOptionList}
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
