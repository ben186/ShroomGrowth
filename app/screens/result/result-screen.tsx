import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Alert, ViewStyle, Image, View, ImageStyle, TextStyle, useWindowDimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, Screen, Text } from "../../components"
import { color } from "../../theme"
import { useStores } from "../../models"
import { dayToPhase } from "./phase-converter"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}
const HEADER: ViewStyle = {
  elevation: 5,
  backgroundColor: "#2A93D5",
  paddingTop: "3%",
  paddingBottom: "3%",
  paddingLeft: "2%"
}
const HEADER_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: "bold"
}
const CONTENT: ViewStyle = {
  flex: 1,
  justifyContent: "space-evenly"
}
const CONTAMINATION: ViewStyle = {
  elevation: 2,
  height: 50,
  alignSelf: "center",
  marginTop: "2%",
  justifyContent: "center",
  backgroundColor: "#ffffff"
}
const CONTAMINATION_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
  alignSelf: "center"
}
const IMAGE: ImageStyle = {
  marginTop: "2%",
  alignSelf: "center"
}
const RESULT: ViewStyle = {
  elevation: 2,
  height: 80,
  backgroundColor: "#ffffff",
  alignSelf: "center",
  marginTop: "2%",
  justifyContent: "center"
}
const RESULT_TEXT: TextStyle = {
  fontSize: 19,
  paddingLeft: "2%",
  color: "#111111"
}
const INFO_TEXT: TextStyle = {
  fontSize: 12,
  color: "#636363",
  marginTop: "0.5%",
  alignSelf: "center",
  textAlign: "justify",
  fontStyle: "italic"
}
const DELETE_BUTTON: ViewStyle = {
  marginTop: "auto", 
  marginBottom: "3%",
  backgroundColor: "#ff482b",
  alignSelf: "center"
}

export const ResultScreen: FC<StackScreenProps<NavigatorParamList, "result">> = observer(({ route, navigation }) => {
  const goBack = () => navigation.goBack();

  const { width } = useWindowDimensions();

  const { shroomStore } = useStores();
  const shroom = shroomStore.shrooms.find(item => item.id === route.params.id);

  if (shroom === undefined) return (<Text>This shouldn't show up in user side</Text>);

  // TODO: Delete the picture with provided uri
  const deleteItem = () => {
    Alert.alert(
      "Are you sure?", 
      "This item will be deleted.", 
      [
        {
          text: "Yes", 
          onPress: () => {
            shroomStore.remove(shroom);
            navigation.navigate("home");
          }
        }, 
        { text: "No" }
      ],
      { cancelable: true }
    );
  };

  const contaminationBgColor = shroom.contaminated ? "#ff482b" : "#348a21";

  return (
    <Screen style={ROOT} preset={"scroll"}>
      <Header 
        style={HEADER}
        titleStyle={HEADER_TEXT}
        leftIcon="back" 
        onLeftPress={goBack}
        headerText={shroom.id}
      />
      <View style={CONTENT}>
        <View style={{...CONTAMINATION, width: width - 15, backgroundColor: contaminationBgColor}}>
          <Text style={CONTAMINATION_TEXT}>
            {
              shroom.contaminated ? "CONTAMINATED" : "NOT CONTAMINATED"
            }
          </Text>
        </View>
        <Image 
          style={IMAGE}
          source={{
            height: width - 15,
            width: width - 15,
            uri: shroom.uri
          }}
        />
        <View style={{...RESULT, width: width - 15}}>
          <Text style={RESULT_TEXT}>
            {
              `Day: ${shroom.day}\n` +
              `Phase: ${dayToPhase(shroom.day)}`
            }
          </Text>
        </View>
        <Text style={{...INFO_TEXT, width: width - 15}}>
          ⓘ Prediction may not be accurate if the mushroom is contaminated
        </Text>
        <Button onPress={deleteItem} style={{...DELETE_BUTTON, width: width - 15}}>
          <Text>Delete</Text>
        </Button>
      </View>
    </Screen>
  )
})
