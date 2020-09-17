import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Card, CardItem,
  ListItem, CheckBox, List
 } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component<any, any> {
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
            <List>
              <ListItem itemDivider>
                <Text>Грудь</Text>
              </ListItem>
              <ListItem>
                <CheckBox checked={true} />
                <Body>
                  <Text>Жим лежа</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={false} />
                <Body>
                  <Text>Жим на 45</Text>
                </Body>
              </ListItem>
              <ListItem itemDivider>
                <Text>Спина</Text>
              </ListItem>
              <ListItem>
                <CheckBox checked={true} />
                <Body>
                  <Text>Подтягивания</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={false} />
                <Body>
                  <Text>Подтягивания на гравитроне</Text>
                </Body>
              </ListItem>
            </List>
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