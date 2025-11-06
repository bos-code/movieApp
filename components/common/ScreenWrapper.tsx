import { ReactNode } from "react";
import { ScreenContainer, ScreenContainer3 } from "./styles";

interface ScreenWrapperProps {
  children?: ReactNode;
}

function ScreenWrapper({ children }: ScreenWrapperProps) {
  return <ScreenContainer>{children}</ScreenContainer>;
}
export function ScreenWrapper3({ children }: ScreenWrapperProps) {
  return <ScreenContainer3>{children}</ScreenContainer3>;
}

export default ScreenWrapper;
