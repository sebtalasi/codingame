/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var n = parseInt(readline()); // the number of temperatures to analyse
var temps = readline(); // the n temperatures expressed as integers ranging from -273 to 5526
var seq = temps.split(' ');
var min = 5526;
var imin = 0;
if(n === 0){
    print(0);
}else{
    for(var i = 0 ; i < n ; i++){
        if( ( min > Math.abs(seq[i]) ) || ( min == Math.abs(seq[i]) && seq[i] >= 0 )){
            min  = Math.abs(seq[i]);
            imin = i;
        }
    }
    printErr(seq);
    print(seq[imin]);
}