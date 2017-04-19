 /**
  * Configuration 
  **/
 var mineReload = 4;
 var fireReload = 1;
 var fireDist = 10;
 var printGrid = false;

 /**
  * Global vars
  **/
 var aGrid = [];
 var aShips = [];
 var aBarrels = [];
 var aMines = [];


 /**
  * Coord
  **/
 class Coord {
     constructor(x, y) {
         this.x = x;
         this.y = y;
     }
     toString() {
         return 'X :' + this.x + ' Y : ' + this.y;
     }
 }
 /**
  * Action
  **/
 var Action = function (action, coord) {
     this.action = action;
     this.position = coord;
 };
 Action.prototype.toString = function () {
     switch (this.action) {
         case 'MOVE':
         case 'FIRE':
             return this.action + ' ' + this.position.x + ' ' + this.position.y;
             break;
         case 'MINE':
         case 'SLOWER':
         case 'WAIT':
             return this.action;
             break;
     }

 };
 /**
  * Entity
  **/
 class Entity {
     constructor(id, type, x, y) {
         this.position = new Coord(x, y);
         this.id = id;
         this.type = type;
     }
     toString() {
         return this.type + ' ' + this.id + ' ' + this.position.toString();
     }
     getDistance(coord) {
         return Math.sqrt(Math.pow(this.x - coord.x, 2) + Math.pow(this.y - coord.y, 2));
     }
 }
 /**
  * Ship 
  **/
 class Ship extends Entity {
     constructor(id, x, y, rotation, speed, rum, owner) {
         super(id, 'SHIP', x, y);
         this.rotation = rotation;
         this.speed = speed;
         this.rum = rum;
         this.owner = owner;
         this.action = '';
         this.mine = 0;
         this.fire = 0;
     }
     toString() {
         return super.toString() + ' Speed : ' + this.speed;
     }
 };
 Ship.prototype.play = function () {
     var thisShip = this;
     printErr(this, 'play');
     //    if (this.action == '') {
     // Decrease reload
     this.fire = Math.max(0, this.fire - 1);
     this.mine = Math.max(0, this.mine - 1);

     // If barrels, go to closest
     if (aBarrels.length > 0) {
         aBarrels.sort(function (a, b) {
             return thisShip.getDistance(a.position) - thisShip.getDistance(b.position);
         });

         this.action = new Action('MOVE', aBarrels[0].position);
     } else {
         //aShips.sort(function (a, b) {
         //    return Tools.dist(thisShip.x, thisShip.y, a.x, a.y) - Tools.dist(thisShip.x, thisShip.y, b.x, b.y);
         //});

         aShips.forEach(function (ship) {
             printErr('Fire : ', this.fire);
             if (ship.owner == 0 && this.getDistance(ship.position) < 8 && this.fire == 0) {
                 this.action = new Action('FIRE', ship.position);
             } else if (ship.owner == 0) {
                 this.action = new Action('MOVE', ship.position);
             }
         }, this);
     }
     if (this.action.action == 'FIRE') {
         this.fire = fireReload;
     }
     printErr(this.action);
     return this.action;
 };

 /**
  * Barrel 
  **/
 class Barrel extends Entity {
     constructor(id, x, y, rum) {
         super(id, 'BARREL', x, y);
         this.rum = rum;
     }
     toString() {
         return super.toString() + ' Rum :' + this.rum;
     }
 };

 /**
  * Mine 
  **/
 class Mine extends Entity {
     constructor(id, x, y) {
         super(id, 'MINE', x, y);
     }
 };
 /**
  * CANNONBALL
  */
 class Cannonball extends Entity {
     constructor(id, x, y) {
         super(id, 'CANNONBALL', x, y);
     }
 }


 /**
  * GAME LOOP
  **/
 while (true) {
     // Reset game turn
     reset();

     var thisShipCount = parseInt(readline()); // the number of remaining ships
     var entityCount = parseInt(readline()); // the number of entities (e.g. ships, mines or cannonballs)
     for (var i = 0; i < entityCount; i++) {
         var inputs = readline().split(' ');
         var entityId = parseInt(inputs[0]);
         var entityType = inputs[1];
         var x = parseInt(inputs[2]);
         var y = parseInt(inputs[3]);
         var arg1 = parseInt(inputs[4]);
         var arg2 = parseInt(inputs[5]);
         var arg3 = parseInt(inputs[6]);
         var arg4 = parseInt(inputs[7]);
         switch (entityType) {
             case 'SHIP':
                 //if (aShips[entityId] == null) {
                 aShips[entityId] = new Ship(entityId, x, y, arg1, arg2, arg3, arg4);
                 /*} else {
                     aShips[entityId].update(x, y, arg1, arg2, arg3, arg4);
                 }*/
                 aGrid[y][x] = arg4;
                 break;
             case 'BARREL':
                 aBarrels.push(new Barrel(entityId, x, y, arg1));
                 aGrid[y][x] = 'B';
                 break;
             case 'CANNONBALL':
                 aGrid[y][x] = 'C';
                 break;
             case 'MINE':
                 aMines.push(new Mine(entityId, x, y));
                 aGrid[y][x] = 'M';
                 break;
         }
     }

     // Debug loop
     if (printGrid) {
         aGrid.forEach(function (row) {
             printErr(row);
         });
     }


     //printErr(aBarrels);
     //printErr(aShips);
     aShips.forEach(function (ship) {
         if (ship.owner == 1) {
             print(ship.play());
         }
     })
 }
 /**
  * Reset game turn
  */
 function reset() {
     aBarrels = [];
     aGrid = [];
     aMines = [];

     // Init hexagonal grid 23 cells wide and 21 high.
     for (var q = 0; q < 23; q++) {
         aGrid[q] = [];
         for (var r = 0; r < 21; r++) {
             aGrid[q][r] = '.';
         }
     }
 };
