"use strict";
window.addEventListener("load", init, false);

var reelSet;
var controlPanel;
var game;
var meter;
var application;
var serverSimulator;
var soundManager;

function init() {
    application = new PIXI.Application(1200, 800, {transparent: true});
    document.body.appendChild(application.view);

    PIXI.loader
        /*.add("A", "assets/img/A.png")
        .add("B", "assets/img/B.png")
        .add("C", "assets/img/C.png")
        .add("D", "assets/img/D.png")
        .add("E", "assets/img/E.png")
        .add("J", "assets/img/J.png")
        .add("K", "assets/img/K.png")
        .add("N", "assets/img/N.png")
        .add("Q", "assets/img/Q.png")
        .add("T", "assets/img/T.png")*/
        .add('1', "assets/img/B.png")
        .add('2', "assets/img/C.png")
        .add('3', "assets/img/D.png")
        .add('4', "assets/img/E.png")
        .add('5', "assets/img/A.png")
        .add('6', "assets/img/K.png")
        .add('7', "assets/img/Q.png")
        .add('8', "assets/img/J.png")
        .add("spinButton", "assets/img/spinButton.png")
        .add("arrowButton", "assets/img/arrowButton.png")
        .load(onLoadAssets);

    function onLoadAssets() {
        soundManager = new SoundManager();
        soundManager.onLoad(startGame);
    }

    function startGame() {
        console.log('Assets Loaded');
        game = new Game(Config.START_BALANCE, Config.BET_SET[0]);
        reelSet = new ReelSet(application.stage);
        controlPanel = new ControlPanel();
        serverSimulator = new ServerResponseSimulation();

        meter = new Meter(application.stage);
        meter.updateBalance(game.balance);
        meter.updateBet(game.bet);

        application.stage.addChild(controlPanel);
        controlPanel.updateBet(game.bet);
        controlPanel.updateBalance(game.balance);

        GameEvents.addGameEventListener(GameEvents.SPIN_CLICK, onSpinClickHandler);
        GameEvents.addGameEventListener(GameEvents.BET_DOWN_CLICK, onBetDownClickHandler);
        GameEvents.addGameEventListener(GameEvents.BET_UP_CLICK, onBetUpClickHandler);
        GameEvents.addGameEventListener(GameEvents.SPINNING_START, onSpinningStartHandler);
        GameEvents.addGameEventListener(GameEvents.ALL_REELS_STOP, onReelsStopHandler);
        GameEvents.addGameEventListener(GameEvents.REEL_STOP, onReelStopHandler);
        GameEvents.addGameEventListener(GameEvents.RESPONSE_SPIN_DATA, onSpinResponseHandler);
        GameEvents.addGameEventListener(GameEvents.LINE_ANIMATION_COMPLETE, onLineAnimationCompleteHandler);
        GameEvents.addGameEventListener(GameEvents.SPINNING_START, onSpinningStartHandler);
    }

    function onSpinClickHandler(event) {
        console.log("Spin Clicked");
        game.balance -= game.bet;
        meter.updateBalance(game.balance);
        controlPanel.updateBalance(game.balance);
        controlPanel.enabled(false);
        controlPanel.clearWin();
        reelSet.spin();
        soundManager.sounds.click.play();
    }

    function onBetDownClickHandler(event) {
        let betIndex = Config.BET_SET.indexOf(game.bet);
        betIndex = Math.max(0, --betIndex);
        game.bet = Config.BET_SET[betIndex];
        controlPanel.updateBet(game.bet);
        soundManager.sounds.click.play();
    }

    function onBetUpClickHandler(event) {
        let betIndex = Config.BET_SET.indexOf(game.bet);
        betIndex = Math.min(Config.BET_SET.length - 1, ++betIndex);
        game.bet = Config.BET_SET[betIndex];
        controlPanel.updateBet(game.bet);
        soundManager.sounds.click.play();
    }

    function onReelStopHandler(event) {
        soundManager.sounds.reelstop.play();
    }

    function onReelsStopHandler(event) {
        console.log("Spin Complete");
        if(game.balance == 0){
            console.log("EMPTY BALANCE");
            return;
        }
        soundManager.sounds.reelspin.stop();
        controlPanel.enabled(true);

        if(game.spinVo.totalWin > 0){
            game.balance += (game.bet + game.spinVo.totalWin);
            controlPanel.updateBalance(game.balance);
            controlPanel.showWin(game.spinVo.totalWin);
            reelSet.showAnimation(game.spinVo.winLinesIterator.next());
            meter.updateWin(game.spinVo.totalWin);
            playWinSound();
        }
        meter.updateBalance(game.balance);
    }

    function onSpinningStartHandler (event) {
        GameEvents.dispatchGameEvent(GameEvents.REQUEST_SPIN_DATA, {"balance": game.balance, "bet": game.bet});
        soundManager.sounds.reelspin.play();
    }

    function onSpinResponseHandler(event) {
        console.log("Spin Data: ", event.data);
        game.update(event.data);
        reelSet.stop(game.spinVo.stopReelSetPositions);
    }

    function onLineAnimationCompleteHandler(event) {
        /*if(!game.spinVo.winLinesIterator.hasNext()){
            game.spinVo.winLinesIterator = game.spinVo.winLines.iterator();
        }*/

        reelSet.showAnimation(game.spinVo.winLinesIterator.next());
    }

    function playWinSound() {
        let symbol = 0;
        for(let line of game.spinVo.winLines) {
            if(symbol < line[5]) {
                symbol = line[5];
            }
        }
        if(symbol < 5) {
            soundManager.sounds.win1.play();
        } else {
            soundManager.sounds.win2.play();
        }
    }
}










