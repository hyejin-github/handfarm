#include "EspMQTTClient.h"

EspMQTTClient client(
  "Tentacion2",
  "tkwk12tkwK!",
  "54.180.201.1",  // MQTT Broker server ip
  "MQTTUsername",   // Can be omitted if not needed
  "MQTTPassword",   // Can be omitted if not needed
  "owen",     // Client name that uniquely identify your device
  1883              // The MQTT port, default to 1883. this line can be omitted
);

char *topic = "ssafy/c101/temp";
char *topic1 = "ssafy/c101/humid";

void tx(){
  client.publish(topic, "35");
}
void rx(){                                                            
  client.subscribe(topic1,[](const String & payload) {
    Serial.println(payload);
  });
}

void setup(){
  Serial.begin(115200);
  client.enableDebuggingMessages(); 
  client.enableHTTPWebUpdater(); 
  client.enableOTA(); // Enable OTA (Over The Air) updates. Password defaults to MQTTPassword. Port is the default OTA port. Can be overridden with enableOTA("password", port).
  client.enableLastWillMessage("TestClient/lastwill", "I am going offline");  // You can activate the retain flag by setting the third parameter to true
  client.subscribe(topic, [](const String &payload){
  Serial.println(payload);
  });
}

void onConnectionEstablished(){
  /*
  // Subscribe to "mytopic/test" and display received message to Serial
  client.subscribe("mytopic/test", [](const String & payload) {
    Serial.println(payload);
  });
  
  // Subscribe to "mytopic/wildcardtest/#" and display received message to Serial
  client.subscribe("mytopic/wildcardtest/#", [](const String & topic, const String & payload) {
    Serial.println("(From wildcard) topic: " + topic + ", payload: " + payload);
  });

  // Publish a message to "mytopic/test"
  client.publish("mytopic/test", "This is a message"); // You can activate the retain flag by setting the third parameter to true

  // Execute delayed instructions
  client.executeDelayed(5 * 1000, []() {
    client.publish("mytopic/wildcardtest/test123", "This is a message sent 5 seconds later");
  });
  */
}

void loop(){
  tx();
  client.loop();
  delay(1000);
}
