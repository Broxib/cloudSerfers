import { Dimensions } from "react-native";

let dimen = {};
// this function is used to get the dimensions of the screen of each device
// this is used to set the height and width of the views based on the device in other components
const updateDimen = () => {
  dimen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  };
};

updateDimen();

Dimensions.addEventListener("change", updateDimen);
//the dimensions are exported so that they can be used in other components
export default function getDimen() {
  return dimen;
}
