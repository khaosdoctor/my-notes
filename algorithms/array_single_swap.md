A non-empty zero-indexed array A consisting of N integers is given.
You can perform a single swap operation in array A. This operation takes two indices I and J, such that 0 ≤ I ≤ J < N, and exchanges the values of A[I] and A[J].
The goal is to check whether array A can be sorted into non-decreasing order by performing at most one swap operation.
For example, consider array A such that:
    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 3
    A[4] = 7
After exchanging the values A[1] and A[3] we obtain an array [1, 3, 3, 5, 7], which is sorted in non-decreasing order.
Write a function:
function solution($A);
that, given a non-empty zero-indexed array A consisting of N integers, returns true if the array can be sorted into non-decreasing order by performing at most one swap operation or false otherwise.
For example, given:
    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 3
    A[4] = 7
the function should return true, as explained above.
On the other hand, for the following array:
    A[0] = 1
    A[1] = 3
    A[2] = 5
    A[3] = 3
    A[4] = 4
the function should return false, as there is no single swap operation that sorts the array.
For the following array:
    A[0] = 1
    A[1] = 3
    A[2] = 5
the function should return true, as the given array is already sorted.
Assume that:
N is an integer within the range [1..100];
each element of array A is an integer within the range [1..1,000,000,000].

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.


R:

// you can write to stdout for debugging purposes, e.g.
// print "this is a debug message\n";

function solution($A) {
    $swaps = 0;
    for($a = 0; $a<count($A);$a++) {
        for($b = $a+1; $b<count($A); $b++) {
           $offset = 0;
           if($A[$a] > $A[$b]) {
               if($b < count($A)-1 && $A[$b+1] == $A[$b]) {
                   $offset = 1;
                   for($i = $b+2; $i < count($A); $i++) {
                       if($A[$i] == $A[$b]) {
                            $offset++;
                       } else {
                           break;
                       }
                   }
               }
               $temp = $A[$b+$offset];
               $A[$b+$offset] = $A[$a];
               $A[$a] = $temp;
               $swaps++;
           }
          
        }
    }
    
    return ($swaps > 1) ? false : true;
}
