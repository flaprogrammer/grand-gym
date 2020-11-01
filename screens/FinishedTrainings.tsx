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
import HeaderBar from './HeaderBar';
import * as store from '../services/store';
import * as fileSystem from '../services/fileSystem';
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
    this.writeToFile = this.writeToFile.bind(this);
    this.readFromFile = this.readFromFile.bind(this);
  }

  async componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.onPageFocus();
    });
  }

  async onPageFocus() {
    const trainings:IFinishedTraining[] = await store.getFinishedTrainings(true);
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

  async writeToFile() {
    await fileSystem.exportFinishedTrainingsToFile();
  }

  async readFromFile() {
    await fileSystem.importFinishedTrainingsFromFile();
    await this.onPageFocus();
  }

  render() {

    let trainings: IFinishedTraining[] = this.state.trainings;
    return (
      <Container>
        <HeaderBar
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
            <View>
              <Card style={styles.buttonsCard}>
                <Button style={styles.button}>
                  <Text onPress={() => this.writeToFile()}>Экпортировать</Text>
                </Button>
                <Button style={styles.button}>
                  <Text onPress={() => this.readFromFile()}>Импортировать</Text>
                </Button>
              </Card>
              {trainings.map((training: IFinishedTraining) => {
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
            </View>
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonsCard: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    margin: 5
  },
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
