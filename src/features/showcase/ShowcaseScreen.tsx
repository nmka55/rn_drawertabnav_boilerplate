import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Card, Text, TextInput } from 'react-native-paper';
import {
  FormCheckbox,
  FormDateTimeField,
  FormMoneyInput,
  FormRadioGroup,
  FormSelect,
} from '@app/components/form';
import { Screen } from '@app/components/layout/Screen';
import { AppButton } from '@app/components/ui';
import {
  formatCurrency,
  formatIsoDate,
  formatRelativeTime,
} from '@app/lib/date';

type GalleryForm = {
  amount: string;
  currency: 'MNT' | 'USD';
  gender: 'm' | 'f';
  date?: Date;
  time?: Date;
  enabled: boolean;
};

const initialSampleDateTime = '2026-09-11T12:30:00.000Z';

type GallerySummary = {
  amount: number;
  currency: GalleryForm['currency'];
  dateTime: string;
};

function combineDateAndTime(date: Date, time: Date): Date {
  const selected = new Date(date);
  selected.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return selected;
}

/** A visible use case for each reusable control and utility. */
export function ShowcaseScreen(): React.JSX.Element {
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const [summary, setSummary] = useState<GallerySummary>({
    amount: 125000,
    currency: 'MNT',
    dateTime: initialSampleDateTime,
  });
  const { control, handleSubmit, clearErrors, setError } = useForm<GalleryForm>(
    {
      defaultValues: {
        amount: '125000',
        currency: 'MNT',
        gender: 'm',
        enabled: false,
      },
    },
  );

  const validateSampleForm = ({
    amount,
    currency,
    date,
    time,
  }: GalleryForm) => {
    clearErrors();
    setValidationMessage(null);

    if (!amount) {
      setError('amount', { message: 'Enter a money amount to validate.' });
    }

    if (!date) {
      setError('date', { message: 'Choose a date to validate this sample.' });
    }
    if (!time) {
      setError('time', { message: 'Choose a time to validate this sample.' });
    }

    if (amount && date && time) {
      setSummary({
        amount: Number(amount),
        currency,
        dateTime: combineDateAndTime(date, time).toISOString(),
      });
      setValidationMessage('Sample form is valid. Summary card updated.');
      return;
    }

    setValidationMessage(
      'Complete the money, date, and time fields to update the sample.',
    );
  };

  return (
    <Screen scroll>
      <View style={styles.content}>
        <Text variant="headlineSmall">Component gallery</Text>
        <Card>
          <Card.Content>
            <Text>
              Currency:{' '}
              {formatCurrency(
                summary.amount,
                summary.currency,
                summary.currency === 'USD' ? 'en-US' : 'mn-MN',
              )}
            </Text>
            <Text>Date: {formatIsoDate(summary.dateTime)}</Text>
            <Text>Relative: {formatRelativeTime(summary.dateTime)}</Text>
          </Card.Content>
        </Card>
        <FormSelect
          control={control}
          name="currency"
          label="Currency"
          options={[
            { label: 'Mongolian tögrög', value: 'MNT' },
            { label: 'US dollar', value: 'USD' },
          ]}
        />
        <FormMoneyInput
          control={control}
          name="amount"
          label="Money amount"
          left={<TextInput.Icon icon="cash" />}
        />
        <FormRadioGroup
          control={control}
          name="gender"
          label="Radio group"
          options={[
            { label: 'Male', value: 'm' },
            { label: 'Female', value: 'f' },
          ]}
        />
        <FormCheckbox control={control} name="enabled" label="Checkbox field" />
        <FormDateTimeField
          control={control}
          name="date"
          label="Date picker"
          mode="date"
        />
        <FormDateTimeField
          control={control}
          name="time"
          label="Time picker"
          mode="time"
        />
        <AppButton
          onPress={() =>
            handleSubmit(validateSampleForm)().catch(() => undefined)
          }
        >
          Validate sample form
        </AppButton>
        {validationMessage ? (
          <Text variant="bodyMedium">{validationMessage}</Text>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ content: { gap: 12 } });
