#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
int main()
{
    int N;
    cin >> N; cin.ignore();
    
    // Init blanks countµ
    int startBlanks = (1 + 2 * (N - 1));
    int botlength = 2 * (1 + 2 * (N - 1)) + 1;
    int midBlanks = botlength - 2 * N; 
    
    // Init starts qtity
    int starsAmnt  = 1;
    int starsAmnt2 = 1;
    
    // Init output line
    std::string line;
    
    // Generate lines
    for (int i = 0; i < 2*N; ++i){
        starsAmnt = 1 + 2 * i;    
        starsAmnt2 = 1 + 2 * (i - N);
        
        line = "";
        for(int j = 0; j < startBlanks + starsAmnt; j++){
            
            if(j < startBlanks){
                if(i==0 && j==0){
                    line = ".";
                }else{
                    line += " ";    
                };
            }else{
                if(i >= N){
                    if(j <= startBlanks + starsAmnt2/2 + (i - N)){
                        line += "*";
                    }else if(j > startBlanks + starsAmnt2/2 + midBlanks){
                        line += "*";    
                    }else{
                        line += " ";        
                    }
                }else{
                    line += "*";    
                }
                
            };
        }
        
        startBlanks--;
        if(i>=N){
            midBlanks--;
        }

        cout << line << endl;
    };
}