
import React from 'react';
import { JerseyConfig } from './JerseyConfigurator';
import { Label } from './ui/label';

interface ColorPickerProps {
  config: JerseyConfig;
  updateConfig: (updates: Partial<JerseyConfig>) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ config, updateConfig }) => {
  const colorPresets = [
    { name: 'Blue & White', primary: '#1e40af', secondary: '#ffffff', accent: '#fbbf24' },
    { name: 'Red & Black', primary: '#dc2626', secondary: '#000000', accent: '#ffffff' },
    { name: 'Green & Gold', primary: '#059669', secondary: '#fbbf24', accent: '#ffffff' },
    { name: 'Purple & Silver', primary: '#7c3aed', secondary: '#e5e7eb', accent: '#fbbf24' },
    { name: 'Orange & Blue', primary: '#ea580c', secondary: '#1e40af', accent: '#ffffff' },
  ];

  const gradientPresets = [
    { name: 'Gold Shine', value: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #B8860B 75%, #FFD700 100%)' },
    { name: 'Silver Metallic', value: 'linear-gradient(135deg, #C0C0C0 0%, #808080 25%, #C0C0C0 50%, #696969 75%, #C0C0C0 100%)' },
    { name: 'Bronze Glow', value: 'linear-gradient(135deg, #CD7F32 0%, #8C4A2F 25%, #CD7F32 50%, #A0522D 75%, #CD7F32 100%)' },
    { name: 'Fire Red', value: 'linear-gradient(135deg, #FF4500 0%, #DC143C 50%, #B22222 100%)' },
    { name: 'Ocean Blue', value: 'linear-gradient(135deg, #1E90FF 0%, #0000CD 50%, #191970 100%)' },
    { name: 'Forest Green', value: 'linear-gradient(135deg, #32CD32 0%, #228B22 50%, #006400 100%)' },
    { name: 'Royal Purple', value: 'linear-gradient(135deg, #9370DB 0%, #6A5ACD 50%, #483D8B 100%)' },
    { name: 'Sunset Orange', value: 'linear-gradient(135deg, #FF8C00 0%, #FF4500 50%, #DC143C 100%)' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Color Customization</h3>
      
      {/* Color Presets */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Quick Presets</Label>
        <div className="grid grid-cols-2 gap-2">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => updateConfig({
                primaryColor: preset.primary,
                secondaryColor: preset.secondary,
                accentColor: preset.accent
              })}
              className="p-2 text-xs font-medium border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex space-x-1 mb-1">
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: preset.primary }}
                />
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: preset.secondary }}
                />
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: preset.accent }}
                />
              </div>
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Gradient Presets */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Gradient Effects</Label>
        <div className="grid grid-cols-2 gap-2">
          {gradientPresets.map((gradient, index) => (
            <button
              key={index}
              onClick={() => updateConfig({
                primaryColor: gradient.value,
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
      </div>

      {/* Individual Color Controls */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="primary-color" className="text-sm font-medium mb-2 block">
            Primary Color (Jersey Body)
          </Label>
          <div className="flex items-center space-x-2">
            <input
              id="primary-color"
              type="color"
              value={config.primaryColor.startsWith('linear-gradient') ? '#1e40af' : config.primaryColor}
              onChange={(e) => updateConfig({ primaryColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600 truncate flex-1">
              {config.primaryColor.length > 20 ? 'Gradient Applied' : config.primaryColor}
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="secondary-color" className="text-sm font-medium mb-2 block">
            Secondary Color (Text & Trim)
          </Label>
          <div className="flex items-center space-x-2">
            <input
              id="secondary-color"
              type="color"
              value={config.secondaryColor.startsWith('linear-gradient') ? '#ffffff' : config.secondaryColor}
              onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600 truncate flex-1">
              {config.secondaryColor.length > 20 ? 'Gradient Applied' : config.secondaryColor}
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="accent-color" className="text-sm font-medium mb-2 block">
            Accent Color (Numbers)
          </Label>
          <div className="flex items-center space-x-2">
            <input
              id="accent-color"
              type="color"
              value={config.accentColor.startsWith('linear-gradient') ? '#fbbf24' : config.accentColor}
              onChange={(e) => updateConfig({ accentColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600 truncate flex-1">
              {config.accentColor.length > 20 ? 'Gradient Applied' : config.accentColor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
