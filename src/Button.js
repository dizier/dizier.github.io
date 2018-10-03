"use strict";
class Button extends PIXI.Container{
    constructor(texture, labelText = "") {
        super();
        let buttonSprite = new PIXI.Sprite(texture);
        this.addChild(buttonSprite);

        this._filter = new PIXI.filters.ColorMatrixFilter();
        this.filters = [this._filter];

        this.onButtonDown = function(){};
        this.onButtonUp = function(){};
        this.onButtonOver = function(){};
        this.onButtonOut = function(){};

        if(labelText != "") {
            let style = Config.TEXT_STYLE;
            var playText = new PIXI.Text(labelText, style);
            playText.x = Math.round((buttonSprite.width - playText.width) * 0.5);
            playText.y = Math.round((buttonSprite.height - playText.height) * 0.5);
            this.addChild(playText);
        }

        this.interactive = true;
        this.buttonMode = true;
        this
            .on('pointerdown', onButtonDown, this)
            .on('pointerup', onButtonUp, this)
            .on('pointerupoutside', onButtonUp, this)
            .on('pointerover', onButtonOver, this)
            .on('pointerout', onButtonOut, this);

        function onButtonDown() {
            /*this.isdown = true;
             this.texture = textureButtonDown;
             this.alpha = 1;*/
            this.onButtonDown();
        }

        function onButtonUp() {
            /*this.isdown = false;
             if (this.isOver) {
             this.texture = textureButtonOver;
             }
             else {
             this.texture = textureButton;
             }*/
            this.onButtonUp();
        }

        function onButtonOver() {
            /*this.isOver = true;
             if (this.isdown) {
             return;
             }
             this.texture = textureButtonOver;*/
            this.onButtonOver();
        }

        function onButtonOut() {
            /* this.isOver = false;
             if (this.isdown) {
             return;
             }
             this.texture = textureButton;*/
            this.onButtonOut();
        }
    }

    setEnabled() {
        this.enabled = true;
        this.buttonMode = true;
        this._filter.reset();
    }

    setDisabled() {
        this.enabled = false;
        this.buttonMode = false;
        this._filter. desaturate();
    }
}

Button.prototype.onButtonDown = null;
Button.prototype.onButtonUp = null;
Button.prototype.onButtonOver = null;
Button.prototype.onButtonOut = null;

Button.prototype._filter = null;

