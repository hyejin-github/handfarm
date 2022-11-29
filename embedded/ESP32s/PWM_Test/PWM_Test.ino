void setup() {
  ledcAttachPin(32, 0);
  ledcSetup(0,1000,8);
}


void loop() {
  ledcWrite(0,50);
}
