"use strict";

Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};
Lyngk.Players = {PLAYER1: 1, PLAYER2: 2};

Lyngk.Engine = function () {


    var board = [];
    var j = 0;
    var valid_coord_array = [];
    var player_turn = Lyngk.Players.PLAYER1;
    var claimed_array_p1 = [];
    var claimed_array_p2 = [];
    var score_p1 = 0;
    var score_p2 = 0;


    var good_coord = function () {

        for (var columns_count in Lyngk.valid_coordinates) {
            if (Lyngk.valid_coordinates[columns_count][1] === Lyngk.valid_coordinates[columns_count][0]) {
                valid_coord_array.push(new Lyngk.Coordinates(String.fromCharCode(parseInt(columns_count) + 65), Lyngk.valid_coordinates[columns_count][1]));
            }

            else {
                var tmp = Lyngk.valid_coordinates[columns_count][0];
                while (tmp <= Lyngk.valid_coordinates[columns_count][1]) {
                    valid_coord_array.push(new Lyngk.Coordinates(String.fromCharCode(parseInt(columns_count) + 65), tmp));
                    tmp++;
                }
            }
        }
    };


    this.get_claim_array = function (player, array_member) {
        if (player === Lyngk.Players.PLAYER1) {
            return claimed_array_p1[array_member];
        }

        else {
            return claimed_array_p2[array_member];
        }
    };


    this.get_length = function () {
        return board.length;
    };

    var initialize = function () {
        for (var valid_coord in valid_coord_array) {
            board.push(new Lyngk.Intersection(valid_coord_array[valid_coord]));
        }
    };

    this.create_random_color = function () {
        return Math.floor(Math.random() * 6);
    };

    var fill_board = function () {
        var color_count = [8, 8, 8, 8, 8, 3];
        var color;
        for (var all_inter in board) {
            color = Math.floor(Math.floor(Math.random() * 6));
            while (color_count[color] === 0) {
                color = Math.floor(Math.random() * 6);
            }
            board[all_inter].place_token(color);
            color_count[color]--;
        }
    };

    this.get_from_coord = function (c) {
        for (var all_inter in board) {
            if (board[all_inter].get_coord().to_string() === c) {
                return board[all_inter];
            }

        }
    };


    this.whose_turn = function () {
        return player_turn;
    };
    this.validate_move = function (src, dest) {
        var origin = this.get_from_coord(src);
        var destination = this.get_from_coord(dest);
        var column_dest = destination.get_coord().get_column().charCodeAt(0);
        var column_origin = origin.get_coord().get_column().charCodeAt(0);

        if (column_dest === column_origin) {
            if (destination.get_coord().get_line() === origin.get_coord().get_line() + 1 || destination.get_coord().get_line() === origin.get_coord().get_line() - 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (column_dest === column_origin + 1) {
            if (destination.get_coord().get_line() === origin.get_coord().get_line() + 1 || destination.get_coord().get_line() === origin.get_coord().get_line()) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (column_dest === column_origin - 1) {
            if (destination.get_coord().get_line() === origin.get_coord().get_line() - 1 || destination.get_coord().get_line() === origin.get_coord().get_line()) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };

    this.validate_move_size = function (src, dest) {
        var origin = this.get_from_coord(src);
        var destination = this.get_from_coord(dest);

        if (origin.get_stack_size() < destination.get_stack_size()) {
            return false;
        }

        if ((origin.get_stack_size() + destination.get_stack_size()) <= 5) {
            return true;
        }
        else {
            return false;
        }
    };

    this.player_turn = function (src, dest) {
        var flag = this.move_token(src, dest);

        if (player_turn === Lyngk.Players.PLAYER1) {
            player_turn = Lyngk.Players.PLAYER2;
        }

        else {
            player_turn = Lyngk.Players.PLAYER1;
        }
    };

    this.claim_color = function (player, color) {
        for (var claimed_p1 in claimed_array_p1) {
            if (claimed_array_p1[claimed_p1] === color) {
                return false;
            }
        }

        for (var claimed_p2 in claimed_array_p2) {
            if (claimed_array_p2[claimed_p2] === color) {
                return false;
            }
        }

        if (player === Lyngk.Players.PLAYER1) {
            claimed_array_p1.push(color);
        }
        else {
            claimed_array_p2.push(color);
        }
    };

    this.move_token = function (src, dest) {
        var origin = this.get_from_coord(src);
        var destination = this.get_from_coord(dest);
        var tmp = origin.get_full_stack();

        if (destination.get_stack_size() !== 0 && this.validate_move(src, dest) === true && this.validate_move_size(src, dest) === true) {
            for (var tokens = 0; tokens < tmp.length; tokens++) {
                destination.place_token(tmp[tokens]);
            }

            while (origin.get_stack_size() !== 0) {
                origin.pop_stack();
            }

            if (destination.get_state() === Lyngk.State.FULL_STACK) {
                return destination.get_color();
            }
            else {
                return 10;
            }
        }
    };

    this.get_from_array = function (array_place) {
        return board[array_place];
    };

    good_coord();
    initialize();
    fill_board();


};
