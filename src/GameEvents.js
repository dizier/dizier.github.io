"use strict";
class GameEvents {
    constructor() {}

    static dispatchGameEvent (eventName, data = {}) {
        let event = new Event(eventName);
        event['data'] = data;
        document.dispatchEvent(event);
    }

    static addGameEventListener (type, listener) {
        document.addEventListener(type, listener);

        if(GameEvents.listenersRegister[type] == undefined) {
            GameEvents.listenersRegister[type] = [];
        }

        if(GameEvents.listenersRegister[type].indexOf(listener) == -1) {
            GameEvents.listenersRegister[type].push(listener);
        }
    }

    static removeGameEventListener (type, listener) {
        document.removeEventListener(type, listener);

        if(GameEvents.listenersRegister[type] == undefined) {
            return -1;
        }

        let index = GameEvents.listenersRegister[type].indexOf(listener);

        if(index == -1) {
            return -1;
        }

        GameEvents.listenersRegister.splice(index, 1);
    }

    static hasEventListener(type, listener){
        if(GameEvents.listenersRegister[type] == undefined) {
            return false;
        }
        return GameEvents.listenersRegister[type].indexOf(listener) != -1;
    }
}
GameEvents.SPIN_CLICK = "SpinClick";
GameEvents.SPINNING_START = "SpinningStart";
GameEvents.REEL_STOP = "ReelStop";
GameEvents.ALL_REELS_STOP = "AllReelStop";
GameEvents.RESPONSE_SPIN_DATA = "ResponseSpinData";
GameEvents.REQUEST_SPIN_DATA = "RequestSpinData";
GameEvents.LINE_ANIMATION_COMPLETE = "LineAnimationComplete";
GameEvents.BET_DOWN_CLICK = "BetDownClick";
GameEvents.BET_UP_CLICK = "BetUpClick";
GameEvents.TEST_EVENT = "TestEvent";
GameEvents.listenersRegister = [];
