"use strict";

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testHistoireUn = function(){
    var coord = new Lyngk.Coordinates("A", 3);
    assertTrue(coord.valide() == true);
};


LyngkTestCase.prototype.testHistoireDeux = function(){
    var coord = new Lyngk.Coordinates("A", 1);
    var somme = coord.sommeCoord();
    assertTrue(somme  == 43);
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
    assertTrue(coord.comparaison(coord2) == true);
};


