import 'react-native-gesture-handler';
import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BuildTraining from './screens/BuildTraining';
import ExerciseInfo from './screens/ExerciseInfo';

const Stack = createStackNavigator();

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
        <Container>
          <Stack.Navigator>
            <Stack.Screen name="Собрать тренировку" component={BuildTraining} />
            <Stack.Screen name="Детали" component={ExerciseInfo} />
          </Stack.Navigator>
        </Container>
      </NavigationContainer>
    );
  }
}
