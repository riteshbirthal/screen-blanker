import { useCallback, useEffect, useState } from "react";


export default function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const requestFullscreen = useCallback((element) => {
        if(!element)
            return ;
        if(element.requestFullscreen)
            element.requestFullscreen();
        else if(element.webkitRequestFullscreen)
            element.webkitRequestFullscreen();
        else if(element.mozRequestFullScreen)
            element.mozRequestFullScreen();
        else if(element.msRequestFullScreen)
            element.msRequestFullScreen();
    }, []);

    const exitFullscreen = useCallback(() => {
        if(document.exitFullscreen)
            document.exitFullscreen();
        else if(document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if(document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if(document.msExitFullscreen)
            document.msExitFullscreen();
    }, []);

    useEffect(() => {
        const handleChange = () => {
            const fsElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            setIsFullscreen(!!fsElement);
        };

        document.addEventListener("fullscreenchange", handleChange);
        document.addEventListener("webkitfullscreenchange", handleChange);
        document.addEventListener("mozfullscreenchange", handleChange);
        document.addEventListener("MSFullscreenChange", handleChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleChange);
            document.removeEventListener("webkitfullscreenchange", handleChange);
            document.removeEventListener("mozfullscreenchange", handleChange);
            document.removeEventListener("MSFullscreenChange", handleChange);
        };
    }, []);
    return { isFullscreen, requestFullscreen, exitFullscreen };
}

