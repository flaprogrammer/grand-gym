import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Card, CardItem,
  ListItem, CheckBox, List as NativeList, Form, Item, Input, Label, View
 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { List } from 'immutable';
import { muscleGroups, Exercises, IExercise } from '../constants/exercises';
import SideBar from './SideBar';
import * as store from '../services/store';
import { ITraining } from '../constants/trainings';
import {Alert, StyleSheet} from "react-native";
import moment from "moment";


export default class Training extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      training: null,
      results: {},
      userWeight: null
    };
    this.onPageFocus = this.onPageFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.finishTraining = this.finishTraining.bind(this);
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.onPageFocus();
    });
  }

  async onPageFocus() {
    const training: ITraining | null = await store.getTrainingById(this.props.route.params.id);
    // @ts-ignore
    const results = training.results || {};
    // @ts-ignore
    const userWeight = training.userWeight || null;
    this.setState({ training, results, userWeight });
  }

  onChangeText(exerciseKey: string, index: number, field: string, value: string) {
    let results = Object.assign({}, this.state.results);
    results[exerciseKey] = results[exerciseKey] || [];
    results[exerciseKey][index] = results[exerciseKey][index] || {};
    results[exerciseKey][index][field] = value;
    this.setState({ results });
    store.saveTrainingResultsDebounced(this.state.training.id, results);
  }

  onChangeWeight(userWeight: string) {
    this.setState({ userWeight });
    store.saveTrainingUserWeight(this.state.training.id, userWeight);
  }

  async finishTraining() {
    Alert.alert(
      'Закончить тренировку?',
      '',
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
            await store.finishTraining(this.state.training.id);
            this.props.navigation.navigate('Законченные тренировки');
          }
        }
      ]
    );
  }

  render() {
    const training: ITraining = this.state.training;
    const results: any = this.state.results;
    return (
      <Container>
        <SideBar
          title={this.props.route.name}
          navigation={this.props.navigation}
        />
        <Content>
          <View style={styles.buttonContainer}>
            <Button onPress={() => this.props.navigation.navigate('Тренировки', {screen: 'Собранные тренировки'})}>
              <Text>Назад к списку тренировок</Text>
            </Button>
          </View>
          <Card style={styles.card}>
            <Form>
              <Item>
                <Label>Ваш вес</Label>
                <Input keyboardType="number-pad"
                       onChangeText={(value) => this.onChangeWeight(value)}
                       value={this.state.userWeight} />
              </Item>
            </Form>
          </Card>
          { !training ? null : training.exercises.map(exerciseKey => {
            const exercise = Exercises.find(e => e.key === exerciseKey);
            if (!exercise) return null;
            return (
              <Card key={exerciseKey} style={styles.card}>
                <View style={styles.exerciseTitle}>
                  <Text style={styles.exerciseTitleText}>{exercise.name}</Text>
                </View>
                <Form>
                  <Grid>
                    <Col>
                      <Item>
                        <Text>Вес</Text>
                      </Item>
                    </Col>
                    <Col>
                      <Item>
                        <Text>Повторений</Text>
                      </Item>
                    </Col>
                  </Grid>
                  {[0,1,2,3,4].map((item, index) => (
                    <Grid key={index}>
                      <Col>
                        <Item>
                          <Input keyboardType="number-pad"
                                 onChangeText={(value) => this.onChangeText(exerciseKey, index, 'weight', value)}
                                 value={results[exerciseKey] && results[exerciseKey][index] && results[exerciseKey][index].weight} />
                        </Item>
                      </Col>
                      <Col>
                        <Item>
                          <Input keyboardType="number-pad"
                                 onChangeText={(value) => this.onChangeText(exerciseKey, index, 'amount', value)}
                                 value={results[exerciseKey] && results[exerciseKey][index] && results[exerciseKey][index].amount} />
                        </Item>
                      </Col>
                    </Grid>
                  ))}
                </Form>
              </Card>
            )
          }) }
          <View style={styles.buttonContainer}>
            <Button onPress={this.finishTraining}>
              <Text>Закончить тренировку</Text>
            </Button>
          </View>
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
