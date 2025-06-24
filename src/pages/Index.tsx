
import React from 'react';
import { JerseyConfigurator } from '../components/JerseyConfigurator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Jersey Configurator</h1>
          <p className="text-lg text-gray-600">Design your custom jersey with professional tools</p>
        </header>
        <JerseyConfigurator />
      </div>
    </div>
  );
};

export default Index;
