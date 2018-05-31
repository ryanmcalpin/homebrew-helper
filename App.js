import React from 'react';
import { Alert, Button, ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';
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
  constructor(props) {
    super(props);
    this.state = {temp: ''};
  }

  calculate(tempF) {
    let temp = ((tempF - 32) / 1.8).toFixed(1)
    this.setState({temp})
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{
            backgroundColor: 'lightgrey',
            flex: 1,
            fontSize: 72,
            textAlign: 'center',
            width: 200,
          }}
          keyboardType='numeric'
          onChangeText={(temp) => temp == '' ? this.setState({temp}) : this.calculate(temp)}
        />
      <Text style={{
        flex: 1,
        fontSize: 72,
        textAlign: 'center',
        width: 200,
      }}>
        {this.state.temp}
      </Text>
      <View style={{ flex: 3 }}>
      </View>
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
  initialRouteName: 'TempConversion',
});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
