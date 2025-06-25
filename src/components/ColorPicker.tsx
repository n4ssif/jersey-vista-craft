
import React from 'react';
import { JerseyConfig, JerseyPart } from './JerseyConfigurator';
import { Label } from './ui/label';

interface ColorPickerProps {
  config: JerseyConfig;
  updateConfig: (updates: Partial<JerseyConfig>) => void;
  selectedPart?: JerseyPart | null;
  onPartSelect?: (part: JerseyPart) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ config, updateConfig, selectedPart, onPartSelect }) => {
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

  const partLabels = {
    torso: 'Torso Color',
    torsoTrim: 'Torso Side Trim Color',
    sleeve: 'Sleeve Color',
    sleeveTrim: 'Sleeve End Trim Color',
    neck: 'Neck/Collar Color'
  };

  const getColorForPart = (part: JerseyPart): string => {
    const colorMap = {
      torso: config.torsoColor,
      torsoTrim: config.torsoTrimColor,
      sleeve: config.sleeveColor,
      sleeveTrim: config.sleeveTrimColor,
      neck: config.neckColor
    };
    return colorMap[part];
  };

  const updatePartColor = (part: JerseyPart, color: string) => {
    const colorMap = {
      torso: 'torsoColor',
      torsoTrim: 'torsoTrimColor',
      sleeve: 'sleeveColor',
      sleeveTrim: 'sleeveTrimColor',
      neck: 'neckColor'
    };
    updateConfig({ [colorMap[part]]: color });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Jersey Colors</h3>
      
      {selectedPart && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            Selected: {partLabels[selectedPart]}
          </h4>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={getColorForPart(selectedPart)}
              onChange={(e) => updatePartColor(selectedPart, e.target.value)}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-600">
              {getColorForPart(selectedPart)}
            </span>
          </div>
        </div>
      )}
      
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
        <Label className="text-sm font-medium">Individual Part Selection</Label>
        {(Object.keys(partLabels) as JerseyPart[]).map((part) => (
          <div key={part}>
            <button
              onClick={() => onPartSelect?.(part)}
              className={`w-full p-3 text-left border rounded-lg transition-colors ${
                selectedPart === part 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{partLabels[part]}</span>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: getColorForPart(part) }}
                  />
                  <span className="text-xs text-gray-500">
                    {getColorForPart(part)}
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
