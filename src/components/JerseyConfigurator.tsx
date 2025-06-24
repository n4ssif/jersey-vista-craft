
import React, { useState } from 'react';
import { JerseyCanvas } from './JerseyCanvas';
import { ColorPicker } from './ColorPicker';
import { TextCustomizer } from './TextCustomizer';
import { ExportPanel } from './ExportPanel';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export interface JerseyConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  playerName: string;
  playerNumber: string;
  teamName: string;
  font: string;
  fontSize: number;
}

export const JerseyConfigurator: React.FC = () => {
  const [config, setConfig] = useState<JerseyConfig>({
    primaryColor: '#1e40af',
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    playerName: 'PLAYER',
    playerNumber: '10',
    teamName: 'TEAM',
    font: 'Arial',
    fontSize: 24
  });

  const updateConfig = (updates: Partial<JerseyConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Canvas Area */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Jersey Preview</h2>
          <JerseyCanvas config={config} />
        </Card>
      </div>

      {/* Controls Panel */}
      <div className="space-y-6">
        <Card className="p-6">
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="mt-4">
              <ColorPicker config={config} updateConfig={updateConfig} />
            </TabsContent>
            
            <TabsContent value="text" className="mt-4">
              <TextCustomizer config={config} updateConfig={updateConfig} />
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
