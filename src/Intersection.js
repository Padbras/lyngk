"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (coord) {

   var private_etat = Lyngk.State.VACANT;
   var private_color;
   var private_nbPions = 0;

   var private_coord = coord;


    this.get_etat = function()
    {
        return private_etat;
    }

    this.get_color = function()
    {
        return private_color;
    }

    this.placerPion = function(couleur)
    {
        private_color = couleur;
        private_nbPions++;
        if(private_nbPions == 5)
            private_etat = Lyngk.State.FULL_STACK;
        else if(private_etat === Lyngk.State.VACANT)
             private_etat = Lyngk.State.ONE_PIECE;
        else if(private_etat === Lyngk.State.ONE_PIECE)
             private_etat = Lyngk.State.STACK;

    }

};
