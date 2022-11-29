#include "common.h"
#include "controlLogic.h"

extern int controlTable[];
extern int manualTable[];
extern control controlVal;

void manualMode(int i){
  switch(i){
    case 0: 
      if (manualTable[0] == 0) tempDown();
      if (manualTable[0] == 1) tempStay();
      if (manualTable[0] == 2) tempUp();

    case 1:
      if(manualTable[1] == 0) ledOff();
      if(manualTable[1] == 1) ledOn(1);
      if(manualTable[1] == 2) ledOn(2);
      if(manualTable[1] == 3) ledOn(3);  

    case 2:
      if(manualTable[2] == 0) fanOff();
      if(manualTable[2] == 1) fanOn(1);
      if(manualTable[2] == 2) fanOn(2);
      if(manualTable[2] == 3) fanOn(3);

    case 3:
      if(manualTable[3] == 0) pumpOff();
      if(manualTable[3] == 1) pumpOn();

    case 4:
      if(manualTable[4] == 0) buzzerOff();
      if(manualTable[4] == 1) buzzerOn();  
  }
}

void autoMode(int i, int temp_now, int humidity_now, int co2_now){
  switch(i){
    case 0:
      if(temp_now > controlVal.temp_h) tempDown();
      else if(temp_now< controlVal.temp_l) tempUp();
      else tempStay();
    
    case 1:

    case 2:
      if(co2_now>controlVal.co2) fanOn(2);
      else fanOff();

    case 3:
      if(humidity_now < controlVal.humid) pumpOn();
      else pumpOff();
      
    case 4:
      buzzerOn();
  }

}

void tempUp(){
  digitalWrite(Heater_pin,LOW);
  digitalWrite(Cooler_pin,HIGH);
  digitalWrite(Cooler_Fan_pin,LOW);
  // Serial.println("(Heater ON & Cooler OFF) Heating...");
}

void tempDown(){
  digitalWrite(Cooler_pin,LOW);
  digitalWrite(Cooler_Fan_pin,HIGH);
  digitalWrite(Heater_pin,HIGH);
  // Serial.println("(Cooler ON & Heater OFF) Cooling...");
}

void tempStay(){
  digitalWrite(Heater_pin,HIGH);
  digitalWrite(Cooler_pin,HIGH);
  digitalWrite(Cooler_Fan_pin,LOW);
  // Serial.println("(Heater OFF & Cooler OFF) Staying");
}

void ledOn(int val){
  ledcWrite(LED_pwm, map(val,1,3,100,255));
  // Serial.print("LED ON - Brightness : ");
  // Serial.println(val);
}

void ledOff(){
  ledcWrite(LED_pwm, 0);
  // Serial.println("LED OFF");
}

void fanOn(int val){
  ledcWrite(Fan_R_pwm, map(val,1,3,120,255));
  ledcWrite(Fan_L_pwm, map(val,1,3,120,255));
  // Serial.print("FAN ON - Power : ");
  // Serial.println(val);
}

void fanOff(){
  ledcWrite(Fan_R_pwm, 0);
  ledcWrite(Fan_L_pwm, 0);
  // Serial.println("FAN OFF");
}

void pumpOn(){
  digitalWrite(Pump_pin,LOW);
  // Serial.println("PUMP ON");
}

void pumpOff(){
  digitalWrite(Pump_pin,HIGH);
  // Serial.println("PUMP OFF");
}

void buzzerOn(){
  // Serial.println("BUZZER ON");
}

void buzzerOff(){
  // Serial.println("BUZZER OFF");
}

void pwmControl_begin(){
  ledcAttachPin(LED_pin, LED_pwm);
  ledcAttachPin(Fan_R_pin, Fan_R_pwm);
  ledcAttachPin(Fan_L_pin, Fan_L_pwm);
  ledcSetup(LED_pwm,freq,resolutino);
  ledcSetup(Fan_R_pwm,freq,resolutino);
  ledcSetup(Fan_L_pwm,freq,resolutino);
}