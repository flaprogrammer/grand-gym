import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Card, CardItem,
  ListItem, CheckBox, List as NativeList
 } from 'native-base';
import { List } from 'immutable';
import { muscleGroups, Exercises, IExercise } from '../constants/exercises';
import SideBar from './SideBar';
import * as store from '../services/store';
import { ITraining } from '../constants/trainings';


export default class FinishedTrainings extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      trainings: []
    };
  }

  async componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.onPageFocus();
    });
  }

  async onPageFocus() {
    const trainings:ITraining[] = await store.getFinishedTrainings();
    this.setState({ trainings });
  }

  render() {

    let trainings: ITraining[] = this.state.trainings;
    return (
      <Container>
        <SideBar
          title={this.props.route.name}
          navigation={this.props.navigation}
        />
        <Content>
            <NativeList>
              {!trainings || !trainings.length ? (
                <Card>
                  <Body>
                    <Text>Список тренировок пуст</Text>
                  </Body>
                </Card>
              ) :
              trainings.map((training: ITraining) => (
                <Card key={training.id}>
                  <ListItem>
                    <Body>
                      <Text>{training.exercises
                        .map((exKey) => Exercises.filter(e => e.key === exKey).map(e => e.name))
                        .join(', ')
                      }</Text>
                    </Body>
                  </ListItem>
                </Card>
              ))}
            </NativeList>
        </Content>
      </Container>
    );
  }
}
