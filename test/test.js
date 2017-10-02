"use strict";

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testHistoireUn = function(){
    var coord = new Lyngk.Coordinates("A", 1);
    assertTrue(coord.valide() == false);
};


LyngkTestCase.prototype.testHistoireDeux = function(){
    var coord = new Lyngk.Coordinates("A", 1);
    var somme = coord.sommeCoord();
    assertTrue(somme  == 43);
};

LyngkTestCase.prototype.testHistoireTrois = function(){
    var coord = new Lyngk.Coordinates("A", 1);
    assertTrue(coord.toString() === "A1");
};