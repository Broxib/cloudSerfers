import {
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";

import { useTheme } from "react-native-paper";
import Dimentions from "../Dimensions";
import { useState } from "react";

export default function Home() {
  // this is the theme for the app. the theme just contains the colors for the app
  const theme = useTheme();
  // this will be use to set the height and width of the views based on the device
  const dimen = Dimentions();
  const [temperature, setTemperature] = useState(20);

  const increaseTemperature = () => {
    setTemperature(temperature + 1);
  };

  const decreaseTemperature = () => {
    setTemperature(temperature - 1);
  };

  return (
    //SafeAreaView is used to make sure that the content is not hidden behind the notch of the device
    <SafeAreaView style={{ flex: 24, backgroundColor: theme.colors.primary }}>
      {/* the logo and and top blue part. It would take 4/24 of the hight of the screen exculding the bottom navigation*/}
      <View
        style={{ flex: 5, alignItems: "center", justifyContent: "flex-start" }}
      >
        {/* To set up the logo, screenshot of the design is used */}
        <Image
          source={require("../../assets/MainLogo.png")}
          style={{ flex: 5, aspectRatio: 9 / 5 }}
          resizeMode="contain"
        />
        {/* this emapty vies is used so the logo does not take up the whole top part. */}
        {/* Another purpose is so that the view that is in common both the top part and bottom part has enough space */}
      </View>
      {/* the second view, big white portion, which takes up 20/24 of the screen exculding the bottom navigation*/}
      <View
        style={{
          flex: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: theme.colors.primary,
        }}
      >
        {/* this is the view for the recent activity and the more link */}
        {/* the TouchableOpacity component is used for the more so that it's clickable*/}

        {/* this is the view for the list of recent activity, and the content is hard coded as you would see below */}
        {/* As of course notice, flex has been used all along, and the views of each recent event is give same flex hight(3/10) and margin is applied for them to get space around*/}

        <View
          style={{
            flex: 10,
            flexDirection: "column",
            padding: 10,
          }}
        >
          <View
            style={{
              flex: 3,
              flexDirection: "row",
              borderRadius: 10,
              padding: 10,
              borderRadius: 10,
              borderRadius: 10,
              borderWidth: 0.3,
              marginBottom: 10,
              borderColor: "rgba(0, 0, 0, 0.3)",
              backgroundColor: theme.colors.tertiary,
            }}
          >
            <Text
              style={{
                flex: 10,
                fontSize: 20,
                color: theme.colors.primary,
                fontWeight: "bold",
                alignSelf: "center",

                textAlign: "center",
              }}
            >
              Outside Temperature {"\n"}
              <Text
                style={{
                  alignContent: "center",
                  fontSize: 25,
                }}
              >
                {" "}
                25°C
              </Text>
            </Text>

            <Text
              style={{
                flex: 1,

                textAlign: "center",
                alignSelf: "center",
              }}
            ></Text>
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: "row",
              borderRadius: 10,
              padding: 10,
              borderRadius: 10,
              borderRadius: 10,
              borderWidth: 0.3,
              marginBottom: 10,
              borderColor: "rgba(0, 0, 0, 0.3)",
              backgroundColor: theme.colors.tertiary,
            }}
          >
            <Text
              style={{
                flex: 10,
                fontSize: 20,
                color: theme.colors.primary,
                fontWeight: "bold",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Inside Temperature {"\n"}
              <Text style={{ fontSize: 25 }}> 20°C</Text>
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                alignSelf: "center",
              }}
            ></Text>
          </View>

          <View
            style={{
              flex: 3,
              flexDirection: "row",
              borderRadius: 10,

              padding: 10,
              borderWidth: 0.3,
              marginBottom: 10,
              borderColor: "rgba(0, 0, 0, 0.3)",
              backgroundColor: theme.colors.tertiary,
            }}
          >
            <TouchableOpacity
              onPress={decreaseTemperature}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                -
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Adjust Desired Temperature
              </Text>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                {temperature}°C
              </Text>
            </View>
            <TouchableOpacity
              onPress={increaseTemperature}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
