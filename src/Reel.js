"use strict";
class Reel {
    constructor(index, stream) {
        this.reelIndex = index;
        this.symbolStream = stream;
        this.symbolStreamIterator = new ReelIterator(stream);
        this.symbolsContainer = new PIXI.Container();
        this.reelCurrentPosition = Config.INIT_REELS_SYMBOLS[this.reelIndex];
        this.spinningSpeed = Config.REELS_SPINNING_SPEED;
        this.reelStopInPosition = -1;
        this.spinTimerRunning = false;
        this.symbolsNameSet = [];
        this.symbolsScreenSet = [];
        this.animatedSymbols = [];

        this.symbolStreamIterator.setCurrentIndex(this.reelCurrentPosition);
        console.log("::::::  init reel position -> " + this.reelCurrentPosition);
        this.symbolStreamIterator.previous();

        for(let i = 0; i < Config.REEL_SYMBOLS_NUM + 2; i++) {
            this.symbolsScreenSet[i] = new ReelSymbol();
            this.symbolsScreenSet[i].container.y = i * Config.SYMBOL_HEIGHT - Config.SYMBOL_HEIGHT;
            this.symbolsScreenSet[i].showIcon(this.symbolStreamIterator.next());
            this.symbolsContainer.addChild(this.symbolsScreenSet[i].container);
        }

        this.spinningTimerDelay = Config.SPINNING_TIMER + this.reelIndex * Config.REEL_STOP_DELAY;

        console.log("Created new Reel" + this.reelIndex + " : " + stream);
    }

    spin() {
        console.log("Reel" + this.reelIndex + " spin started");
        this.symbolsNameSet.splice(0, this.symbolsNameSet.length);
        this.reelStopInPosition = -1;
        this.reelCurrentPosition--;

        this.stopWinAnimation();

        TweenLite.delayedCall(this.spinningTimerDelay, onTimerHandler, [this]);
        this.spinTimerRunning = true;
        //stop(Config.INIT_REELS_SYMBOLS[reelIndex]);
        application.ticker.add(this.spinningAnimation, this);

        function onTimerHandler(reelInstance) {
            reelInstance.spinTimerRunning = false;
            if(reelInstance.reelStopInPosition != -1){
                reelInstance.seekCurrentPosition(reelInstance.reelStopInPosition);
            }
        }
    }

    seekCurrentPosition(position) {
        this.reelCurrentPosition = position + this.symbolsScreenSet.length;

        if(this.reelCurrentPosition >= this.symbolStream.length){
            this.reelCurrentPosition -= this.symbolStream.length;
        }
    }

    spinningAnimation() {
        this.symbolsContainer.y += this.spinningSpeed;
        if(this.symbolsContainer.y >= Config.SYMBOL_HEIGHT){
            this.symbolsContainer.y -= Config.SYMBOL_HEIGHT;
            this.reelCurrentPosition--;
            if(this.reelCurrentPosition < 0){
                this.reelCurrentPosition = this.symbolStream.length - 1;
            }

            let i = this.symbolsScreenSet.length - 1;
            while(i > 0){
                this.symbolsScreenSet[i].showIcon(this.symbolsScreenSet[i - 1].currentSymbol);
                i--;
            }
            this.symbolsScreenSet[0].showIcon(this.symbolStream[this.reelCurrentPosition]);

            if(!this.spinTimerRunning && this.reelStopInPosition != -1 && this.reelCurrentPosition == this.reelStopInPosition){
                application.ticker.remove(this.spinningAnimation, this);
                this.symbolsContainer.y = Config.SYMBOL_HEIGHT * 0.8;
                TweenLite.to(this.symbolsContainer, 0.3, {y: 0, ease: Back.easeOut, onComplete: GameEvents.dispatchGameEvent, onCompleteParams: [GameEvents.REEL_STOP, this]});
            }
        }
    }

    stop(position) {
        this.reelStopInPosition = position - 1;
        if(this.reelStopInPosition < 0){
            this.reelStopInPosition = this.symbolStream.length - 1;
        }

        console.log("Reel" + this.reelIndex + " stop at position: " + position);

        this.symbolStreamIterator.setCurrentIndex(position);
        for(let i = 0; i < Config.REEL_SYMBOLS_NUM; i++)
        {
            this.symbolsNameSet.push(this.symbolStreamIterator.next());
        }

        console.log("Reel" + this.reelIndex + " show symbols at screen: " + this.symbolsNameSet);

        if(!this.spinTimerRunning){
            this.seekCurrentPosition(position);
        }
    }

    showAnimation(position) {
        let reel = this;
        let animatedSymbol = this.symbolsScreenSet[position + 1];
        animatedSymbol.winAnimation(onAnimationComplete);

        this.animatedSymbols.push(animatedSymbol);

        function onAnimationComplete(symbol) {
            let index = reel.animatedSymbols.indexOf(symbol);
            if(index != -1) {
                reel.animatedSymbols.splice(index, 1);
            }
            reel.container.emit(Reel.ANIMATION_COMPLETE);
        }
    }

   stopWinAnimation() {
       if(this.animatedSymbols.length == 0) return;
       for(let animatedSymbol of this.animatedSymbols){
           animatedSymbol.stopWinAnimation();
       }
       this.animatedSymbols.splice(0);
       this.container.removeAllListeners(Reel.ANIMATION_COMPLETE);
   }


    get container () {
        return this.symbolsContainer;
    }
}

Reel.ANIMATION_COMPLETE = "AnimationComplete";
Reel.prototype.symbolStreamIterator = null;
Reel.prototype.symbolsNameSet = null;
Reel.prototype.spinningTimerDelay = null;
Reel.prototype.symbolsScreenSet = null;
Reel.prototype.animatedSymbols = null;
Reel.prototype.symbolsContainer = null;
Reel.prototype.spinningSpeed = null;
Reel.prototype.reelCurrentPosition = null;
Reel.prototype.reelStopInPosition = null;
Reel.prototype.reelIndex = null;
Reel.prototype.symbolStream = null;
Reel.prototype.reelCurrentPosition = null;
Reel.prototype.spinTimerRunning = null;
