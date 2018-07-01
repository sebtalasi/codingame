/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var L = parseInt(readline());
var H = parseInt(readline());
var aMap = [];
var aCoords = [];

var Lake = function( X , Y ){
    this.X = X; 
    this.Y = Y;
    
    this.surface = function( ){
        var surface = 0;
        var aTempLakeCells = [];
        var currentCell = []; 
        
        this.cleanMap( );
        
        if(aMap[this.Y][this.X] == '#'){
            surface = 0;
        }else{
            aTempLakeCells.push([this.X,this.Y]);
        }
        
        // While there is adjacent water.. 
        while(aTempLakeCells.length > 0){
            var minX = 0; maxX = L - 1;
            var minY = 0; maxY = H - 1;
        
            // Take the first cell of the pile
            currentCell = aTempLakeCells.shift();
            
            //printErr('****************************************');
            //printErr('Current Cell ' , currentCell);
            
            // Save the cell to the lake cell (if new)
            if(aMap[currentCell[1]][currentCell[0]] == 'O'){
                // Add it to lake cells 
                //this.lakeCells.push( currentCell );
                this.lakeCells.push(currentCell);
                
                aMap[currentCell[1]][currentCell[0]] = 'X';
                
                // Analyze neighbours
                minX = Math.max(0 , currentCell[0] - 1);
                maxX = Math.min(maxX , currentCell[0] + 1);
                
                minY = Math.max(0 , currentCell[1] - 1);
                maxY = Math.min(maxY , currentCell[1] + 1);
                
                for(var y = minY; y <= maxY; y++ ){
                    
                    for(var x = minX; x <= maxX; x++ ){
                        
                        if(aMap[y][x] == 'O' && ( x == currentCell[0] || y == currentCell[1])){
                            aTempLakeCells.push([ x , y ]);
                        }
                    }
                }
            }
        }
        surface = this.lakeCells.length; 
        return surface;
    }
    this.lakeCells = [];
    this.cleanMap = function( ){
        for (var i = 0; i < H; i++) {
            for (var j = 0; j < L; j++) {
                if(aMap[i][j] == 'X'){
                    aMap[i][j] = 'O';
                }
            }
        }
    }
}

// Retrieve map
for (var i = 0; i < H; i++) {
    var row = readline();
    aMap[i] = [];
    aMap[i] = row.split('');
    printErr(aMap[i]);
}
var N = parseInt(readline());

// Retrieve coords to analyze
for (var i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    var X = parseInt(inputs[0]);
    var Y = parseInt(inputs[1]);
    aCoords.push([X,Y]);
}

// Process coords
for (var i = 0; i < N; i++) {
    var oLake = new Lake( aCoords[i][0] , aCoords[i][1]);
    print(oLake.surface( ) );
}