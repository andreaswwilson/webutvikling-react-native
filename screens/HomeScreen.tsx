import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import { StackParamList } from '../client/navigator';

type HomeScreenNavigationProps = StackNavigationProp<StackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = (
  props,
): JSX.Element => {
  const { navigation } = props;
  return <Text>sdgdsf</Text>;
};
