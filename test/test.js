"use strict";

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testHistoireUn = function(){
    var coord = new Lyngk.Coordinates("A", 3);
    assertTrue(coord.valid_coordinate() === true);
};


LyngkTestCase.prototype.testHistoireDeux = function(){
    var coord = new Lyngk.Coordinates("A", 1);
    var somme = coord.somme_coord();
    assertTrue(somme  === 43);
};

LyngkTestCase.prototype.testHistoireTrois = function(){
    var coord = new Lyngk.Coordinates("B", 2);
    assertTrue(coord.to_string() === "B2");
};

LyngkTestCase.prototype.testHistoireQuatre = function(){
    var coord = new Lyngk.Coordinates("A", 1);
    assertTrue(coord.to_string() === "invalid");
};

LyngkTestCase.prototype.testHistoireCinq = function(){
    var coord = new Lyngk.Coordinates("C", 3);
    var coord2 = coord.clone();
    assertTrue(coord.compare(coord2) === true);
};

LyngkTestCase.prototype.testHistoireSix = function(){
    var coord = new Lyngk.Coordinates("C", 4);
    var testHash = coord.hash();
    assertTrue(testHash === 34 );
};

LyngkTestCase.prototype.testHistoireSept = function(){
    var inter = new Lyngk.Intersection();
    assertTrue(inter.get_state() === Lyngk.State.VACANT);
};

LyngkTestCase.prototype.testHistoireHuit = function(){
    var inter = new Lyngk.Intersection();
    inter.place_token(Lyngk.Color.BLUE);
    assertTrue(inter.get_color() === Lyngk.Color.BLUE && inter.get_state() === Lyngk.State.ONE_PIECE);
};

LyngkTestCase.prototype.testHistoireNeuf = function(){
    var inter = new Lyngk.Intersection();
    inter.place_token(Lyngk.Color.BLUE);
    inter.place_token(Lyngk.Color.RED);
    assertTrue(inter.get_color() === Lyngk.Color.RED && inter.get_state() === Lyngk.State.STACK);
};

LyngkTestCase.prototype.testHistoireDix = function(){
    var inter = new Lyngk.Intersection();
    inter.place_token(Lyngk.Color.BLUE);
    inter.place_token(Lyngk.Color.RED);
    inter.place_token(Lyngk.Color.IVORY);
    inter.place_token(Lyngk.Color.BLACK);
    inter.place_token(Lyngk.Color.GREEN);
    assertTrue(inter.get_color() === Lyngk.Color.GREEN && inter.get_state() === Lyngk.State.FULL_STACK);
};


LyngkTestCase.prototype.testHistoireOnze = function(){
    var jeu = new Lyngk.Engine();
    var flag = false;
    if(jeu.get_from_array(0).get_state() ===  Lyngk.State.ONE_PIECE)
        flag = true;
    for(var i = 0 ; i < jeu.get_length(); i++)
    {
        if(jeu.get_from_array(i).get_state() !==  Lyngk.State.ONE_PIECE)
            flag = false;
    }
    assertTrue(flag);
};


LyngkTestCase.prototype.testHistoireDouze = function(){
    var jeu = new Lyngk.Engine();
    var flag = true;
    var cptCouleur = [0,0,0,0,0,0];
    var couleurAttendue = [8,8,8,8,8,3];

    for(var i = 0 ; i < jeu.get_length(); i++)
        cptCouleur[jeu.get_from_array(i).get_color()]++;

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
    for(var i = 0 ; i < jeu.get_length(); i++ )
    {
        if(jeu.get_from_array(i).get_stack_size() !== 1)
            flag = false;
    }

    assertTrue(flag);
};

LyngkTestCase.prototype.testHistoireQuatorze = function(){
    var jeu = new Lyngk.Engine();
    assertTrue(jeu.get_from_array(0).get_stack_color() === jeu.get_from_array(0).get_color());
};

LyngkTestCase.prototype.testHistoireQuinze = function(){
    var jeu = new Lyngk.Engine();
    var couleur = jeu.get_from_coord("A3").get_color();
    jeu.move_token("A3","B3");
    assertTrue(jeu.get_from_coord("A3").get_state() === Lyngk.State.VACANT &&  jeu.get_from_coord("B3").get_color() === couleur);
};

LyngkTestCase.prototype.testHistoireSeize = function(){
    var jeu = new Lyngk.Engine();
    jeu.move_token("A3","B3");
    jeu.move_token("B3","B2");
    var couleur = jeu.get_from_coord("B3").get_color();
    assertTrue(jeu.get_from_coord("B3").get_state() === Lyngk.State.VACANT &&  jeu.get_from_coord("B2").get_color() === couleur && jeu.get_from_coord("B2").get_stack_size() === 3);
};


LyngkTestCase.prototype.testHistoireDixSept = function(){
    var jeu = new Lyngk.Engine();
    jeu.move_token("B2","B3");
    jeu.move_token("B3","B2");
    var couleur = jeu.get_from_coord("B3").get_color();
    var taille = jeu.get_from_coord("B3").get_stack_size();
    assertTrue(jeu.get_from_coord("B2").get_state() === Lyngk.State.VACANT &&  jeu.get_from_coord("B3").get_color() === couleur && jeu.get_from_coord("B3").get_stack_size() === taille);
};

LyngkTestCase.prototype.testHistoireDixHuit = function(){
    var jeu = new Lyngk.Engine();
    jeu.move_token("B2","B3");
    var couleurC2 = jeu.get_from_coord("C2").get_color();
    var tailleC2 = jeu.get_from_coord("C2").get_stack_size();
    var couleurB3 = jeu.get_from_coord("B3").get_color();
    var tailleB3 = jeu.get_from_coord("B3").get_stack_size();
    jeu.move_token("B3","C2");
    assertTrue(jeu.get_from_coord("B3").get_color() === couleurB3 && jeu.get_from_coord("C2").get_color() === couleurC2 && jeu.get_from_coord("B3").get_stack_size() === tailleB3 && jeu.get_from_coord("C2").get_stack_size() === tailleC2);
};

LyngkTestCase.prototype.testHistoireDixNeuf = function(){
    var jeu = new Lyngk.Engine();
    var couleurB2 = jeu.get_from_coord("B2").get_color();
    jeu.move_token("B2","B3");
    var tailleB3 = jeu.get_from_coord("B3").get_stack_size();
    var couleurB5 = jeu.get_from_coord("B5").get_color();
    var tailleB5 = jeu.get_from_coord("B5").get_stack_size();
    jeu.move_token("B3","B5");
    assertTrue(jeu.get_from_coord("B3").get_color() === couleurB2 && jeu.get_from_coord("B5").get_color() === couleurB5 && jeu.get_from_coord("B5").get_stack_size() === tailleB5 && jeu.get_from_coord("B3").get_stack_size() === tailleB3);
};

LyngkTestCase.prototype.testHistoireVingt = function(){
    var jeu = new Lyngk.Engine();
    jeu.move_token("C1","C2");
    jeu.move_token("C2","C3");
    jeu.move_token("C3","C4");
    jeu.move_token("C4","C5");
    var couleurC5 = jeu.get_from_coord("C5").get_color();
    var couleurC6 = jeu.get_from_coord("C6").get_color();
    var tailleC6 = jeu.get_from_coord("C6").get_stack_size();
    jeu.move_token("C5","C6");

    assertTrue(jeu.get_from_coord("C5").get_color() === couleurC5 && jeu.get_from_coord("C6").get_color() === couleurC6 && jeu.get_from_coord("C5").get_stack_size() === 5 && jeu.get_from_coord("C6").get_stack_size() === tailleC6);
};


LyngkTestCase.prototype.testHistoireVingtEtUn = function(){
    var jeu = new Lyngk.Engine();
    jeu.move_token("A3","B3");
    var couleurB3 = jeu.get_from_coord("B3").get_color();
    var couleurC3 = jeu.get_from_coord("C3").get_color();
    jeu.move_token("C3","B3");
    assertTrue(jeu.get_from_coord("B3").get_color() === couleurB3 && jeu.get_from_coord("C3").get_color() === couleurC3 && jeu.get_from_coord("B3").get_stack_size() === 2 && jeu.get_from_coord("C3").get_stack_size() === 1);
};


LyngkTestCase.prototype.testHistoireVingtDeux = function(){
    var jeu = new Lyngk.Engine();
    jeu.move_token("I7","H6");
    jeu.move_token("G4","G5");
    jeu.move_token("G5","G6");
    var couleurH6 = jeu.get_from_coord("H6").get_color();
    var tailleH6 = jeu.get_from_coord("H6").get_stack_size();
    var couleurG6 = jeu.get_from_coord("G6").get_color();
    var tailleG6 = jeu.get_from_coord("G6").get_stack_size();
    jeu.move_token("H6","G6");
    assertTrue(jeu.get_from_coord("H6").get_color() === couleurH6 && jeu.get_from_coord("G6").get_color() === couleurG6 && jeu.get_from_coord("H6").get_stack_size() === tailleH6 && jeu.get_from_coord("G6").get_stack_size() === tailleG6);
};


LyngkTestCase.prototype.testHistoireVingtDeux = function(){
    var jeu = new Lyngk.Engine();
    jeu.move_token("I7","H6");
    jeu.move_token("G4","G5");
    jeu.move_token("G5","G6");
    var couleurH6 = jeu.get_from_coord("H6").get_color();
    var tailleH6 = jeu.get_from_coord("H6").get_stack_size();
    var couleurG6 = jeu.get_from_coord("G6").get_color();
    var tailleG6 = jeu.get_from_coord("G6").get_stack_size();
    jeu.move_token("H6","G6");
    assertTrue(jeu.get_from_coord("H6").get_color() === couleurH6 && jeu.get_from_coord("G6").get_color() === couleurG6 && jeu.get_from_coord("H6").get_stack_size() === tailleH6 && jeu.get_from_coord("G6").get_stack_size() === tailleG6);
};
/*
LyngkTestCase.prototype.testHistoireVingtTrois = function(){
    var jeu = new Lyngk.Engine();
    jeu.get_from_coord("C1").set_color(Lyngk.Color.BLUE); // On met deux fois la même couleur pour voir que ça ne marche pas
    jeu.get_from_coord("C2").set_color(Lyngk.Color.WHITE); // Et deux blancs pour vérifier que ça marche
    jeu.get_from_coord("C3").set_color(Lyngk.Color.WHITE);
    jeu.get_from_coord("C4").set_color(Lyngk.Color.BLUE);
    jeu.get_from_coord("C5").set_color(Lyngk.Color.GREEN);
    jeu.move_token("C1","C2");
    jeu.move_token("C2","C3");
    jeu.move_token("C3","C4");
    jeu.move_token("C4","C5");
    var couleurC3 = jeu.get_from_coord("C3").get_color(); // On doit obtenir une couleur BLUE
    var tailleC3 = jeu.get_from_coord("C3").get_stack_size(); // La taille doit être de 3 (coup suivant ignoré)
    var couleurC5 = jeu.get_from_coord("C5").get_color(); // On doit obtenir une couleur BLUE
    var tailleC5 = jeu.get_from_coord("C5").get_stack_size(); // La taille doit être de 2, comme un coup a été ignoré
    assertTrue(couleurC3 === Lyngk.Color.BLUE && couleurC5 === Lyngk.Color.BLUE && tailleC3 === 3 && tailleC5 === 2);
};
    */


LyngkTestCase.prototype.testHistoireVingtQuatre = function(){
    var jeu = new Lyngk.Engine();
    assertTrue(jeu.whose_turn() === 1);
};


LyngkTestCase.prototype.testHistoireVingtCinq = function(){
    var jeu = new Lyngk.Engine();
    jeu.player_turn("B2","B3");
    assertTrue(jeu.whose_turn() === 2);
};


LyngkTestCase.prototype.testHistoireVingtSix = function(){
    var jeu = new Lyngk.Engine();
    jeu.get_from_coord("A3").set_color(Lyngk.Color.BLUE);
    jeu.claim_color(1,Lyngk.Color.BLUE);
    jeu.claim_color(2, Lyngk.Color.BLUE);
    jeu.player_turn("A3","B3");
    assertTrue(jeu.whose_turn() === 2 && jeu.get_claim_array(1,0) === Lyngk.Color.BLUE && jeu.get_claim_array(2,0) !== Lyngk.Color.BLUE);
};


LyngkTestCase.prototype.testHistoireVingtSept = function(){
    var jeu = new Lyngk.Engine();
    jeu.get_from_coord("A3").set_color(Lyngk.Color.BLUE);
    jeu.claim_color(1,Lyngk.Color.BLUE);
    jeu.player_turn("A3","B3");
    jeu.player_turn("H6","G5");
    jeu.player_turn("B3","C3");
    jeu.player_turn("G5","G6");
    jeu.player_turn("C3","C2");
    jeu.player_turn("G6","H7");
    jeu.player_turn("C2","D2");
    assertTrue(jeu.ScoreJ1 === 1 && jeu.get_from_coord("D2").get_state() === Lyngk.State.VACANT);
};
