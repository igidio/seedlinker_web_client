# Seedlinker Web Client

<p align="center">
  <img src="https://i.imgur.com/WW7ptrC.png" width="49%" />
  <img src="https://i.imgur.com/AhDpkSj.png" width="49%" />
  <img src="https://i.imgur.com/tQM6Blw.png" width="49%" />
  <img src="https://i.imgur.com/ZIKdK51.png" width="49%" />
</p>

Seedlinker Web Client is a progressive web application for the Seedlinker IoT ecosystem. It provides an intuitive interface to monitor and control devices, visualize real-time data, configure automations, and manage ESP32/ESP8266 microcontrollers from any browser.

## Features

- **Control dashboard:** Centralized view of all registered devices with current states, sensor readings, and manual actuator control.
- **Real-time data visualization:** Interactive charts for sensor readings (temperature, humidity, water level) updated in real time.
- **Logs and graphs view:** Dedicated screen to query event history and sensor readings with visualizations.
- **Light/dark theme:** Switch between light and dark themes for improved UX.
- **Internationalization:** Supports English and Spanish, with extensibility for additional languages.

## Technologies Used

- **Vue 3 (Composition API)**: The progressive JavaScript framework.
- **TypeScript**: For type-safe code and better maintainability.
- **Vite**: Next-generation frontend tooling.
- **Pinia**: Intuitive, type-safe state management for Vue.
- **Tailwind CSS & DaisyUI**: Utility-first CSS framework with pre-designed components.
- **Axios**: Promise-based HTTP client.
- **Chart.js & vue-chartjs**: For data charting.
- **Zod**: Schema declaration and validation.

> Note: Please check package.json for the full list of dependencies.

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm**
- **Seedlinker Server**: Ensure you have the Seedlinker backend server running and accessible.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/igidio/seedlinker_web_client.git
   cd seedlinker_web_client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Environment variables: Copy `.env.template` to `.env` and set the Seedlinker server address (if it's running on a different port than 8000).

   ```bash
   cp .env.template .env
   # Edit .env with your values
   ```

4. Start the app in development mode:

   ```bash
   npm run dev
   ```

The app should be available at 🔗http://localhost:3000 and ready to interact with the Seedlinker server.

### Project Structure

- **📁src/**
	- **📄translations.ts**: Translations (EN/ES).
	- **📄main.ts**: Entry point.
	- **📁router/**: App routes.
	- **📁stores/**: Pinia stores.
	- **📁components**: Reusable Vue components.
	- **📁layouts**: Page layouts.
	- **📁assets**: CSS, images and global styles.
	- **📁schemas**: Validation schemas with Zod.
	- **📁interfaces**: TypeScript types and interfaces.

## Scripts
- `npm run dev`: Start development server with hot reloading.
- `npm run build`: Build for production.
- `npm run preview`: Preview production build locally.

### License
 This project is licensed under the MIT License - see the [📄LICENSE.md](LICENSE.md) file for details.