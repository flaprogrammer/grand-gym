import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Card, CardItem,
  ListItem, CheckBox, List as NativeList
 } from 'native-base';
import { List } from 'immutable';
import { muscleGroups, Exercises, IExercise } from '../constants/exercises';

export default class BuildTraining extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedExercises: List([])
    };
    this.onToggleExercise = this.onToggleExercise.bind(this);
  }

  onToggleExercise(exercise: IExercise) {
    const selectedExercises = this.state.selectedExercises;
    if (selectedExercises.includes(exercise.name)) {
      return this.setState({
        selectedExercises: selectedExercises.filter((e:string) => e !== exercise.name)
      });
    }
    this.setState({
      selectedExercises: selectedExercises.push(exercise.name)
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Собрать тренировку</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <NativeList>
              {Object.values(muscleGroups).map((muscleGroup, index) => (
                <React.Fragment key={index}>
                  <ListItem itemDivider>
                    <Text>{muscleGroup}</Text>
                  </ListItem>
                  {Exercises.filter(ex => ex.groups.includes(muscleGroup)).map((exercise, index) => (
                    <ListItem key={index}>
                      <CheckBox
                        checked={this.state.selectedExercises.includes(exercise.name)}
                        onPress={() => this.onToggleExercise(exercise)}
                      />
                      <Body>
                        <Text onPress={() => this.props.navigation.navigate('Детали')}>{exercise.name}</Text>
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
              <Text>Создать</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
