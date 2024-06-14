import { Application, Ticker } from 'pixi.js'
import { Tracker } from './tracker';

(window as any).Application = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    //backgroundColor: 0x006400,
    backgroundColor: "0xFFFFFF",
    resizeTo: window,
});
(window as any).Application.renderer.roundPixels = true;
Ticker.targetFPMS = 60 / 1000;
const tracker = new Tracker();


window.onload = async (): Promise<void> => {   
    tracker.render();
};
