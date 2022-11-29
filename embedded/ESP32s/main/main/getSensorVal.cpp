#include "getSensorVal.h"
#include "common.h"

void relay_begin() {
  pinMode(Pump_pin, OUTPUT);
  pinMode(Heater_pin, OUTPUT);
  pinMode(Cooler_pin, OUTPUT);
  pinMode(Cooler_Fan_pin, OUTPUT);
  pinMode(CDS_pin, INPUT);

}

int getCDS() {  //return average (cnt)
  int cnt = 0;
  for (int i = 0; i < 1000; i++) {
    cnt += analogRead(CDS_pin);
  }
  cnt /= 1000;
  return cnt;
}

int getCO2(CM1106_I2C cm1106_i2c) {
  uint8_t ret = cm1106_i2c.measure_result();
  
  if (ret == 0) {
    return cm1106_i2c.co2;

    switch (cm1106_i2c.status) {
      case CM1106_I2C_STATUS_PREHEATING:{
        Serial.println("Preheating");
        return -1;
      }
      case CM1106_I2C_STATUS_NORMAL_OPERATION:{
        Serial.println("Normal operation");
        return -1;
      }
      case CM1106_I2C_STATUS_OPERATING_TROUBLE:{
        Serial.println("Operating trouble");
        return -1;
      }
      case CM1106_I2C_STATUS_OUT_OF_FS:{
        Serial.println("Out of FS");
        return -1;
      }
      case CM1106_I2C_STATUS_NON_CALIBRATED:{
        Serial.println("Non calibrated");
        return -1;
      }
    }
  }
  
}