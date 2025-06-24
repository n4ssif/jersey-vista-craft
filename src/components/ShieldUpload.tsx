
import React, { useRef } from 'react';
import { JerseyConfig } from './JerseyConfigurator';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface ShieldUploadProps {
  config: JerseyConfig;
  updateConfig: (updates: Partial<JerseyConfig>) => void;
}

export const ShieldUpload: React.FC<ShieldUploadProps> = ({ config, updateConfig }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      updateConfig({ shieldUrl: result });
      toast.success('Shield uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const removeShield = () => {
    updateConfig({ shieldUrl: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Shield removed');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Shield/Logo Upload</h3>
      
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Upload Shield Image
          </Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="flex flex-col space-y-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Choose Image File</span>
            </Button>
            
            {config.shieldUrl && (
              <div className="flex items-center space-x-2">
                <div className="flex-1 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                  Shield loaded successfully
                </div>
                <Button
                  onClick={removeShield}
                  variant="destructive"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {config.shieldUrl && (
          <>
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Shield Size: {config.shieldSize}px
              </Label>
              <Slider
                min={30}
                max={120}
                step={5}
                value={[config.shieldSize]}
                onValueChange={(value) => updateConfig({ shieldSize: value[0] })}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">
                Horizontal Position: {config.shieldPosition.x}px
              </Label>
              <Slider
                min={50}
                max={250}
                step={5}
                value={[config.shieldPosition.x]}
                onValueChange={(value) => updateConfig({ 
                  shieldPosition: { ...config.shieldPosition, x: value[0] }
                })}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">
                Vertical Position: {config.shieldPosition.y}px
              </Label>
              <Slider
                min={120}
                max={280}
                step={5}
                value={[config.shieldPosition.y]}
                onValueChange={(value) => updateConfig({ 
                  shieldPosition: { ...config.shieldPosition, y: value[0] }
                })}
                className="w-full"
              />
            </div>
          </>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Supported formats: PNG, JPG, SVG, WebP</p>
          <p>• Maximum file size: 5MB</p>
          <p>• Recommended: Square images with transparent background</p>
        </div>
      </div>
    </div>
  );
};
