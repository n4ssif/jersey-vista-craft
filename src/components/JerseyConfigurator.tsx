
import React, { useState } from 'react';
import { JerseyCanvas } from './JerseyCanvas';
import { ColorPicker } from './ColorPicker';
import { TextCustomizer } from './TextCustomizer';
import { ShieldUpload } from './ShieldUpload';
import { ExportPanel } from './ExportPanel';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export interface JerseyConfig {
  // Individual part colors
  torsoColor: string;
  torsoTrimColor: string;
  sleeveColor: string;
  sleeveTrimColor: string;
  neckColor: string;
  
  // Text colors
  secondaryColor: string;
  accentColor: string;
  
  // Text content and styling
  playerName: string;
  playerNumber: string;
  teamName: string;
  font: string;
  fontSize: number;
  
  // Shield
  shieldUrl: string | null;
  shieldSize: number;
  shieldPosition: { x: number; y: number };
}

export type JerseyPart = 'torso' | 'torsoTrim' | 'sleeve' | 'sleeveTrim' | 'neck';

export const JerseyConfigurator: React.FC = () => {
  const [config, setConfig] = useState<JerseyConfig>({
    torsoColor: '#1e40af',
    torsoTrimColor: '#ffffff',
    sleeveColor: '#1e40af',
    sleeveTrimColor: '#ffffff',
    neckColor: '#ffffff',
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    playerName: 'PLAYER',
    playerNumber: '10',
    teamName: 'TEAM',
    font: 'Arial',
    fontSize: 24,
    shieldUrl: null,
    shieldSize: 60,
    shieldPosition: { x: 120, y: 200 }
  });

  const [selectedPart, setSelectedPart] = useState<JerseyPart | null>(null);
  const [activeTab, setActiveTab] = useState('colors');

  const updateConfig = (updates: Partial<JerseyConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handlePartClick = (part: JerseyPart) => {
    console.log('Part clicked:', part);
    setSelectedPart(part);
    setActiveTab('colors');
  };

  const handleColorChange = (color: string) => {
    if (!selectedPart) return;
    
    const colorMap = {
      torso: 'torsoColor',
      torsoTrim: 'torsoTrimColor',
      sleeve: 'sleeveColor',
      sleeveTrim: 'sleeveTrimColor',
      neck: 'neckColor'
    };
    
    updateConfig({ [colorMap[selectedPart]]: color });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Canvas Area */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Jersey Preview</h2>
          <p className="text-sm text-gray-600 mb-4">
            {selectedPart ? `Click a color below to change the ${selectedPart} color, or click another part` : 'Click on any part of the jersey to customize its color'}
          </p>
          <JerseyCanvas 
            config={config} 
            onPartClick={handlePartClick}
            selectedPart={selectedPart}
          />
          
          {/* Quick Color Palette */}
          {selectedPart && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Quick Colors for {selectedPart}:</h4>
              <div className="flex flex-wrap gap-2">
                {['#1e40af', '#dc2626', '#059669', '#7c3aed', '#ea580c', '#000000', '#ffffff', '#fbbf24', '#f97316', '#06b6d4'].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Controls Panel */}
      <div className="space-y-6">
        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="shield">Shield</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="mt-4">
              <ColorPicker 
                config={config} 
                updateConfig={updateConfig}
                selectedPart={selectedPart}
                onPartSelect={setSelectedPart}
              />
            </TabsContent>
            
            <TabsContent value="text" className="mt-4">
              <TextCustomizer config={config} updateConfig={updateConfig} />
            </TabsContent>
            
            <TabsContent value="shield" className="mt-4">
              <ShieldUpload config={config} updateConfig={updateConfig} />
            </TabsContent>
            
            <TabsContent value="export" className="mt-4">
              <ExportPanel config={config} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
