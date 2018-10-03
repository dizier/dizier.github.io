"use strict";
class WinLinesIterator {
    constructor(array) {
        this.iterable = array;
    }

    next() {
        if(this.index == null) {
            this.index = 0;
        }
        this.index++;
        if(this.index == this.iterable.length)  this.index = 0;

        return this.iterable[this.index];
    }

    previous() {
        if(this.index == null) {
            this.index = 0;
        } else if(this.hasPrevious()) {
            this.index--;
        }

        return this.iterable[this.index];
    }

    hasNext() {
        return this.index < this.iterable.length - 1;
    }

    hasPrevious() {
        return this.index > 0;
    }
}
WinLinesIterator.prototype.index = null;
WinLinesIterator.prototype.iterable = null;