
import React, { useRef, useEffect } from 'react';
import { Canvas as FabricCanvas, Rect, Text, FabricImage } from 'fabric';
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
    const createJersey = async () => {
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
        fill: config.secondaryColor.includes('gradient') ? '#ffffff' : config.secondaryColor,
        selectable: false,
        evented: false,
      });

      // Team name
      const teamName = new Text(config.teamName, {
        left: 200,
        top: 150,
        fontSize: config.fontSize - 4,
        fontFamily: config.font,
        fill: config.secondaryColor.includes('gradient') ? '#ffffff' : config.secondaryColor,
        textAlign: 'center',
        originX: 'center',
        fontWeight: 'bold',
        selectable: false,
        evented: false,
      });

      // Add shadow and stroke effects for gradient text
      if (config.secondaryColor.includes('gradient')) {
        teamName.set({
          shadow: {
            color: 'rgba(0,0,0,0.4)',
            blur: 2,
            offsetX: 1,
            offsetY: 1
          },
          stroke: '#000000',
          strokeWidth: 1
        });
      }

      // Player number (large) - with potential gradient effect
      const playerNumber = new Text(config.playerNumber, {
        left: 200,
        top: 220,
        fontSize: config.fontSize + 20,
        fontFamily: config.font,
        fill: config.accentColor.includes('gradient') ? '#fbbf24' : config.accentColor,
        textAlign: 'center',
        originX: 'center',
        fontWeight: 'bold',
        selectable: false,
        evented: false,
      });

      // Add enhanced shadow and stroke effect for gradient numbers
      if (config.accentColor.includes('gradient')) {
        playerNumber.set({
          shadow: {
            color: 'rgba(0,0,0,0.5)',
            blur: 4,
            offsetX: 2,
            offsetY: 2
          },
          stroke: '#000000',
          strokeWidth: 2
        });
      }

      // Player name
      const playerName = new Text(config.playerName, {
        left: 200,
        top: 320,
        fontSize: config.fontSize,
        fontFamily: config.font,
        fill: config.secondaryColor.includes('gradient') ? '#ffffff' : config.secondaryColor,
        textAlign: 'center',
        originX: 'center',
        fontWeight: 'bold',
        selectable: false,
        evented: false,
      });

      // Add shadow effect for gradient player name
      if (config.secondaryColor.includes('gradient')) {
        playerName.set({
          shadow: {
            color: 'rgba(0,0,0,0.4)',
            blur: 2,
            offsetX: 1,
            offsetY: 1
          },
          stroke: '#000000',
          strokeWidth: 1
        });
      }

      // Clear canvas and add basic elements
      canvas.clear();
      canvas.add(body, leftSleeve, rightSleeve, collar, teamName, playerNumber, playerName);

      // Add shield if available
      if (config.shieldUrl) {
        try {
          const img = await FabricImage.fromURL(config.shieldUrl);
          img.set({
            left: config.shieldPosition.x,
            top: config.shieldPosition.y,
            scaleX: config.shieldSize / 100,
            scaleY: config.shieldSize / 100,
            selectable: false,
            evented: false,
          });
          canvas.add(img);
        } catch (error) {
          console.error('Error loading shield image:', error);
        }
      }

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
