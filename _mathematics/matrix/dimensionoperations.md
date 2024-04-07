---
layout: document
title: "Dimension Operations"
upper_section: index
previous_section: matrix/arrayobjects
next_section: plot/overviewplot
---
overview
--------
MatrixOperator performs common operations on N-dimensional arrays. Broadcasting also allows you to apply the same changes to all elements.
It also provides random number operations.
These are designed to be similar to Python's Numpy.

It also offers features that prioritize speed over flexibility.
These are implemented by excerpts from Basic Linear Algebra Subprograms (BLAS). Other scientific calculations will also be implemented as needed.

It also works with pure PHP. You can also call OpenBLAS or Rindow-Matlib to make it work.


Create MatrixOperator
---------------------
First, create an instance of MatrixOperator. (Currently, it does not support the Rindow framework.)

```php
use Rindow\Math\Matrix\MatrixOperator;
$mo = new MatrixOperator();
```

Create NDArray
--------------
Create an array of NDArray type to operate. There are several ways to create it.

Use the following method
- array
- zeros
- ones
- full
- zerosLike
- fullLike
- arange

```php
$a = $mo->array([1,2,3,4]);
$z = $mo->zerosLike($a);
$x = $mo->zeros([3,5]);
```


Array operations
----------------
PHP does not have operator overloading unlike python.
Therefore, all operations use the MatrixOperator Method.

```php
$a = $mo->array([1,2,3,4]);
$b = $mo->array([4,3,2,1]);
$c = $mo->op($a,'*',$mo->op($a,'+',$b));
```

Broadcasting
------------
MatrixOperator operates on each item with the same index between arrays of the same shape.
If you are trying to compute between differently shaped arrays, we will "broadcast" the smaller arrays to make them compatible with the larger ones.
Instead of copying data into an array of the same shape, you can use memory efficiently. However, the repetition processing becomes inefficient and the processing may be slow. When using a high-speed arithmetic library, consider using a high-speed library that can perform batch processing at the expense of memory.

Example of operating on arrays of the same shape:
```php
$a = $mo->array([1.0, 2.0, 3.0]);
$b = $mo->array([10.0, 100.0, 1000.0]);
$c = $mo->op($a, '+', $b);
# [ 11.0,  102.0,  1003.0]
```

Examples where broadcasting is used:
```php
$a = $mo->array([
    [[1.0, 2.0],
     [3.0, 4.0]],
    [[5.0, 6.0],
     [7.0, 8.0]]
]);
$b = $mo->array([10.0, 100.0]);
$c = $mo->op($a,'+',$b);
# [[[11.0, 102.0],
#   [13.0, 104.0]],
#  [[15.0, 106.0],
#   [17.0, 108.0]]]
```

General Broadcasting Rules
--------------------------
In order to be broadcast, large-shape arrays must contain small-shape arrays.
Note that this is different from numpy.

For example, the following array can be broadcast:
```php
$a = $mo->array([[1,2],[3,4]]);
$b = $mo->array([1,2]);
$c = $mo->op($a,'+',$b);
## c ==> [[2,4],[4,6]]
```

For example, the following array cannot be broadcast.
```php
$a = $mo->array([1,2,3,4]);
$b = $mo->array([1,2]);
$c = $mo->op($a,'+',$b);
## error
```

Operations on arrays and scalar variables apply the scalar variable to all array elements.
```php
$a = $mo->array([[1,2],[3,4]]);
$c = $mo->op($a,'+',2);
## c ==> [[3,4],[5,6]]
```


Applying generic functions
--------------------------
You can apply a specific function to all elements of an N-dimensional array.

```php
$a = $mo->array([[1,4],[9,16]]);
$c = $mo->f('sqrt',$a);
## c ==> [[1,2],[3,4]]
```
```php
$a = $mo->array([[1,2],[3,4]]);
$c = $mo->f(fn($x)=>$x*2, $a);
## c => [[2,4],[6,8]]
```

You can also update the array with the result
```php
$a = $mo->array([[1,4],[9,16]]);
$mo->u('sqrt',$a);
## a ==> [[1,2],[3,4]]
```


Dot product and cross product
-----------------------------
The operators "\*" and "\+" are not dot products or cross products,
but are operations between elements of an array.
Use "dot" and "cross" to find dot and cross products of matrices.

```php
$a = $mo->array([1,2,3,4,5,6]);
$b = $mo->array([3,4,5,6,7,8]);
$c = $mo->dot($a,$b);
## c ==> 133
```

```php
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$b = $mo->array([[2,3,4],[5,6,7],[8,9,1]]);
$c = $mo->cross($a,$b);
## c ==>
##    [[ 36,  42,  21],
##     [ 81,  96,  57],
##     [126, 150,  93]],
```

The outer product of an array of two or more dimensions and a one-dimensional array can be calculated in a manner similar to numpy, even if it is not an exact column matrix.

- shape: (a,b,c)x(c) = (a,b)
- cross(X, Y)[a,b] = sum(X[a,b,:] * Y[:])

```php
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$b = $mo->array([2,3,4]);
$c = $mo->cross($A,$B);
## c => [ 20,  47,  74]
```

The cross product of arrays of three or more dimensions is calculated according to numpy.

- shape: (a,b,c,d,R)x(o,p,q,R,s) = (a,b,c,d,o,p,q,s)
- cross(X, Y)[a,b,c,d,o,p,q,s] = sum(X[a,b,c,d,R,:] * Y[o,p,q,:,s])

```php
$a = $mo->array([[4,3],[2,1]]);
$b = $mo->array([[[1,2],[3,4]],[[5,6],[7,8]]]);
$c = $mo->cross($a,$b);
## c => [[[13, 20],[41, 48]],[[ 5,  8],[17, 20]]],
```


Selective operations
--------------------
You can specify and select specific elements from the data array.

Selection by index
```php
$data = $mo->array(
    [100,101,102,103,104,105,106,107,108,109,110,111],
);
$indexA = $mo->array(
     [2, 1, 0, 3, 4, 5],NDArray::int32);
$a = $mo->select($data,$indexA);
## a => [102,101,100,103,104,105]

$indexB = $mo->array(
     [[2, 1, 0], [3, 4, 5]],NDArray::int32);
$b = $mo->select($data,$indexB);
## b => [[102,101,100],[103,104,105]]
```

When a bool type array is applied, you can select by mask.

Selection by mask
```php
$data = $mo->array([[-1,2],[-3,4]]);
$mask = $mo->array([[false,true],false,true]],NDArray::bool);
$a = $mo->select($data,$mask);
## a =>  [2, 4]
$b = $mo->select($data,$mo->op($data,'>',0));
## b =>  [2, 4]
```

You can specify more than one index or mask.

```php
$data = $mo->array(
    [[100,101,102],[103,104,105],[106,107,108],[109,110,111]],
    NDArray::float32
);
$index0 = $mo->array(
    [2, 0, 3],$dtype=NDArray::int32);
$index1 = $mo->array(
    [1, 2, 0],$dtype=NDArray::int32);
$a = $mo->select($data,$index0,$index1));
## a => [107, 102, 109],
```

Use the "update" method and the update operator to update the selected element.

```php
$data = $mo->array([[-1,2],[-3,4]]);
$mo->update($data,'=',0,$mo->op($data,'<',0));
## data => [[0,2],[0,4]]
```
```php
$data = $mo->array(
    [[100,101,102],[103,104,105],[106,107,108],[109,110,111]]
);
$idex0 = $mo->array(
    [2, 0, 3],NDArray::int32);
$index1 = $mo->array(
    [1, 2, 0],NDArray::int32);
$mo->update($data,'+=',1000,$index0,$index1);
## data =>   [[100,101,1102],[103,104,105],[106,1107,108],[1109,110,111]]
```

Copy and transpose matrix
-------------------------
Use "copy" to make a copy of the NDArray and the internal element data.
Use "transpose" if you want to copy it after converting it to the transpose matrix.

```php
$a = $mo->array([[1,2],[3,4]]);
$b = $mo->copy($a);
## b => [[1,2],[3,4]]
$c = $mo->transpose($a);
## c => [[1,3],[2,4]]
```


Aggregation operations
----------------------
Array elements can be aggregated.
At this time, you can specify which dimension to summarize.

Aggregation type

- sum, asum
- max, amax, argMax, argAmax
- min, amin, argMin, argAmin
- mean

```php
$a = $mo->array([[1,2,3],[4,5,6]]);
$b = $mo->sum($a);
## b => 21
$b = $mo->sum($a,$axis=0);
## b => [5,7,9]
$b = $mo->sum($a,$axis=1);
## b => [6,15]
```

Random number library
---------------------
You can call the random number library with the "random" method.

- rand: Uniform random number array
- randn: Normally distributed random number array
- RandomInt: A integer random number
- choice: Selective random number array

```php
$a = $mo->random()->rand([2,3]);
## a => [[random numbers....]]
```


Linear Algebra library
----------------------
Call the linear algebra library where speed is more important than flexibility.

Most functions are algorithms that assume two-dimensional or one-dimensional arrays.
The input data is destroyed and used as the output data area.
This minimizes data copying in the process of performing continuous operations.

If you have the OpenBLAS loaded, it will call it and run faster.

- BLAS library
- Mathematics library

```php
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$b = $mo->array([[1,0,0],[0,1,0],[0,0,1]]);

$c = $mo->la()->gemm($a,$b);
# c =>    [1,2,3],
#         [4,5,6],
#         [7,8,9]
```

Other functions
---------------

- astype: Casting data types
- add: Simple addition
- scale: Constant times
