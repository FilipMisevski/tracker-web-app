import { Sprite, Texture } from "pixi.js";

export class Tracker {

    private png: string = "./png.png";
    
    private pngTexture = Texture.from(this.png);
    public sprite = new Sprite(this.pngTexture);



    public setSpriteWidthAndHeight = () => {
        this.sprite.anchor.set(0.5);
        this.sprite.position.x = window.innerWidth / 2;
        this.sprite.position.y = window.innerHeight / 2;
        this.sprite.width = window.innerWidth / 2;
        this.sprite.height = this.sprite.width;
    }

    render() {

        this.setSpriteWidthAndHeight();
        this.sprite.alpha = 1;
        (window as any).Application.stage.addChild(this.sprite);
    }

    constructor() {
    }
}

