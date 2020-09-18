import 'react-native-gesture-handler';
import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import BuildTraining from './screens/BuildTraining';
import ReadyTrainings from './screens/ReadyTrainings';
import FinishedTrainings from './screens/FinishedTrainings';
import Training from './screens/Training';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function TrainingsRouter() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Собранные тренировки">
      <Stack.Screen name="Собранные тренировки" component={ReadyTrainings} />
      <Stack.Screen name="Тренировка" component={Training} />
    </Stack.Navigator>
  );
}

export default class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Собрать тренировку" component={BuildTraining} />
          <Drawer.Screen name="Тренировки" component={TrainingsRouter} />
          <Drawer.Screen name="Законченные тренировки" component={FinishedTrainings} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
