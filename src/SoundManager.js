'use strict'
class SoundManager {
    constructor() {
        let soundAssets = {
            click : "assets/sounds/click.mp3",
            reelspin : "assets/sounds/reelspin.mp3",
            reelstop : "assets/sounds/reelstop.mp3",
            win1 : "assets/sounds/winSound1.mp3",
            win2 : "assets/sounds/winSound2.mp3"
        };

        this.sounds = {
            click : null,
            reelspin : null,
            reelstop : null,
            win1 : null,
            win2 : null
        };

        this._onLoadHandler = function(){};

        let loaderCounter = 0;
        let keys = Object.keys(soundAssets);
        let thisManager = this;
        for (let key of keys) {
            this.sounds[key] = new Howl({
                src: soundAssets[key],
                autoplay: false,
                onload: function() {
                    loaderCounter++;
                    if(loaderCounter == keys.length) {
                        console.log("all sounds loaded");
                        thisManager._onLoadHandler();
                    }
                }
            });
        }
    }

    onLoad(callbeck) {
        this._onLoadHandler = callbeck;
    }
}
SoundManager.prototype.sounds = null;
