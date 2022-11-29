#include <WiFi.h>

//For MQTT & Wifi Connection
const char* ssid = "Tentacion2";
const char* password = "tkwk12tkwK!";
const char* mqttBrokerIP = "54.180.201.1";
const char* clientName = "D30";
const int mqttPort = 1883;

//MQTT Topic
const char* topic_pub = "ssafy/D30/info";
const char* topic_sub_auto = "ssafy/D30/autoControl";
const char* topic_sub_autoVal = "ssafy/D30/autoControlval";
const char* topic_sub_manual = "ssafy/D30/manualControl";


//Static IP
void setStaticIP(){
  IPAddress local_IP(192,168,100,207);
  IPAddress gateway(192,168,100,1);

  IPAddress subnet(255,255,255,0);
  IPAddress primaryDNS(8,8,8,8);
  IPAddress secondaryDNS(8,8,4,4);
}

