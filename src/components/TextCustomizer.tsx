
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
      </div>
    </div>
  );
};
