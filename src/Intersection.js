"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (coord) {

    var private_state = Lyngk.State.VACANT;
    var private_color;
    var private_tokens_number = 0;
    var private_coord = coord;
    var private_stack = [];

    this.pop_stack = function () {
        private_stack.pop();
        private_tokens_number--;
        if (private_tokens_number === 0) {
            private_state = Lyngk.State.VACANT;
        }
    };

    this.set_color = function (color) {
        private_color = color;
    };

    this.stack_to_string = function () {
        for (var tokens = 0; tokens < this.get_stack_size(); tokens++) {
            console.log(this.get_stack_element(tokens));
        }
    };

    this.get_full_stack = function () {
        return private_stack;
    };


    this.get_stack_element = function (array_place) {
        return private_stack[array_place];
    };

    this.get_coord = function () {
        return private_coord;
    };

    this.get_stack_color = function () {
        return private_stack[private_tokens_number - 1];
    };

    this.get_stack_size = function () {
        return private_tokens_number;
    };

    this.get_state = function () {
        return private_state;
    };

    this.get_color = function () {
        return private_color;
    };

    this.place_token = function (color) {
        private_stack.push(color);
        private_color = color;
        private_tokens_number++;
        if (private_tokens_number === 5) {
            private_state = Lyngk.State.FULL_STACK;
        }

        else if (private_state === Lyngk.State.VACANT) {
            private_state = Lyngk.State.ONE_PIECE;
        }

        else if (private_state === Lyngk.State.ONE_PIECE) {
            private_state = Lyngk.State.STACK;
        }

    };

};
