import {
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const ArrowIcon = () => {
  return <Icon name="ios-chevron-forward-outline" size={30} color="black" />;
};

import { useTheme } from "react-native-paper";
import Dimentions from "../Dimensions";

export default function Home() {
  // this is the theme for the app. the theme just contains the colors for the app
  const theme = useTheme();
  // this will be use to set the height and width of the views based on the device
  const dimen = Dimentions();

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
        <View style={{ flex: 3 }}></View>
      </View>
      {/* the second view, big white portion, which takes up 20/24 of the screen exculding the bottom navigation*/}
      <View
        style={{
          flex: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "white",
        }}
      >
        {/* this view is empty too, so that the view that is in common both the blue and white views has enough space to fit in*/}
        <View
          style={{
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
        {/* this the view for the two boxes that tells the money you owed and spent */}
        {/* As you would see, dimen variable is used as well as the theme */}
     
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
             Outside Temperature  {"\n"}
              <Text style={{ color: theme.colors.secondary, alignContent: "center",fontSize: 25,}}> 25°C</Text>
            </Text>

            <Text
              style={{
                flex: 1,

                textAlign: "center",
                alignSelf: "center",
              }}
            >
              <ArrowIcon />
            </Text>
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
              Inside Temperature  {"\n"}
              <Text style={{ color: theme.colors.secondary, fontSize: 25 }}> 20°C</Text>
            </Text>
            <Text
              style={{
                flex: 1,

                textAlign: "center",
                alignSelf: "center",
              }}
            >
              <ArrowIcon />
            </Text>
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
            }}
          >
            <Text
              style={{
                flex: 10,
                fontSize: 20,
                color: theme.colors.primary,
                fontWeight: "bold",
                alignSelf: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Desired Temperature {"\n\n"}
              <Text style={{ color: theme.colors.secondary, fontSize: 25 }}> 22°C</Text>
            </Text>
            <Text
              style={{
                flex: 1,

                textAlign: "center",
                alignSelf: "center",
              }}
            >
              <ArrowIcon />
            </Text>
          </View>
          <View
            style={{
              flex: 3,
            }}
          ></View>
        </View>
      </View>

      {/* // This is the view in the two main views */}
      {/* its postion is absolute, and the dimen variable is used to positon based on the screen size of the device */}
      <View
        style={{
          position: "absolute",
          borderRadius: 10,
          borderradiuswidth: 20,
          borderradiusheight: 20,
          shadowOpacity: 0.15,
          shadowOffset: { width: 3, height: 2 },
          backgroundColor: "white",
          marginTop: dimen.height * 0.15,
          marginLeft: dimen.width * 0.11,
          width: dimen.width * 0.78,
          height: dimen.height * 0.13,
        }}
      >
        <View style={{ flex: 3, flexDirection: "row" }}>
        
          <Text
            style={{
              flex: 2,
              fontSize: 30,
              color: theme.colors.primary,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Welcome back: {"\n"}
             Bldg 23 Room 202
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
