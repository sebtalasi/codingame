/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
var L = parseInt(inputs[0]);
var C = parseInt(inputs[1]);
var N = parseInt(inputs[2]);
var queue = [];
var load = 0;
var money = 0;
var pointer = 0;
var i = 0;

// Build the queue
for (var i = 0; i < N; i++) {
    queue.push( parseInt(readline()) );
}

// Rollercoaster runs C times a day
while( C > 0){
    load = 0;
    grps = 0;
    i = 0;
    
    // Parse the queue, starting from "pointer", N times max or while the groupe is small enough
    do{
        if(queue[pointer] <= L - load){
            load += queue[pointer];
            pointer++;
            if(pointer == N){
               pointer = 0;
            }
            i++;
        }else{
            break;
        }
    }while( i < N )
    
    // Collect the money !
    money += load;
    
    // Neeext !!!! 
    C--;
}

// Here we go ! We've earned $$$ today !
print(money);