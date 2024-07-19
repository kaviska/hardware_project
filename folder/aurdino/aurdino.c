#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>
#include <FirebaseESP32.h>

#define RPWM 22 // Right PWM
#define LPWM 19 // Left PWM
#define R_EN 4  // Right enable (optional)
#define L_EN 5  // Left enable (optional)

#define TRIG_PIN 18 // Ultrasonic sensor 1 trigger pin (Front sensor of the cart)
#define ECHO_PIN 21 // Ultrasonic sensor 1 echo pin

#define TRIG_PIN2 23 // Ultrasonic sensor 2 trigger pin (Right side sensor of the cart)
#define ECHO_PIN2 2  // Ultrasonic sensor 2 echo pin

#define TRIG_PIN3 12 // Ultrasonic sensor 3 trigger pin (Back side sensor of the cart)
#define ECHO_PIN3 14 // Ultrasonic sensor 3 echo pin

// Firebase configuration
#define FIREBASE_HOST "https://hardware-project-715bc-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "A8HPM9mBP1xTWjCcHiWWe0RjVinglWZni4UUFO5h" // Replace with your actual database secret or auth key

// Define pins for the servos
const int servoPin1 = 35; ///////////////////////
const int servoPin2 = 32;
const int servoPin3 = 33;

// Create servo objects
Servo myServo1;
Servo myServo2;
Servo myServo3;

// Replace with your network credentials
const char *ssid = "SLT-4G_1EE4B9";
const char *password = "yy9vV7j4vtU6";

// Firebase Data object
FirebaseData firebaseData;
FirebaseAuth firebaseAuth;
FirebaseConfig firebaseConfig;

// Create an instance of the server
WebServer server(80);

int count = -1;              // Count variable
bool objectDetected = false; // Track if an object is detected
int detectObject = 3;        // Default value for detectObject
bool motorStopped = false;   // Track if the motor is stopped
bool motorReversed = false;  // Track if the motor has reversed
bool motorPaused = true;     // Track if the motor is paused after reversing
int reciverPosition = 0;
int compontentNumber = 0;
int res = 0;
bool inlineMode = false;
bool motorPausedInline = true;

int pos = 0;
int motorNumber = 9; // Default motor number

void setup()
{
    // Initialize serial communication
    Serial.begin(115200);

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());

    // Set motor control pins as outputs
    pinMode(RPWM, OUTPUT);
    pinMode(LPWM, OUTPUT);
    pinMode(R_EN, OUTPUT);
    pinMode(L_EN, OUTPUT);

    // Set ultrasonic sensor pins
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    pinMode(TRIG_PIN2, OUTPUT);
    pinMode(ECHO_PIN2, INPUT);
    pinMode(TRIG_PIN3, OUTPUT);
    pinMode(ECHO_PIN3, INPUT);

    // Enable motor driver (if using enable pins)
    digitalWrite(R_EN, HIGH);
    digitalWrite(L_EN, HIGH);

    // Attach the servos to the specified pins
    myServo1.attach(servoPin1);
    myServo2.attach(servoPin2);
    myServo3.attach(servoPin3);

    // Initialize Firebase
    firebaseConfig.host = FIREBASE_HOST;
    firebaseConfig.signer.tokens.legacy_token = FIREBASE_AUTH;

    Firebase.begin(&firebaseConfig, &firebaseAuth);
    Firebase.reconnectWiFi(true);

    // Define the handling function for the POST request
    server.on("/", HTTP_POST, handlePost);

    server.on("/line", HTTP_POST, lineModePost);

    // Handle CORS preflight request
    server.on("/", HTTP_OPTIONS, handleOptions);

    // Start the server
    server.begin();
}

void handlePost()
{
    // Check if the request contains form data
    if (server.args() > 0)
    {
        // Extract form data
        String detectObjectStr = server.arg("pos");
        String motorNumberStr = server.arg("motorNumber");

        if (detectObjectStr.length() > 0 && motorNumberStr.length() > 0)
        {
            Serial.println("Received form data:");
            Serial.println(detectObjectStr);
            Serial.println(motorNumberStr);

            detectObject = detectObjectStr.toInt(); // Convert to int
            motorNumber = motorNumberStr.toInt();   // Convert to int

            Serial.print("Receiver Position (detectObject): ");
            Serial.println(detectObject);

            Serial.print("Motor Number (motorNumber): ");
            Serial.println(motorNumber);

            if (motorPaused)
            {
                Serial.println("Resuming motor after server call");
                motorPaused = false;
                motorStopped = false;
                motorReversed = false;
                count = 0;
            }

            // Send response with CORS headers
            server.sendHeader("Access-Control-Allow-Origin", "*");
            server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
            server.send(200, "application/json", "{\"status\":\"success\"}");
        }
        else
        {
            server.send(404, "text/plain", "Invalid form data");
        }
    }
    else
    {
        server.send(404, "text/plain", "Invalid request");
    }
}

void lineModePost()
{
    Serial.print(" Line Mode Post");

    // Check if the request contains form data
    if (server.args() > 0)
    {
        // Extract form data
        String detectObjectStr = server.arg("pos");
        String resStr = server.arg("res");

        if (detectObjectStr.length() > 0 && resStr.length() > 0)
        {

            detectObject = detectObjectStr.toInt(); // Convert to int
            res = resStr.toInt();                   // Convert to int

            Serial.print("Receiver Position (detectObject): ");
            Serial.println(detectObject);

            Serial.print("Motor Number (motorNumber): ");
            Serial.println(res);

        

                count = 0;
                inlineMode = true;
               

            // Send response with CORS headers
            server.sendHeader("Access-Control-Allow-Origin", "*");
            server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
            server.send(200, "application/json", "{\"status\":\"success\"}");
        }
        else
        {
            server.send(404, "text/plain", "Invalid form data");
        }
    }
    else
    {
        server.send(404, "text/plain", "Invalid request");
    }
}

void handleOptions()
{
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
    server.send(204);
}

void serverMotor()
{
    server.handleClient();

    Serial.println("Second function is runing");

    // Check and update the selected servo based on motorNumber
    Servo *selectedServo;

    // check motor number is equal to 1 or 2 or 3
    if (motorNumber == 1 || motorNumber == 2 || motorNumber == 3)
    {
        Serial.print("Motor Number :");
        Serial.println(motorNumber);



        if (motorNumber == 1)
        {
            selectedServo = &myServo1;
        }
        else if (motorNumber == 2)
        {
            selectedServo = &myServo2;
        }
        else if (motorNumber == 3)
        {
            selectedServo = &myServo3;
        }
        else
        {
            // If an invalid motorNumber is provided, skip the loop
            return;
        }

        // Sweep from 0 to 180 degrees
        for (pos = 0; pos <= 180; pos += 1)
        {
            selectedServo->write(pos);
            delay(15); // Wait 15 milliseconds for the servo to reach the position
            // server.handleClient();
        }

        // Delay for 10 seconds at 180 degrees
        for (int i = 0; i < 1000; i++)
        {
            delay(10);

            // server.handleClient();
        }

        // Sweep from 180 to 0 degrees
        for (pos = 180; pos >= 0; pos -= 1)
        {
            selectedServo->write(pos);
            delay(15); // Wait 15 milliseconds for the servo to reach the position
            // server.handleClient();
        }

        // Delay for 10 seconds at 0 degrees
        for (int i = 0; i < 1000; i++)
        {
            delay(10);
            // server.handleClient();
        }
        motorNumber=0;
        Serial.println("Second Function is stop");
    }
}

long distanceFront;
long distanceSide;

void addDataToFirebase(String path)
{
    // Create JSON object
    FirebaseJson json;
    json.set("cart_1", "true");

    // Send JSON data to Firebase
    if (Firebase.setJSON(firebaseData, path, json))
    {
        Serial.println("Data added successfully");
    }
    else
    {
        Serial.println("Failed to add data");
        Serial.println(firebaseData.errorReason());
    }
}
void lineMode()
{
    server.handleClient();
    Serial.println("Line mode  fun is running");

    // Serial.println("First function is runinhg");

    server.handleClient();

  

        // motor run forward

        while (true)
        {
            analogWrite(LPWM, 0);
            analogWrite(RPWM, 40);
            // Adjust value 0-255 for speed control

            // Measure distance for side sensor
            digitalWrite(TRIG_PIN2, LOW);
            delayMicroseconds(2);
            digitalWrite(TRIG_PIN2, HIGH);
            delayMicroseconds(10);
            digitalWrite(TRIG_PIN2, LOW);

            long durationSide = pulseIn(ECHO_PIN2, HIGH, 30000); // Timeout after 30ms
            if (durationSide == 0)
            {
                // No echo received, set distance to a high value or ignore this reading
                distanceSide = 999;
            }
            else
            {
                distanceSide = durationSide * 0.034 / 2;
            }

            Serial.print(" cm, Distance Side: ");
            Serial.println(distanceSide);

            if (distanceSide <= 10)
            {
                if (!objectDetected)
                { // Check if an object was not previously detected
                    count++;
                    Serial.print("Count: ");
                    Serial.println(count);
                    objectDetected = true; // Update the state to indicate an object is now detected
                }
            }
            else
            {
                objectDetected = false; // Reset the state if no object is detected
            }

            if (count == detectObject)
            {

                break;
            }

            delay(100); // Add a small delay to ensure sensor stability
        }

        if (count == detectObject)
        {
            // motor stop
            Serial.println("Stopping motor");
            analogWrite(LPWM, 20);
            analogWrite(RPWM, 0);
            delay(2000);
            analogWrite(LPWM, 0);
            analogWrite(RPWM, 0);

            delay(10000);
                count=0;



            //second user
             while (true)
        {
            analogWrite(LPWM, 0);
            analogWrite(RPWM, 40);
            // Adjust value 0-255 for speed control

            // Measure distance for side sensor
            digitalWrite(TRIG_PIN2, LOW);
            delayMicroseconds(2);
            digitalWrite(TRIG_PIN2, HIGH);
            delayMicroseconds(10);
            digitalWrite(TRIG_PIN2, LOW);

            long durationSide = pulseIn(ECHO_PIN2, HIGH, 30000); // Timeout after 30ms
            if (durationSide == 0)
            {
                // No echo received, set distance to a high value or ignore this reading
                distanceSide = 999;
            }
            else
            {
                distanceSide = durationSide * 0.034 / 2;
            }

            Serial.print(" cm, Distance Side: ");
            Serial.println(distanceSide);

            if (distanceSide <= 10)
            {
                if (!objectDetected)
                { // Check if an object was not previously detected
                    count++;
                    Serial.print("Count: ");
                    Serial.println(count);
                    objectDetected = true; // Update the state to indicate an object is now detected
                }
            }
            else
            {
                objectDetected = false; // Reset the state if no object is detected
            }

            if (count == res)
            {
                break;
                count=0;
            }

            delay(100); // Add a small delay to ensure sensor stability
        }






// motor stop
            Serial.println("Stopping motor");
            analogWrite(LPWM, 20);
            analogWrite(RPWM, 0);
            delay(2000);
            analogWrite(LPWM, 0);
            analogWrite(RPWM, 0);

            delay(10000);











            while (true)
            {

                // Measure distance for side sensor
                digitalWrite(TRIG_PIN, LOW);
                delayMicroseconds(2);
                digitalWrite(TRIG_PIN, HIGH);
                delayMicroseconds(10);
                digitalWrite(TRIG_PIN, LOW);

                long durationFront = pulseIn(ECHO_PIN, HIGH, 30000); // Timeout after 30ms
                if (durationFront == 0)
                {
                    // No echo received, set distance to a high value or ignore this reading
                    distanceFront = 999;
                }
                else
                {
                    distanceFront = durationFront * 0.034 / 2;
                }
                

                analogWrite(LPWM, 40); // Adjust value 0-255 for speed control
                analogWrite(RPWM, 0);
                Serial.println("Reversing motor");
                if (distanceFront <= 20)
                {
                    Serial.println("Stop");
                    break;
                }
            }

            Serial.println("Stopping motor");

            analogWrite(LPWM, 0);
            analogWrite(RPWM,20);
            delay(2000);
            analogWrite(LPWM, 0);
            analogWrite(RPWM, 0);
            

            motorPaused = true;
            count = 0;
            inlineMode=false;
            addDataToFirebase("/cart");
        }
    }


void fun_01()
{

    // Serial.println("First function is runinhg");

    server.handleClient();

    if (motorPaused)
    {
    }
    else
    {

        // motor run forward

        while (true)
        {
            analogWrite(LPWM, 0);
            analogWrite(RPWM, 40);
            // Adjust value 0-255 for speed control

            // Measure distance for side sensor
            digitalWrite(TRIG_PIN2, LOW);
            delayMicroseconds(2);
            digitalWrite(TRIG_PIN2, HIGH);
            delayMicroseconds(10);
            digitalWrite(TRIG_PIN2, LOW);

            long durationSide = pulseIn(ECHO_PIN2, HIGH, 30000); // Timeout after 30ms
            if (durationSide == 0)
            {
                // No echo received, set distance to a high value or ignore this reading
                distanceSide = 999;
            }
            else
            {
                distanceSide = durationSide * 0.034 / 2;
            }

            Serial.print(" cm, Distance Side: ");
            Serial.println(distanceSide);

            if (distanceSide <= 10)
            {
                if (!objectDetected)
                { // Check if an object was not previously detected
                    count++;
                    Serial.print("Count: ");
                    Serial.println(count);
                    objectDetected = true; // Update the state to indicate an object is now detected
                }
            }
            else
            {
                objectDetected = false; // Reset the state if no object is detected
            }

            if (count == detectObject)
            {
                break;
            }

            delay(100); // Add a small delay to ensure sensor stability
        }

        if (count == detectObject)
        {
            // motor stop
            Serial.println("Stopping motor");
            analogWrite(LPWM, 20);
            analogWrite(RPWM, 0);
            delay(2000);
            analogWrite(LPWM, 0);
            analogWrite(RPWM, 0);

            serverMotor();

            // wait 10 second
            // delay(10000);

            // motor reverese
            //  Reverse motor

            while (true)
            {

                // Measure distance for side sensor
                digitalWrite(TRIG_PIN, LOW);
                delayMicroseconds(2);
                digitalWrite(TRIG_PIN, HIGH);
                delayMicroseconds(10);
                digitalWrite(TRIG_PIN, LOW);

                long durationFront = pulseIn(ECHO_PIN, HIGH, 30000); // Timeout after 30ms
                if (durationFront == 0)
                {
                    // No echo received, set distance to a high value or ignore this reading
                    distanceFront = 999;
                }
                else
                {
                    distanceFront = durationFront * 0.034 / 2;
                }

                analogWrite(LPWM, 40); // Adjust value 0-255 for speed control
                analogWrite(RPWM, 0);
                Serial.println("Reversing motor");
                if (distanceFront <= 20)
                {
                    Serial.println("Stop");
                    break;
                }
            }

            Serial.println("Stopping motor");

            analogWrite(LPWM, 0);
            analogWrite(RPWM, 20);
            delay(2000);
            analogWrite(LPWM, 0);
            analogWrite(RPWM, 0);

            motorPaused = true;
            count = 0;
            detectObject = 0;
            addDataToFirebase("/cart");
        }
    }
}

void loop()
{
    server.handleClient();
    if (inlineMode)
    {
        lineMode();
    }
    else
    {
        fun_01();
    }
}