import React from "react";
import "./ControlPanel.css";


export default function ControlPanel({selectedColor, setSelectedColor, customColor, setCustomColor, brightness, setBrightness, onStartBlank, isBlankActive}){
    return (
        <div className="control-panel">
            <h1 className="control-panel-heading">Screen Blanker</h1>
            <p>Drag this window to any monitor, choose a color, then start blank mode.</p>

            <div className="control-panel-color-box">
                <label className="control-panel-color-label">Color preset</label>
                <select
                    value={selectedColor}
                    onChange = {(e) => setSelectedColor(e.target.value)}
                    className="control-panel-select"
                >
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="dark-grey">Dark Grey</option>
                    <option value="custom">Custom (hex)</option>
                </select>
            </div>

            {selectedColor === "custom" && (
                <div className="control-panel-color-input-container">
                    <label className="control-panel-color-input-label">Custom hex color</label>
                    <input
                        type="text"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        placeholder="#000000"
                        className="control-panel-custom-input"
                    />
                </div>
            )}

            {selectedColor === "dark-grey" && (
                <div>
                    <label className="control-panel-color-input-label">Brightness (0 = black, 100 = lighter)</label>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={brightness}
                        onChange={(e) => {setBrightness(Number(e.target.value))}}
                        style={{width: "100%"}}
                    />
                </div>
            )}

            <button
                onClick={onStartBlank}
                disabled={isBlankActive}
                className="control-panel-button"
                style={{
                    cursor: isBlankActive ? "not-allowed" : "pointer",
                    background: isBlankActive ? "#ccc" : "#111827",
                }}
            >
                {isBlankActive ? "Blank Mode Active" : "Start Blank Screen"}
            </button>
            <p className="control-panel-tip-para">Tip: Press <code>Esc</code> or click to exit</p>
        </div>
    );
}
