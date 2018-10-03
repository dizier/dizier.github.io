"use strict";
class ServerResponseSimulation {
    constructor() {
        GameEvents.addGameEventListener(GameEvents.REQUEST_SPIN_DATA, onRequestServerHandler);

        function onRequestServerHandler (event) {
            let spinVo = new SpinVO();
            let balance = event.data.balance;
            spinVo.bet = event.data.bet;
            spinVo.stopReelSetPositions = [];//[0,7,12,1,1]; [14,18,0,19,2]; [16,18,20,19,2]
            let symbolsOnScreenArr = [];
            for(let i = 0; i < Config.REEL_NUM; i++){
                if(spinVo.stopReelSetPositions[i] == undefined) spinVo.stopReelSetPositions[i] = Math.round(Math.random() * (Config.REEL_STREAM[i].length - 1));

                let iterator = new ReelIterator(Config.REEL_STREAM[i]);
                iterator.setCurrentIndex(spinVo.stopReelSetPositions[i]);
                symbolsOnScreenArr[i] = [];
                for(let j = 0; j < Config.REEL_SYMBOLS_NUM; j++){
                    symbolsOnScreenArr[i][j] = iterator.next();
                }
            }

            console.log("symbolsOnScreenArr = " + symbolsOnScreenArr);

            for(let line in Config.WIN_LINES){
                let symbolsNum = 1;
                let symbolName = symbolsOnScreenArr[0][Config.WIN_LINES[line][0]];
                let winLineSymbols = [];

                winLineSymbols[0] = Config.WIN_LINES[line][0];

                for(let i = 1; i < Config.WIN_LINES[line].length; i++){
                    winLineSymbols[i] = - 1;
                }

                for(let i = 1; i < Config.WIN_LINES[line].length; i++){
                    if(symbolsOnScreenArr[i][Config.WIN_LINES[line][i]] == symbolName){
                        symbolsNum++;
                        winLineSymbols[i] = Config.WIN_LINES[line][i];
                    }
                    else{
                        let win = Config.getWin(symbolName, symbolsNum);
                        if(win > 0){
                            winLineSymbols.push(symbolName, symbolsNum)
                            spinVo.winLines.push(winLineSymbols);
                            spinVo.wins.push(win);
                            spinVo.totalWin += win;
                        }
                        break;
                    }
                }
            }

            if(spinVo.totalWin > 0){
                spinVo.winLinesIterator = new WinLinesIterator(spinVo.winLines);
            }

            balance += spinVo.totalWin - spinVo.bet;
            spinVo.balance = Math.max(balance, 0);

            console.log("winLines : " + spinVo.winLines);
            console.log("wins : " + spinVo.wins);
            console.log("totalWin : " + spinVo.totalWin);
            console.log("balance : " + balance);

            GameEvents.dispatchGameEvent(GameEvents.RESPONSE_SPIN_DATA, spinVo);
        }
    }
}