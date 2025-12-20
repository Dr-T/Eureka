import { useEffect, useRef, useState } from 'react';

export const useAudioAnalyzer = (stream: MediaStream | null) => {
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!stream) return;

    // Fix: Pass empty config object to satisfy TS types that expect arguments
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass({});
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    sourceRef.current = source;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const update = () => {
      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      
      // Normalize to 0-1 (approximate max volume usually around 128-200 for normal speech)
      const normalized = Math.min(average / 100, 1);
      
      setAudioLevel(normalized);
      animationFrameRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) {
        if (audioContextRef.current.state !== 'closed') {
          try {
            const closePromise = audioContextRef.current.close();
            // Check if it returns a promise before catching
            if (closePromise && typeof closePromise.catch === 'function') {
                closePromise.catch(console.error);
            }
          } catch (e) {
            console.error("Error closing audio context", e);
          }
        }
        audioContextRef.current = null;
      }
    };
  }, [stream]);

  return audioLevel;
};