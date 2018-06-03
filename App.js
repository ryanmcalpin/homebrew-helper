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
  render(){
    return(
      <ScrollView style={{flex: 1, paddingTop: 20}}>
        <Button
          onPress={() => this.props.navigation.navigate('TempConversion')}
          title="F/C Conversion"
        />
        <Button
          onPress={() => this.props.navigation.navigate('ABVCalculator')}
          title="ABV Calculator"
        />
      </ScrollView>
    );
  }
}

class TempConversionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temp: memoryTempC};
  }

  calculate(tempF) {
    let temp = ((tempF - 32) / 1.8).toFixed(1);
    temp.slice(-1) == "0" ? temp = temp.slice(0, -2) : null;
    temp == "NaN" && tempF.length > 1 ? temp = "oops!" : null;
    tempF == "." || tempF == "-" || tempF == "-." ? temp = "" : null;
    this.setState({temp});
    memoryTempC = temp;
    memoryTempF = tempF;
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
            defaultValue={memoryTempF}
            keyboardType='numeric'
            maxLength={5}
            onChangeText={(temp) => temp == '' ? this.setState({temp}) : this.calculate(temp)}
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
          <Text style={{
              backgroundColor: 'lightgrey',
              flex: 6,
              fontSize: 72,
              textAlign: 'center',
            }}>
            {this.state.temp}
          </Text>
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
  TempConversion: TempConversionScreen,
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
