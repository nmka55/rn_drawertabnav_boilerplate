import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native-paper';
import {
  FormCheckbox,
  FormDateTimeField,
  FormRadioGroup,
  FormTextField,
} from '@app/components/form';
import { Screen } from '@app/components/layout/Screen';
import { AppButton } from '@app/components/ui';
import { useAppDispatch, useAppSelector } from '@app/store';
import {
  selectProfile,
  updateProfileAndPersist,
} from '@app/features/auth/authSlice';

type ProfileForm = {
  firstName: string;
  lastName: string;
  gender: 'm' | 'f';
  dateOfBirth?: Date;
  hasDriversLicense: boolean;
};
export function ProfileScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileForm>({
    defaultValues: {
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      gender: profile?.gender ?? 'm',
      dateOfBirth: profile?.dateOfBirth
        ? new Date(profile.dateOfBirth)
        : undefined,
      hasDriversLicense: profile?.hasDriversLicense ?? false,
    },
  });

  const saveProfile = async ({
    firstName,
    lastName,
    gender,
    dateOfBirth,
    hasDriversLicense,
  }: ProfileForm) => {
    setSaveMessage(null);

    try {
      await dispatch(
        updateProfileAndPersist({
          username: profile?.username ?? 'demo',
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          gender,
          ...(dateOfBirth ? { dateOfBirth: dateOfBirth.toISOString() } : {}),
          hasDriversLicense,
        }),
      ).unwrap();
      setSaveMessage('Profile saved. Your details will be restored next time.');
    } catch {
      setSaveMessage('Could not save your profile. Please try again.');
    }
  };

  return (
    <Screen scroll>
      <Text variant="headlineSmall">User details</Text>
      <FormTextField control={control} name="firstName" label="First name" />
      <FormTextField control={control} name="lastName" label="Last name" />
      <FormRadioGroup
        control={control}
        name="gender"
        label="Gender"
        options={[
          { label: 'Male', value: 'm' },
          { label: 'Female', value: 'f' },
        ]}
      />
      <FormDateTimeField
        control={control}
        name="dateOfBirth"
        label="Date of birth"
        mode="date"
      />
      <FormCheckbox
        control={control}
        name="hasDriversLicense"
        label="Has a driver's license"
      />
      <AppButton
        disabled={isSubmitting}
        loading={isSubmitting}
        onPress={() => handleSubmit(saveProfile)().catch(() => undefined)}
      >
        Save profile
      </AppButton>
      {saveMessage ? <Text variant="bodyMedium">{saveMessage}</Text> : null}
    </Screen>
  );
}
