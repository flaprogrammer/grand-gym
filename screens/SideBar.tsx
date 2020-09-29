import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Собрать тренировку", "Тренировки", "Законченные тренировки"];
const sidebarImage = require('../assets/images/sidebar-image.jpg');

export default class SideBar extends React.Component<any, any> {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={sidebarImage}
            style={{
              height: 100,
              width: '100%',
              resizeMode: 'cover',
              marginBottom: 10
            }}>
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  key={data}
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
