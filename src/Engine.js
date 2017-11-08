"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};
Lyngk.Joueurs = {JoueurUn : 1, JoueurDeux : 2}

Lyngk.Engine = function () {


    var plateau = [];
    var j = 0;
    var tabCoordValid = [];
    var tour_joueur = Lyngk.Joueurs.JoueurUn;



    var good_coord = function () {

        for(var i in Lyngk.CoordValides)
            if(Lyngk.CoordValides[i][1] === Lyngk.CoordValides[i][0])
            {

                tabCoordValid.push(new Lyngk.Coordinates(String.fromCharCode(parseInt(i)+65),Lyngk.CoordValides[i][1]));
            }

            else
            {
                var tmp = Lyngk.CoordValides[i][0];

                while(tmp <= Lyngk.CoordValides[i][1])
                {
                    tabCoordValid.push(new Lyngk.Coordinates(String.fromCharCode(parseInt(i)+65),tmp));
                    tmp++;
                }

            }


    }




    this.getTaille = function()
    {
        return plateau.length;
    }

    var initPlateau = function () {
        for(var i in tabCoordValid)
        {
            plateau.push(new Lyngk.Intersection(tabCoordValid[i]));

        }


    }

    var remplirPlateau = function()
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

    this.get_case_coord = function(c) // Refondre avec le hashcode (hashcode = indice tab) refaire le hashcode
    {
        for(var i in plateau)
        {
            if(plateau[i].get_coord().toString() === c)
                return plateau[i];
        }
    }

    this.whose_turn = function()
    {
        return tour_joueur;
    }

    this.coup_valide = function (src, dest)
    {
        var source = this.get_case_coord(src); //plateau[i]
        var destination = this.get_case_coord(dest); //plateau[j]

        var colonneDest = destination.get_coord().get_c().charCodeAt(0) ;
        var colonneSrc = source.get_coord().get_c().charCodeAt(0) ;

        if(colonneDest === colonneSrc) // On bouge sur la même colonne
        {
            if(destination.get_coord().get_l() === source.get_coord().get_l() + 1 || destination.get_coord().get_l() === source.get_coord().get_l() - 1)
                return true; // Deux déplacements autorisés : ligne supérieure ou inférieure
            else return false;
        }
        else if(colonneDest === colonneSrc + 1) // Cas où la destination est sur la colonne suivant la source
        {
            if(destination.get_coord().get_l() === source.get_coord().get_l() + 1 || destination.get_coord().get_l() === source.get_coord().get_l())
                return true;// Deux déplacements autorisés : ligne supérieure ou égale
            else return false;
        }
        else if(colonneDest === colonneSrc - 1) // Cas où la destination est sur la colonne antérieure à la source
        {
            if(destination.get_coord().get_l() === source.get_coord().get_l() - 1 || destination.get_coord().get_l() === source.get_coord().get_l())
                return true; // Deux déplacements autorisés : ligne égale ou inférieure
            else return false;
        }
        else return false;
    }

    this.taille_coup_valide = function(src, dest)
    {
        var source = this.get_case_coord(src); //plateau[i]
        var destination = this.get_case_coord(dest); //plateau[j]

        if(source.get_taille_pile() < destination.get_taille_pile())
            return false;

        if((source.get_taille_pile() + destination.get_taille_pile())<=5)
            return true;
        else return false;



    }

    this.coup_joueur = function(src,dest)
    {
        this.deplacer_pion(src, dest);

        if(tour_joueur === Lyngk.Joueurs.JoueurUn)
            tour_joueur = Lyngk.Joueurs.JoueurDeux;
        else tour_joueur = Lyngk.Joueurs.JoueurUn;
    }
/*
    this.couleur_coup_valide = function(src, dest)
    {
        var cptCouleur = [0,0,0,0,0,0];
        var source = this.get_case_coord(src); //plateau[i]
        var destination = this.get_case_coord(dest); //plateau[j]

        for(var i in source.get_full_pile())
        {
            cptCouleur[source.get_pile(i)]++;
        }

        for(var j in destination.get_full_pile())
        {
            cptCouleur[destination.get_pile(j)]++;
        }

        for(var k in cptCouleur)
        {
            console.log(cptCouleur[k]);
            if(cptCouleur[k]>1 && k!== 5)
                return false;
        }
        console.log("---------");
        return true;


    }
*/
    this.deplacer_pion = function(src, dest)
    {
        var source = this.get_case_coord(src); //plateau[i]

        var destination = this.get_case_coord(dest); //plateau[j]

        var tmp =source.get_full_pile(); // pile de plateau de [i]

        if(destination.get_taille_pile() !== 0 && this.coup_valide(src, dest) === true && this.taille_coup_valide(src, dest) === true/* && this.couleur_coup_valide(src, dest) === true*/)
        {
            for(var i = 0; i<tmp.length; i++)
            {
                destination.placerPion(tmp[i]);
            }

            while(source.get_taille_pile() !== 0)
            {
                source.pop_pile();
            }
        }

    };

    this.getCase = function(i) {
        return plateau[i];
    }

    good_coord();
    initPlateau();
    remplirPlateau();


};
