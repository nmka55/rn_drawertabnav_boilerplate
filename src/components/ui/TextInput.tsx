import React, { useMemo } from 'react';
import { TextInput, View } from 'react-native';

import { Text } from 'react-native-gesture-handler';
import { TextFieldProps } from '@components/ui/types';
import { createGlobalStyles } from '@app/constants/GlobalStyles';
import { useController } from 'react-hook-form';
import useTheme from '@app/constants/Theme';

const CustomTextField = ({
  name,
  rules,
  defaultValue,
  leadingAccessory,
  trailingAccessory,
  containerStyle = {},
  inputStyle = {},
  inputProps = {},
}: TextFieldProps): React.JSX.Element => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, rules, defaultValue });

  const theme = useTheme();
  const GlobalStyles = useMemo(() => createGlobalStyles(theme), [theme]);

  const hasError = Boolean(error);

  return (
    <View style={[GlobalStyles.textInputContainer, containerStyle]}>
      <View
        style={[
          GlobalStyles?.textInputRow,
          hasError ? GlobalStyles.textInputRowWithError : null,
        ]}
      >
        {leadingAccessory}

        <TextInput
          style={[GlobalStyles?.textInput, inputStyle]}
          value={value ?? ''}
          onChangeText={onChange}
          onBlur={onBlur}
          {...inputProps}
        />

        {trailingAccessory}
      </View>

      <Text style={GlobalStyles?.fieldError}>{error ? error.message : ''}</Text>
    </View>
  );
};

export default CustomTextField;
