"use strict";
Lyngk.valid_coordinates = [[3, 3], [2, 5], [1, 7], [2, 7], [2, 8], [3, 8], [3, 9], [5, 8], [7, 7]];


Lyngk.Coordinates = function (column, line) {

    var private_column;
    var private_line;

    var init = function (column, line) {
        private_column = column;
        private_line = line;
    };

    init(column, line);


    this.valid_coordinate = function () {
        var column_number = Lyngk.valid_coordinates[column.charCodeAt(0) - 'A'.charCodeAt(0)];
        return (column_number[0] <= line && line <= column_number[1]);
    };


    this.somme_coord = function () {
        var sum = 0;

        for (var coord_count in Lyngk.valid_coordinates) {
            sum += Lyngk.valid_coordinates[coord_count][1] - Lyngk.valid_coordinates[coord_count][0] + 1;
        }
        return sum;
    };

    this.to_string = function () {
        if (this.valid_coordinate() === false) {
            return "invalid";
        }

        else {
            return "" + column + line;
        }
    };

    this.clone = function () {
        return new Lyngk.Coordinates(private_column, private_line);
    };

    this.compare = function (coord) {
        if (private_column === coord.get_column() && private_line === coord.get_line()) {
            return true;
        }
        else {
            return false;
        }
    };

    this.get_column = function () {
        return private_column;
    };

    this.get_line = function () {
        return private_line;
    };

    this.hash = function () {
        var hash_result = parseInt("" + (private_column.charCodeAt(0) - 64) + private_line);
        return hash_result;
    };
};
