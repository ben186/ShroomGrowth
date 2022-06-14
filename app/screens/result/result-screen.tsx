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
const IMAGE: ImageStyle = {
  marginTop: "2%",
  alignSelf: "center"
}
const RESULT: ViewStyle = {
  elevation: 2,
  height: 100,
  backgroundColor: "#ffffff",
  alignSelf: "center",
  marginTop: "2%",
  justifyContent: "center"
}
const RESULT_TEXT: TextStyle = {
  fontSize: 17,
  paddingLeft: "1%",
  color: "#111111"
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
              `Contaminated: ${shroom.contaminated ? "Yes" : "No"}\n` +
              `Day: ${shroom.day}\n` +
              `Phase: ${dayToPhase(shroom.day)}`
            }
          </Text>
        </View>
        <Button onPress={deleteItem} style={{...DELETE_BUTTON, width: width - 15}}>
          <Text>Delete</Text>
        </Button>
      </View>
    </Screen>
  )
})
