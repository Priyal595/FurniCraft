import { useState, useEffect } from 'react';
import { Button } from './ui/button';        
import { Mic, MicOff } from 'lucide-react';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  // ──────────────────────────────────────────────
  // Init Web Speech API
  // ──────────────────────────────────────────────
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;          // Browser not supported

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event) => {
      let current = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
      }
      setTranscript(current);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);
  }, []);

  // ──────────────────────────────────────────────
  // Handlers
  // ──────────────────────────────────────────────
  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    isListening ? stopListening() : startListening();
  };

  // If Web Speech API unsupported, render nothing
  if (!recognition) return null;

  // ──────────────────────────────────────────────
  // UI
  // ──────────────────────────────────────────────
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleListening}
        variant={isListening ? 'destructive' : 'default'}
        size="lg"
        className="rounded-full shadow-lg"
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </Button>

      {transcript && (
        <div className="absolute bottom-16 right-0 bg-background border rounded-lg p-3 shadow-lg max-w-xs">
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
