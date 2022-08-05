import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, ShroomList, Text, Header } from "../../components"
import { color } from "../../theme"
import { AntDesign } from "@expo/vector-icons"
import moment from "moment"
import { useStores, ShroomModel } from "../../models"
import { process } from "./image-picker-util"
import * as ImagePicker from "expo-image-picker";
import TFLiteModule from "../../plugins/tflite-module"

const ROOT: ViewStyle = {
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
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: 20,
  textAlign: "left"
}
const SUBHEADER_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 14,
  paddingLeft: "2%",
  color: "#111111",
  textAlignVertical: "center",
  paddingTop: "1%",
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const GALLERY_BUTTON: ViewStyle = {
  position: "absolute",
  bottom: 90,
  right: 10,
  height: 60,
  width: 60,
  backgroundColor: "#2A93D5",
  borderRadius: 100,
  alignItems: "center",
  justifyContent: "center",
  elevation: 5
}
const CAMERA_BUTTON: ViewStyle = {
  position: "absolute",
  bottom: 15,
  right: 10,
  height: 60,
  width: 60,
  backgroundColor: "#2A93D5",
  borderRadius: 100,
  alignItems: "center",
  justifyContent: "center",
  elevation: 5
}
const LOADING: ViewStyle = {
  flex: 1,
  justifyContent: "center"
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { shroomStore } = useStores();

    const processImage = async (mode: "CAPTURE" | "PICK") => {
      const result = await process(mode);
      if (result === null) return;
      setIsLoading(true);

      const id = moment().format('YYYY-MM-DD-hh-mm-ss');
      const prediction = await TFLiteModule.predictAllFromImage(result.uri);

      // TODO: Copy the file to permanent directory
      // TODO: Use UUID?
      shroomStore.add(ShroomModel.create({
        id: id,
        name: id,
        day: prediction.day,
        contaminated: prediction.contaminated,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        uri: result.uri
      }));

      navigation.navigate("result", { id });
      setIsLoading(false);
    };

    useEffect(() => {
      (async() => {
        await ImagePicker.getCameraPermissionsAsync();
        await ImagePicker.getMediaLibraryPermissionsAsync();
      })();
    }, []);

    const loading = () => (
      <View style={LOADING}>
        <ActivityIndicator size="large" color="#2A93D5" />
      </View>
    );

    const content = () => (
      <View style={ROOT}>
        <Header style={HEADER} titleStyle={HEADER_TEXT} headerText="ShroomGrowth" />
        {shroomStore.shrooms.length !== 0 && (<Text style={SUBHEADER_TEXT}>Recently</Text>)}
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <ShroomList 
            data={shroomStore.sortByDate()}
            onItemPressed={(id) => navigation.navigate("result", {id})}
          />
        </Screen>
        <Pressable
          onPress={() => processImage("PICK")}
          style={GALLERY_BUTTON}
          android_ripple={{ color: "#37CAEC", radius: 30 }}
        >
          <AntDesign name="picture" size={24} color="white" />
        </Pressable>
        <Pressable
          onPress={() => processImage("CAPTURE")}
          style={CAMERA_BUTTON}
          android_ripple={{ color: "#37CAEC", radius: 30}}
        >
          <AntDesign name="camerao" size={24} color="white" />
        </Pressable>
      </View>
    )

    return (<View testID="DemoListScreen" style={ROOT}>{isLoading ? loading() : content()}</View>);
  },
)
