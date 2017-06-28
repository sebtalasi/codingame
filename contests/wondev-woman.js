/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var size = parseInt(readline());
var unitsPerPlayer = parseInt(readline());

var aMap = [];

/*class Entity {
     constructor(id, type, x, y) {
         this.position = new Coord(x, y);
         this.id = id;
         this.type = type;
     }
     toString() {
         return this.type + ' ' + this.id + ' ' + this.position.toString();
     }
     getDistance(coord) {
         return Math.sqrt(Math.pow(this.position.x - coord.x, 2) + Math.pow(this.position.y - coord.y, 2));
     }
 }*/

/*************************************************/
class Action {
	constructor(atype, index, dir1, dir2) {
		this.atype = atype;
		this.index = index;
		this.dir1 = dir1;
		this.dir2 = dir2;
		this.score = 0;
	}
	evaluate() {
		this.score = 0;
		switch (this.dir1) {
			case 'N':
				break;
			case 'NE':
				break;
			case 'NW':
				break;
			case 'S':
				break;
			case 'SE':
				break;
			case 'SW':
				break;
		}
	}
	toString() {
		return this.atype + ' ' + this.index + ' ' + this.dir1 + ' ' + this.dir2;
	}
}

/*************************************************/
class Player {
	constructor(id, unitX, unitY) {
		this.id = id;
		this.unitX = unitX;
		this.unitY = unitY;
		this.aAction = [];
	}
	addAction(atype, index, dir1, dir2) {
		var oAction = new Action(atype, index, dir1, dir2);
		printErr('Add Action ' + oAction);
		oAction.evaluate();
		this.aAction.push(oAction);
	}
	play() {
		this.aAction.sort(function (a, b) {
			return a.score - b.score;
		});
		return this.aAction[0];
	}
}

//var myPlayer = new Player( );

// game loop
var odd = false;
while (true) {

	for (var i = 0; i < size; i++) {
		var row = readline();
		aMap.push(row.split());
		printErr(aMap[aMap.length - 1]);
	}

	// My guys
	for (var i = 0; i < unitsPerPlayer; i++) {
		var inputs = readline().split(' ');
		var unitX = parseInt(inputs[0]);
		var unitY = parseInt(inputs[1]);
		var myPlayer = new Player(i, unitX, unitY);
	}

	// Fellow guys
	for (var i = 0; i < unitsPerPlayer; i++) {
		var inputs = readline().split(' ');
		var otherX = parseInt(inputs[0]);
		var otherY = parseInt(inputs[1]);
	}
	var legalActions = parseInt(readline());
	for (var i = 0; i < legalActions; i++) {
		var inputs = readline().split(' ');
		var atype = inputs[0];
		var index = parseInt(inputs[1]);
		var dir1 = inputs[2];
		var dir2 = inputs[3];
		myPlayer.addAction(atype, index, dir1, dir2);
	}
	printErr(myPlayer.aAction);

	print(myPlayer.play());

	/*if(odd == true){
	    print('MOVE&BUILD 0 NW SE');    
	    odd = false;
	}else{
	    print('MOVE&BUILD 0 SE NW');
	    odd = true;
	}*/

}
