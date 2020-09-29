import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Card, CardItem,
  ListItem, CheckBox, List as NativeList
 } from 'native-base';
import { List } from 'immutable';
import { muscleGroups, Exercises, IExercise } from '../constants/exercises';
import HeaderBar from './HeaderBar';
import * as store from '../services/store';
import { ITraining } from '../constants/trainings';


export default class ReadyTrainings extends React.Component<any, any> {
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
    const trainings:ITraining[] = await store.getReadyTrainings();
    this.setState({ trainings });
  }

  async deleteTraining(id: string) {
    await store.deleteTraining(id);
    const trainings:ITraining[] = await store.getReadyTrainings();
    this.setState({ trainings });
  }

  render() {

    let trainings: ITraining[] = this.state.trainings;
    return (
      <Container>
        <HeaderBar
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
                  <Button onPress={() => this.props.navigation.navigate('Собрать тренировку')}>
                    <Text>Создать новую</Text>
                  </Button>
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
                      <Button onPress={() => this.props.navigation.navigate('Тренировки', {
                        screen: 'Тренировка',
                        params: { id: training.id }
                      })}>
                        <Text>Начать</Text>
                      </Button>
                    </Body>
                    <Right>
                      <Icon name="trash" onPress={() => this.deleteTraining(training.id)}/>
                    </Right>
                  </ListItem>
                </Card>
              ))}
            </NativeList>
        </Content>
      </Container>
    );
  }
}
