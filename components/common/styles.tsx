import styled from "styled-components/native";

import { APP_TINT, BACKGROUND_COLOR } from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export const ScreenContainer = styled(SafeAreaView)`
  background-color: ${BACKGROUND_COLOR};
  padding: 16px;
  flex: 1;
  padding-bottom: 50;
`;
export const ScreenContainer3 = styled(SafeAreaView)`
  background-color: ${BACKGROUND_COLOR};
  flex: 1;
  padding: 15px;
  paddind-bottom: 0;
`;

// AppBar Components
export const AppBarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AppBarTitle = styled.Text`
  font-family: "Poppins_700Bold";
  font-size: 30px;
  color: #fff;
`;

export const AppBarTitleAccent = styled(AppBarTitle)`
  color: ${APP_TINT};
`;

export const AppBarBackButton = styled.TouchableOpacity`
  padding: 5px;
  margin-right: 10px;
`;
