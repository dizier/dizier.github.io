"use strict";
class Config {
    constructor() {}

    static getTexture(name){
        return PIXI.loader.resources[name].texture;
    }

    static getWin(symbolName, num){
        let win = 0;
        switch(symbolName) {
            /*case "B": switch(num) {
                case 2: win = 10;
                case 3: win = 75;
                case 4: win = 750;
                case 5: win = 5000;
            }
            case "C": switch(num) {
                case 2: win = 5;
                case 3: win = 50;
                case 4: win = 200;
                case 5: win = 2500;
            }
            case "D": case "E": switch(num) {
                case 2: win = 3;
                case 3: win = 25;
                case 4: win = 100;
                case 5: win = 1000;
            }
            case "K": case "A": switch(num){
                case 3: win = 10;
                case 4: win = 50;
                case 5: win = 400;
            }

            case "J": case "Q": switch(num){
                case 3: win = 5;
                case 4: win = 35;
                case 5: win = 200;
            }
            case "N": case "T": switch(num){
                case 3: win = 5;
                case 4: win = 20;
                case 5: win = 100;
            }*/
            case 1: switch(num) {
                case 3: win = 250;
                case 4: win = 500;
                case 5: win = 1000;
            }
            case 2: switch(num) {
                case 3: win = 200;
                case 4: win = 450;
                case 5: win = 800;
            }
            case 3: switch(num) {
                case 3: win = 150;
                case 4: win = 400;
                case 5: win = 700;
            }
            case 4: switch(num){
                case 3: win = 100;
                case 4: win = 350;
                case 5: win = 600;
            }
            case 5: switch(num){
                case 3: win = 90;
                case 4: win = 300;
                case 5: win = 700;
            }
            case 6: switch(num){
                case 3: win = 80;
                case 4: win = 250;
                case 5: win = 600;
            }
            case 7: switch(num){
                case 3: win = 70;
                case 4: win = 200;
                case 5: win = 500;
            }
            case 8: switch(num){
                case 3: win = 60;
                case 4: win = 100;
                case 5: win = 400;
            }
        }
        return win;
    }
}
Config.BET_SET = [1,2,3,4,5];
Config.WIN_LINES = [[1,1,1,1,1],[0,0,0,0,0],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2]];
Config.START_BALANCE = 5000;

// ----------------------------------- REELS CONFIG -----------------------------------------
/*Config.REEL_STREAM  = [
    ["Q","A","T","K","J","N","B","Q","T","D","J","K","Q","T","E","N","C","K","A","B","N","T"],
    ["J","N","K","T","A","Q","B","Q","A","J","T","D","K","B","E","T","N","Q","K","C","Q","B"],
    ["C","A","T","N","J","N","A","Q","T","J","J","D","Q","A","J","B","C","K","N","B","J","A"],
    ["N","B","Q","K","C","N","K","J","T","Q","J","C","A","N","A","E","D","K","A","B","Q","T"],
    ["Q","C","K","N","A","B","D","J","K","T","E","K","E","T","A","K","C","T","A","J","K","Q"]
];*/
Config.REEL_STREAM  = [
    [1,5,2,1,6,5,8,5,1,2,3,7,4,5,8,1,4,3,2,5,6],
    [5,1,6,3,7,8,1,3,2,4,6,8,5,4,5,3,8,7,5,4,1,7,4,8,4],
    [8,4,1,3,2,6,7,2,3,4,1,5,6,7,8,2,5,4,3,1,2,7,6,7,1,4,3,2,4],
    [1,7,4,2,3,8,4,3,2,5,6,7,2,3,4,5,8,1,2,6,2,4,2,6,3,7,8,4,6,2,3,1,2,5,6,3,4],
    [8,5,1,8,5,1]
];
Config.INIT_REELS_SYMBOLS = [5, 9, 0, 12, 16];
//Config.SYMBOLS_SET = ["B", "C", "D", "E", "A", "K", "Q", "J", "T", "N"];
Config.SYMBOLS_SET = [1, 2, 3, 4, 5, 6, 7, 8];
Config.REEL_NUM = 5;
Config.REEL_SYMBOLS_NUM = 3;
Config.SYMBOL_WIDTH = 150;
Config.SYMBOL_HEIGHT = 150;
Config.REELS_X = 20;
Config.REELS_Y = 50;
Config.REELS_SPINNING_SPEED = 20;
Config.SPINNING_TIMER = 1.5;
Config.REEL_STOP_DELAY = 0.4;

// ----------------------------------- CONTROL PANEL CONFIG -----------------------------------------
Config.SPIN_BUTTON_X = 650;
Config.SPIN_BUTTON_Y = 510;
Config.SPIN_LABEL_TEXT = "SPIN";
Config.BET_DOWN_BUTTON_X = 50;
Config.BET_DOWN_BUTTON_Y = 560;
Config.BET_UP_BUTTON_X = 50;
Config.BET_UP_BUTTON_Y = 530;
Config.BALANCE_LABEL_X = 250;
Config.BALANCE_LABEL_Y = 530;
Config.BALANCE_LABEL_TEXT = "BALANCE:";
Config.WIN_LABEL_X = 310;
Config.WIN_LABEL_Y = 0;
Config.WIN_LABEL_TEXT = "WIN:";
Config.TEXT_STYLE = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

