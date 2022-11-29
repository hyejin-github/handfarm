#include <ArduinoJson.h>
struct control {
  int temp_h;
  int temp_l;
  int humid;
  int co2;
  int led_s;
  int led_e;
};

extern StaticJsonDocument<200> doc;
extern int controlTable[];
extern int manualTable[];
extern control controlVal;

void updateControlTable(String payload) {
  deserializeJson(doc, payload);
  int temp = doc["temp"] | -999;
  if (temp != -999) controlTable[0] = temp;

  int led = doc["led"] | -999;
  if (led != -999) controlTable[1] = led;

  int fan = doc["fan"] | -999;
  if (fan != -999) controlTable[2] = fan;

  int pump = doc["pump"] | -999;
  if (pump != -999) controlTable[3] = pump;

  int buzzer = doc["buzzer"] | -999;
  if (buzzer != -999) controlTable[4] = buzzer;
}

void updateManualTable(String payload) {
  deserializeJson(doc, payload);
  int temp = doc["temp"] | -999;
  if (temp != -999) manualTable[0] = temp;

  int led = doc["led"] | -999;
  if (led != -999) manualTable[1] = led;

  int fan = doc["fan"] | -999;
  if (fan != -999) manualTable[2] = fan;

  int pump = doc["pump"] | -999;
  if (pump != -999) manualTable[3] = pump;

  int buzzer = doc["buzzer"] | -999;
  if (buzzer != -999) manualTable[4] = buzzer;
}

void updateControlVal(String payload) {
  deserializeJson(doc, payload);

  const char* temp = doc["temp"];
  String temp_array = temp;
  if (temp_array.length() != 0) {
    int pos = 0;
    for (int i = 1; i < temp_array.length(); i++) {
      if (temp_array[i] == ',') {
        pos = i;
        break;
      }
    }
    String temp_h = temp_array.substring(1, pos);
    String temp_l = temp_array.substring(pos + 1, temp_array.length() - 1);

    int temp_h_int = temp_h.toInt();
    int temp_l_int = temp_l.toInt();
    controlVal.temp_h = temp_h_int;
    controlVal.temp_l = temp_l_int;
  }

  int humid = doc["soilHumidity"] | -999;
  if (humid != -999) controlVal.humid = humid;

  int co2 = doc["co2"] | -999;
  if (co2 != -999) controlVal.co2 = co2;

  const char* led = doc["led"];
  String led_array = led;
  if (led_array.length() != 0) {
    int pos = 0;
    for (int i = 1; i < led_array.length(); i++) {
      if (led_array[i] == ',') {
        pos = i;
        break;
      }
    }
    String led_s = led_array.substring(1, pos);
    String led_e = led_array.substring(pos + 1, led_array.length() - 1);

    int led_s_int = led_s.toInt();
    int led_e_int = led_e.toInt();
    controlVal.led_s = led_s_int;
    controlVal.led_e = led_e_int;
  }
}
