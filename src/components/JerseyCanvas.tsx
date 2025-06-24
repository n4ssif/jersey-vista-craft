
import React, { useRef, useEffect } from 'react';
import { Canvas as FabricCanvas, Rect, Text, FabricImage } from 'fabric';
import { JerseyConfig } from './JerseyConfigurator';

interface JerseyCanvasProps {
  config: JerseyConfig;
}

export const JerseyCanvas: React.FC<JerseyCanvasProps> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  // Helper function to create gradient or solid color
  const createFillPattern = (canvas: FabricCanvas, color: string, width: number, height: number) => {
    if (color.startsWith('linear-gradient')) {
      // Parse the gradient string to create a Fabric.js gradient
      const gradientCanvas = document.createElement('canvas');
      gradientCanvas.width = width;
      gradientCanvas.height = height;
      const ctx = gradientCanvas.getContext('2d');
      
      if (ctx) {
        // Create a temporary div to apply the gradient and extract colors
        const tempDiv = document.createElement('div');
        tempDiv.style.background = color;
        tempDiv.style.width = '100px';
        tempDiv.style.height = '100px';
        document.body.appendChild(tempDiv);
        
        // For gradients, we'll create a pattern that mimics the effect
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        
        // Gold gradient approximation
        if (color.includes('FFD700') || color.includes('gold')) {
          gradient.addColorStop(0, '#FFD700');
          gradient.addColorStop(0.25, '#FFA500');
          gradient.addColorStop(0.5, '#FFD700');
          gradient.addColorStop(0.75, '#B8860B');
          gradient.addColorStop(1, '#FFD700');
        } else if (color.includes('C0C0C0') || color.includes('silver')) {
          gradient.addColorStop(0, '#C0C0C0');
          gradient.addColorStop(0.25, '#808080');
          gradient.addColorStop(0.5, '#C0C0C0');
          gradient.addColorStop(0.75, '#696969');
          gradient.addColorStop(1, '#C0C0C0');
        } else {
          // Default gradient
          gradient.addColorStop(0, '#1e40af');
          gradient.addColorStop(1, '#3b82f6');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        document.body.removeChild(tempDiv);
        
        return gradientCanvas.toDataURL();
      }
    }
    return color;
  };

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
      const primaryFill = createFillPattern(canvas, config.primaryColor, 300, 350);
      const accentFill = createFillPattern(canvas, config.accentColor, 100, 100);

      // Main body
      const body = new Rect({
        left: 50,
        top: 100,
        width: 300,
        height: 350,
        fill: typeof primaryFill === 'string' && primaryFill.startsWith('data:') ? 
          new FabricImage.prototype.constructor.fromURL(primaryFill).then((img: any) => {
            const pattern = new (canvas as any).Pattern({
              source: img.getElement(),
              repeat: 'no-repeat'
            });
            return pattern;
          }) : primaryFill,
        selectable: false,
        evented: false,
      });

      // If it's a gradient pattern, handle it differently
      if (typeof primaryFill === 'string' && primaryFill.startsWith('data:')) {
        try {
          const patternImg = await FabricImage.fromURL(primaryFill);
          body.set('fill', new (fabric as any).Pattern({
            source: patternImg.getElement(),
            repeat: 'no-repeat'
          }));
        } catch (error) {
          body.set('fill', config.primaryColor.includes('gradient') ? '#1e40af' : config.primaryColor);
        }
      }

      // Sleeves
      const leftSleeve = new Rect({
        left: 20,
        top: 120,
        width: 60,
        height: 150,
        fill: config.primaryColor.includes('gradient') ? '#1e40af' : config.primaryColor,
        selectable: false,
        evented: false,
      });

      const rightSleeve = new Rect({
        left: 320,
        top: 120,
        width: 60,
        height: 150,
        fill: config.primaryColor.includes('gradient') ? '#1e40af' : config.primaryColor,
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
        selectable: false,
        evented: false,
      });

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

      // Add shadow effect for gradient colors
      if (config.accentColor.includes('gradient')) {
        playerNumber.set({
          shadow: {
            color: 'rgba(0,0,0,0.3)',
            blur: 3,
            offsetX: 2,
            offsetY: 2
          }
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
        selectable: false,
        evented: false,
      });

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
