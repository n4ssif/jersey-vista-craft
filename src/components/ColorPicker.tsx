
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
              value={config.primaryColor}
              onChange={(e) => updateConfig({ primaryColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600">{config.primaryColor}</span>
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
              value={config.secondaryColor}
              onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600">{config.secondaryColor}</span>
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
              value={config.accentColor}
              onChange={(e) => updateConfig({ accentColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600">{config.accentColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
