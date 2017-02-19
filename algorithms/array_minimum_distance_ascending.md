Integer V lies strictly between integers U and W if U < V < W or if U > V > W.
A non-empty zero-indexed array A consisting of N integers is given. A pair of indices (P, Q), where 0 ≤ P < Q < N, is said to have adjacent values if no value in the array lies strictly between values A[P] and A[Q].
For example, in array A such that:
  A[0] = 0
  A[1] = 3
  A[2] = 3
  A[3] = 7
  A[4] = 5
  A[5] = 3
  A[6] = 11
  A[7] = 1
the following pairs of indices have adjacent values:
  (0, 7),   (1, 2),   (1, 4),
  (1, 5),   (1, 7),   (2, 4),
  (2, 5),   (2, 7),   (3, 4),
  (3, 6),   (4, 5),   (5, 7).
For example, indices 4 and 5 have adjacent values because there is no value in array A that lies strictly between A[4] = 5 and A[5] = 3; the only such value could be the number 4, and it is not present in the array.
Given two indices P and Q, their distance is defined as abs(A[P] − A[Q]), where abs(X) = X for X ≥ 0, and abs(X) = −X for X < 0. For example, the distance between indices 4 and 5 is 2 because (A[4] − A[5]) = (5 − 3) = 2.
Write a function:
function solution($A);
that, given a non-empty zero-indexed array A consisting of N integers, returns the minimum distance between indices of this array that have adjacent values. The function should return −1 if the minimum distance is greater than 100,000,000. The function should return −2 if no adjacent indices exist.
Assume that:
N is an integer within the range [1..40,000];
each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

For example, given array A such that:
  A[0] =  0
  A[1] =  3
  A[2] =  3
  A[3] =  7
  A[4] =  5
  A[5] =  3
  A[6] = 11
  A[7] =  1
the function should return 0 because:
indices 1 and 2 are adjacent, because the array does not contain any value that lies strictly between A[1] = 3 and A[2] = 3;
the distance between these indices is (A[1] − A[2]) = (3 − 3) = 0;
no other pair of adjacent indices that has smaller distance exists.

Complexity:
expected worst-case time complexity is O(N*log(N));
expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

R: -------

// you can write to stdout for debugging purposes, e.g.
// print "this is a debug message\n";

function solution($A) {
    $min = -2;
    $maxDist = 100000000;
    $pairs = [];
    //Each element of array
    for($p=0;$p<count($A);$p++) {
        //Create a slice based on itself of each pair
        for($q=$p+1;$q<count($A);$q++) {
            //Slice the values to form a smaller array
            $B = array_slice($A, $p, $q);
            //Sort ascending
            sort($B);
            //Creates another array containing the difference between the full range of the slice
            //Ex: Slice = [1,3,6] then range = [1,2,3,4,5,6]
            //The difference will be [2,4,5]
            $difference = array_diff(range($B[0],$B[count($B)-1]), $B);
            //Intersect the array with the base array to find if at least one of the elements is present
            //If the intersect is empty, then they are adjacent
            if(empty(array_intersect($difference, $A))) {
                $dist = abs($A[$p] - $A[$q]);
                if($dist >= $maxDist) { $min = -1; } //Check for maxDist
                else if($min == -2 || $dist < $min) { $min = $dist; } //Check if the distance is smaller than the minimum
            }
        }
    }
    
    return $min;
            
}
