import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Card, CardItem,
  ListItem, CheckBox, List as NativeList, View
 } from 'native-base';
import { List } from 'immutable';
import moment from 'moment';
import { muscleGroups, Exercises, IExercise } from '../constants/exercises';
import SideBar from './SideBar';
import * as store from '../services/store';
import { IFinishedTraining } from '../constants/trainings';

moment.locale('ru');

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
    const trainings:IFinishedTraining[] = await store.getFinishedTrainings();
    this.setState({ trainings });
  }

  render() {

    let trainings: IFinishedTraining[] = this.state.trainings;
    return (
      <Container>
        <SideBar
          title={this.props.route.name}
          navigation={this.props.navigation}
        />
        <Content>
              {!trainings || !trainings.length ? (
                <Card>
                  <Body>
                    <Text>Список тренировок пуст</Text>
                  </Body>
                </Card>
              ) :
              trainings.map((training: IFinishedTraining) => {
                const trainingDate = moment(training.date).format('DD MMMM YYYY, HH:mm');
                return (
                  <Card key={training.id}>
                    <CardItem header>
                      <Text>{trainingDate}</Text>
                    </CardItem>
                    <CardItem>
                      <Body>
                        {training.exercises.map((exKey, index) => {
                          const name = Exercises.filter(e => e.key === exKey).map(e => e.name);
                          // @ts-ignore
                          if (!training.results[exKey]) return null;
                          // @ts-ignore
                          const results = training.results[exKey].map(r => `${r.weight} x ${r.amount}`);
                          return (
                            <View key={index}>
                              <Text>{name}</Text>
                              <Text>{results.join(', ')}</Text>
                            </View>
                          )
                        })}
                      </Body>
                    </CardItem>
                  </Card>
                )
              })}
        </Content>
      </Container>
    );
  }
}
