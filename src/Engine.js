"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
<<<<<<< HEAD

    var plateau = [];

    var init = function()
    {
        for(var compt in Lyngk.coordValides)
        {
            plateau[compt]

        }
    }
    init();
=======
    var plateau = [];
    var j = 0;
    var tabCoordValid = [];

    this.good_coord = function () {
        for(var i in Lyngk.CoordValides.length)
            if(Lyngk.CoordValides[i][1] === Lyngk.CoordValides[i][0])
                tabCoordValid.push(new Lyngk.Coordinates(''+i+65,Lyngk.CoordValides[i][1]));
            else if(Lyngk.CoordValides[i][1] !== Lyngk.CoordValides[i][0])
            {
                var tmp = Lyngk.CoordValides[i][0];
                while(tmp <= Lyngk.CoordValides[i][1])
                {
                    tabCoordValid.push(new Lyngk.Coordinates(''+i+65,tmp));
                    tmp++;
                }

            }


    }

    this.getCase = function(i) {
        return plateau[i];
    }

    this.getTaille = function()
    {
        return plateau.length;
    }

    this.initPlateau = function () {
        for(var i in tabCoordValid)
            plateau.push(new Lyngk.Intersection(tabCoordValid[i]));
    }

    this.remplirPlateau = function()
    {
       // for(var i in plateau)
       //     plateau[i].placerPion(Lyngk.Color.BLACK);
        var cptCouleur = [8,8,8,8,8,3];
        var couleur;
        for(var i in plateau)
        {
            couleur =  Math.floor(Math.random() * 6);

            while(cptCouleur[couleur] === 0)
                couleur =  Math.floor(Math.random() * 6);

            plateau[i].placerPion(couleur);
            cptCouleur[couleur]--;
        }


    }

    this.good_coord();
    this.initPlateau();
    this.remplirPlateau();

>>>>>>> refs/remotes/origin/master
};
