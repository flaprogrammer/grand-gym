import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Card, CardItem,
  ListItem, CheckBox, List as NativeList
 } from 'native-base';
import { List } from 'immutable';
import { muscleGroups, Exercises, IExercise } from '../constants/exercises';
import SideBar from './SideBar';
import AsyncStorage from '@react-native-community/async-storage';

export default class ReadyTrainings extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      trainings: List([])
    };
  }

  async componentDidMount() {
    const trainingsString: string | null = await AsyncStorage.getItem('readyTrainings');
    let trainings;
    if (trainingsString != null) {
      trainings = JSON.parse(trainingsString);
    }
    this.setState({ trainings });
  }


  render() {

    const { trainings } = this.state;
    return (
      <Container>
        <SideBar
          title={this.props.route.name}
          navigation={this.props.navigation}
        />
        <Content>
          <Card>
            <NativeList>
              {trainings.map((training: string, index: number) => (
                <ListItem key={index}>
                  <Body>
                    <Text>Первое</Text>
                  </Body>
                </ListItem>
              ))}
            </NativeList>
          </Card>
        </Content>
      </Container>
    );
  }
}
