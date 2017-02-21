# Plus minus

Given an array of integers, calculate which fraction of its elements are positive, which fraction of its elements are negative, and which fraction of its elements are zeroes, respectively. Print the decimal value of each fraction on a new line.

> Note: This challenge introduces precision problems. The test cases are scaled to six decimal places, though answers with absolute error of up to `10^-4` are acceptable.

## Input Format

The first line contains an integer, N, denoting the size of the array. 
The second line contains N space-separated integers describing an array of numbers `(a0,a1,a2,...,an-1)`.

## Output Format

You must print the following 3 lines:

A decimal representing of the fraction of _positive_ numbers in the array.
A decimal representing of the fraction of _negative_ numbers in the array.
A decimal representing of the fraction of _zeroes_ in the array.

### Sample Input

```
6
-4 3 -9 0 4 1
```

### Sample Output

```
0.500000
0.333333
0.166667
```

## Explanation

There are 3 positive numbers, 2 negative numbers, and 1 zero in the array. 
The respective fractions of positive numbers, negative numbers and zeroes are `3/6 = 0.500000`, `2/6 = 0.333333` and `1/6 = 0.166667`, respectively.

## Answer

C:

```c
#include <math.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
#include <limits.h>
#include <stdbool.h>

int main(){
    int n; 
    scanf("%d",&n);
    int arr[n];
    for(int arr_i = 0; arr_i < n; arr_i++){
       scanf("%d",&arr[arr_i]);
    }
    
    int pos=0, neg=0, zero=0, i;
    double posF,negF,zeroF;
    
    for(i=0; i<n; i++) {
        if(arr[i] > 0) {
            pos++;
        }
        else if(arr[i] < 0) {
            neg++;
        }
        else if(arr[i] == 0) {
            zero++;
        }
    }
    
    posF = ((double)pos)/n;
    negF = ((double)neg)/n;
    zeroF = ((double)zero)/n;
    
    printf("%lf\n", posF);
    printf("%lf\n", negF);
    printf("%lf\n", zeroF);
    return 0;
}
```
