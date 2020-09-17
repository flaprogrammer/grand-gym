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


export default class BuildTraining extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedExercises: List([])
    };
    this.onToggleExercise = this.onToggleExercise.bind(this);
    this.buildTraining = this.buildTraining.bind(this);
  }

  async buildTraining() {
    const value = await AsyncStorage.getItem('readyTrainings');
    await AsyncStorage.setItem('readyTrainings', JSON.stringify([this.state.selectedExercises]));
    this.props.navigation.navigate('Собранные тренировки');
  }

  onToggleExercise(exercise: IExercise) {
    const selectedExercises = this.state.selectedExercises;
    if (selectedExercises.includes(exercise.key)) {
      return this.setState({
        selectedExercises: selectedExercises.filter((e:string) => e !== exercise.key)
      });
    }
    this.setState({
      selectedExercises: selectedExercises.push(exercise.key)
    });
  }

  render() {
    return (
      <Container>
        <SideBar
          title={this.props.route.name}
          navigation={this.props.navigation}
        />
        <Content>
          <Card>
            <NativeList>
              {Object.values(muscleGroups).map((muscleGroup, index) => (
                <React.Fragment key={index}>
                  <ListItem itemDivider>
                    <Text>{muscleGroup}</Text>
                  </ListItem>
                  {Exercises.filter(ex => ex.groups.includes(muscleGroup)).map(exercise => (
                    <ListItem key={exercise.key} onPress={() => this.onToggleExercise(exercise)}>
                      <CheckBox
                        onPress={() => this.onToggleExercise(exercise)}
                        checked={this.state.selectedExercises.includes(exercise.key)}
                      />
                      <Body>
                        <Text>{exercise.name}</Text>
                      </Body>
                    </ListItem>
                  ))}
                </React.Fragment>
              ))}
            </NativeList>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text onPress={this.buildTraining}>Создать</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
