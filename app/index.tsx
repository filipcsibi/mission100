import { SearchFill } from "@/assets/svgs";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>taleasdantu tau</Text>
      <SearchFill width={10} height={10} />
    </View>
  );
}
