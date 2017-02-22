# Left Rotation

A left rotation operation on an array of size `N` shifts each of the array's elements 1 unit to the left. For example, if 2 left rotations are performed on array `[1,2,3,4,5]`, then the array would become `[3,4,5,1,2]`.

Given an array of `N` integers and a number, `d`, perform `d` left rotations on the array. Then print the updated array as a single line of space-separated integers.

## Input Format

The first line contains two space-separated integers denoting the respective values of `N` (the number of integers) and `d` (the number of left rotations you must perform). 
The second line contains `n` space-separated integers describing the respective elements of the array's initial state.

## Constraints

- `1 <= N <= 10^5`
- `1 <= d <= N`
- `1 <= ai <= 10^6`

## Output Format

Print a single line of `N` space-separated integers denoting the final state of the array after performing `d` left rotations.

### Sample Input

```
5 4
1 2 3 4 5
```

### Sample Output

```
5 1 2 3 4
```

### Explanation

When we perform `d=4` left rotations, the array undergoes the following sequence of changes:

Thus, we print the array's final state as a single line of space-separated values, which is `[5 1 2 3 4]`.

## Answer

- C:

```c
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

int main() {

    int n, r; 
    scanf("%d %d",&n, &r);
    int arr[n];
    for(int arr_i = 0; arr_i < n; arr_i++){
       scanf("%d",&arr[arr_i]);
    }
    
    int new_arr[n], i;
    
    for(i=0; i<n; i++) {
        int new_pos = i - r;
        if(new_pos < 0) {
            new_pos = n - r + i;
        }
        
        new_arr[new_pos] = arr[i];    
    }
    
    for(i=0; i<n; i++) {
        printf("%d ", new_arr[i]);
    }
    return 0;
}
```
