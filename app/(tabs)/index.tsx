import { AppBar, ScreenWrapper } from "@/components/common";
import Latest from "@/components/MovieCard/Latest";
import { BecauseYouSaved, HiddenGems, TopRated } from "@/components/MovieCard/ForYouRows";
import Top from "@/components/MovieCard/Top";
import { APP_TINT, BACKGROUND_COLOR } from "@/constants/colors";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";

function HomeScreen() {
  const router = useRouter();
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

        <Pressable
          onPress={() => router.push("/pick")}
          style={{
            backgroundColor: APP_TINT,
            borderRadius: 12,
            padding: 14,
            marginTop: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: BACKGROUND_COLOR, fontWeight: "700", fontSize: 16 }}>
            🎲 Can&apos;t decide? Pick for tonight
          </Text>
        </Pressable>

        <Top />
        <BecauseYouSaved />
        <Latest />
        <TopRated />
        <HiddenGems />
      </ScreenWrapper>
    </ScrollView>
  );
}

export default HomeScreen;
