
import React from 'react';
import { JerseyConfig } from './JerseyConfigurator';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

interface TextCustomizerProps {
  config: JerseyConfig;
  updateConfig: (updates: Partial<JerseyConfig>) => void;
}

export const TextCustomizer: React.FC<TextCustomizerProps> = ({ config, updateConfig }) => {
  const fontOptions = [
    'Impact',
    'Arial Black',
    'Helvetica',
    'Arial',
    'Franklin Gothic Medium',
    'Bebas Neue',
    'Oswald',
    'Anton',
    'Barlow Condensed',
    'Fjalla One',
    'Russo One',
    'Bangers',
    'Fredoka One',
    'Righteous',
    'Teko',
    'Squada One',
    'Orbitron',
    'Exo 2',
    'Rajdhani',
    'Play'
  ];

  const gradientPresets = [
    { name: 'Gold Shine', value: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #B8860B 75%, #FFD700 100%)' },
    { name: 'Silver Metallic', value: 'linear-gradient(135deg, #C0C0C0 0%, #808080 25%, #C0C0C0 50%, #696969 75%, #C0C0C0 100%)' },
    { name: 'Bronze Glow', value: 'linear-gradient(135deg, #CD7F32 0%, #8C4A2F 25%, #CD7F32 50%, #A0522D 75%, #CD7F32 100%)' },
    { name: 'Fire Red', value: 'linear-gradient(135deg, #FF4500 0%, #DC143C 50%, #B22222 100%)' },
    { name: 'Electric Blue', value: 'linear-gradient(135deg, #00BFFF 0%, #0080FF 50%, #0040FF 100%)' },
    { name: 'Neon Green', value: 'linear-gradient(135deg, #39FF14 0%, #00FF00 50%, #00CC00 100%)' },
    { name: 'Purple Chrome', value: 'linear-gradient(135deg, #9370DB 0%, #6A5ACD 50%, #483D8B 100%)' },
    { name: 'Copper Shine', value: 'linear-gradient(135deg, #B87333 0%, #8B4513 50%, #A0522D 100%)' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Text Customization</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="team-name" className="text-sm font-medium mb-2 block">
            Team Name
          </Label>
          <Input
            id="team-name"
            value={config.teamName}
            onChange={(e) => updateConfig({ teamName: e.target.value.toUpperCase() })}
            placeholder="Enter team name"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="player-name" className="text-sm font-medium mb-2 block">
            Player Name
          </Label>
          <Input
            id="player-name"
            value={config.playerName}
            onChange={(e) => updateConfig({ playerName: e.target.value.toUpperCase() })}
            placeholder="Enter player name"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="player-number" className="text-sm font-medium mb-2 block">
            Player Number
          </Label>
          <Input
            id="player-number"
            value={config.playerNumber}
            onChange={(e) => updateConfig({ playerNumber: e.target.value })}
            placeholder="Enter number"
            className="w-full"
            maxLength={3}
          />
        </div>

        <div>
          <Label htmlFor="font-family" className="text-sm font-medium mb-2 block">
            Font Family
          </Label>
          <Select value={config.font} onValueChange={(value) => updateConfig({ font: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font} value={font}>
                  <span style={{ fontFamily: font, fontWeight: 'bold' }}>{font}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="font-size" className="text-sm font-medium mb-2 block">
            Font Size: {config.fontSize}px
          </Label>
          <Slider
            id="font-size"
            min={16}
            max={48}
            step={1}
            value={[config.fontSize]}
            onValueChange={(value) => updateConfig({ fontSize: value[0] })}
            className="w-full"
          />
        </div>

        {/* Text Gradient Effects */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Text Gradient Effects</Label>
          <div className="grid grid-cols-2 gap-2">
            {gradientPresets.map((gradient, index) => (
              <button
                key={index}
                onClick={() => updateConfig({
                  secondaryColor: gradient.value,
                  accentColor: gradient.value
                })}
                className="p-2 text-xs font-medium border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div 
                  className="w-full h-6 rounded mb-1 border"
                  style={{ background: gradient.value }}
                />
                {gradient.name}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Apply gradient effects to player names and numbers
          </p>
        </div>
      </div>
    </div>
  );
};
