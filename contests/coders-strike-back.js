/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
aCheckPoints = [];
var debug = false;

var Pod = function( _name, _mode){
    this.name = _name;
    this.mode = _mode;
    
    this.posx   = 0;
    this.posy   = 0;
    this.angle  = 0;
    
    this.vx     = 0;
    this.vy     = 0;
    this.vangle = 0;
    this.speed  = 0;
    
    this.init   = true;
    this.boost  = false;
    
    this.curLap   = 0;
    this.rank     = 0;
    
    this.targX    = 0;
    this.targY    = 0;
    this.pow      = 0; 
    
    this.nextCPX  = 0;
    this.nextCPY  = 0;
    this.nextCPID = 0;
    
    this.dist2CP  = 0;
    this.angle2CP = 0;
    
    this.partner = {};
}
Pod.prototype.toString = function( ){
    return this.name + ' ' + this.rank;
}
Pod.prototype.play = function( ){
    this.pow   = 0;
    this.targX = 0;
    this.targY = 0;
    
    if(this.mode == 'R'){ // Runner
        this.run( );
    }else if(this.mode == 'S'){ // Support
        this.support( );
    }
    
    return this.obfuscateTarget( );
}
Pod.prototype.run = function( ){
    var CPvalidated = this.isCPvalidated( );
    
    if(CPvalidated){
            // Aim next CP
            //--> Find next CP 
            var CPID = this.nextCPID + 1;
            if(CPID == aCheckPoints.length){
                CPID = 0;
            }
            
            printErr('CPID', CPID);            
            var CP = aCheckPoints[CPID];
            
            this.targX = Math.round(CP[0] - 2*this.vx);
            this.targY = Math.round(CP[1] - 2*this.vy);

        //printErr('VALIDATED');
        
        if(this.dist2Coord( oEnnemy1.posx, oEnnemy1.posy) < 950 && oEnnemy1.speed > 300){
            this.pow = 'SHIELD' ;
        }else if(this.dist2Coord( oEnnemy2.posx, oEnnemy2.posy) < 950 && oEnnemy2.speed > 300){    
            this.pow = 'SHIELD' ;
        }else{
            var deltaAngle = Math.abs(this.angle2CP - this.angle2Coord( this.targX, this.targY));
            var distCPs    = Math.sqrt(Math.pow(this.nextCPX - this.targX,2) + Math.pow(this.nextCPY - this.targY,2));
            var dist2Next  = this.dist2Coord(this.targX , this.targY);
            var cos = (Math.pow(this.dist2CP,2) + Math.pow(dist2Next,2) - Math.pow(distCPs,2)) / (2 * this.dist2CP * dist2Next)
            
            deltaAngle = Math.acos(cos)
            deltaAngle *= 180 / Math.PI
            deltaAngle = Math.round(deltaAngle);
            
            if( deltaAngle < 45){
                this.pow = 70;     
            }else if(deltaAngle < 110){
                this.pow = 100;
            }else if(deltaAngle < 130){
                this.pow = 70;
            }else{
                this.pow = 30;
            }
        }
    }else{
        //printErr('Not validated');
        if(this.curLap == totalLaps && this.nextCPID == 0){
            this.targX = Math.round(this.nextCPX);
            this.targY = Math.round(this.nextCPY);
        }else{
            this.targX = Math.round(this.nextCPX - 3*this.vx);
            this.targY = Math.round(this.nextCPY - 3*this.vy);    
        }
        this.pow = this.calcPower();
    }
}
Pod.prototype.support = function( ){
    var oEnnemyPod = {};
    for(var i = 0; i < 4; i++){
        if(aPods[i].mode == 'E'){
            oEnnemyPod = aPods[i];
            break;
        }
    }
    this.targX = Math.round((parseInt(oEnnemyPod.nextCPX) + 7*oEnnemyPod.posx)/8 - 2.5*this.vx);
    this.targY = Math.round((parseInt(oEnnemyPod.nextCPY) + 7*oEnnemyPod.posy)/8 - 2.5*this.vy);
    this.pow = this.calcPower( );
}
Pod.prototype.isCPvalidated = function( ){
    // Disable deriv for arrival ! 
    if(this.curLap == totalLaps && this.nextCPID == 0){
        return false;
    }
    
    // Init deriv - Simulate position without thrust
    var nPosx = this.posx;
    var nPosy = this.posy;
    var nSpeed = 0;
    var nVx = this.vx;
    var nVy = this.vy;
    do{
        nVx *= 0.85;
        nVy *= 0.85;
        
        nPosx += nVx;
        nPosy += nVy;
        
        nSpeed = Math.sqrt(Math.pow(nVx,2) + Math.pow(nVy,2));
        
        // New position is in the CP area ? 
        if(nSpeed < 200 ){
            return false;
        }else if( Math.abs(nPosx - this.nextCPX) < 550 && Math.abs(nPosy - this.nextCPY) < 550){
            return true; 
        }
    }while(true);
}
Pod.prototype.calcPower = function( ){
    var pow = 0;
    var angle = this.angle2Coord( this.targX, this.targY);
    var deltaAngle = Math.abs(angle - this.angle);
    if(this.dist2CP > 5600 && deltaAngle< 10 && !this.boost){
        pow = 'BOOST';
        this.boost = true;
    }else if(deltaAngle < 20){
        pow = 200;
    }else if(deltaAngle < 30){
        pow = 200;
    }else if(deltaAngle < 45){
        pow = 200;
    }else if(deltaAngle < 90){
        pow = 100;
    }else{
        pow = 45;
    }
    return pow;
}
Pod.prototype.dist2Coord = function ( _X , _Y ){
    var deltX = 0, deltY = 0;
    var dist  = 0;
   
    deltX = Math.abs(this.posx - _X);
    deltY = Math.abs(this.posy - _Y);
    dist = Math.sqrt(Math.pow(deltX,2) + Math.pow(deltY,2));
    
    return Math.round(dist);
}
Pod.prototype.angle2Coord = function( X, Y ){
    var deltX = 0, deltY = 0, angle = 0;
    
    deltX = this.posx - X;
    deltY = this.posy - Y;
    
    // tan = co / ca
    angle = Math.atan2(Math.abs(deltY),Math.abs(deltX));
    angle *= 180 / Math.PI
    angle = Math.round(angle);
    
    // Angle2Horizon
    if(deltX > 0 && deltY > 0){
        angle += 180;
    }else if( deltX < 0 && deltY < 0 ){
        // RAS
    }else if( deltX > 0 && deltY < 0 ){
        angle = 180 - angle;
    }else if( deltX < 0 && deltY > 0 ){
        angle = 360 - angle;
    }
    
    if(angle > 180){
        angle -= 360;
    }
    
    return angle;
}
Pod.prototype.obfuscateTarget = function( ){
    if(!debug){
        var deltaX = this.posx - this.targX;
        deltaX /= 20;
        this.targX = Math.round(this.posx - deltaX);
        
        var deltaY = this.posy - this.targY;
        deltaY /= 20;
        this.targY = Math.round(this.posy - deltaY);
        
        if(this.speed > 650){
            this.pow += ' BOOOOOST!';   
        }
    }
    return this.targX + ' ' + this.targY + ' ' + this.pow;
}
Pod.prototype.updateData = function( _nextCPID ){
    // Angle 
    if(this.angle > 180 ){
        this.angle -= 360;  
    }
    
    // Speed
    this.speed  = Math.round(Math.sqrt(Math.pow(this.vx,2)+Math.pow(this.vy,2)));
    
    // Speed Angle
    this.vangle = this.angle2Coord(this.posx + this.vx, this.posy + this.vy);
    
    // Count laps & update CPID
    if(this.nextCPID != _nextCPID){
        this.nextCPID = _nextCPID;
        if(this.nextCPID == 1){
            this.curLap++;
            printErr('Lap' , this.curLap);
        }
    }
    // Next CP coords 
    this.nextCPX = aCheckPoints[this.nextCPID][0];
    this.nextCPY = aCheckPoints[this.nextCPID][1];
    
    // Dist 2 Next CP
    this.dist2CP = this.dist2Coord( this.nextCPX, this.nextCPY);
    
    // Angle 2 Next CP
    this.angle2CP = this.angle2Coord( this.nextCPX, this.nextCPY )
}



// My pods
var aPods = [];
var oSackOne  = new Pod( 'SackOne' , 'R');
var oSackTwo  = new Pod( 'SackTwo' , 'S');
oSackOne.partner = oSackTwo;
oSackTwo.partner = oSackOne;

// Ennemies
var oEnnemy1  = new Pod( 'Ennemy 1' , 'E');
var oEnnemy2  = new Pod( 'Ennemy 2' , 'E');

// Put pods in an array --> Used for ranking
var aPods = [oSackOne , oSackTwo, oEnnemy1, oEnnemy2];

var totalLaps  = readline( );
var CPcount    = readline( );
for(var i = 0; i < CPcount; i++){
    aCheckPoints.push( readline( ).split(' ') );
}



while (true) {
    var oPod = {};
    for(var i = 0; i < 4; i++){
        switch(i){
            case 0:
                oPod = oSackOne;
                break;
            case 1:
                oPod = oSackTwo;
                break;
            case 2:
                oPod = oEnnemy1;
                break;
            case 3:
                oPod = oEnnemy2;
                break;
        }
        
        // Pod inputs 
        var inputs = readline().split(' ');
        oPod.posx     = parseInt(inputs[0]);
        oPod.posy     = parseInt(inputs[1]);
        oPod.vx       = parseInt(inputs[2]);
        oPod.vy       = parseInt(inputs[3]);
        oPod.angle    = parseInt(inputs[4]);
        oPod.updateData(parseInt(inputs[5])); 
    }
    
    // Rank pods
    aPods.sort(function(a,b){
        if(a.curLap == b.curLap){
            if(a.nextCPID == b.nextCPID){
                return a.dist2CP - b.dist2CP;    
            }else{
                if(a.nextCPID == 0){
                    return -1;
                }else if(b.nextCPID == 0){
                    return 1;
                }else if(b.nextCPID > a.nextCPID && a.nextCPID != 0){
                    return 1;
                }else if(a.nextCP > b.nextCPID && b.nextCPID != 0){
                    return -1;
                }
                return b.nextCPID - a.nextCPID;    
            }
        }else{
            return b.curLap - a.curLap;
        }
    })
    
    for(var i = 0; i < 4; i++){
        aPods[i].rank = i + 1;   
    }
    printErr(aPods);
    
    print(oSackOne.play());
    print(oSackTwo.play());
}