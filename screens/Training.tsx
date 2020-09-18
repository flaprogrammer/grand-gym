import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Card, CardItem,
  ListItem, CheckBox, List as NativeList, Form, Item, Input, Label
 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { List } from 'immutable';
import { debounce } from 'debounce';
import { muscleGroups, Exercises, IExercise } from '../constants/exercises';
import SideBar from './SideBar';
import * as store from '../services/store';
import { ITraining } from '../constants/trainings';


export default class Training extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      training: null,
      results: {}
    };
    this.onPageFocus = this.onPageFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
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
    this.setState({ training, results });
  }

  onChangeText(exerciseKey: string, index: number, field: string, value: string) {
    let results = Object.assign({}, this.state.results);
    results[exerciseKey] = results[exerciseKey] || [];
    results[exerciseKey][index] = results[exerciseKey][index] || {};
    results[exerciseKey][index][field] = value;
    this.setState({ results });
    debounce(store.saveTrainingResults, 5000)(this.state.training.id, results);
  }

  async finishTraining() {
    await store.finishTraining(this.state.training.id);
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
          <Card>
            <Button onPress={() => this.props.navigation.navigate('Тренировки', {screen: 'Собранные тренировки'})}>
              <Text>Назад к списку тренировок</Text>
            </Button>
          </Card>
          { !training ? null : training.exercises.map(exerciseKey => {
            const exercise = Exercises.find(e => e.key === exerciseKey);
            if (!exercise) return null;
            return (
              <Card key={exerciseKey}>
                <Text>{exercise.name}</Text>
                <Form>
                  {[0,1,2,3,4].map((item, index) => (
                    <Grid key={index}>
                      <Col>
                        <Item floatingLabel>
                          <Label>Вес</Label>
                          <Input keyboardType="number-pad"
                                 onChangeText={(value) => this.onChangeText(exerciseKey, index, 'weight', value)}
                                 value={results[exerciseKey] && results[exerciseKey][index] && results[exerciseKey][index].weight} />
                        </Item>
                      </Col>
                      <Col>
                        <Item floatingLabel>
                          <Label>Повторений</Label>
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
          <Card>
            <Button onPress={this.finishTraining}>
              <Text>Закончить тренировку</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}
