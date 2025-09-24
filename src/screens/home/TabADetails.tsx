import { Button, Text } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HomeTabAStackParamList } from '@app/navigators/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RHFTextInput } from '@app/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StoreRootState } from '@app/redux/store';
import { UserDataType } from '@app/screens/home/types';
import { createGlobalStyles } from '@app/constants';
import { useNavigation } from '@react-navigation/native';
import useTheme from '@app/constants/Theme';
import { userLogin } from '@app/redux/actions';

const TabADetails = (): React.JSX.Element => {
  const theme = useTheme();
  const GlobalStyles = useMemo(() => createGlobalStyles(theme), [theme]);

  const userData = useSelector(
    (state: StoreRootState) => state?.user?.userData ?? {},
  );

  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabAStackParamList>>();

  const form = useForm<UserDataType>({ defaultValues: userData });

  const onSavePress = (formData: UserDataType) => {
    dispatch(userLogin(formData));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={GlobalStyles.containerBase}>
      <Text>User Details</Text>
      <FormProvider {...form}>
        <RHFTextInput
          name="firstname"
          rules={{ required: 'Enter first name please!' }}
          inputProps={{ placeholder: 'First name' }}
        />
        <RHFTextInput
          name="lastname"
          rules={{ required: 'Enter last name please!' }}
          inputProps={{ placeholder: 'Last name' }}
        />
        {/* <RHFDatePicker
          name="dob"
          placeholder="Date of birth"
          label="Date of birth"
          rules={{ required: 'Enter dob please!' }}
        />
        <RHFPicker
          name="gender"
          placeholder="Gender"
          optionList={ConstantValues?.genderOptionList}
          labelProperty="label"
          rules={{ required: 'Select gender please!' }}
        />
        <RHFCheckbox name="hasDriversLicense" label="Has Drivers License" /> */}
      </FormProvider>
      <Button onPress={form.handleSubmit(onSavePress)} title="Save" />
    </SafeAreaView>
  );
};

export default TabADetails;
