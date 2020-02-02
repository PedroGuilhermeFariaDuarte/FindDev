import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Pages
import Main from "../pages/Main";
import Profile from "../pages/Profile";

export default createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: "DevRadar"
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: "Perfil GitHub"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#7159c1"
        }
      },
      initialRouteName: "Main"
    }
  )
);
