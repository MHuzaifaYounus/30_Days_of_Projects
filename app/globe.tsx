"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

interface Point {
  id: number;
  lat: number;
  lon: number;
  projectLink: string;
}

const RotatingGlobe = ({ points }: { points: Point[] }) => {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false); // State to track if a point is hovered
  const globeRef = useRef<THREE.Group>(null);
  const [globeRadius, setGlobeRadius] = useState<number>(3);

  // Auto-rotate the globe unless hovering over a point
  useFrame(() => {
    if (globeRef.current && !isHovering) {
      globeRef.current.rotation.y += 0.002; // Adjust speed (lower value for slower rotation)
    }
  });

  const handleClick = (projectLink: string) => {
    router.push(projectLink); // Redirect to the project
  };

  useEffect(() => {
    if (screen.width <= 700) {
      setGlobeRadius(1.4);
    }
  }, []);

  // Convert lat/lon to 3D coordinates on the globe
  const convertLatLonToXYZ = (lat: number, lon: number, radius: number = globeRadius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return [x, y, z];
  };

  return (
    <group ref={globeRef}>
      {/* Globe itself */}
      <Sphere args={[globeRadius, 64, 64]}>
        <meshStandardMaterial
          attach="material"
          color="#1E90FF"
          emissive="#112233"
          emissiveIntensity={0.5}
          roughness={2}
          metalness={4}
          wireframe={true}
        />
      </Sphere>

      {/* Points on the globe */}
      {points.map((point) => {
        const [x, y, z] = convertLatLonToXYZ(point.lat, point.lon);

        return (
          <mesh
            key={point.id}
            position={[x, y, z]}
            onClick={() => handleClick(point.projectLink)}
            onPointerOver={() => {
              setIsHovering(true);
              document.body.style.cursor = "pointer"; // Set cursor to pointer on hover
            }}
            onPointerOut={() => {
              setIsHovering(false);
              document.body.style.cursor = "auto"; // Revert cursor when not hovering
            }}
          >
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="white" />
            <Html
              position={[0, 0.1, 0]}
              distanceFactor={10}
              style={{
                pointerEvents: "none",
                textAlign: "center",
                color: "white",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              {`Project ${point.id}`}
            </Html>
          </mesh>
        );
      })}
    </group>
  );
};

const Globe = () => {
  const points: Point[] = [
    { id: 1, lat: 10, lon: 20, projectLink: "/stopwatch-1" },
    { id: 2, lat: -10, lon: 50, projectLink: "/weatherapp-2" },
    { id: 3, lat: -10, lon: 50, projectLink: "/birthdaywisher-3" },
    { id: 4, lat: 40, lon: -70, projectLink: "/numbergussing-4" },
    { id: 5, lat: -40, lon: 120, projectLink: "/calculator-5" },
    { id: 6, lat: 30, lon: -150, projectLink: "/digitalclock-6" },
    { id: 7, lat: 20, lon: 80, projectLink: "/randomjoke-7" },
    { id: 8, lat: -25, lon: -60, projectLink: "/colorpicker-8" },
    { id: 9, lat: 50, lon: 140, projectLink: "/tipcalculator-9" },
    { id: 10, lat: -35, lon: -90, projectLink: "/passwordgenerator-10" },
    { id: 11, lat: 15, lon: -10, projectLink: "/bmicalculator-11" },
    { id: 12, lat: -45, lon: 110, projectLink: "/unitconverter-12" },
    { id: 13, lat: 30, lon: 40, projectLink: "/htmlpreviewer-13" },
    { id: 14, lat: -20, lon: 70, projectLink: "/pomodotimer-14" },
    { id: 15, lat: 45, lon: -80, projectLink: "/expensetracker-15" },
    { id: 16, lat: -50, lon: 160, projectLink: "/moviesearch-16" },
    { id: 17, lat: 25, lon: -40, projectLink: "/custommeme-17" },
    { id: 18, lat: 57, lon: -24, projectLink: "/currencyconverter-18" },
    { id: 19, lat: 46, lon: -20, projectLink: "/githubprofileviewer-19" },
    { id: 20, lat: 54, lon: 24, projectLink: "/notesmaker-20" },
    { id: 21, lat: 73, lon: 90, projectLink: "/recipesearcher-21" },
    { id: 22, lat: 34, lon: 22, projectLink: "/wordcounter-22" },
    { id: 23, lat: 84, lon: 64, projectLink: "/imageslider-23" },
    { id: 24, lat: 58, lon: 58, projectLink: "/quizapp-24" },
  ];

  return (
    <div style={{ height: "100vh", width: "100vw", background: "#001122" }}>
      <Canvas>
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <RotatingGlobe points={points} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default Globe;
