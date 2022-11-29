#include "neopixelControl.h"
#include <Adafruit_NeoPixel.h>
/*
void colorWave(Adafruit_NeoPixel strip, uint8_t wait, char RGB) {
  int i, j, stripsize, cycle;
  float ang, rsin, gsin, bsin, offset;
  static int tick = 0;
  stripsize = strip.numPixels();
  cycle = stripsize * 25; // times around the circle...

  while (++tick % cycle) {
    offset = PI*2.0*float(tick) / float(strip.numPixels());;
    for (i = 0; i < stripsize; i++) {
      ang = PI*2.0*float(i) / float(strip.numPixels()); - offset;
      rsin = sin(ang);
      gsin = sin(2.0 * ang / 3.0 + PI*2.0*float(int(stripsize/6)) / float(strip.numPixels()));
      bsin = sin(4.0 * ang / 5.0 + PI*2.0*float(int(stripsize/3)) / float(strip.numPixels()));
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

byte trigScale(float val) {
  val += 1.0; // move range to [0.0, 2.0]
  val *= 127.0; // move range to [0.0, 254.0]

  return int(val) & 255;
}
*/