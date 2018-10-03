"use strict";
class ReelIterator {
    constructor(array) {
        this.realStream = array;
    }

    next() {
        if(this.realStream == null || this.realStream.length == 0){
            return -1;
        }

        this.position++;
        if(this.position == this.realStream.length){
            this.position = 0;
        }

        return this.realStream[this.position];
    }

    previous() {
        if(this.realStream == null || this.realStream.length == 0){
            return -1;
        }

        this.position--;
        if(this.position < 0){
            this.position = this.realStream.length - 1;
        }
        return this.realStream[this.position];
    }

    setCurrentIndex(index) {
        if(index > this.realStream.length - 1 || index < 0){
            return -1;
        }

        index--;
        if(index < 0) index = this.realStream.length - 1;

        this.position = index;
    }
}
ReelIterator.prototype.realStream = null;
ReelIterator.prototype.position = null;
