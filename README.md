# Garment Distribution System

This project is a Garment Distribution System that utilizes an ESP32 microcontroller to manage ultrasonic sensors, a Firebase-based website, an ESP32 web server, servo motors, and motor controllers.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Hardware Requirements](#hardware-requirements)
- [Software Requirements](#software-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Garment Distribution System is designed to automate and streamline the distribution process of garments. It leverages an ESP32 microcontroller to control various sensors and motors, and communicates with a Firebase Realtime Database and a web server for efficient management and monitoring.

## Features

- **Ultrasonic Sensor**: Measures the distance to ensure proper garment placement.
- **Firebase Realtime Database**: Stores and retrieves data for real-time monitoring and management.
- **ESP32 Web Server**: Hosts a web server for local control and monitoring.
- **Servo Motor**: Controls the movement of specific components.
- **Motor Controller**: Manages the operation of motors involved in the distribution process.

## Hardware Requirements

- ESP32 Microcontroller
- Ultrasonic Sensor (HC-SR04 or similar)
- Servo Motor
- Motor Controller
- Power Supply
- Connecting Wires
- Breadboard (optional)
- Garment Distribution Mechanism

## Software Requirements

- Arduino IDE or PlatformIO
- ESP32 Board Package
- Firebase Arduino Library
- Servo Library
- Additional libraries as needed (specified in the code)

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/kaviska/hardware_projec.git
    cd folder
    ```

2. **Install the Required Libraries**:
   Open the Arduino IDE and install the following libraries from the Library Manager:
    - ESP32 Board Package
    - Firebase Esp32 Library
    - Servo Library
    - Web Server Library

3. **Upload the Code**:
   Connect your ESP32 to your computer and upload the code from the `src` directory.

## Usage

1. **Setup the Hardware**:
   - Connect the ultrasonic sensor, servo motor, and motor controller to the ESP32 as specified in the `hardware_setup.md` file.
   - Ensure all connections are secure and the power supply is adequate.

2. **Configure Firebase**:
   - Create a Firebase project and configure the Realtime Database.
   - Update the Firebase credentials in the code (`firebase_config.h`).

3. **Run the System**:
   - Power up the ESP32 and monitor the system via the web server.
   - Access the Firebase-based website for real-time data and control.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
