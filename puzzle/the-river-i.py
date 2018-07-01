import sys
import math

# Function to calc next river number
def calc_next (x):
    return x + sum (int (c) for c in str (x)) #Thanks Bibou for the def idea

# Inputs
r_1 = int(input())
r_2 = int(input())

# Rivers meet when r_1 == r_2
while r_1 != r_2:
    if r_1 < r_2: # r_1 < r_2 : calc next number for r_2
       r_1 = calc_next(r_1)
    else: # r_2 < r_1 : calc next number for r_2
        r_2 = calc_next(r_2)

# Output result
print(r_1)
