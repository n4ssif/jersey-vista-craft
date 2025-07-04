import React, { useRef, useEffect } from 'react';
import { Canvas as FabricCanvas, Rect, Text, FabricImage } from 'fabric';
import { JerseyConfig, JerseyPart } from './JerseyConfigurator';

interface DualJerseyCanvasProps {
  config: JerseyConfig;
  onPartClick?: (part: JerseyPart) => void;
  selectedPart?: JerseyPart | null;
}

export const DualJerseyCanvas: React.FC<DualJerseyCanvasProps> = ({ config, onPartClick, selectedPart }) => {
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontFabricCanvasRef = useRef<FabricCanvas | null>(null);
  const backFabricCanvasRef = useRef<FabricCanvas | null>(null);

  const createJerseyPart = (
    left: number,
    top: number,
    width: number,
    height: number,
    fill: string,
    part: JerseyPart,
    isSelected: boolean,
    canvas: FabricCanvas
  ) => {
    const rect = new Rect({
      left,
      top,
      width,
      height,
      fill,
      selectable: false,
      evented: true,
      hoverCursor: 'pointer',
      stroke: isSelected ? '#3b82f6' : '#000000',
      strokeWidth: isSelected ? 3 : 1,
    });
    rect.set('jerseyPart', part);
    
    rect.on('mousedown', () => {
      console.log('Clicked jersey part:', part);
      onPartClick?.(part);
    });
    
    return rect;
  };

  const createFrontJersey = async (canvas: FabricCanvas) => {
    // Main torso body
    const torso = createJerseyPart(70, 100, 260, 350, config.torsoColor, 'torso', selectedPart === 'torso', canvas);
    
    // Torso side trims
    const leftTorsoTrim = createJerseyPart(50, 100, 20, 350, config.torsoTrimColor, 'torsoTrim', selectedPart === 'torsoTrim', canvas);
    const rightTorsoTrim = createJerseyPart(330, 100, 20, 350, config.torsoTrimColor, 'torsoTrim', selectedPart === 'torsoTrim', canvas);
    
    // Main sleeves
    const leftSleeve = createJerseyPart(20, 120, 50, 120, config.sleeveColor, 'sleeve', selectedPart === 'sleeve', canvas);
    const rightSleeve = createJerseyPart(330, 120, 50, 120, config.sleeveColor, 'sleeve', selectedPart === 'sleeve', canvas);
    
    // Sleeve end trims
    const leftSleeveTrim = createJerseyPart(20, 220, 50, 20, config.sleeveTrimColor, 'sleeveTrim', selectedPart === 'sleeveTrim', canvas);
    const rightSleeveTrim = createJerseyPart(330, 220, 50, 20, config.sleeveTrimColor, 'sleeveTrim', selectedPart === 'sleeveTrim', canvas);
    
    // Collar/Neck
    const collar = createJerseyPart(150, 80, 100, 40, config.neckColor, 'neck', selectedPart === 'neck', canvas);

    // Player number (large) - no team name on front
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

    canvas.clear();
    // Add elements in order: torso, torso trim, then sleeves on top
    canvas.add(
      torso, 
      leftTorsoTrim, 
      rightTorsoTrim,
      collar,
      leftSleeve, 
      rightSleeve, 
      leftSleeveTrim,
      rightSleeveTrim,
      playerNumber, 
      playerName
    );

    // Add shield with size normalization
    if (config.shieldUrl) {
      try {
        const img = await FabricImage.fromURL(config.shieldUrl);
        
        // Calculate normalized scale - clamp to maximum of 50 pixels
        const maxSize = 50;
        const originalWidth = img.width || 100;
        const originalHeight = img.height || 100;
        const maxDimension = Math.max(originalWidth, originalHeight);
        const normalizedScale = Math.min(maxSize / maxDimension, 1);
        
        // Apply user's size preference on top of normalized scale
        const userScale = config.shieldSize / 100;
        const finalScale = normalizedScale * userScale;
        
        img.set({
          left: config.shieldPosition.x,
          top: config.shieldPosition.y,
          scaleX: finalScale,
          scaleY: finalScale,
          selectable: false,
          evented: false,
        });
        canvas.add(img);
      } catch (error) {
        console.error('Error loading shield image on front:', error);
      }
    }

    canvas.renderAll();
  };

  const createBackJersey = async (canvas: FabricCanvas) => {
    // Main torso body
    const torso = createJerseyPart(70, 100, 260, 350, config.torsoColor, 'torso', selectedPart === 'torso', canvas);
    
    // Torso side trims
    const leftTorsoTrim = createJerseyPart(50, 100, 20, 350, config.torsoTrimColor, 'torsoTrim', selectedPart === 'torsoTrim', canvas);
    const rightTorsoTrim = createJerseyPart(330, 100, 20, 350, config.torsoTrimColor, 'torsoTrim', selectedPart === 'torsoTrim', canvas);
    
    // Main sleeves (reversed positions for back view)
    const leftSleeve = createJerseyPart(330, 120, 50, 120, config.sleeveColor, 'sleeve', selectedPart === 'sleeve', canvas);
    const rightSleeve = createJerseyPart(20, 120, 50, 120, config.sleeveColor, 'sleeve', selectedPart === 'sleeve', canvas);
    
    // Sleeve end trims (reversed positions for back view)
    const leftSleeveTrim = createJerseyPart(330, 220, 50, 20, config.sleeveTrimColor, 'sleeveTrim', selectedPart === 'sleeveTrim', canvas);
    const rightSleeveTrim = createJerseyPart(20, 220, 50, 20, config.sleeveTrimColor, 'sleeveTrim', selectedPart === 'sleeveTrim', canvas);
    
    // Collar/Neck
    const collar = createJerseyPart(150, 80, 100, 40, config.neckColor, 'neck', selectedPart === 'neck', canvas);

    // Team name - only on back
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

    // Player number (large) - centered on back
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

    // Player name on back
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

    canvas.clear();
    // Add elements in order: torso, torso trim, then sleeves on top
    canvas.add(
      torso, 
      leftTorsoTrim, 
      rightTorsoTrim,
      collar, 
      leftSleeve, 
      rightSleeve, 
      leftSleeveTrim,
      rightSleeveTrim,
      teamName, 
      playerNumber, 
      playerName
    );

    // Add shield on back with size normalization
    if (config.shieldUrl) {
      try {
        const img = await FabricImage.fromURL(config.shieldUrl);
        
        // Calculate normalized scale - clamp to maximum of 50 pixels
        const maxSize = 50;
        const originalWidth = img.width || 100;
        const originalHeight = img.height || 100;
        const maxDimension = Math.max(originalWidth, originalHeight);
        const normalizedScale = Math.min(maxSize / maxDimension, 1);
        
        // Apply user's size preference on top of normalized scale
        const userScale = config.shieldSize / 100;
        const finalScale = normalizedScale * userScale;
        
        img.set({
          left: config.shieldPosition.x,
          top: config.shieldPosition.y + 50,
          scaleX: finalScale,
          scaleY: finalScale,
          selectable: false,
          evented: false,
        });
        canvas.add(img);
      } catch (error) {
        console.error('Error loading shield image on back:', error);
      }
    }

    canvas.renderAll();
  };

  useEffect(() => {
    if (!frontCanvasRef.current || !backCanvasRef.current) return;

    const frontCanvas = new FabricCanvas(frontCanvasRef.current, {
      width: 400,
      height: 500,
      backgroundColor: '#f8f9fa',
    });

    const backCanvas = new FabricCanvas(backCanvasRef.current, {
      width: 400,
      height: 500,
      backgroundColor: '#f8f9fa',
    });

    frontFabricCanvasRef.current = frontCanvas;
    backFabricCanvasRef.current = backCanvas;

    createFrontJersey(frontCanvas);
    createBackJersey(backCanvas);

    return () => {
      frontCanvas.dispose();
      backCanvas.dispose();
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
    config.shieldPosition.y,
    selectedPart,
    onPartClick
  ]);

  return (
    <div className="flex justify-center gap-8">
      <div className="text-center">
        <h4 className="text-sm font-medium mb-2">Front View</h4>
        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <canvas ref={frontCanvasRef} className="max-w-full" />
        </div>
      </div>
      <div className="text-center">
        <h4 className="text-sm font-medium mb-2">Back View</h4>
        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <canvas ref={backCanvasRef} className="max-w-full" />
        </div>
      </div>
    </div>
  );
};
