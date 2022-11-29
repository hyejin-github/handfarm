// import React from 'react';
// import ReactDOM from 'react-dom';
// import {
//     MqttConnection,
//     MqttComponent,
//     Button
// } from 'react-mqtt-controls';
// import { Connector } from 'react-mqtt-client'
// import {MqttClient} from "mqtt";
//
// class Mqtts extends Component = () => {
//
//     componentDidMount(){
//         var myMqtt = new MqttClient();
//         var client = myMqtt.connected('mqtt://54.180.201.1:1883')
//         client.on('connect', function () {
//             client.subscribe('ssafy/c101/temp', function (err) {
//                 console.log("subscribe")
//                 if(!err) {
//                     client.public('presence','hello mqtt')
//                 }
//             })
//         })
//     }
//
//     return (
//         // <MqttConnection config={{url: '54.180.201.1'}}>
//         //     <MqttComponent
//         //         component={Button}
//         //         topic="/ssafy/c101/temp"
//         //         componentProps={{
//         //             value: "hello"
//         //         }}
//         //
//         //         publishOptions={{
//         //             qos: 0,
//         //             retain: true
//         //         }}
//         //
//         //         noRBE
//         //     >
//         //         Button Text
//         //     </MqttComponent>
//         // </MqttConnection>
//     );
// };
//
// export default Mqtt2;