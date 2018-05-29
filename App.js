import React from 'react';
import { Alert, Button, ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export class HomeScreen extends React.Component {

  _onPressButton() {
    Alert.alert('Okaaaaeee')
  }

  render(){

    return(
      <ScrollView style={{flex: 1, paddingTop: 20}}>
        <Button
          onPress={() => this.props.navigation.navigate('TempConversion')}
          title="F/C Conversion"
        />
        <Button
          onPress={() => this.props.navigation.navigate('AnotherOne')}
          title="Another One"
        />
      </ScrollView>
    );
  }
}

class TempConversionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>F/C Conversion</Text>
      </View>
    );
  }
}

class AnotherOneScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Another One!</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  TempConversion: TempConversionScreen,
  AnotherOne: AnotherOneScreen,
},
{
  initialRouteName: 'Home',
});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
