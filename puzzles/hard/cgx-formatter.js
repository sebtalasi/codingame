/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
String.prototype.replaceAt = function( index, characters) {
    return this.substr(0, index) + characters + this.substr(index + characters.length);
}
String.prototype.removeAt = function( index) {
    return this.substr(0, index) + this.substr(index + 1);
}
String.prototype.insertAt = function( index, characters) {
    return this.substr(0, index) + characters + this.substr(index);
}

var N = parseInt(readline());
var cGXLine = '';
for (var i = 0; i < N; i++) {
    cGXLine += readline();
}

var inQuote = false;
cGXLine = cGXLine.trim( );

var cGXLine2 = '';
for(var i = 0; i < cGXLine.length; i++){
    if(cGXLine.charAt(i) == '\''){
      inQuote = !inQuote;
      cGXLine2 += cGXLine.charAt(i);
    }else if(cGXLine.charAt(i) == ' '  && !inQuote){
    //}else if(cGXLine.charAt(i) == '\9' && !inQuote){
    }else if(cGXLine.charAt(i) == '\t' && !inQuote){
    }else{
      cGXLine2 += cGXLine.charAt(i);  
    }
}
cGXLine = cGXLine2;

var indent = 0;
for(var i = 0; i < cGXLine.length; i++){
    if(cGXLine.charAt(i) == '\''){
      inQuote = !inQuote;  
    }else if(cGXLine.charAt(i) == ' ' && !inQuote){
        cGXLine = cGXLine.replaceAt(i, '' );
    }else if(cGXLine.charAt(i) == '(' && cGXLine.charAt(i + 1) != ')' && !inQuote){
        indent++;
        var newChar = '\n';
        var idx = i;
        for(var j = 0; j < indent; j++){
            newChar += '    ';
            idx += 4;
        }
        idx++;
        cGXLine = cGXLine.insertAt(i + 1 , newChar );
        i = idx;
    }else if(cGXLine.charAt(i) == '=' && cGXLine.charAt(i + 1) == '(' && !inQuote){
        var newChar = '\n';
        var idx = i;
        for(var j = 0; j < indent; j++){
            newChar += '    ';
            idx += 4;
        }
        idx++;
        cGXLine = cGXLine.insertAt(i + 1 , newChar );
        i = idx;
    }else if(cGXLine.charAt(i) == ')'  && !inQuote){
        if( cGXLine.charAt(i - 1) != '('){ 
            indent--;
        }
        var newChar = '\n';
        var idx = i;
        for(var j = 0; j < indent; j++){
            newChar += '    ';
            idx += 4;
        }
        cGXLine = cGXLine.insertAt(i , newChar );
        idx++;
        i = idx;
        //}
    }else if(cGXLine.charAt(i) == ';' && !inQuote){
        
        var newChar = '\n';
        var idx = i;
        for(var j = 0; j < indent; j++){
            newChar += '    ';
            idx += 4;
        }
        cGXLine = cGXLine.insertAt(i + 1 , newChar );
        idx++;
        i = idx;
    }
    
}

print(cGXLine);