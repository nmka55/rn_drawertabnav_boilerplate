import { Incubator, Picker } from "react-native-ui-lib";

import React from "react";
import { StyleSheet } from "react-native";
import globalStyles from "@app/constants/globalStyles";
import { useController } from "react-hook-form";

const { TextField } = Incubator;

export default (props) => {
  const { name, rules, defaultValue, optionList = [] } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, rules, defaultValue });

  const hasError = Boolean(error);

  const styles = StyleSheet.flatten([globalStyles, {}]);

  const RenderOptions = () => {
    const labelProperty = props?.labelProperty ?? "id";

    return optionList?.map((item, index) => {
      return (
        <Picker.Item key={index} value={item?.id} label={item[labelProperty]} />
      );
    });
  };

  return (
    <Picker
      {...props}
      //Picker props
      mode="SINGLE"
      topBarProps={{ title: props?.placeholder }}
      // TextField props
      migrateTextField
      floatOnFocus={true}
      floatingPlaceholder={true}
      label={props?.label ?? props?.placeholder}
      labelColor="black"
      color="black"
      enableErrors={hasError}
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={hasError ? error?.message : undefined}
      containerStyle={[styles.textFieldContainer, props?.containerStyle]}
      fieldStyle={[styles.textField, props?.fieldStyle]}
      //Value props
      onChange={(item) => field.onChange(item?.value)}
      value={field.value}
      defaultValue={field.value}
    >
      {RenderOptions()}
    </Picker>
  );
};
