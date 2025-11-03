'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUploader } from './image-uploader';
import { Card } from '@/components/ui/card';
import { Weather } from '@/lib/types/database';
import { calculateEfficiencyScore, formatEfficiencyScore } from '@/lib/utils/calculations';
import { formatDate } from '@/lib/utils/formatting';
import toast from 'react-hot-toast';
import { Check, ChevronRight } from 'lucide-react';

const weatherOptions = [
  { value: 'Sunny', emoji: '☀️', label: 'Sunny' },
  { value: 'Rainy', emoji: '🌧️', label: 'Rainy' },
  { value: 'Snowy', emoji: '❄️', label: 'Snowy' },
  { value: 'Stormy', emoji: '⛈️', label: 'Stormy' },
];

export function RouteForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    packages: '',
    stops: '',
    miles: '',
    duration_minutes: '',
    weather: '' as Weather | '',
    proof_image_url: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async () => {
    const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (isDemoMode) {
      toast.error('Demo Mode: Supabase is not configured. Routes cannot be saved.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packages: parseInt(formData.packages),
          stops: parseInt(formData.stops),
          miles: parseFloat(formData.miles),
          duration_minutes: parseInt(formData.duration_minutes),
          weather: formData.weather,
          proof_image_url: formData.proof_image_url,
          date: formData.date,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit route');
      }

      toast.success('Route logged! 🎉');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit route');
    } finally {
      setLoading(false);
    }
  };

  const efficiencyScore = formData.packages && formData.miles && formData.duration_minutes
    ? calculateEfficiencyScore(
        parseInt(formData.packages),
        parseFloat(formData.miles),
        parseInt(formData.duration_minutes)
      )
    : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  s < step
                    ? 'bg-green-500 text-white'
                    : s === step
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s < step ? <Check className="w-6 h-6" /> : s}
              </div>
              <span className="text-xs mt-2 text-gray-600">
                {s === 1 && 'Route Details'}
                {s === 2 && 'Upload Proof'}
                {s === 3 && 'Confirm'}
              </span>
            </div>
            {s < 3 && (
              <div
                className={`flex-1 h-1 mx-2 transition-colors ${
                  s < step ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Route Details */}
      {step === 1 && (
        <Card>
          <h2 className="text-2xl font-bold text-black mb-6">Route Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Date
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Packages
              </label>
              <Input
                type="number"
                inputMode="numeric"
                min="1"
                value={formData.packages}
                onChange={(e) => setFormData({ ...formData, packages: e.target.value })}
                placeholder="Enter number of packages"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Stops
              </label>
              <Input
                type="number"
                inputMode="numeric"
                min="1"
                value={formData.stops}
                onChange={(e) => setFormData({ ...formData, stops: e.target.value })}
                placeholder="Enter number of stops"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Miles
              </label>
              <Input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={formData.miles}
                onChange={(e) => setFormData({ ...formData, miles: e.target.value })}
                placeholder="Enter miles driven"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Duration (minutes)
              </label>
              <Input
                type="number"
                inputMode="numeric"
                min="1"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                placeholder="Enter duration in minutes"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                About 8 hours = 480 minutes
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Weather
              </label>
              <div className="grid grid-cols-4 gap-3">
                {weatherOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, weather: option.value as Weather })}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      formData.weather === option.value
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mb-2">{option.emoji}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="button"
              size="lg"
              className="w-full"
              onClick={() => {
                if (
                  formData.packages &&
                  formData.stops &&
                  formData.miles &&
                  formData.duration_minutes &&
                  formData.weather
                ) {
                  setStep(2);
                } else {
                  toast.error('Please fill in all fields');
                }
              }}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Upload Proof */}
      {step === 2 && (
        <Card>
          <h2 className="text-2xl font-bold text-black mb-6">Upload Proof</h2>
          <div className="space-y-6">
            <ImageUploader
              onUploadComplete={(url) => setFormData({ ...formData, proof_image_url: url })}
              initialUrl={formData.proof_image_url}
            />
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="button"
                size="lg"
                className="flex-1"
                onClick={() => {
                  if (formData.proof_image_url) {
                    setStep(3);
                  } else {
                    toast.error('Please upload a proof image');
                  }
                }}
                disabled={!formData.proof_image_url}
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <Card>
          <h2 className="text-2xl font-bold text-black mb-6">Confirm Route</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-semibold text-black">
                    {formatDate(new Date(formData.date))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Weather</div>
                  <div className="font-semibold text-black">
                    {weatherOptions.find((w) => w.value === formData.weather)?.emoji}{' '}
                    {formData.weather}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Packages</div>
                  <div className="font-semibold text-black">{formData.packages}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Stops</div>
                  <div className="font-semibold text-black">{formData.stops}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Miles</div>
                  <div className="font-semibold text-black">{formData.miles}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="font-semibold text-black">
                    {Math.floor(parseInt(formData.duration_minutes) / 60)}h{' '}
                    {parseInt(formData.duration_minutes) % 60}m
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Efficiency Score</div>
                <div className="text-2xl font-bold text-black">
                  {formatEfficiencyScore(efficiencyScore)}
                </div>
              </div>
            </div>

            {formData.proof_image_url && (
              <div>
                <div className="text-sm font-medium text-black mb-2">Proof Image</div>
                <img
                  src={formData.proof_image_url}
                  alt="Proof"
                  className="w-full rounded-xl border-2 border-gray-200 max-h-64 object-contain"
                />
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                💡 Safety First! Great pace, but always prioritize safe driving over speed.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={() => setStep(2)}
              >
                Edit
              </Button>
              <Button
                type="button"
                size="lg"
                className="flex-1"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Route'}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

