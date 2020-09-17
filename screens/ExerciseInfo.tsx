import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Card, CardItem,
  ListItem, CheckBox, List as NativeList
 } from 'native-base';
import { List } from 'immutable';
import { muscleGroups, Exercises, IExercise } from '../constants/exercises';

export default class ExerciseInfo extends React.Component<any, any> {

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
            <Title>Детали</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <Text>Детали</Text>
          </Card>
        </Content>
      </Container>
    );
  }
}
