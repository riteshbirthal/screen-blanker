import React, { useEffect } from "react";
import "./BlankScreen.css";


export default function BlankScreen({active, color, onExitRequest}){
    useEffect(() => {
        if(!active) return ;
        const handleKeyDown = (e) => {
            if(e.key === "Escape")
                onExitRequest();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [active, onExitRequest]);

    if(!active) return null;

    return (
        <div 
            id="blank-screen-root"
            onClick={onExitRequest}
            style={{
                backgroundColor: color
            }}
        />
    );
}

