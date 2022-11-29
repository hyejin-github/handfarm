#include "DHT.h"
#include <pm2008_i2c.h>
#include "Definition_Pin.h"
#include "EspMQTTClient.h"
#include <cm1106_i2c.h>
#include <ArduinoJson.h>

struct control{
  int temp_h;
  int temp_l;
  int humid;
  int co2;
  int led_s;
  int led_e;
};