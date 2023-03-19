// This #include statement was automatically added by the Particle IDE.
#include <PietteTech_DHT.h>

#define BLYNK_TEMPLATE_ID "TMPLewiNPa6E"
#define BLYNK_TEMPLATE_NAME "MyPhoton"
#define BLYNK_AUTH_TOKEN "7mNvEQrE306YEB3h1W4DQ-tXFU8BzozP"

#define BLYNK_PRINT Serial

#include <blynk.h>
int led1 = D0;
int led2 = D7;

// Create an instance of the DHT sensor library for the specified pin and type
#define DHTPIN D3
#define DHTTYPE DHT11
PietteTech_DHT DHT(DHTPIN, DHTTYPE);
// Create a Blynk timer object
BlynkTimer timer;

// Initialize a boolean flag to track whether the "Lowtemp" event has been published
bool lowTempPublished = false;

void setup()
{
    pinMode(led1, OUTPUT);
    pinMode(led2, OUTPUT);
    // Initialize the serial port and wait for it to connect
    Serial.begin(115200);
    delay(1000);

    // Connect to the Blynk server with the specified auth token
    Blynk.begin(BLYNK_AUTH_TOKEN);

    // Initialize the DHT sensor library
    DHT.begin();

    // Set up a timer to call the sendSensor() function every 1000 milliseconds
    timer.setInterval(1000, sendSensor);
}

// Function to read sensor data and send it to the Particle cloud and Blynk app
void sendSensor()
{
    // Read the temperature and humidity from the DHT sensor
    int result = DHT.acquireAndWait(2000);
    double t = DHT.getCelsius();
    double h = DHT.getHumidity();

    // Check if the temperature is below 10 degrees Celsius and the event hasn't been published yet
    if (t <= 15 && !lowTempPublished)
    {
        // Publish the "Lowtemp" event to the Particle cloud with the current temperature value
        Particle.publish("Lowtemp", String(t));
        // Set the flag to indicate that the event has been published
        lowTempPublished = true;
        digitalWrite(led1, HIGH);
        digitalWrite(led2, LOW);
    }
    else if (t > 15 && lowTempPublished)
    {
        lowTempPublished = false;
        digitalWrite(led1, LOW);
        digitalWrite(led2, HIGH);
    }

    // Check if the sensor reading is valid
    if (isnan(h) || isnan(t))
    {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }

    // Send the humidity and temperature values to the Blynk app
    Blynk.virtualWrite(V4, h);
    Blynk.virtualWrite(V5, t);
    Particle.publish(String(t));
    Particle.publish(String(h));
}

void loop()
{
    // Call the Blynk.run() function to process incoming Blynk requests
    Blynk.run();
    // Call the timer.run() function to run the timer and call the sendSensor() function
    timer.run();
}