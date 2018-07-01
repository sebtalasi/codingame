/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var MESSAGE = readline();
var binChar = '';
var binMess = '';
var cnMess = '';
var pad = "0000000"
var i = 0;
var cur ,cmp = 0;
// Write an action using print()
// To debug: printErr('Debug messages...');
for(i = 0 ; i < MESSAGE.length ; i++ ){
    binChar = MESSAGE.charCodeAt(i).toString(2);
    binMess += pad.substring(0, pad.length - binChar.length) + binChar
}

cur = binMess.charAt(0);
for(i = 0 ; i < binMess.length ; i++ ){
    if(cur == binMess.charAt(i)){
        cmp++;
    }else{
        switch(cur){
            case '0': 
                cnMess += '00 '
                break;
            case '1':
                cnMess += '0 '
                break;
        }
        for(var j = 0 ; j < cmp ; j++){
            cnMess += '0';
        }
        cnMess += ' ';
        
        // New cur
        cur = binMess.charAt(i);
        cmp = 1;
    }
}
// Dernier bloc
switch(cur){
    case '0': 
        cnMess += '00 '
        break;
    case '1':
        cnMess += '0 '
        break;
}
for(var j = 0 ; j < cmp ; j++){
    cnMess += '0';
}
print(cnMess);