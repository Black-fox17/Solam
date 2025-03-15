"use client"; // Ensure it runs on the client side in Next.js App Router

import { useEffect, useRef } from "react";
import * as atlas from "azure-maps-control";

const AzureMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new atlas.Map(mapRef.current, {
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: "60EshlLjwBz6v7TNJDkk6Qee405abgjXqg0UnCWM1LCHY2FFQyKoJQQJ99BCACYeBjFoYdRzAAAgAZMP2iFv", // Store in .env.local
      },
      center: [-74.006, 40.7128], // Example: New York coordinates
      zoom: 10,
    });

    return () => map.dispose();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default AzureMap;
