import { APP_TINT } from '@/constants/colors';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  AppBarBackButton,
  AppBarTitle,
  AppBarTitleAccent,
  AppBarWrapper,
} from './styles';

interface AppBarProps {
  title: string;
}

function AppBar({ title }: AppBarProps) {
  const router = useRouter();

  return (
    <AppBarWrapper>
      {router.canGoBack() ? (
        <AppBarBackButton onPress={router.back}>
          <Octicons name='chevron-left' size={40} color={APP_TINT} />
        </AppBarBackButton>
      ) : null}
      <AppBarTitle>
        {title}
        <AppBarTitleAccent>.</AppBarTitleAccent>
      </AppBarTitle>
    </AppBarWrapper>
  );
}

export default AppBar;
