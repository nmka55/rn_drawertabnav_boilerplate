import * as constants from "@app/constants";

import { Colors, DateTimePicker, Incubator } from "react-native-ui-lib";

import React from "react";
import { StyleSheet } from "react-native";
import globalStyles from "@app/constants/globalStyles";
import { useController } from "react-hook-form";

const { TextField } = Incubator;

export default (props) => {
  const { name, rules, defaultValue } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, rules, defaultValue });

  const hasError = Boolean(error);

  const styles = StyleSheet.flatten([globalStyles, {}]);

  return (
    <DateTimePicker
      {...props}
      //Date props
      is24Hour={true}
      locale="mn"
      dateFormat={constants.pickerDateFormat}
      timeFormat={constants.pickerTimeFormat}
      minimumDate={new Date(1970, 0)}
      //Dialog props
      headerStyle={{ backgroundColor: Colors.mainBg }}
      dialogProps={{
        containerStyle: { backgroundColor: "white" },
      }}
      themeVariant="light"
      textColor="white"
      //TextField props
      migrateTextField
      label={props?.label ?? props?.placeholder}
      labelColor="black"
      color="black"
      floatOnFocus={true}
      floatingPlaceholder={true}
      containerStyle={[styles.textFieldContainer, props?.containerStyle]}
      fieldStyle={[styles.textField, props?.fieldStyle]}
      enableErrors={hasError}
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={hasError ? error?.message : undefined}
      //Value props
      onChange={(date) => field.onChange(date?.toISOString() ?? null)}
      value={field.value ? new Date(field.value) : null}
    />
  );
};
