/*
#define CO2_T_pin 2 
#define CO2_E_pin 15 
#define BMP_SDA_pin  0  
#define BMP_SCL_pin  0 
*/
#define DHT22_pin 16  
#define DHTTYPE DHT22

#define NeoPixel_pin 12
#define NeoPixel_num 12
#define NeoPixel2_pin 23
#define NeoPixel2_num 100

#define LED_pin 14                 //Moter Driver 1 - PWM B
#define LED_pwm 0
#define Fan_R_pin 33               //Moter Driver 2 - PWM B
#define Fan_R_pwm 1
#define Fan_L_pin 32               //Moter Driver 2 - PWM A
#define Fan_L_pwm 2
const int freq = 5000;
const int resolutino = 8;


#define CDS_pin 35 
#define Motion_pin 0
#define Soil_pin 34

#define SDA_pin 21                 //I2c --> AirQuality & CO2
#define SCL_pin 22

#define Pump_pin 5                  //Relay 1 - IN1 
#define Heater_pin 18               //Relay 2 - IN2
#define Cooler_pin 19               //Relay 2 - Cooler
#define Cooler_Fan_pin 17           //Relay 1 -