
import React from 'react';
import { JerseyConfig } from './JerseyConfigurator';
import { Label } from './ui/label';

interface ColorPickerProps {
  config: JerseyConfig;
  updateConfig: (updates: Partial<JerseyConfig>) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ config, updateConfig }) => {
  const colorPresets = [
    { 
      name: 'Blue & White', 
      torso: '#1e40af', 
      torsoTrim: '#ffffff', 
      sleeve: '#1e40af', 
      sleeveTrim: '#ffffff', 
      neck: '#ffffff'
    },
    { 
      name: 'Red & Black', 
      torso: '#dc2626', 
      torsoTrim: '#000000', 
      sleeve: '#dc2626', 
      sleeveTrim: '#000000', 
      neck: '#000000'
    },
    { 
      name: 'Green & Gold', 
      torso: '#059669', 
      torsoTrim: '#fbbf24', 
      sleeve: '#059669', 
      sleeveTrim: '#fbbf24', 
      neck: '#fbbf24'
    },
    { 
      name: 'Purple & Silver', 
      torso: '#7c3aed', 
      torsoTrim: '#e5e7eb', 
      sleeve: '#7c3aed', 
      sleeveTrim: '#e5e7eb', 
      neck: '#e5e7eb'
    },
    { 
      name: 'Orange & Blue', 
      torso: '#ea580c', 
      torsoTrim: '#1e40af', 
      sleeve: '#ea580c', 
      sleeveTrim: '#1e40af', 
      neck: '#1e40af'
    },
    { 
      name: 'Black & Yellow', 
      torso: '#000000', 
      torsoTrim: '#fbbf24', 
      sleeve: '#000000', 
      sleeveTrim: '#fbbf24', 
      neck: '#fbbf24'
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Jersey Colors</h3>
      
      {/* Color Presets */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Quick Presets</Label>
        <div className="grid grid-cols-1 gap-2">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => updateConfig({
                torsoColor: preset.torso,
                torsoTrimColor: preset.torsoTrim,
                sleeveColor: preset.sleeve,
                sleeveTrimColor: preset.sleeveTrim,
                neckColor: preset.neck
              })}
              className="p-2 text-xs font-medium border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex space-x-1 mb-1 justify-center">
                <div 
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: preset.torso }}
                  title="Torso"
                />
                <div 
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: preset.torsoTrim }}
                  title="Torso Trim"
                />
                <div 
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: preset.sleeve }}
                  title="Sleeve"
                />
                <div 
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: preset.sleeveTrim }}
                  title="Sleeve Trim"
                />
                <div 
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: preset.neck }}
                  title="Neck"
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
          <Label htmlFor="torso-color" className="text-sm font-medium mb-2 block">
            Torso Color
          </Label>
          <div className="flex items-center space-x-2">
            <input
              id="torso-color"
              type="color"
              value={config.torsoColor}
              onChange={(e) => updateConfig({ torsoColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600">
              {config.torsoColor}
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="torso-trim-color" className="text-sm font-medium mb-2 block">
            Torso Side Trim Color
          </Label>
          <div className="flex items-center space-x-2">
            <input
              id="torso-trim-color"
              type="color"
              value={config.torsoTrimColor}
              onChange={(e) => updateConfig({ torsoTrimColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600">
              {config.torsoTrimColor}
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="sleeve-color" className="text-sm font-medium mb-2 block">
            Sleeve Color
          </Label>
          <div className="flex items-center space-x-2">
            <input
              id="sleeve-color"
              type="color"
              value={config.sleeveColor}
              onChange={(e) => updateConfig({ sleeveColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600">
              {config.sleeveColor}
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="sleeve-trim-color" className="text-sm font-medium mb-2 block">
            Sleeve End Trim Color
          </Label>
          <div className="flex items-center space-x-2">
            <input
              id="sleeve-trim-color"
              type="color"
              value={config.sleeveTrimColor}
              onChange={(e) => updateConfig({ sleeveTrimColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600">
              {config.sleeveTrimColor}
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="neck-color" className="text-sm font-medium mb-2 block">
            Neck/Collar Color
          </Label>
          <div className="flex items-center space-x-2">
            <input
              id="neck-color"
              type="color"
              value={config.neckColor}
              onChange={(e) => updateConfig({ neckColor: e.target.value })}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600">
              {config.neckColor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
