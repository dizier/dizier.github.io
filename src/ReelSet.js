"use strict";
class ReelSet {
    constructor(container) {
        GameEvents.addGameEventListener(GameEvents.TEST_EVENT, onTestEventHandler);
        GameEvents.addGameEventListener(GameEvents.REEL_STOP, onReelStopHandler);

        for(let i = 0; i < Config.REEL_NUM; i++){
            let reel = new Reel(i, Config.REEL_STREAM[i]);
            this.reels.push(reel);
            reel.container.x = Config.SYMBOL_WIDTH * i;
            this.reelsContainer.addChild(reel.container);
        }

        this.reelsContainer.x = Config.REELS_X;
        this.reelsContainer.y = Config.REELS_Y;
        container.addChild(this.reelsContainer);

        var maskShape = new PIXI.Graphics();
        maskShape.beginFill(0xff0000, 0.2);
        maskShape.drawRect(Config.REELS_X, Config.REELS_Y,  Config.SYMBOL_WIDTH * Config.REEL_NUM, Config.SYMBOL_HEIGHT * Config.REEL_SYMBOLS_NUM);
        maskShape.endFill();
        this.reelsContainer.mask = maskShape;
        container.addChild(maskShape);

        console.log("ReelSet Is Created");

        function onTestEventHandler(event) {
            console.log("//////   I CAN HEAR TEST EVENT ///////", event.data);
            GameEvents.removeGameEventListener(GameEvents.TEST_EVENT, onTestEventHandler);
        }

        function onReelStopHandler(event) {
            let reel = event.data;
            console.log(" stop reel" + reel.reelIndex);
            if(reel.reelIndex == Config.REEL_NUM - 1){
                GameEvents.dispatchGameEvent(GameEvents.ALL_REELS_STOP);
            }
        }
    }

    spin() {
        for (let i in this.reels){
            /*if(reel.hasEventListener(Reel.ANIMATION_COMPLETE)){
             reel.removeEventListener(Reel.ANIMATION_COMPLETE, onAnimationCompleteHandler);
             }*/
            this.reels[i].spin();
        }
        GameEvents.dispatchGameEvent(GameEvents.SPINNING_START);
    }

    stop(positions) {
        for(let i = 0; i < this.reels.length; i++){
            this.reels[i].stop(positions[i]);
        }
    }

    showAnimation(nextLine) {
        let counter = 0;

        for(let i = 0; i < this.reels.length; i++){
            if(nextLine[i] == -1){
                return;
            }
            this.reels[i].container.on(Reel.ANIMATION_COMPLETE, _onAnimationCompleteHandler);
            this.reels[i].showAnimation(nextLine[i]);
            counter++;
        }

        function _onAnimationCompleteHandler(e) {
            this.removeListener(Reel.ANIMATION_COMPLETE, _onAnimationCompleteHandler);
            counter--;
            if(counter == 0) {
                GameEvents.dispatchGameEvent(GameEvents.LINE_ANIMATION_COMPLETE);
            }
        }
    }



    /*_onAnimationCompleteHandler(event) {
        /*event.target.removeEventListener(Reel.ANIMATION_COMPLETE, _onAnimationCompleteHandler);
        let counter = 0;
        for(i in 0...reels.length){
            if(reels[i].hasEventListener(Reel.ANIMATION_COMPLETE)){
                counter++;
            }
        }
        if(counter == 0){

            GameEvents.dispatchGameEvent(GameEvents.LINE_ANIMATION_COMPLETE);
        }*/
        /*console.log("_onAnimationCompleteHandler >>>>>  :::", event);
    }*/
}
ReelSet.prototype.reels = [];
ReelSet.prototype.reelsContainer = new PIXI.Container();
ReelSet.prototype.maskSprite = null;
