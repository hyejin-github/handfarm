#include <FastLED.h>               //FastLED 라이브러리 선언

#define DATA_PIN    23              //아두이노 6번핀을 "DATA_PIN"으로 지정
#define LED_TYPE    WS2812         //WS2812(네오픽셀의 종류)를 "LED_TYPE"로 지정
#define COLOR_ORDER GRB            //GRB(색상의 순서)를 "COLOR_ORDER"로 지정
#define NUM_LEDS    80             //12(네오픽셀의 LED 개수)를 "NUM_LEDS"로 지정
CRGB leds[NUM_LEDS];               

#define BRIGHTNESS         255     //밝기지정 "BRIGHNESS" (0~255 값이 있으며 255 일 때 가장 밝다) 
#define FRAMES_PER_SECOND  120     //120을 "FRAME_PER_SECOND"로 지정

void setup() {
  delay(3000);   //전원 안정화를 위한 딜레이
  
  FastLED.addLeds<LED_TYPE,DATA_PIN,COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip); //<WS2812, 6, GRB> (leds, 12)
   
  FastLED.setBrightness(BRIGHTNESS);         //밝기 설정(255)
}

typedef void (*SimplePatternList[])();
SimplePatternList gPatterns = {bpm};

uint8_t gCurrentPatternNumber = 0; // Index number of which pattern is current
uint8_t gHue = 0; // rotating "base color" used by many of the patterns
  
void loop()
{
   gPatterns[gCurrentPatternNumber]();

  FastLED.show();  
  FastLED.delay(1000/FRAMES_PER_SECOND); 

  EVERY_N_MILLISECONDS( 20 ) { gHue++; } 
  EVERY_N_SECONDS( 10 ) { nextPattern(); } 
}


#define ARRAY_SIZE(A) (sizeof(A) / sizeof((A)[0]))


void nextPattern()
{
  // add one to the current pattern number, and wrap around at the end
  gCurrentPatternNumber = (gCurrentPatternNumber + 1) % ARRAY_SIZE( gPatterns);
}

void rainbow() 
{
  fill_rainbow( leds, NUM_LEDS, gHue, 7);
}

void rainbowWithGlitter() 
{
  rainbow();
  addGlitter(80);
}

void addGlitter( fract8 chanceOfGlitter) 
{
  if( random8() < chanceOfGlitter) {
    leds[ random16(NUM_LEDS) ] += CRGB::White;
  }
}

void confetti() 
{
  fadeToBlackBy( leds, NUM_LEDS, 10);
  int pos = random16(NUM_LEDS);
  leds[pos] += CHSV( gHue + random8(64), 200, 255);
}

void sinelon()
{
  fadeToBlackBy( leds, NUM_LEDS, 20);
  int pos = beatsin16( 13, 0, NUM_LEDS-1 );
  leds[pos] += CHSV( gHue, 255, 192);
}

void bpm()
{
  uint8_t BeatsPerMinute = 62;
  CRGBPalette16 palette = PartyColors_p;
  uint8_t beat = beatsin8( BeatsPerMinute, 64, 255);
  for( int i = 0; i < NUM_LEDS; i++) { //9948
    leds[i] = ColorFromPalette(palette, gHue+(i*2), beat-gHue+(i*10));
  }
}

void juggle() {
  fadeToBlackBy( leds, NUM_LEDS, 20);
  byte dothue = 0;
  for( int i = 0; i < 8; i++) {
    leds[beatsin16( i+7, 0, NUM_LEDS-1 )] |= CHSV(dothue, 200, 255);
    dothue += 32;
  }
}
