import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.
expression = input()

# Thanks ProfessorWolf for the solution 
# Mine was less elegant, based on if/else processing

s = [] # our stack of openings
closing = {'}':'{',']':'[',')':'('} # thanks MaximeCG
answer='true' # unless we find proof to the contrary
for c in expression:
    if c in '([{':
        s.append(c)
    if c in ')]}' and (not s or s.pop()!=closing[c]):
        answer='false'
print('false' if s else answer)
