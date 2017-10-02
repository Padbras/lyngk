"use strict";

Lyngk.Coordinates = function (c, l) {

    var private_c = c;
    var private_l = l;

    var coordValides = [[3,3],[2,5],[1,7],[2,7],[2,8],[3,8],[3,9],[5,8],[7,7]];

    this.valide = function()
    {
        return (coordValides[c.charCodeAt(0) - 'A'.charCodeAt(0)][0] < l && l < coordValides[c.charCodeAt(0) - 'A'.charCodeAt(0)][1]);
    };

};
