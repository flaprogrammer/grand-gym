import 'react-native-gesture-handler';
import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BuildTraining from './screens/BuildTraining';
import ReadyTrainings from './screens/ReadyTrainings';

const Navigator = createDrawerNavigator();

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
        <Navigator.Navigator>
          <Navigator.Screen name="Собрать тренировку" component={BuildTraining} />
          <Navigator.Screen name="Собранные тренировки" component={ReadyTrainings} />
        </Navigator.Navigator>
      </NavigationContainer>
    );
  }
}
