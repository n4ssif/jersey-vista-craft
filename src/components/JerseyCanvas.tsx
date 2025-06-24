
import React, { useRef, useEffect } from 'react';
import { Canvas as FabricCanvas, Rect, Text, Group } from 'fabric';
import { JerseyConfig } from './JerseyConfigurator';

interface JerseyCanvasProps {
  config: JerseyConfig;
}

export const JerseyCanvas: React.FC<JerseyCanvasProps> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 400,
      height: 500,
      backgroundColor: '#f8f9fa',
    });

    fabricCanvasRef.current = canvas;

    // Create the jersey shape using rectangles and paths
    const createJersey = () => {
      // Main body
      const body = new Rect({
        left: 50,
        top: 100,
        width: 300,
        height: 350,
        fill: config.primaryColor,
        selectable: false,
        evented: false,
      });

      // Sleeves
      const leftSleeve = new Rect({
        left: 20,
        top: 120,
        width: 60,
        height: 150,
        fill: config.primaryColor,
        selectable: false,
        evented: false,
      });

      const rightSleeve = new Rect({
        left: 320,
        top: 120,
        width: 60,
        height: 150,
        fill: config.primaryColor,
        selectable: false,
        evented: false,
      });

      // Collar
      const collar = new Rect({
        left: 150,
        top: 80,
        width: 100,
        height: 40,
        fill: config.secondaryColor,
        selectable: false,
        evented: false,
      });

      // Team name
      const teamName = new Text(config.teamName, {
        left: 200,
        top: 150,
        fontSize: config.fontSize - 4,
        fontFamily: config.font,
        fill: config.secondaryColor,
        textAlign: 'center',
        originX: 'center',
        selectable: false,
        evented: false,
      });

      // Player number (large)
      const playerNumber = new Text(config.playerNumber, {
        left: 200,
        top: 220,
        fontSize: config.fontSize + 20,
        fontFamily: config.font,
        fill: config.accentColor,
        textAlign: 'center',
        originX: 'center',
        fontWeight: 'bold',
        selectable: false,
        evented: false,
      });

      // Player name
      const playerName = new Text(config.playerName, {
        left: 200,
        top: 320,
        fontSize: config.fontSize,
        fontFamily: config.font,
        fill: config.secondaryColor,
        textAlign: 'center',
        originX: 'center',
        selectable: false,
        evented: false,
      });

      // Clear canvas and add all elements
      canvas.clear();
      canvas.add(body, leftSleeve, rightSleeve, collar, teamName, playerNumber, playerName);
      canvas.renderAll();
    };

    createJersey();

    return () => {
      canvas.dispose();
    };
  }, [config]);

  return (
    <div className="flex justify-center">
      <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  );
};
