import React from 'react';
import { ParticleSettings } from '../types';
import { X } from 'lucide-react';

interface ControlPanelProps {
  settings: ParticleSettings;
  onChange: (key: keyof ParticleSettings, value: number) => void;
  onClose: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ settings, onChange, onClose }) => {
  const sliders: { key: keyof ParticleSettings; label: string; min: number; max: number; step: number }[] = [
    { key: 'dispersion', label: '宇宙膨胀 (Dispersion)', min: 0.5, max: 3, step: 0.1 },
    { key: 'particleSize', label: '星尘大小 (Size)', min: 1, max: 8, step: 0.1 },
    { key: 'flowSpeed', label: '时间流速 (Speed)', min: 0, max: 3, step: 0.1 },
    { key: 'orbitThickness', label: '轨道粗细 (Thickness)', min: 0.05, max: 1.0, step: 0.05 },
    { key: 'musicVolume', label: '环境音量 (Volume)', min: 0, max: 1, step: 0.05 },
    { key: 'flowAmplitude', label: '流动幅度 (Flow)', min: 0, max: 5, step: 0.1 },
    { key: 'depthStrength', label: '景深强度 (Depth)', min: 10, max: 100, step: 1 },
    { key: 'mouseRadius', label: '引力半径 (Interaction)', min: 50, max: 300, step: 10 },
  ];

  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-black/80 backdrop-blur-xl border-l border-white/10 p-6 transform transition-transform duration-300 z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white/80 font-serif italic text-lg tracking-wider">控制面板</h2>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-8">
        {sliders.map((slider) => (
          <div key={slider.key} className="space-y-3">
            <div className="flex justify-between text-xs text-blue-200/70 tracking-widest font-mono">
              <span>{slider.label}</span>
              <span>{settings[slider.key].toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={settings[slider.key]}
              onChange={(e) => onChange(slider.key, parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(96,165,250,0.8)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};