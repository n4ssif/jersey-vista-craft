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
      stroke: isSelected ? '#3b82f6' : 'transparent',
      strokeWidth: isSelected ? 3 : 0,
    });
    rect.set('jerseyPart', part);
    
    rect.on('mousedown', () => {
      console.log('Clicked jersey part:', part);
      onPartClick?.(part);
    });
    
    return rect;
  };

  const calculateShieldScale = (imageWidth: number, imageHeight: number, maxSize: number, canvasWidth: number, canvasHeight: number) => {
    // Calculate the maximum allowed dimensions based on canvas size
    const maxWidth = canvasWidth * 0.25; // Max 25% of canvas width
    const maxHeight = canvasHeight * 0.2; // Max 20% of canvas height
    
    // Calculate scale based on the user's size preference
    const userScale = maxSize / 100;
    
    // Calculate what the actual dimensions would be with user's scale
    const scaledWidth = imageWidth * userScale;
    const scaledHeight = imageHeight * userScale;
    
    // If the scaled dimensions exceed our maximum allowed dimensions, adjust the scale
    let finalScale = userScale;
    
    if (scaledWidth > maxWidth) {
      finalScale = Math.min(finalScale, maxWidth / imageWidth);
    }
    
    if (scaledHeight > maxHeight) {
      finalScale = Math.min(finalScale, maxHeight / imageHeight);
    }
    
    return finalScale;
  };

  const constrainShieldPosition = (x: number, y: number, shieldWidth: number, shieldHeight: number, canvasWidth: number, canvasHeight: number) => {
    // Ensure shield doesn't go outside canvas boundaries
    const constrainedX = Math.max(0, Math.min(x, canvasWidth - shieldWidth));
    const constrainedY = Math.max(0, Math.min(y, canvasHeight - shieldHeight));
    
    return { x: constrainedX, y: constrainedY };
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

    // Player number (large)
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
        
        // Calculate appropriate scale to fit canvas
        const scale = calculateShieldScale(
          img.width || 100,
          img.height || 100,
          config.shieldSize,
          canvas.width || 400,
          canvas.height || 500
        );
        
        // Calculate actual shield dimensions after scaling
        const shieldWidth = (img.width || 100) * scale;
        const shieldHeight = (img.height || 100) * scale;
        
        // Constrain position to keep shield within canvas
        const constrainedPosition = constrainShieldPosition(
          config.shieldPosition.x,
          config.shieldPosition.y,
          shieldWidth,
          shieldHeight,
          canvas.width || 400,
          canvas.height || 500
        );
        
        img.set({
          left: constrainedPosition.x,
          top: constrainedPosition.y,
          scaleX: scale,
          scaleY: scale,
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
    canvas.add(
      torso, 
      leftTorsoTrim, 
      rightTorsoTrim,
      leftSleeve, 
      rightSleeve, 
      leftSleeveTrim,
      rightSleeveTrim,
      collar, 
      playerNumber, 
      playerName
    );

    // Add shield on back if available (positioned differently for back view)
    if (config.shieldUrl) {
      try {
        const img = await FabricImage.fromURL(config.shieldUrl);
        
        // Calculate appropriate scale to fit canvas
        const scale = calculateShieldScale(
          img.width || 100,
          img.height || 100,
          config.shieldSize,
          canvas.width || 400,
          canvas.height || 500
        );
        
        // Calculate actual shield dimensions after scaling
        const shieldWidth = (img.width || 100) * scale;
        const shieldHeight = (img.height || 100) * scale;
        
        // Constrain position to keep shield within canvas (with offset for back view)
        const constrainedPosition = constrainShieldPosition(
          config.shieldPosition.x,
          config.shieldPosition.y + 50, // Slightly lower position for back view
          shieldWidth,
          shieldHeight,
          canvas.width || 400,
          canvas.height || 500
        );
        
        img.set({
          left: constrainedPosition.x,
          top: constrainedPosition.y,
          scaleX: scale,
          scaleY: scale,
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
