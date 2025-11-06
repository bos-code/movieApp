import { AppBar, ScreenWrapper } from "@/components/common";
import Latest from "@/components/MovieCard/Latest";
import Top from "@/components/MovieCard/Top";
import { BACKGROUND_COLOR } from "@/constants/colors";
import { ScrollView } from "react-native";

function HomeScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 50,
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      <ScreenWrapper>
        <AppBar title="Top Five" />

        <Top />
        <Latest />
      </ScreenWrapper>
    </ScrollView>
  );
}

export default HomeScreen;
