import React, { useMemo, useRef, useState } from 'react';
import './App.css';
import BlankScreen from './components/blankscreen/BlankScreen';
import ControlPanel from './components/controlpanel/ControlPanel';
import useFullscreen from './hooks/useFullscreen';


function App() {
  const [selectedColor, setSelectedColor] = useState("black");
  const [customColor, setCustomColor] = useState("#000000");
  const [brightness, setBrightness] = useState(10);
  const [blankActive, setBlankActive] = useState(false);

  const blankRootRef = useRef(null);
  const {isFullscreen, requestFullscreen, exitFullscreen} = useFullscreen();

  const resolvedColor = useMemo(() => {
    if(selectedColor==="black") return "#000000";
    if(selectedColor==="white") return "#ffffff";
    if(selectedColor==="dark-grey"){
      const level = Math.round((brightness / 100) * 60);
      return `rgb(${level}, ${level}, ${level})`;
    }
    return customColor || "#000000";
  }, [selectedColor, customColor, brightness]);

  const handleStartBlank = () => {
    setBlankActive(true);
    setTimeout(() => {
      const element = document.getElementById("blank-screen-root") || document.documentElement;
      requestFullscreen(element);
    }, 0);
  };

  const handleExitBlank = () => {
    setBlankActive(false);
    if(isFullscreen){
      exitFullscreen();
    }
  };

  return (
    <div>
      <ControlPanel
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        customColor={customColor}
        setCustomColor={setCustomColor}
        brightness={brightness}
        setBrightness={setBrightness}
        onStartBlank={handleStartBlank}
        isBlankActive={blankActive} 
      />
      <div ref={blankRootRef}>
        <BlankScreen 
          active={blankActive} 
          color={resolvedColor} 
          onExitRequest={handleExitBlank} 
        />
      </div>
    </div>
  )
}

export default App
