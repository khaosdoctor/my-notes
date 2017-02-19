You are given an implementation of a function:
function solution($A, $B);
that, given a non-empty zero-indexed array A of N non-negative integers and a non-empty zero-indexed array B of M non-negative integers, returns the minimal value that occurs in both arrays. If there is no such value, the function should return −1.
For example, given arrays A and B such that:
    A[0] = 1    B[0] = 4
    A[1] = 3    B[1] = 2
    A[2] = 2    B[2] = 5
    A[3] = 1    B[3] = 3
                B[4] = 2
your function should return 2, since 2 is the minimal value which occurs in both arrays A and B (another value which occurs in both arrays is 3).
Given arrays A and B such that:
    A[0] = 2    B[0] = 3
    A[1] = 1    B[1] = 3
your function should return −1, since there is no value that occurs in both arrays.
Unfortunately, despite the fact that the function may return the expected result for the example input, there is a bug (or bugs) in the implementation, which may produce incorrect results for other inputs. Find the bug(s) and correct them. You should modify at most two lines of code.
Assume that:
N and M are integers within the range [1..10,000];
each element of arrays A, B is an integer within the range [0..1,000,000,000].

Complexity:
expected worst-case time complexity is O((N+M)*log(N+M));
expected worst-case space complexity is O(N+M), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.


R:
function solution(&$A, &$B) {
    $n = sizeof($A);
    $m = sizeof($B);
    sort($A);
    sort($B);
    $i = 0;
    for ($k = 0; $k < $n;) {
        if ($i < $m - 1 AND $B[$i] < $A[$k])
            $i += 1;
        if ($A[$k] == $B[$i])
            return $A[$k];
    $k+=1;}
    return -1;
}
