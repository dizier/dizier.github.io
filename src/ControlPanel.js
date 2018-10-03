"use strict";
class ControlPanel extends PIXI.Container{
    constructor() {
        super();
        this
            .on('added', onAddedToStage, this);

        function onAddedToStage() {
            console.log(" ----- ControlPanel Added To Stage----- ")
            this.init();
        }

        this._isBetMin = false;
        this._isBetMax = false;
    }

    init() {
        this._spinButton = new Button(Config.getTexture("spinButton"), Config.SPIN_LABEL_TEXT);
        this._spinButton.x  = Config.SPIN_BUTTON_X;
        this._spinButton.y  = Config.SPIN_BUTTON_Y;
        this.addChild(this._spinButton);

        this._spinButton.onButtonDown = function () {
            if(this.enabled) {
                GameEvents.dispatchGameEvent(GameEvents.SPIN_CLICK);
                this.enabled = false;
                this.buttonMode = false;
            }
        }

        this._downArrowButton = new Button(Config.getTexture("arrowButton"));
        this._downArrowButton.x  = Config.BET_DOWN_BUTTON_X;
        this._downArrowButton.y  = Config.BET_DOWN_BUTTON_Y;
        this.addChild(this._downArrowButton);

        this._downArrowButton.onButtonDown = function () {
            if(this.enabled) {
                GameEvents.dispatchGameEvent(GameEvents.BET_DOWN_CLICK);
            }
        }

        let arrowTexture = Config.getTexture("arrowButton").clone();
        arrowTexture.rotate = 4;
        this._upArrowButton = new Button(arrowTexture);
        this._upArrowButton.x  = Config.BET_UP_BUTTON_X;
        this._upArrowButton.y  = Config.BET_UP_BUTTON_Y;
        //this._upArrowButton.rotation = Math.PI;
        this.addChild(this._upArrowButton);

        this._upArrowButton.onButtonDown = function () {
            if(this.enabled) {
                GameEvents.dispatchGameEvent(GameEvents.BET_UP_CLICK);
            }
        }

        this._betTextField = new PIXI.Text('0', Config.TEXT_STYLE);
        this._betTextField.x = this._downArrowButton.x + this._downArrowButton.width + 10;
        this._betTextField.y = this._downArrowButton.y - this._downArrowButton.height;
        this.addChild(this._betTextField);

        let balanceLabel = new PIXI.Text(Config.BALANCE_LABEL_TEXT, Config.TEXT_STYLE);
        balanceLabel.x = Config.BALANCE_LABEL_X;
        balanceLabel.y = Config.BALANCE_LABEL_Y;
        this.addChild(balanceLabel);

        this._balanceTextField = new PIXI.Text('0', Config.TEXT_STYLE);
        this._balanceTextField.x = balanceLabel.x + balanceLabel.width;
        this._balanceTextField.y = balanceLabel.y;
        this.addChild(this._balanceTextField);

        let winLabel = new PIXI.Text(Config.WIN_LABEL_TEXT, Config.TEXT_STYLE);
        winLabel.x = Config.WIN_LABEL_X;
        winLabel.y = Config.WIN_LABEL_Y;
        this.addChild(winLabel);

        this._winTextField = new PIXI.Text('', Config.TEXT_STYLE);
        this._winTextField.x = winLabel.x + winLabel.width;
        this._winTextField.y = winLabel.y;
        this.addChild(this._winTextField);

        this.enabled(true);
    }

    enabled(flag) {
        this._enabled = flag;
        if(flag) {
            this._spinButton.setEnabled();
            if(this._isBetMax == false) {
                this._upArrowButton.setEnabled();
            }
            if(this._isBetMin == false) {
                this._downArrowButton.setEnabled();
            }
        } else {
            this._spinButton.setDisabled();
            this._upArrowButton.setDisabled();
            this._downArrowButton.setDisabled();
        }
    }

    updateBet(betValue) {
        this._betTextField.text = betValue;

        if(betValue == Config.BET_SET[0]) {
            this._isBetMin = true;
            this._downArrowButton.setDisabled();
        }
        else{
            this._isBetMin = false;
            this._downArrowButton.setEnabled();
        }

        if(betValue == Config.BET_SET[Config.BET_SET.length - 1]) {
            this._isBetMax = true;
            this._upArrowButton.setDisabled();
        } else {
            this._isBetMax = false;
            this._upArrowButton.setEnabled();
        }
    }

    updateBalance(balanceValue) {
        this._balanceTextField.text = balanceValue;
    }

    showWin(winValue) {
        this._winTextField.text = winValue;
    }

    clearWin() {
        this._winTextField.text = '';
    }
}
ControlPanel.prototype._spinButton = null;
ControlPanel.prototype._upArrowButton = null;
ControlPanel.prototype._downArrowButton = null;
ControlPanel.prototype._betTextField = null;
ControlPanel.prototype._balanceTextField = null;
ControlPanel.prototype._winTextField = null;
ControlPanel.prototype._isBetMin = null;
ControlPanel.prototype._isBetMax = null;
