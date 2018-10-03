"use strict";
class Game{
    constructor(balance, bet) {
        this.spinVo = null;
        this.balance = balance;
        this.bet = bet;
    }

    update(data) {
        this.balance = data.balance;
        this.bet = data.bet;
        this.spinVo = data;
    }
}

Game.prototype.spinVo = null;
Game.prototype.balance = null;
Game.prototype.bet = null;
