#include <Adafruit_NeoPixel.h>

//freeRtos handle
TaskHandle_t Task1;
TaskHandle_t Task2;

void setup() {
  Serial.begin(115200);
  //Declaration Task
  xTaskCreatePinnedToCore(
    neopixelloop,         // 태스크 함수
    "Task1",           // 테스크 이름
    10000,             // 스택 크기(워드단위)
    NULL,              // 태스크 파라미터
    5,                 // 태스크 우선순위
    &Task1,            // 태스크 핸들
    0);                // 실행될 코어

  xTaskCreatePinnedToCore(
    mqttloop,          // 태스크 함수
    "Task2",           // 테스크 이름
    100000,             // 스택 크기(워드단위)
    NULL,              // 태스크 파라미터
    0,                 // 태스크 우선순위
    &Task2,            // 태스크 핸들
    1);                // 실행될 코어

}


void neopixelloop(void *param){
  while(1){
    Serial.println("1");
  }
}

void mqttloop(void *param){
  while(1){
    Serial.println("2");
  }
}

void loop() {
}

void colorWave(Adafruit_NeoPixel strip, uint8_t wait, char RGB) {
  int i, j, stripsize, cycle;
  float ang, rsin, gsin, bsin, offset;
  static int tick = 0;
  stripsize = strip.numPixels();
  cycle = stripsize * 25; // times around the circle...

  while (++tick % cycle) {
    offset = map2PI(strip, tick);
    for (i = 0; i < stripsize; i++) {
      ang = map2PI(strip, i) - offset;
      rsin = sin(ang);
      gsin = sin(2.0 * ang / 3.0 + map2PI(strip, int(stripsize/6)));
      bsin = sin(4.0 * ang / 5.0 + map2PI(strip, int(stripsize/3)));
      if(RGB== 'r'){
        strip.setPixelColor(i, strip.Color(trigScale(bsin), 0, 0));
      }
      if(RGB == 'g'){
        strip.setPixelColor(i, strip.Color(0, trigScale(bsin), 0));
      }
      if(RGB == 'b'){
        strip.setPixelColor(i, strip.Color(0, 0, trigScale(bsin)));
      }
    }
    strip.show();
    delay(wait);
  }
}