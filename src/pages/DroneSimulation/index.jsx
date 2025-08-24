// Implementation using a Sketchfab drone model with Cesium Ion
import React, { useRef, useState, useEffect } from "react";
import {
  Viewer,
  Entity,
  PolylineGraphics,
  CameraFlyTo,
  PointGraphics,
  ModelGraphics,
} from "resium";
import {
  Cartesian3,
  Color,
  SampledPositionProperty,
  JulianDate,
  ClockRange,
  ClockStep,
  HeadingPitchRoll,
  createWorldTerrainAsync,
  Ion,
  Quaternion,
  SampledProperty,
  IonResource,
} from "cesium";
import Papa from "papaparse";

// Initialize Ion with your token - replace with your actual token
const CESIUM_ION_TOKEN = import.meta.env.VITE_CESIUM_ION_TOKEN;

// Sketchfab drone model asset ID
const DRONE_ASSET_ID = 3399535;

const DronePathCesium = () => {
  const [positions, setPositions] = useState([]);
  const [sampledPosition, setSampledPosition] = useState(null);
  const [orientationProperty, setOrientationProperty] = useState(null);
  const [droneModelResource, setDroneModelResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef();

  // Set up Ion and load drone model
  useEffect(() => {
    // Set Ion token
    if (CESIUM_ION_TOKEN) {
      Ion.defaultAccessToken = CESIUM_ION_TOKEN;
    }

    // Preload Cesium assets
    Ion.preload();

    // Load the drone model from Cesium Ion
    async function loadDroneModel() {
      try {
        setIsLoading(true);
        const resource = await IonResource.fromAssetId(DRONE_ASSET_ID);
        setDroneModelResource(resource);
        console.log("Drone model loaded successfully");
      } catch (error) {
        console.error("Error loading drone model:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDroneModel();
  }, []);

  const dummyPath = [
    { latitude: 37.7749, longitude: -122.4194, altitude: 100 },
    { latitude: 37.7755, longitude: -122.4184, altitude: 150 },
    { latitude: 37.776, longitude: -122.4174, altitude: 200 },
    { latitude: 37.7765, longitude: -122.4164, altitude: 250 },
    { latitude: 37.777, longitude: -122.4154, altitude: 200 },
    { latitude: 37.7775, longitude: -122.4144, altitude: 150 },
  ];

  const convertToSampledPosition = (points) => {
    const property = new SampledPositionProperty();
    const start = JulianDate.now();

    points.forEach((point, index) => {
      const time = JulianDate.addSeconds(start, index * 5, new JulianDate());
      const position = Cartesian3.fromDegrees(
        parseFloat(point.longitude),
        parseFloat(point.latitude),
        parseFloat(point.altitude || 0)
      );
      property.addSample(time, position);
    });

    return property;
  };

  const computeOrientation = (points) => {
    const orientationProperty = new SampledProperty(Quaternion);
    const start = JulianDate.now();
    const positions = points.map(({ latitude, longitude, altitude }) =>
      Cartesian3.fromDegrees(
        parseFloat(longitude),
        parseFloat(latitude),
        parseFloat(altitude || 0)
      )
    );

    for (let i = 0; i < positions.length - 1; i++) {
      const currentPosition = positions[i];
      const nextPosition = positions[i + 1];

      // Calculate direction
      const direction = Cartesian3.subtract(
        nextPosition,
        currentPosition,
        new Cartesian3()
      );
      Cartesian3.normalize(direction, direction);

      // Create a heading/pitch/roll
      const hpr = new HeadingPitchRoll();

      // Calculate heading (yaw)
      hpr.heading = Math.atan2(direction.y, direction.x);

      // Calculate pitch
      const horizontalDistance = Math.sqrt(
        direction.x * direction.x + direction.y * direction.y
      );
      hpr.pitch = Math.atan2(direction.z, horizontalDistance);

      // Convert to quaternion
      const quaternion = Quaternion.fromHeadingPitchRoll(hpr);

      // Add to sampled property
      const time = JulianDate.addSeconds(start, i * 5, new JulianDate());
      orientationProperty.addSample(time, quaternion);
    }

    // Add the final orientation
    if (positions.length > 1) {
      const time = JulianDate.addSeconds(
        start,
        (positions.length - 1) * 5,
        new JulianDate()
      );

      // Use the last computed quaternion
      const lastQuaternion = orientationProperty.getValue(
        JulianDate.addSeconds(
          start,
          (positions.length - 2) * 5,
          new JulianDate()
        )
      );

      if (lastQuaternion) {
        orientationProperty.addSample(time, lastQuaternion);
      }
    }

    return orientationProperty;
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        const formatted = results.data.map((row) => ({
          latitude: row.latitude,
          longitude: row.longitude,
          altitude: row.altitude || 100, // Default altitude if not provided
        }));

        setPositions(formatted);
        const posProperty = convertToSampledPosition(formatted);
        setSampledPosition(posProperty);
        setOrientationProperty(computeOrientation(formatted));
      },
    });
  };

  useEffect(() => {
    setPositions(dummyPath);
    const posProperty = convertToSampledPosition(dummyPath);
    setSampledPosition(posProperty);
    setOrientationProperty(computeOrientation(dummyPath));
  }, []);

  const cartesianPositions = positions.map(
    ({ latitude, longitude, altitude }) =>
      Cartesian3.fromDegrees(
        parseFloat(longitude),
        parseFloat(latitude),
        parseFloat(altitude || 0)
      )
  );

  const startTime = JulianDate.now();
  const stopTime = JulianDate.addSeconds(
    startTime,
    (positions.length - 1) * 5,
    new JulianDate()
  );

  return (
    <div style={{ height: "100vh" }}>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleCSVUpload}
        style={{ position: "absolute", zIndex: 1000, padding: 10 }}
      />
      {isLoading && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            top: 10,
            right: 10,
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "8px 12px",
            borderRadius: 4,
          }}
        >
          Loading drone model...
        </div>
      )}
      <Viewer
        full
        baseLayerPicker={true}
        geocoder={false}
        homeButton={false}
        sceneModePicker={false}
        navigationHelpButton={false}
        animation={true}
        timeline={true}
        fullscreenButton={false}
        terrainProvider={createWorldTerrainAsync({
          requestVertexNormals: true,
          requestWaterMask: true,
        })}
        scene3DOnly={true}
        clock={{
          startTime: startTime,
          currentTime: startTime,
          stopTime: stopTime,
          clockRange: ClockRange.LOOP_STOP,
          clockStep: ClockStep.SYSTEM_CLOCK_MULTIPLIER,
          multiplier: 1,
        }}
      >
        {cartesianPositions.length > 0 && (
          <CameraFlyTo
            destination={Cartesian3.fromDegrees(
              positions[0].longitude,
              positions[0].latitude,
              positions[0].altitude + 500 // Position camera 500m above the starting point
            )}
            duration={2}
          />
        )}

        {/* Path Polyline */}
        {cartesianPositions.length > 0 && (
          <Entity>
            <PolylineGraphics
              positions={cartesianPositions}
              width={5}
              material={Color.CYAN}
            />
          </Entity>
        )}

        {/* Markers at waypoints */}
        {cartesianPositions.map((pos, index) => (
          <Entity
            key={`waypoint-${index}`}
            position={pos}
            name={`Waypoint ${index + 1}`}
          >
            <PointGraphics
              pixelSize={10}
              color={Color.YELLOW}
              outlineColor={Color.BLACK}
              outlineWidth={1}
            />
          </Entity>
        ))}

        {/* 3D Drone Model */}
        {sampledPosition && orientationProperty && droneModelResource && (
          <Entity
            position={sampledPosition}
            orientation={orientationProperty}
            name="Drone"
          >
            <ModelGraphics
              uri={droneModelResource}
              minimumPixelSize={64}
              maximumScale={200}
              runAnimations={true}
              scale={5} // Adjust scale as needed based on your model
            />
          </Entity>
        )}

        {/* Fallback drone if the model fails to load */}
        {sampledPosition && orientationProperty && !droneModelResource && (
          <Entity
            position={sampledPosition}
            orientation={orientationProperty}
            name="Drone"
          >
            <PointGraphics
              pixelSize={15}
              color={Color.RED}
              outlineColor={Color.WHITE}
              outlineWidth={2}
            />
          </Entity>
        )}
      </Viewer>
    </div>
  );
};

export default DronePathCesium;
