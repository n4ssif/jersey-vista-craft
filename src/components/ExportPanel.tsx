
import React from 'react';
import { JerseyConfig } from './JerseyConfigurator';
import { Button } from './ui/button';
import { Download, FileImage, FileText } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

interface ExportPanelProps {
  config: JerseyConfig;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ config }) => {
  const exportToPDF = async () => {
    try {
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        toast.error('Canvas not found');
        return;
      }

      // Convert canvas to image
      const canvasImage = await html2canvas(canvas);
      const imgData = canvasImage.toDataURL('image/png');

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add watermark
      pdf.setFontSize(50);
      pdf.setTextColor(200, 200, 200);
      pdf.text('JERSEY CONFIGURATOR', 105, 150, {
        angle: 45,
        align: 'center'
      });

      // Add jersey image
      const imgWidth = 100;
      const imgHeight = (canvasImage.height * imgWidth) / canvasImage.width;
      pdf.addImage(imgData, 'PNG', 55, 30, imgWidth, imgHeight);

      // Add configuration details
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Jersey Configuration:', 20, 200);
      pdf.text(`Team: ${config.teamName}`, 20, 210);
      pdf.text(`Player: ${config.playerName}`, 20, 220);
      pdf.text(`Number: ${config.playerNumber}`, 20, 230);
      pdf.text(`Colors: ${config.torsoColor}, ${config.secondaryColor}, ${config.accentColor}`, 20, 240);

      // Save PDF
      pdf.save(`jersey-${config.teamName}-${config.playerName}.pdf`);
      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export PDF');
    }
  };

  const exportToPNG = async () => {
    try {
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        toast.error('Canvas not found');
        return;
      }

      // Create a new canvas with transparent background
      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      if (!ctx) return;

      // Draw the original canvas content without background
      ctx.drawImage(canvas, 0, 0);

      // Convert to blob and save
      tempCanvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `jersey-${config.teamName}-${config.playerName}.png`);
          toast.success('PNG exported successfully!');
        }
      }, 'image/png');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export PNG');
    }
  };

  const exportConfig = () => {
    const configJson = JSON.stringify(config, null, 2);
    const blob = new Blob([configJson], { type: 'application/json' });
    saveAs(blob, `jersey-config-${config.teamName}.json`);
    toast.success('Configuration exported!');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Export Options</h3>
      
      <div className="space-y-3">
        <Button
          onClick={exportToPDF}
          className="w-full flex items-center justify-center space-x-2"
          variant="default"
        >
          <FileText className="w-4 h-4" />
          <span>Export as PDF (with watermark)</span>
        </Button>

        <Button
          onClick={exportToPNG}
          className="w-full flex items-center justify-center space-x-2"
          variant="outline"
        >
          <FileImage className="w-4 h-4" />
          <span>Export as PNG (transparent)</span>
        </Button>

        <Button
          onClick={exportConfig}
          className="w-full flex items-center justify-center space-x-2"
          variant="secondary"
        >
          <Download className="w-4 h-4" />
          <span>Export Configuration</span>
        </Button>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>• PDF exports include a watermark and configuration details</p>
        <p>• PNG exports have transparent backgrounds for mockups</p>
        <p>• Configuration files can be imported later</p>
      </div>
    </div>
  );
};
