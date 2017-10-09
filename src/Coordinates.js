"use strict";

Lyngk.Coordinates = function (c, l) {

    var private_c = c;
    var private_l = l;

    var coordValides = [[3,3],[2,5],[1,7],[2,7],[2,8],[3,8],[3,9],[5,8],[7,7]];

    this.valide = function()
    {
        return (coordValides[c.charCodeAt(0) - 'A'.charCodeAt(0)][0] <= l && l <= coordValides[c.charCodeAt(0) - 'A'.charCodeAt(0)][1]);
    };

    this.sommeCoord = function()
    {
        var somme = 0;
        for(var i in coordValides)
        {
          somme += coordValides[i][1] - coordValides[i][0] + 1;
        }
        return somme;
    }

    this.toString = function()
    {
        if(this.valide() == false)
            return "invalid";
        else return ""+ c + l;

    }

    this.clonage = function()
    {

        return new Lyngk.Coordinates(private_c, private_l);
    }

    this.comparaison = function(coord) {

        if(private_c === coord.get_c() && private_l === coord.get_l())
            return true;
        else return false;
    }

    this.get_c = function() {
        return private_c;
    }

    this.get_l = function() {
        return private_l;
    }

    this.hash = function()
    {
       var hashage = parseInt("" + (private_c.charCodeAt(0)-64) + private_l) ;
       return hashage;
    }
};
