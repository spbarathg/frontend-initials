import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    supplyChainUnits: [],
    inventoryTracking: [],
    logisticsTracking: []
  });

  const handleSelection = (category, item) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const handleNext = () => {
    if (step === 1 && selections.supplyChainUnits.length < 2) {
      alert('Please select at least 2 supply chain units');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSave = async () => {
    try {
      // TODO: Integrate with backend
      // await axios.post('/api/user/configuration', selections);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save configuration:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Setup Your Platform</h1>
              <div className="text-gray-400">Step {step} of 3</div>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <StepOne
              selections={selections.supplyChainUnits}
              onSelect={(item) => handleSelection('supplyChainUnits', item)}
            />
          )}

          {step === 2 && (
            <StepTwo
              selections={selections.inventoryTracking}
              onSelect={(item) => handleSelection('inventoryTracking', item)}
            />
          )}

          {step === 3 && (
            <StepThree
              selections={selections.logisticsTracking}
              onSelect={(item) => handleSelection('logisticsTracking', item)}
            />
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 ease-in-out hover:scale-[1.02]"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 ease-in-out hover:scale-[1.02]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="ml-auto px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 ease-in-out hover:scale-[1.02]"
              >
                Save Configuration
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StepOne = ({ selections, onSelect }) => {
  const options = [
    'Manufacturing',
    'Warehousing',
    'Distribution',
    'Retail',
    'Transportation',
    'Sourcing'
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Supply Chain Units</h2>
      <p className="text-gray-400 mb-6">Choose at least 2 units to manage</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map(option => (
          <SelectionCard
            key={option}
            title={option}
            selected={selections.includes(option)}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
};

const StepTwo = ({ selections, onSelect }) => {
  const options = [
    'Real-time Stock Levels',
    'Order Management',
    'Inventory Forecasting',
    'Stock Alerts',
    'Batch Tracking',
    'Expiry Management'
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Inventory Tracking Features</h2>
      <p className="text-gray-400 mb-6">Select the features you need</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map(option => (
          <SelectionCard
            key={option}
            title={option}
            selected={selections.includes(option)}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
};

const StepThree = ({ selections, onSelect }) => {
  const options = [
    'Route Optimization',
    'Delivery Tracking',
    'Fleet Management',
    'Cost Analysis',
    'Performance Metrics',
    'Carbon Footprint'
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Logistics Tracking Features</h2>
      <p className="text-gray-400 mb-6">Select the features you need</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map(option => (
          <SelectionCard
            key={option}
            title={option}
            selected={selections.includes(option)}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
};

const SelectionCard = ({ title, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-lg border-2 text-left transition-all ${
      selected
        ? 'border-blue-500 bg-blue-500 bg-opacity-20'
        : 'border-gray-700 hover:border-gray-600'
    }`}
  >
    <div className="flex items-center">
      <div className="flex-grow">
        <h3 className="font-medium">{title}</h3>
      </div>
      <div
        className={`w-6 h-6 rounded-full border-2 ml-4 flex items-center justify-center ${
          selected ? 'border-blue-500 bg-blue-500' : 'border-gray-600'
        }`}
      >
        {selected && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  </button>
);

export default OnboardingPage; 