import React from "react";
import { WebView } from "react-native-webview";
// Styles
import { Container, Title } from "./styles";

function Profile({ navigation }) {
  return (
    <WebView
      source={{
        uri: `https://github.com/${navigation.getParam("github_username")}`
      }}
      style={{ flex: 1 }}
    />
  );
}

export default Profile;
