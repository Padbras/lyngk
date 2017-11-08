"use strict";

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testHistoireUn = function(){
    var coord = new Lyngk.Coordinates("A", 3);
    assertTrue(coord.valide() === true);
};


LyngkTestCase.prototype.testHistoireDeux = function(){
    var coord = new Lyngk.Coordinates("A", 1);
    var somme = coord.sommeCoord();
    assertTrue(somme  === 43);
};

LyngkTestCase.prototype.testHistoireTrois = function(){
    var coord = new Lyngk.Coordinates("B", 2);
    assertTrue(coord.toString() === "B2");
};

LyngkTestCase.prototype.testHistoireQuatre = function(){
    var coord = new Lyngk.Coordinates("A", 1);
    assertTrue(coord.toString() === "invalid");
};

LyngkTestCase.prototype.testHistoireCinq = function(){
    var coord = new Lyngk.Coordinates("C", 3);
    var coord2 = coord.clonage();
    assertTrue(coord.comparaison(coord2) === true);
};

LyngkTestCase.prototype.testHistoireSix = function(){
    var coord = new Lyngk.Coordinates("C", 4);
    var testHash = coord.hash();
    assertTrue(testHash === 34 );
};

LyngkTestCase.prototype.testHistoireSept = function(){
    var inter = new Lyngk.Intersection();
    assertTrue(inter.get_etat() === Lyngk.State.VACANT);
};

LyngkTestCase.prototype.testHistoireHuit = function(){
    var inter = new Lyngk.Intersection();
    inter.placerPion(Lyngk.Color.BLUE);
    assertTrue(inter.get_color() === Lyngk.Color.BLUE && inter.get_etat() === Lyngk.State.ONE_PIECE);
};

LyngkTestCase.prototype.testHistoireNeuf = function(){
    var inter = new Lyngk.Intersection();
    inter.placerPion(Lyngk.Color.BLUE);
    inter.placerPion(Lyngk.Color.RED);
    assertTrue(inter.get_color() === Lyngk.Color.RED && inter.get_etat() === Lyngk.State.STACK);
};

LyngkTestCase.prototype.testHistoireDix = function(){
    var inter = new Lyngk.Intersection();
    inter.placerPion(Lyngk.Color.BLUE);
    inter.placerPion(Lyngk.Color.RED);
    inter.placerPion(Lyngk.Color.IVORY);
    inter.placerPion(Lyngk.Color.BLACK);
    inter.placerPion(Lyngk.Color.GREEN);
    assertTrue(inter.get_color() === Lyngk.Color.GREEN && inter.get_etat() === Lyngk.State.FULL_STACK);
};


LyngkTestCase.prototype.testHistoireOnze = function(){
    var jeu = new Lyngk.Engine();
    var flag = false;
    if(jeu.getCase(0).get_etat() ===  Lyngk.State.ONE_PIECE)
        flag = true;
    for(var i = 0 ; i < jeu.getTaille(); i++)
    {
        if(jeu.getCase(i).get_etat() !==  Lyngk.State.ONE_PIECE)
            flag = false;
    }
    assertTrue(flag);
};


LyngkTestCase.prototype.testHistoireDouze = function(){
    var jeu = new Lyngk.Engine();
    var flag = true;
    var cptCouleur = [0,0,0,0,0,0];
    var couleurAttendue = [8,8,8,8,8,3];

    for(var i = 0 ; i < jeu.getTaille(); i++)
        cptCouleur[jeu.getCase(i).get_color()]++;

   // console.log(jeu.getCase(i).get_color());
    for(var j in cptCouleur)
    {
        if(cptCouleur[j] !== couleurAttendue[j])
            flag = false;
    }
    assertTrue(flag);
};


LyngkTestCase.prototype.testHistoireTreize = function(){
    var jeu = new Lyngk.Engine();
    var flag = true;
    for(var i = 0 ; i < jeu.getTaille(); i++ )
    {
        if(jeu.getCase(i).get_taille_pile() !== 1)
            flag = false;
    }

    assertTrue(flag);
};

LyngkTestCase.prototype.testHistoireQuatorze = function(){
    var jeu = new Lyngk.Engine();
    assertTrue(jeu.getCase(0).get_couleur_pile() === jeu.getCase(0).get_color());
};

LyngkTestCase.prototype.testHistoireQuinze = function(){
    var jeu = new Lyngk.Engine();
    var couleur = jeu.get_case_coord("A3").get_color();
    jeu.deplacer_pion("A3","B3");
    assertTrue(jeu.get_case_coord("A3").get_etat() === Lyngk.State.VACANT &&  jeu.get_case_coord("B3").get_color() === couleur);
};

LyngkTestCase.prototype.testHistoireSeize = function(){
    var jeu = new Lyngk.Engine();
    jeu.deplacer_pion("A3","B3");
    jeu.deplacer_pion("B3","B2");
    var couleur = jeu.get_case_coord("B3").get_color();
    assertTrue(jeu.get_case_coord("B3").get_etat() === Lyngk.State.VACANT &&  jeu.get_case_coord("B2").get_color() === couleur && jeu.get_case_coord("B2").get_taille_pile() === 3);
};


LyngkTestCase.prototype.testHistoireDixSept = function(){
    var jeu = new Lyngk.Engine();
    jeu.deplacer_pion("B2","B3");
    jeu.deplacer_pion("B3","B2");
    var couleur = jeu.get_case_coord("B3").get_color();
    var taille = jeu.get_case_coord("B3").get_taille_pile();
    assertTrue(jeu.get_case_coord("B2").get_etat() === Lyngk.State.VACANT &&  jeu.get_case_coord("B3").get_color() === couleur && jeu.get_case_coord("B3").get_taille_pile() === taille);
};

LyngkTestCase.prototype.testHistoireDixHuit = function(){
    var jeu = new Lyngk.Engine();
    jeu.deplacer_pion("B2","B3");
    var couleurC2 = jeu.get_case_coord("C2").get_color();
    var tailleC2 = jeu.get_case_coord("C2").get_taille_pile();
    var couleurB3 = jeu.get_case_coord("B3").get_color();
    var tailleB3 = jeu.get_case_coord("B3").get_taille_pile();
    jeu.deplacer_pion("B3","C2");
    assertTrue(jeu.get_case_coord("B3").get_color() === couleurB3 && jeu.get_case_coord("C2").get_color() === couleurC2 && jeu.get_case_coord("B3").get_taille_pile() === tailleB3 && jeu.get_case_coord("C2").get_taille_pile() === tailleC2);
};

LyngkTestCase.prototype.testHistoireDixNeuf = function(){
    var jeu = new Lyngk.Engine();
    var couleurB2 = jeu.get_case_coord("B2").get_color();
    jeu.deplacer_pion("B2","B3");
    var tailleB3 = jeu.get_case_coord("B3").get_taille_pile();
    var couleurB5 = jeu.get_case_coord("B5").get_color();
    var tailleB5 = jeu.get_case_coord("B5").get_taille_pile();
    jeu.deplacer_pion("B3","B5");
    assertTrue(jeu.get_case_coord("B3").get_color() === couleurB2 && jeu.get_case_coord("B5").get_color() === couleurB5 && jeu.get_case_coord("B5").get_taille_pile() === tailleB5 && jeu.get_case_coord("B3").get_taille_pile() === tailleB3);
};

LyngkTestCase.prototype.testHistoireVingt = function(){
    var jeu = new Lyngk.Engine();
    jeu.deplacer_pion("C1","C2");
    jeu.deplacer_pion("C2","C3");
    jeu.deplacer_pion("C3","C4");
    jeu.deplacer_pion("C4","C5");
    var couleurC5 = jeu.get_case_coord("C5").get_color();
    var couleurC6 = jeu.get_case_coord("C6").get_color();
    var tailleC6 = jeu.get_case_coord("C6").get_taille_pile();
    jeu.deplacer_pion("C5","C6");

    assertTrue(jeu.get_case_coord("C5").get_color() === couleurC5 && jeu.get_case_coord("C6").get_color() === couleurC6 && jeu.get_case_coord("C5").get_taille_pile() === 5 && jeu.get_case_coord("C6").get_taille_pile() === tailleC6);
};


LyngkTestCase.prototype.testHistoireVingtEtUn = function(){
    var jeu = new Lyngk.Engine();
    jeu.deplacer_pion("A3","B3");
    var couleurB3 = jeu.get_case_coord("B3").get_color();
    var couleurC3 = jeu.get_case_coord("C3").get_color();
    jeu.deplacer_pion("C3","B3");
    assertTrue(jeu.get_case_coord("B3").get_color() === couleurB3 && jeu.get_case_coord("C3").get_color() === couleurC3 && jeu.get_case_coord("B3").get_taille_pile() === 2 && jeu.get_case_coord("C3").get_taille_pile() === 1);
};


LyngkTestCase.prototype.testHistoireVingtDeux = function(){
    var jeu = new Lyngk.Engine();
    jeu.deplacer_pion("I7","H6");
    jeu.deplacer_pion("G4","G5");
    jeu.deplacer_pion("G5","G6");
    var couleurH6 = jeu.get_case_coord("H6").get_color();
    var tailleH6 = jeu.get_case_coord("H6").get_taille_pile();
    var couleurG6 = jeu.get_case_coord("G6").get_color();
    var tailleG6 = jeu.get_case_coord("G6").get_taille_pile();
    jeu.deplacer_pion("H6","G6");
    assertTrue(jeu.get_case_coord("H6").get_color() === couleurH6 && jeu.get_case_coord("G6").get_color() === couleurG6 && jeu.get_case_coord("H6").get_taille_pile() === tailleH6 && jeu.get_case_coord("G6").get_taille_pile() === tailleG6);
};


LyngkTestCase.prototype.testHistoireVingtDeux = function(){
    var jeu = new Lyngk.Engine();
    jeu.deplacer_pion("I7","H6");
    jeu.deplacer_pion("G4","G5");
    jeu.deplacer_pion("G5","G6");
    var couleurH6 = jeu.get_case_coord("H6").get_color();
    var tailleH6 = jeu.get_case_coord("H6").get_taille_pile();
    var couleurG6 = jeu.get_case_coord("G6").get_color();
    var tailleG6 = jeu.get_case_coord("G6").get_taille_pile();
    jeu.deplacer_pion("H6","G6");
    assertTrue(jeu.get_case_coord("H6").get_color() === couleurH6 && jeu.get_case_coord("G6").get_color() === couleurG6 && jeu.get_case_coord("H6").get_taille_pile() === tailleH6 && jeu.get_case_coord("G6").get_taille_pile() === tailleG6);
};
/*
LyngkTestCase.prototype.testHistoireVingtTrois = function(){
    var jeu = new Lyngk.Engine();
    jeu.get_case_coord("C1").set_color(Lyngk.Color.BLUE); // On met deux fois la même couleur pour voir que ça ne marche pas
    jeu.get_case_coord("C2").set_color(Lyngk.Color.WHITE); // Et deux blancs pour vérifier que ça marche
    jeu.get_case_coord("C3").set_color(Lyngk.Color.WHITE);
    jeu.get_case_coord("C4").set_color(Lyngk.Color.BLUE);
    jeu.get_case_coord("C5").set_color(Lyngk.Color.GREEN);
    jeu.deplacer_pion("C1","C2");
    jeu.deplacer_pion("C2","C3");
    jeu.deplacer_pion("C3","C4");
    jeu.deplacer_pion("C4","C5");
    var couleurC3 = jeu.get_case_coord("C3").get_color(); // On doit obtenir une couleur BLUE
    var tailleC3 = jeu.get_case_coord("C3").get_taille_pile(); // La taille doit être de 3 (coup suivant ignoré)
    var couleurC5 = jeu.get_case_coord("C5").get_color(); // On doit obtenir une couleur BLUE
    var tailleC5 = jeu.get_case_coord("C5").get_taille_pile(); // La taille doit être de 2, comme un coup a été ignoré
    assertTrue(couleurC3 === Lyngk.Color.BLUE && couleurC5 === Lyngk.Color.BLUE && tailleC3 === 3 && tailleC5 === 2);
};
    */


LyngkTestCase.prototype.testHistoireVingtQuatre = function(){
    var jeu = new Lyngk.Engine();
    assertTrue(jeu.whose_turn() === 1);
};


LyngkTestCase.prototype.testHistoireVingtCinq = function(){
    var jeu = new Lyngk.Engine();
    jeu.coup_joueur("B2","B3");
    assertTrue(jeu.whose_turn() === 2);
};


LyngkTestCase.prototype.testHistoireVingtSix = function(){
    var jeu = new Lyngk.Engine();
    jeu.get_case_coord("A3").set_color(Lyngk.Color.BLUE);
    jeu.reclamer_couleur(1,Lyngk.Color.BLUE);
    jeu.coup_joueur("A3","B3");
    assertTrue(jeu.whose_turn() === 2 && tabReclamJ1[0] === Lyngk.Color.BLUE);
};
