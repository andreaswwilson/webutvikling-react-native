import 'react-native-gesture-handler';
import React from 'react';
import { Navigator } from './client/navigator';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
