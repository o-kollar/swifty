# 🚆 Swifty

**Swifty** is a high-performance public transport and micro-mobility trip planner specifically optimized for **Bratislava, Slovakia**. It leverages the power of **OpenTripPlanner (OTP)** for multi-modal routing and provides a modern, reactive interface for users to plan their journeys via bus, tram, walking, or bike-sharing.

## ✨ Features

- **Multi-modal Routing:** Plan trips combining public transit (GTFS), walking, and cycling.
- **Bike-Sharing Integration:** Native support for Bratislava's **WhiteBikes** network, calculating the closest stations to your origin and destination.
- **Interactive Map:** Built with **MapLibre GL** and **Mapy.cz API** for high-quality geocoding and location suggestions.
- **Real-time Data Fetching:** Proxies requests to OTP and external transport APIs to provide up-to-date travel segments.
- **Modern UI:** Built with **Alpine.js**, **Tailwind CSS**, and **Flowbite**, featuring a responsive side-drawer and dark mode support.
- **Dockerized Architecture:** Includes a Docker setup that bundles Node.js and the Java runtime required for the routing engine.

## 🏗️ Architecture

Swifty operates as a dual-engine system:
1. **Node.js/Express Backend:** Handles API requests, serves static files, and manages the lifecycle of the routing engine.
2. **OpenTripPlanner (OTP) Engine:** A Java-based service that processes OSM (OpenStreetMap) and GTFS (General Transit Feed Specification) data to calculate itineraries.

The backend automatically downloads the necessary `.pbf` (OSM) and `.zip` (GTFS) data files upon the first launch.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Routing Engine:** OpenTripPlanner (OTP) v2.2.0
- **Frontend:** Alpine.js, Tailwind CSS, Flowbite
- **Mapping:** MapLibre GL, Mapy.cz Loader
- **Bundling:** esbuild (for Alpine.js logic)
- **DevOps:** Docker

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16+)
- **Java OpenJDK 17** (Required to run the OTP routing engine)
- **Docker** (Optional, for containerized deployment)

### Environment Configuration

Before running, check the `config.env` file. You can customize the transit data sources:

```env
APP_PORT=3000
GTFS_SOURCE=https://opendata.bratislava.sk/...
OSM_DATA_SOURCE=https://download.geofabrik.de/europe/slovakia-latest.osm.pbf
OTP_PORT=8080
```

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/o-kollar/swifty.git
   cd swifty
   ```

2. **Run the setup script:**
   The `start-local.sh` script installs dependencies, builds frontend assets, and starts the server.
   ```bash
   chmod +x start-local.sh
   ./start-local.sh
   ```

### Docker Deployment

The simplest way to run Swifty with all dependencies (including Java) is via Docker:

```bash
chmod +x start.sh
./start.sh
```

This will build an image named `swifty` and expose the application on port `3000`.

## 📁 Project Structure

```text
├── src/
│   ├── api/            # Express route handlers (transit, bikes, travel)
│   ├── controllers/    # Business logic (itinerary formatting, OTP management)
│   ├── data-providers/ # Data fetching from OTP and CityBikes
│   └── utils/          # Geometry and DateTime helpers
├── public/
│   ├── components/     # HTML templates loaded dynamically via loader.js
│   ├── stores/         # Alpine.js global state (locations, results)
│   ├── map/            # MapLibre GL implementation
│   └── index.html      # Main entry point
├── app.js              # Server entry point
└── config.env          # System configuration
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/connections` | `POST` | Fetches transit itineraries from OTP. |
| `/api/bikesharing` | `POST` | Finds closest WhiteBikes stations for a route. |
| `/api/getTripDetails` | `POST` | Fetches detailed stop lists for a specific transit trip. |
| `/api/getVehicleDetails` | `POST` | Fetches real-time vehicle positions (where available). |

## 📜 License

Distributed under the MIT License. See `package.json` for details.

---
*Developed by [o-kollar](https://github.com/o-kollar)*
