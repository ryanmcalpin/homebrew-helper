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
    let temp = ((tempF - 32) / 1.8).toFixed(1);
    temp.slice(-1) == "0" ? temp = temp.slice(0, -2) : null;
    temp == "NaN" && tempF.length > 1 ? temp = "oops" : null;
    tempF == "." || tempF == "-" || tempF == "-." ? temp = "" : null;
    this.setState({temp});
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TextInput
            style={{
              flex: 4,
              fontSize: 72,
              textAlign: 'center',
            }}
            keyboardType='numeric'
            onChangeText={(temp) => temp == '' ? this.setState({temp}) : this.calculate(temp)}
            />
          <Text
            style={{
              flex: 1,
              fontSize: 72,
              textAlign: 'center',
            }}>
            F
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={{
              backgroundColor: 'lightgrey',
              flex: 4,
              fontSize: 72,
              textAlign: 'center',
            }}>
            {this.state.temp}
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 72,
              textAlign: 'center',
            }}>
            C
          </Text>
        </View>
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
