"use strict";
class ReelSymbol{
    constructor() {
        this.icons = [];
        this.symbolContainer = new PIXI.Container();
        this.currentSymbol = Config.SYMBOLS_SET[0];
        this.initPoint = new PIXI.Point();
        this.tweensInProgress = [];

        for(let symbol in Config.SYMBOLS_SET){
            let symbolSprite = new PIXI.Sprite(Config.getTexture(Config.SYMBOLS_SET[symbol]));
            this.symbolContainer.addChild(symbolSprite);
            this.icons[Config.SYMBOLS_SET[symbol]] = symbolSprite;
            symbolSprite.visible = false;
        }


        this.icons[this.currentSymbol].visible = true;
        this.symbolContainer.on('added', this.onAddedToStageHandler, this);
    }

    showIcon(iconName){
        if(iconName != this.currentSymbol && Config.SYMBOLS_SET.indexOf(iconName) != -1){
            this.icons[this.currentSymbol].visible = false;
            this.icons[iconName].visible = true;
            this.currentSymbol = iconName;
        }

        GameEvents.dispatchGameEvent(GameEvents.TEST_EVENT, {'name' : iconName});
    }

    winAnimation(callbackFunction) {
        let duration = 0.5;
        let scale = 1.15
        let scaleIn =  new PIXI.Point(scale, scale);
        let scaleOut =  new PIXI.Point(1, 1);

        /*Actuate.tween(animatedSymbol, duration, {
            x: animatedSymbol.initPoint.x - Config.SYMBOL_WIDTH * (scale - 1) * 0.5,
            y: animatedSymbol.initPoint.y - Config.SYMBOL_HEIGHT * (scale - 1) * 0.5,
            scaleX: scale,
            scaleY:scale
        });
        Actuate.tween(animatedSymbol, duration, {
            x: animatedSymbol.initPoint.x,
            y: animatedSymbol.initPoint.y,
            scaleX: 1,
            scaleY:1
        }, false).delay(duration);
        Actuate.tween(animatedSymbol, duration, {
            x: animatedSymbol.initPoint.x - Config.SYMBOL_WIDTH * (scale - 1) * 0.5,
            y: animatedSymbol.initPoint.y - Config.SYMBOL_HEIGHT * (scale - 1) * 0.5,
            scaleX: scale,
            scaleY:scale
        }, false).delay(duration * 2);
        Actuate.tween(animatedSymbol, duration, {
            x: animatedSymbol.initPoint.x,
            y: animatedSymbol.initPoint.y,
            scaleX:1,
            scaleY:1
        }, false).delay(duration * 3).onComplete(animationCompleteHandler, [animatedSymbol]);*/

        this.tweensInProgress.push(TweenLite.to(this.symbolContainer, duration, {
            x: this.initPoint.x - Config.SYMBOL_WIDTH * (scale - 1) * 0.5,
            y: this.initPoint.y - Config.SYMBOL_HEIGHT * (scale - 1) * 0.5
        }));
        this.tweensInProgress.push(TweenLite.to(this.symbolContainer.scale, duration, {
            x: scale, y: scale
        }));
        this.tweensInProgress.push(TweenLite.to(this.symbolContainer, duration, {
            x: this.initPoint.x,
            y: this.initPoint.y,
            delay: duration
        }));
        this.tweensInProgress.push(TweenLite.to(this.symbolContainer.scale, duration, {
            x: 1, y: 1,
            delay: duration
        }));
        this.tweensInProgress.push(TweenLite.to(this.symbolContainer, duration, {
            x: this.initPoint.x - Config.SYMBOL_WIDTH * (scale - 1) * 0.5,
            y: this.initPoint.y - Config.SYMBOL_HEIGHT * (scale - 1) * 0.5,
            delay: duration * 2
        }));
        this.tweensInProgress.push(TweenLite.to(this.symbolContainer.scale, duration, {
            x: scale, y: scale,
            delay: duration * 2
        }));
        this.tweensInProgress.push(TweenLite.to(this.symbolContainer, duration, {
            x: this.initPoint.x,
            y: this.initPoint.y,
            delay: duration * 3,
            onComplete: callbackFunction,
            onCompleteParams: [this]
        }));
        this.tweensInProgress.push(TweenLite.to(this.symbolContainer.scale, duration, {
            x: 1, y: 1,
            delay: duration * 3
        }));
    }

    onAddedToStageHandler(event, symbolInstance) {
        console.log("symbol added " + this.currentSymbol);
        this.initPoint.x = this.symbolContainer.x;
        this.initPoint.y = this.symbolContainer.y;
    }

    stopWinAnimation() {
        if(this.tweensInProgress.length == 0) return;

        for(let tween of this.tweensInProgress) {
            tween.kill();
        }
        this.tweensInProgress.splice(0);
        this.symbolContainer.scale.x = 1;
        this.symbolContainer.scale.y = 1;
        this.symbolContainer.x = this.initPoint.x;
        this.symbolContainer.y = this.initPoint.y;
    }

    get container () {
        return this.symbolContainer;
    }


}
ReelSymbol.prototype.icons = null;
ReelSymbol.prototype.currentSymbol = null;
ReelSymbol.prototype.symbolContainer = null;
ReelSymbol.prototype.initPoint = null;
ReelSymbol.prototype.tweensInProgress = null;