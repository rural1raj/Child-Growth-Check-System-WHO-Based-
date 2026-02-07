
import React, { useState, useCallback } from 'react';
import { UI_STRINGS } from './constants';
import { Gender, GrowthStatus, CalculationResult } from './types';
import { calculateGrowthResult } from './growthUtils';
import { getHealthTip } from './geminiService';
import GrowthChart from './GrowthChart';

const App: React.FC = () => {
  const [gender, setGender] = useState<Gender>(Gender.BOY);
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [healthTip, setHealthTip] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCalculate = useCallback(async () => {
    const ageVal = parseFloat(age);
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);

    if (isNaN(ageVal) || isNaN(weightVal) || isNaN(heightVal)) {
      alert("कृपया सभी जानकारी सही से भरें।");
      return;
    }

    if (ageVal < 0 || ageVal > 60) {
      alert("आयु 0 से 60 महीनों के बीच होनी चाहिए।");
      return;
    }

    setLoading(true);
    const growthResult = calculateGrowthResult(gender, ageVal, weightVal, heightVal);
    setResult(growthResult);

    // Get an AI powered tip
    const tip = await getHealthTip(gender, ageVal, growthResult.weightStatus, growthResult.heightStatus);
    setHealthTip(tip);
    setLoading(false);
  }, [gender, age, weight, height]);

  const getStatusColor = (status: GrowthStatus) => {
    switch (status) {
      case GrowthStatus.NORMAL: return 'bg-green-100 text-green-800 border-green-500';
      case GrowthStatus.SLIGHTLY_LOW: return 'bg-yellow-100 text-yellow-800 border-yellow-500';
      case GrowthStatus.VERY_LOW: return 'bg-red-100 text-red-800 border-red-500';
      default: return 'bg-gray-100 text-gray-800 border-gray-500';
    }
  };

  const getStatusLabel = (status: GrowthStatus) => {
    switch (status) {
      case GrowthStatus.NORMAL: return UI_STRINGS.STATUS_NORMAL;
      case GrowthStatus.SLIGHTLY_LOW: return UI_STRINGS.STATUS_SLIGHTLY_LOW;
      case GrowthStatus.VERY_LOW: return UI_STRINGS.STATUS_VERY_LOW;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-md bg-orange-600 text-white p-6 rounded-2xl shadow-lg mb-6 text-center">
        <div className="flex justify-center mb-2">
          <i className="fa-solid fa-child-reaching text-4xl"></i>
        </div>
        <h1 className="text-2xl font-bold">{UI_STRINGS.TITLE}</h1>
        <p className="text-sm opacity-90">आंगनवाड़ी कार्यकर्ता के लिए विशेष उपकरण</p>
      </header>

      {/* Main Form */}
      <main className="w-full max-w-md space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-5">
          {/* Gender */}
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-2">{UI_STRINGS.GENDER_LABEL}</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setGender(Gender.BOY)}
                className={`p-4 rounded-xl border-2 flex flex-col items-center transition-all ${gender === Gender.BOY ? 'border-orange-600 bg-orange-50 scale-105 shadow-md' : 'border-gray-200'}`}
              >
                <i className={`fa-solid fa-person text-2xl mb-1 ${gender === Gender.BOY ? 'text-orange-600' : 'text-gray-400'}`}></i>
                <span className={`font-bold ${gender === Gender.BOY ? 'text-orange-600' : 'text-gray-500'}`}>{UI_STRINGS.BOY}</span>
              </button>
              <button 
                onClick={() => setGender(Gender.GIRL)}
                className={`p-4 rounded-xl border-2 flex flex-col items-center transition-all ${gender === Gender.GIRL ? 'border-orange-600 bg-orange-50 scale-105 shadow-md' : 'border-gray-200'}`}
              >
                <i className={`fa-solid fa-person-dress text-2xl mb-1 ${gender === Gender.GIRL ? 'text-orange-600' : 'text-gray-400'}`}></i>
                <span className={`font-bold ${gender === Gender.GIRL ? 'text-orange-600' : 'text-gray-500'}`}>{UI_STRINGS.GIRL}</span>
              </button>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-1">{UI_STRINGS.AGE_LABEL}</label>
            <input 
              type="number" 
              inputMode="decimal"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="0-60"
              className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:outline-none bg-gray-50"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-1">{UI_STRINGS.WEIGHT_LABEL}</label>
            <div className="relative">
              <input 
                type="number" 
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="उदा. 8.5"
                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:outline-none bg-gray-50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">kg</span>
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-1">{UI_STRINGS.HEIGHT_LABEL}</label>
            <div className="relative">
              <input 
                type="number" 
                inputMode="decimal"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="उदा. 75"
                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:outline-none bg-gray-50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">cm</span>
            </div>
          </div>

          <button 
            onClick={handleCalculate}
            disabled={loading}
            className={`w-full bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold py-5 rounded-2xl shadow-lg transition-transform active:scale-95 flex justify-center items-center ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : null}
            {UI_STRINGS.BTN_CALC}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-4 animate-in fade-in duration-500 mb-20">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800 flex items-center">
                <i className="fa-solid fa-square-poll-vertical mr-2 text-orange-600"></i>
                जाँच परिणाम
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-800 font-bold opacity-80">{UI_STRINGS.NORMAL_WEIGHT}</p>
                  <p className="text-2xl font-black text-blue-900">{result.medianWeight.toFixed(1)} <span className="text-sm">किग्रा</span></p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-800 font-bold opacity-80">{UI_STRINGS.NORMAL_HEIGHT}</p>
                  <p className="text-2xl font-black text-blue-900">{result.medianHeight.toFixed(0)} <span className="text-sm">सेमी</span></p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className={`p-4 rounded-xl border-l-8 ${getStatusColor(result.weightStatus)}`}>
                  <p className="text-sm font-bold uppercase tracking-wide">वजन की स्थिति</p>
                  <p className="text-xl font-bold">{getStatusLabel(result.weightStatus)}</p>
                </div>
                <div className={`p-4 rounded-xl border-l-8 ${getStatusColor(result.heightStatus)}`}>
                  <p className="text-sm font-bold uppercase tracking-wide">लंबाई की स्थिति</p>
                  <p className="text-xl font-bold">{getStatusLabel(result.heightStatus)}</p>
                </div>
              </div>

              {/* Visual Charts */}
              <div className="space-y-4 mt-6">
                <GrowthChart 
                   label="वजन" 
                   unit="किग्रा" 
                   childAge={parseFloat(age)} 
                   childValue={parseFloat(weight)} 
                   gender={gender} 
                   type="weight" 
                />
                <GrowthChart 
                   label="लंबाई" 
                   unit="सेमी" 
                   childAge={parseFloat(age)} 
                   childValue={parseFloat(height)} 
                   gender={gender} 
                   type="height" 
                />
              </div>
            </div>

            {/* AI Suggestion */}
            {healthTip && (
              <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                <i className="fa-solid fa-wand-magic-sparkles absolute -right-4 -top-4 text-8xl opacity-10"></i>
                <h3 className="font-bold flex items-center mb-2">
                  <i className="fa-solid fa-lightbulb mr-2 text-yellow-300"></i>
                  {UI_STRINGS.HEALTH_TIP_HEADER}
                </h3>
                <p className="text-lg leading-relaxed italic">
                  "{healthTip}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm px-4">
            <i className="fa-solid fa-circle-exclamation mr-1"></i>
            {UI_STRINGS.DISCLAIMER}
          </p>
        </div>
      </main>

      {/* Persistent Call to Action / Footer for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around md:hidden">
         <div className="flex flex-col items-center text-orange-600">
            <i className="fa-solid fa-house text-xl"></i>
            <span className="text-xs font-bold">मुख्य</span>
         </div>
         <div className="flex flex-col items-center text-gray-400">
            <i className="fa-solid fa-book-medical text-xl"></i>
            <span className="text-xs font-bold">गाइड</span>
         </div>
         <div className="flex flex-col items-center text-gray-400">
            <i className="fa-solid fa-circle-info text-xl"></i>
            <span className="text-xs font-bold">मदद</span>
         </div>
      </footer>
    </div>
  );
};

export default App;
