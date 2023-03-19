import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home/Home";
import ProfileScreen from "./Profile/Profile";
import ReceiptsScreen from "./Receipts/Receipts";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import Dimensions from "./Dimensions";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const theme = useTheme();
  const dimen = Dimensions();
  function MyTabBar({ state, descriptors, navigation }) {
    const [showModel, setShowModel] = React.useState(false);

    return (
      <View
        style={{
          flexDirection: "row",
          height: 90,
          elevation: 8,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.09)",
        }}
      >
        {/* state.routes array and the descriptors object to generate a mapping of the tabs in a React Native Navigation tab navigator.  */}

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          // this is the code that is used to check if the tab is focused or not
          const isFocused = state.index === index;
          const onPress = () => {
            // if the Home tab is focused, then the modal will be shown
            if (label === "Home" && isFocused) {
              setShowModel(!showModel);
            }
            // if the Home tab is not focused, then the modal will be hidden
            else {
              // this is the code that is used to navigate to the tab
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              // if the tab is not focused and the event is not prevented, then the tab will be navigated to
              if (!isFocused && !event.defaultPrevented) {
                setShowModel(false);
                navigation.navigate(route.name);
              }
            }
          };

          return (
            // this is the code that is used to render the tab
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Ionicons
                  name={
                    isFocused
                      ? route.name === "Home"
                        ? "ios-home"
                        : route.name === "Profile"
                        ? "ios-person"
                        : "ios-cog"
                      : route.name === "Home"
                      ? "ios-home-outline"
                      : route.name === "Profile"
                      ? "ios-person-outline"
                      : "ios-cog-outline" 
                  }
                  color={
                    isFocused ? theme.colors.primary : theme.colors.secondary
                  }
                  size={40}
                />
                <Text>{route.name}</Text>
              </View>

              {showModel && route.name === "Home" && (
                <View
                  style={{
                    backgroundColor: theme.colors.accent,

                    position: "absolute",
                    bottom: 100,
                    left: 0,
                    right: 0,
                    elevation: 8,
                    borderWidth: 0.3,
                    borderColor: "rgba(0, 0, 0, 0.3)",
                    width: dimen.width * 0.45,
                    height: dimen.height * 0.13,
                    borderRadius: 10,
                    backgroundColor: "white",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 10,
                      borderColor: "transparent",
                      borderTopColor: "black",
                      position: "absolute",
                      bottom: -18,
                      left: dimen.width * 0.225 - 18,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",

                      padding: 8,
                      borderBottomWidth: 0.3,
                      borderBottomColor: "rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <Ionicons
                      name="ios-add-outline"
                      size={dimen.height * 0.04}
                      color="black"
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        paddingLeft: 20,
                        paddingTop: 8,
                        color: theme.colors.secondary,
                      }}
                    >
                      Scan Receipt
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",

                      padding: 8,
                    }}
                  >
                    <Ionicons
                      name="ios-receipt-outline"
                      size={dimen.height * 0.04}
                      color="black"
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        paddingLeft: 20,
                        paddingTop: 8,
                        color: theme.colors.secondary,
                      }}
                    >
                      Join Receipt
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  return (
    // this is the code that is used to render the tab navigator
    <NavigationContainer>
      {/*  this is the code that is used to render the tab bar */}
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tab.Screen
          name="Control"
          component={ReceiptsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
