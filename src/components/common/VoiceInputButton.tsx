import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  targetFieldLabel?: string;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onTranscript, targetFieldLabel = 'input' }) => {
  const { language, t } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [showHelper, setShowHelper] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check SpeechRecognition browser availability
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Map app language to BCP 47 locale
      const localeMap = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN'
      };
      recognition.lang = localeMap[language] || 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const transcript = event.results[0][0].transcript;
          onTranscript(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (err: any) => {
        console.warn('SpeechRecognition error:', err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [language, onTranscript]);

  const toggleListening = () => {
    if (!isSupported) {
      setShowHelper(true);
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn('Speech start failure:', e);
        setShowHelper(true);
      }
    }
  };

  return (
    <div className="relative inline-flex items-center gap-1.5">
      <button
        type="button"
        onClick={toggleListening}
        title={isSupported ? (isListening ? t.voiceListening : `${t.voiceInput} for ${targetFieldLabel}`) : t.voiceUnsupported}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
          isListening
            ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
            : 'bg-emerald-50/70 border-emerald-200 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300'
        }`}
        aria-label={isListening ? t.voiceListening : `${t.voiceInput} for ${targetFieldLabel}`}
      >
        {isListening ? (
          <>
            <Mic className="w-3.5 h-3.5 text-rose-600 animate-spin" />
            <span>{t.voiceListening}</span>
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.voiceInput}</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={() => setShowHelper(!showHelper)}
        className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors"
        title="Voice input availability & browser compatibility details"
        aria-label="Voice input information"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {showHelper && (
        <div className="absolute right-0 top-full mt-1.5 z-30 w-72 p-3 text-xs bg-white border border-slate-200 rounded-lg shadow-lg text-slate-700">
          <div className="flex items-start justify-between gap-2 pb-1.5 border-b border-slate-100 mb-2">
            <span className="font-semibold text-slate-900">Voice Input Assistance</span>
            <button
              onClick={() => setShowHelper(false)}
              className="text-slate-400 hover:text-slate-700 text-xs px-1"
            >
              ✕
            </button>
          </div>
          <p className="leading-relaxed mb-2 text-slate-600">
            {isSupported
              ? `Currently configured for ${language === 'hi' ? 'Hindi (hi-IN)' : language === 'ta' ? 'Tamil (ta-IN)' : 'English (en-IN)'}. Click the microphone and speak your report description.`
              : 'Web Speech API is not enabled in this browser environment. You can comfortably type or paste your report description into the text field below.'}
          </p>
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
            Note: Speech recognition accuracy depends on ambient site noise, microphone hardware, and browser network permissions. Text input is always primary.
          </div>
        </div>
      )}
    </div>
  );
};
