import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogin } from "../../redux/actions";

function Login({ userInfo, userLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        placeholder="Username"
        style={{ marginTop: 20, width: "90%" }}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        style={{ marginTop: 20, width: "90%" }}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <Button
        onPress={() => {
          userLogin(username, password);
        }}
        title="Login"
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return { userInfo: state?.userInfo };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ userLogin }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
