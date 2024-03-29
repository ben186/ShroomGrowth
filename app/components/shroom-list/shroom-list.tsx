import * as React from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import { FlatList } from "react-native-gesture-handler"
import { Shroom } from "../../models"
import moment from "moment"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}
const CONTENT: ViewStyle = {
  elevation: 5
}
const ITEM: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  flexDirection: "row",
  paddingHorizontal: "2%",
  paddingVertical: "1.5%"
}
const INFO: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  flexDirection: "column",
  paddingHorizontal: "1%"
}
const PRIMARY_TEXT: TextStyle = {
  color: "#111111",
  fontSize: 16
}
const TEXT: TextStyle = {
  fontStyle: "italic",
  fontSize: 14,
  color: "#636363",
  marginLeft: "auto"
}
const IMAGE: ImageStyle = {
  borderRadius: 1
}

export interface ShroomListProps {
  style?: StyleProp<ViewStyle>;
  data: Shroom[];
  onItemPressed?: (id: string) => void;
}

// TODO: Implement refresh control if possible
export const ShroomList = observer((props: ShroomListProps) => {
  const { style } = props;
  const styles = Object.assign({}, CONTAINER, style);

  const shroomItem = ({ item }: { item: Shroom }) => (
    <Pressable
      onPress={() => {
        if (props.onItemPressed === undefined) return;
        props.onItemPressed(item.id);
      }}
      style={ITEM}
      android_ripple={{ color: "#c6c6c6"}}
    >
      <Image style={IMAGE} source={{ height: 50, width: 50, uri: item.uri }}/>
        <View style={INFO}>
          <Text style={PRIMARY_TEXT}>{item.name}</Text>
          <Text style={TEXT}>{moment.unix(item.createdAt / 1000).fromNow()}</Text>
        </View>
    </Pressable>
  )

  return (
    <View style={styles}>
      <FlatList
        contentContainerStyle={CONTENT}
        data={props.data}
        renderItem={shroomItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
})
