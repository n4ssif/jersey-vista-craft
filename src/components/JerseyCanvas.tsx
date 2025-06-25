
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
    console.log('JerseyCanvas config updated:', config);
    
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 400,
      height: 500,
      backgroundColor: '#f8f9fa',
    });

    fabricCanvasRef.current = canvas;

    // Create the jersey shape using rectangles and paths
    const createJersey = async () => {
      console.log('Creating jersey with individual part colors');

      // Main torso body
      const torso = new Rect({
        left: 70,
        top: 100,
        width: 260,
        height: 350,
        fill: config.torsoColor,
        selectable: false,
        evented: false,
      });

      // Torso side trims
      const leftTorsoTrim = new Rect({
        left: 50,
        top: 100,
        width: 20,
        height: 350,
        fill: config.torsoTrimColor,
        selectable: false,
        evented: false,
      });

      const rightTorsoTrim = new Rect({
        left: 330,
        top: 100,
        width: 20,
        height: 350,
        fill: config.torsoTrimColor,
        selectable: false,
        evented: false,
      });

      // Main sleeves
      const leftSleeve = new Rect({
        left: 20,
        top: 120,
        width: 50,
        height: 120,
        fill: config.sleeveColor,
        selectable: false,
        evented: false,
      });

      const rightSleeve = new Rect({
        left: 330,
        top: 120,
        width: 50,
        height: 120,
        fill: config.sleeveColor,
        selectable: false,
        evented: false,
      });

      // Sleeve end trims
      const leftSleeveTrim = new Rect({
        left: 20,
        top: 220,
        width: 50,
        height: 20,
        fill: config.sleeveTrimColor,
        selectable: false,
        evented: false,
      });

      const rightSleeveTrim = new Rect({
        left: 330,
        top: 220,
        width: 50,
        height: 20,
        fill: config.sleeveTrimColor,
        selectable: false,
        evented: false,
      });

      // Collar/Neck
      const collar = new Rect({
        left: 150,
        top: 80,
        width: 100,
        height: 40,
        fill: config.neckColor,
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

      console.log('Team name text object:', teamName.text);

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

      console.log('Player number text object:', playerNumber.text);

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

      console.log('Player name text object:', playerName.text);

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

      // Clear canvas and add all elements
      canvas.clear();
      canvas.add(
        torso, 
        leftTorsoTrim, 
        rightTorsoTrim,
        leftSleeve, 
        rightSleeve, 
        leftSleeveTrim,
        rightSleeveTrim,
        collar, 
        teamName, 
        playerNumber, 
        playerName
      );

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

      console.log('Canvas objects after adding:', canvas.getObjects().length);
      canvas.renderAll();
    };

    createJersey();

    return () => {
      canvas.dispose();
    };
  }, [
    config.torsoColor, 
    config.torsoTrimColor, 
    config.sleeveColor, 
    config.sleeveTrimColor, 
    config.neckColor,
    config.secondaryColor, 
    config.accentColor, 
    config.teamName, 
    config.playerName, 
    config.playerNumber, 
    config.font, 
    config.fontSize, 
    config.shieldUrl, 
    config.shieldSize, 
    config.shieldPosition.x, 
    config.shieldPosition.y
  ]);

  return (
    <div className="flex justify-center">
      <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </div>
  );
};
