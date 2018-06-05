import React from 'react';
import { Alert, Button, ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// Temp Conversion
var memoryTempC = "";
var memoryTempF = "";

// ABV Calculator
var memoryOG = "1.052";
var memorySG = "1.01";
var memoryABV = "5.51";

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Homebrew Helper'
  }

  render(){
    return(
      <ScrollView style={{flex: 1, paddingTop: 20}}>
        <Button
          onPress={() => this.props.navigation.navigate('TempConverter')}
          title="F/C Converter"
        ></Button>
        <Button
          onPress={() => this.props.navigation.navigate('ABVCalculator')}
          title="ABV Calculator"
        ></Button>
      </ScrollView>
    );
  }
}

class TempConverterScreen extends React.Component {
  static navigationOptions = {
    title: 'F/C Conversion'
  }

  constructor(props) {
    super(props);
    this.state = {
      tempC: memoryTempC,
      tempF: memoryTempF,
    };
  }

  calculate(tempInput, f2C) {
    if(tempInput == "") {
      let tempC = "";
      let tempF = "";
      this.setState({tempC})
      this.setState({tempF});
      memoryTempC = "";
      memoryTempF = "";
      return;
    }
    let tempOutput;
    f2C ? tempOutput = ((tempInput - 32) / 1.8).toFixed(1) : tempOutput = (tempInput * 1.8 + 32).toFixed(1);
    tempOutput.slice(-1) == "0" ? tempOutput = tempOutput.slice(0, -2) : null;
    tempOutput == "NaN" && tempInput.length > 1 ? tempOutput = "oops!" : null;
    tempInput == "." || tempInput == "-" || tempInput == "-." ? tempOutput= "" : null;
    if(f2C) {
      let tempC = tempOutput;
      this.setState({tempC});
      memoryTempC = tempOutput;
      memoryTempF = tempInput;
    } else {
      let tempF = tempOutput;
      this.setState({tempF});
      memoryTempC = tempInput;
      memoryTempF = tempOutput;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TextInput
            style={{
              flex: 6,
              fontSize: 72,
              textAlign: 'center',
            }}
            defaultValue={this.state.tempF}
            keyboardType='numeric'
            maxLength={5}
            onChangeText={(tempF) => this.calculate(tempF, true)}
            />
          <Text
            style={{
              flex: 2,
              fontSize: 72,
              textAlign: 'center',
            }}>
            &#176;F
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TextInput style={{
              backgroundColor: 'lightgrey',
              flex: 6,
              fontSize: 72,
              textAlign: 'center',
            }}
            defaultValue={this.state.tempC}
            keyboardType='numeric'
            maxLength={5}
            onChangeText={(tempC) => this.calculate(tempC, false)}
          />
          <Text
            style={{
              flex: 2,
              fontSize: 72,
              textAlign: 'center',
            }}>
            &#176;C
          </Text>
        </View>
      <View style={{ flex: 3 }}>
      </View>
      </View>
    );
  }
}

class ABVCalculatorScreen extends React.Component {
  static navigationOptions = {
    title: 'ABV Calculator'
  }

  constructor(props) {
    super(props);
    this.state = {abv: memoryABV};
  }

  calculate() {
    let abv = ((memoryOG - memorySG) * 131.25).toFixed(2);
    this.setState({abv});
    memoryABV = abv;
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text
            style={{
              flex: 3,
              fontSize: 60,
              textAlign: 'center',
            }}>
            OG:
          </Text>
          <TextInput
            style={{
              flex: 6,
              fontSize: 60,
              textAlign: 'center',
            }}
            defaultValue={memoryOG}
            keyboardType='numeric'
            maxLength={5}
            onChangeText={(og) => { memoryOG = og; this.calculate() }}
            />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text
            style={{
              flex: 3,
              fontSize: 60,
              textAlign: 'center',
            }}>
            SG:
          </Text>
          <TextInput
            style={{
              flex: 6,
              fontSize: 60,
              textAlign: 'center',
            }}
            defaultValue={memorySG}
            keyboardType='numeric'
            maxLength={5}
            onChangeText={(sg) => { memorySG = sg; this.calculate() }}
            />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text
            style={{
              flex: 4,
              fontSize: 60,
              textAlign: 'center',
            }}>
            ABV:
          </Text>
          <Text
            style={{
              flex: 5,
              fontSize: 60,
              textAlign: 'center',
            }}>
            {this.state.abv}%
          </Text>

        </View>
      <View style={{ flex: 3 }}>
      </View>
      </View>
    );
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  TempConverter: TempConverterScreen,
  ABVCalculator: ABVCalculatorScreen,
},
{
  initialRouteName: 'Home',
});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
