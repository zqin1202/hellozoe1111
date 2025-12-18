
import React, { useState, useEffect, Suspense, useRef } from 'react';
import Scene from './components/Scene';
import IntroOverlay from './components/IntroOverlay';
import UIOverlay from './components/UIOverlay';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isGestureEnabled, setIsGestureEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [rotationOffset, setRotationOffset] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleStart = (gestureMode: boolean) => {
    setHasStarted(true);
    setIsGestureEnabled(gestureMode);
    if (!isMuted && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed", e));
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const toggleState = () => setIsExploded(!isExploded);

  return (
    <div className="w-full h-screen relative bg-[#050103]">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Fallback placeholder music
      />

      <Suspense fallback={<div className="flex items-center justify-center h-full text-emerald-300 font-serif text-2xl">Loading Dreams...</div>}>
        <Scene 
          isExploded={isExploded} 
          isGestureEnabled={isGestureEnabled}
          rotationOffset={rotationOffset}
          setRotationOffset={setRotationOffset}
          setIsExploded={setIsExploded}
          toggleState={toggleState}
        />
      </Suspense>

      {!hasStarted && (
        <IntroOverlay onEnter={toggleStart} />
      )}

      {hasStarted && (
        <UIOverlay 
          isMuted={isMuted} 
          toggleMute={toggleMute} 
          isGestureEnabled={isGestureEnabled}
        />
      )}
    </div>
  );
};

export default App;
