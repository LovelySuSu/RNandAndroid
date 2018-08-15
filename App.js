/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    NativeModules,
    requireNativeComponent,View,Text,DeviceEventEmitter
} from 'react-native';


type Props = {};
const RCTDDImageView = requireNativeComponent('RCTDDImageView');
export default class App extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            text:'2.Callback 回调方式',
            text2:'3.Promise 回调方式',
            text3:'4.通过事件方式',
        }
    }
    componentWillMount() {
        let self = this;
        DeviceEventEmitter.addListener('EventName', function  (msg) {
            NativeModules.DingToast.getDataFromIntent((result)=>{
               self.setState({text3:result});
            });
        });

    }

    show () {
        NativeModules.DingToast.show(2000);
    }
    show2 () {
        NativeModules.DingToast.testAndroidCallbackMethod("HelloDing方法二",(result)=>{
            this.setState({text:result});
        });
    }
    show3 () {
        NativeModules.DingToast.textAndroidPromiseMethod("HelloDing方法三").then((result)=>{
            this.setState({text2:result});
        }).catch((error)=>{
            this.setState({tex2:'error'});
        })
    }
    show4 () {
        NativeModules.DingToast.sendEvent();
    }
    // show5 () {
    //     NativeModules.DingToast.show(NativeModules.ToastForAndroid.MESSAGE, ToastAndroid.SHORT)
    // }

  render() {
    return (
        <View>
            {/*<RCTDDImageView*/}
                {/*src={[{uri: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3506739232,2945471821&fm=27&gp=0.jpg'}]}*/}
                {/*borderRadius={15}*/}
                {/*resizeMode="cover"*/}
                {/*style={{width:600,height: 500}}*/}
            {/*/>*/}
            <Text onPress={() => this.show()} style={styles.welcome}>1.用ReactMethod注解方法就可以调用原生</Text>
            <Text onPress={()=>this.show2()} style={styles.welcome}>{this.state.text}</Text>
            <Text onPress={()=>this.show3()} style={styles.welcome}>{this.state.text2}</Text>
            <Text onPress={()=>this.show4()} style={styles.welcome}>{this.state.text3}</Text>
            {/*<Text onPress={()=>this.show5()} style={styles.welcome}>{this.state.text4}</Text>*/}
        </View>

    );
  }
}

// NativeModules.ToastExample.show('dingdingYe!!',NativeModules.ToastExample.SHORT);
// NativeModules.DingToast.show(3000);
// NativeModules.ImagePickerModule.pickImage();



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 26,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
