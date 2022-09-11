import {Button, Text, View} from 'react-native-ui-lib';

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useForm, FormProvider} from 'react-hook-form';
import {
  RHFTextInput,
  RHFCheckbox,
  RHFDatePicker,
  RHFPicker,
} from '@app/components';
import {userLogin} from '@app/redux/actions';
import {useNavigation} from '@react-navigation/native';

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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      }}>
      <Text marginB-16>User Details</Text>
      <FormProvider {...form}>
        <RHFTextInput
          name="firstname"
          placeholder="First name"
          rules={{required: 'Enter first name please!'}}
        />
        <RHFTextInput
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
