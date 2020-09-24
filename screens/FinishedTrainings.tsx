import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Card, CardItem,
  ListItem, CheckBox, List as NativeList, View
 } from 'native-base';
import {Alert, StyleSheet} from "react-native";
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

    this.deleteTraining = this.deleteTraining.bind(this);
    this.onPageFocus = this.onPageFocus.bind(this);
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

  async deleteTraining(date: Date) {
    Alert.alert(
      'Удалить тренировку?',
      'Удалить тренировку с ' + moment(date).format('DD MMMM YYYY, HH:mm'),
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
            await store.deleteFinishedTraining(date);
            this.onPageFocus();
          }
        }
      ]
    );
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
                    <CardItem>
                      <Body>
                      <View>
                        <Text>{trainingDate}</Text>
                      </View>
                      <View>
                        {training.userWeight && <Text>{training.userWeight} кг</Text>}
                      </View>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Body>
                        {training.exercises.map((exKey, index) => {
                          const name = Exercises.filter(e => e.key === exKey).map(e => e.name);
                          // @ts-ignore
                          if (!training.results[exKey]) return null;
                          // @ts-ignore
                          const results = training.results[exKey].map(r => {
                            if (!r) return null;
                            return `${r.weight} x ${r.amount}`;
                          });
                          return (
                            <View key={index}>
                              <Text>{name}</Text>
                              <Text>{results.join(', ')}</Text>
                            </View>
                          )
                        })}
                      </Body>
                      <Right>
                        <Icon name="trash" onPress={() => this.deleteTraining(training.date)}/>
                      </Right>
                    </CardItem>
                  </Card>
                )
              })}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  exerciseTitle: {
    paddingLeft: 15,
    paddingBottom: 15,
  },
  exerciseTitleText: {
    fontWeight: 'bold'
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5
  }
});
