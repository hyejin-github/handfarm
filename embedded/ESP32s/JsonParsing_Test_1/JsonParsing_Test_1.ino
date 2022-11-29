#include <ArduinoJson.h>

void setup() {
  Serial.begin(115200);
  StaticJsonDocument<200> doc;

  char json[]="{\"temp\":0,\"led\":1,\"temp1\":"[123,2345]}";
  auto error = deserializeJson(doc,json);

  if(error){
    Serial.print(F("deserializeJson() failed with code "));
    Serial.println(error.c_str());
    return;
  }

  int temp = doc["temp"];
  int led = doc["led"];
  int pump = doc["pump"];
  int fan = doc["fan"];
  int buzzer = doc["buzzer"];
  int temp1 = doc["temp1"][0] | -999;
  int temp2 = doc["temp1"][1] | -999;

  Serial.println(temp);
  Serial.println(led);
  Serial.println(temp1);
  Serial.println(temp2);
}

void loop() {
  // put your main code here, to run repeatedly:
}
