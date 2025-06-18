import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useFilter } from '../context/FilterContext';

/**
 * VoiceAssistant
 *  – Works best on Google Chrome (alerts other browsers)
 *  – Parses commands like:
 *      • "show chairs under 800"
 *      • "show me sofa"
 *      • "go to cart" / "open cart"
 *      • "go home"
 *  – Stops automatically after 6 s of silence
 *  – Alerts when an unrecognised command is spoken
 */
const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const recognitionRef  = useRef(null);   // SpeechRecognition singleton
  const silenceTimerRef = useRef(null);   // auto‑stop timer

  const navigate = useNavigate();
  const { setCategoryFilter, setPriceFilter } = useFilter();

  /* ─────────────────────────────────────────────
     Helpers
  ───────────────────────────────────────────── */
  const stopListening = useCallback(() => {
    if (recognitionRef.current) recognitionRef.current.stop();
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    setIsListening(false);
  }, []);

  const resetSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    // Auto‑stop after 6 s without speech
    silenceTimerRef.current = setTimeout(stopListening, 6000);
  }, [stopListening]);

  const setFiltersFromPrice = (price) => {
    if (price < 500)          setPriceFilter('under-500');
    else if (price <= 1000)   setPriceFilter('500-1000');
    else if (price <= 2000)   setPriceFilter('1000-2000');
    else                      setPriceFilter('over-2000');
  };

  const handleCommand = useCallback(
    (text) => {
      /* 1. show chairs under 800 */
      const withPrice = text.match(/^show (?:me )?(?<cat>[a-z\s-]+?) (?:under|below|less than) (?<price>\d+)\b/);
      if (withPrice?.groups) {
        const { cat, price } = withPrice.groups;
        const category = cat.trim().replace(/\s+/g, ' ');
        setCategoryFilter(category);
        setFiltersFromPrice(+price);
        navigate(`/products?category=${encodeURIComponent(category)}&max=${price}`);
        stopListening();
        return;
      }

      /* 2. show me sofa */
      const justCat = text.match(/^show (?:me )?(?<cat>[a-z\s-]+)$/);
      if (justCat?.groups) {
        const category = justCat.groups.cat.trim().replace(/\s+/g, ' ');
        setCategoryFilter(category);
        setPriceFilter('all');
        navigate(`/products?category=${encodeURIComponent(category)}`);
        stopListening();
        return;
      }

      /* 3. cart */
      if (/(go to|open|show|take me to) (my )?cart/.test(text)) {
        navigate('/cart');
        stopListening();
        return;
      }

      /* 4. home */
      if (/(?:go|take me) home/.test(text)) {
        navigate('/');
        stopListening();
        return;
      }

      /* 5. unrecognised */
      alert('Sorry, I did not understand that command.');
      stopListening();
    },
    [navigate, setCategoryFilter, setPriceFilter, stopListening]
  );

  /* ─────────────────────────────────────────────
     Initialise SpeechRecognition once
  ───────────────────────────────────────────── */
  useEffect(() => {
    // Detect Chrome (exclude Edge)
    const isChrome = /Chrome/.test(navigator.userAgent) &&
                     /Google Inc/.test(navigator.vendor) &&
                     !/Edg/.test(navigator.userAgent);

    if (!isChrome) {
      alert('Voice assistant works best in Google Chrome. Voice commands are disabled in this browser.');
      return; // don’t set up recognition
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Your browser does not support the Web Speech API.');
      return;
    }

    const rec = new SpeechRec();
    rec.continuous     = true;
    rec.interimResults = true;
    rec.lang           = 'en-US';
    recognitionRef.current = rec;

    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        interim += e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          handleCommand(e.results[i][0].transcript.toLowerCase().trim());
        }
      }
      setTranscript(interim);
      resetSilenceTimer();
    };

    rec.onend = () => stopListening();

    return () => rec.abort();
  }, [handleCommand, resetSilenceTimer, stopListening]);

  /* ─────────────────────────────────────────────
     Start / stop helpers
  ───────────────────────────────────────────── */
  const startListening = () => {
    if (!isListening && recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
      resetSilenceTimer();
    }
  };

  const toggleListening = () => (isListening ? stopListening() : startListening());

  /* ─────────────────────────────────────────────
     UI
  ───────────────────────────────────────────── */
  if (!recognitionRef.current) return null; // Chrome‑only; others early‑returned

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleListening}
        variant={isListening ? 'destructive' : 'default'}
        size="lg"
        className="rounded-full shadow-lg"
        aria-label={isListening ? 'Stop voice assistant' : 'Start voice assistant'}
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </Button>

      {transcript && (
        <div className="absolute bottom-16 right-0 bg-background border rounded-lg p-3 shadow-lg max-w-xs">
          <p className="text-sm line-clamp-3">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;