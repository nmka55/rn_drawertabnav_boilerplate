import React from "react";
import { connect } from "react-redux";
import { View, Button } from "react-native";
import { userLogout } from "../../redux/actions";
import { bindActionCreators } from "redux";

function TabA({ navigation, user, userLogout }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("TabADetails")}
        title={`Hello, ${user?.userData?.username}. Go to Tab A Details`}
      />
      <Button onPress={() => userLogout()} title={`Logout`} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return { user: state?.user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabA);
