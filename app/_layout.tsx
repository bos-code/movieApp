import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    Appearance.setColorScheme("dark");
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <QueryClientProvider client={queryClient}>
        <Stack.Screen name="(tabs)" />
      </QueryClientProvider>
    </Stack>
  );
}
