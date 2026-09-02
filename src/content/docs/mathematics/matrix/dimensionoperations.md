---
layout: document
title: "Dimension Operations"
upper_section: index
previous_section: matrix/arrayobjects
next_section: matrix/linearalgebralibs
---
## Overview

MatrixOperator performs general operations on N-dimensional arrays. Using the broadcast feature, you can apply the same changes to all elements.
It also provides random number generation capabilities.
These features are designed similar to Python's NumPy.

It also provides features that prioritize speed over flexibility.
These are implemented by extracting parts of Basic Linear Algebra Subprograms (BLAS).
Other scientific computing features will be implemented as needed.

Furthermore, while it works with pure PHP alone, it can also call OpenBLAS or Rindow-Matlib for high-speed operation.

## Creating a MatrixOperator
First, create an instance of MatrixOperator.
(Currently, the Rindow framework is not supported.)

```php
use Rindow\Math\Matrix\MatrixOperator;
$mo = new MatrixOperator();
```

## Creating NDArrays
To perform operations, create arrays of NDArray type. There are several methods to create them.

You can use the following methods:

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

## Array Operations
Unlike Python, PHP does not have operator overloading functionality.
Therefore, all operations are performed using MatrixOperator methods.

```php
$a = $mo->array([1,2,3,4]);
$b = $mo->array([4,3,2,1]);
$c = $mo->op($a,'*',$mo->op($a,'+',$b));
```

## Broadcasting
MatrixOperator operates on each element of arrays of the same shape at the same index.
When attempting to operate on arrays of different shapes, the smaller array is broadcast to match the larger one.
This can be processed memory-efficiently without copying data, but repeated processing may become inefficient and processing speed may decrease.
When using a high-speed numerical computing library, consider libraries that can perform batch processing at the expense of memory consumption.

#### Example of operating on arrays of the same shape
```php
$a = $mo->array([1.0, 2.0, 3.0]);
$b = $mo->array([10.0, 100.0, 1000.0]);
$c = $mo->op($a, '+', $b);
# [ 11.0,  102.0,  1003.0]
```
#### Example using broadcasting
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

## General Broadcasting Rules
For broadcasting to work, the larger array must contain the smaller array.
Note that this behavior is different from NumPy.

#### Example where broadcasting is possible
```php
$a = $mo->array([[1,2],[3,4]]);
$b = $mo->array([1,2]);
$c = $mo->op($a,'+',$b);
## c ==> [[2,4],[4,6]]
```
#### Example where broadcasting is not possible
```php
$a = $mo->array([1,2,3,4]);
$b = $mo->array([1,2]);
$c = $mo->op($a,'+',$b);
## error
```

Operations with scalar variables **apply the scalar variable to all elements**.

```php
$a = $mo->array([[1,2],[3,4]]);
$c = $mo->op($a,'+',2);
## c ==> [[3,4],[5,6]]
```

## Applying General Functions
You can apply specific functions to all elements of an N-dimensional array.
```php
$a = $mo->array([[1,4],[9,16]]);
$c = $mo->f('sqrt',$a);
## c ==> [[1,2],[3,4]]
```

Anonymous functions (closures) can also be used.
```php
$a = $mo->array([[1,2],[3,4]]);
$c = $mo->f(fn($x)=>$x*2, $a);
## c => [[2,4],[6,8]]
```

You can also update arrays directly.

```php
$a = $mo->array([[1,4],[9,16]]);
$mo->u('sqrt',$a);
## a ==> [[1,2],[3,4]]
```

## Dot Product and Cross Product
Operators like `*` and `+` are not dot products or cross products, but simple element-wise operations.
To find the dot product or cross product of matrices, use `dot` or `cross`.

#### Dot product
```php
$a = $mo->array([1,2,3,4,5,6]);
$b = $mo->array([3,4,5,6,7,8]);
$c = $mo->dot($a,$b);
## c ==> 133
```

#### Cross product
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

## Selective Operations
You can select specific elements from a data array.

#### Selection by index
```php
$data = $mo->array(
    [100,101,102,103,104,105,106,107,108,109,110,111],
);
$indexA = $mo->array(
     [2, 1, 0, 3, 4, 5],dtype:NDArray::int32);
$a = $mo->select($data,$indexA);
## a => [102,101,100,103,104,105]

$indexB = $mo->array(
     [[2, 1, 0], [3, 4, 5]],dtype:NDArray::int32);
$b = $mo->select($data,$indexB);
## b => [[102,101,100],[103,104,105]]
```

#### Selection by mask
By applying a boolean type array, you can select using a mask.
```php
$data = $mo->array([[-1,2],[-3,4]]);
$mask = $mo->array([[false,true],[false,true]],dtype:NDArray::bool);
$a = $mo->select($data,$mask);
## a =>  [2, 4]

$b = $mo->select($data,$mo->op($data,'>',0));
## b =>  [2, 4]
```

#### Specifying multiple indexes or masks
```php
$data = $mo->array(
    [[100,101,102],[103,104,105],[106,107,108],[109,110,111]],
    dtype:NDArray::float32
);
$index0 = $mo->array(
    [2, 0, 3],dtype:NDArray::int32);
$index1 = $mo->array(
    [1, 2, 0],dtype:NDArray::int32);
$a = $mo->select($data,$index0,$index1);
## a => [107, 102, 109]
```

#### Updating selected elements
You can update selected elements using the "update" method and update operator.

```php
$data = $mo->array([[-1,2],[-3,4]]);
$mo->update($data,'=',0,$mo->op($data,'<',0));
## data => [[0,2],[0,4]]
```
```php
$data = $mo->array(
    [[100,101,102],[103,104,105],[106,107,108],[109,110,111]]
);
$index0 = $mo->array(
    [2, 0, 3],dtype:NDArray::int32);
$index1 = $mo->array(
    [1, 2, 0],dtype:NDArray::int32);
$mo->update($data,'+=',1000,$index0,$index1);
## data => [[100,101,1102],[103,104,105],[106,1107,108],[1109,110,111]]
```

## Copy and Transpose Matrix
Using "copy", you can create a copy of the NDArray and its internal element data.
Using "transpose", you can create a copy after converting to the transposed matrix.

```php
$a = $mo->array([[1,2],[3,4]]);
$b = $mo->copy($a);
## b => [[1,2],[3,4]]

$c = $mo->transpose($a);
## c => [[1,3],[2,4]]
```
## Aggregation Operations
You can aggregate array elements. At this time, you can specify the dimension to aggregate.

#### Types of aggregation
- `sum` : Sum
- `asum` : Sum of absolute values
- `max`, `amax`, `argMax`, `argAmax` : Maximum value, index of maximum value
- `min`, `amin`, `argMin`, `argAmin` : Minimum value, index of minimum value
- `mean` : Average

```php
$a = $mo->array([[1,2,3],[4,5,6]]);
$b = $mo->sum($a);
## b => 21

$b = $mo->sum($a,axis:0);
## b => [5,7,9]

$b = $mo->sum($a,axis:1);
## b => [6,15]
```

## Random Number Library
Using the random method, you can call the random number library.

- rand : Uniform random array
- randn : Normal distribution random array
- randomInt : Random integers
- choice : Selective random array

```php
$a = $mo->random()->rand([2,3]);
## a => [[random numbers....]]
```

## Linear Algebra Library
If you prioritize speed over flexibility, you can call the linear algebra library.

Most functions are algorithms that assume one-dimensional or two-dimensional arrays.
**Input data is destroyed** and used as the output data area.
This minimizes data copying during continuous processing.

If OpenBLAS is loaded, it will be called to operate faster.

#### Main features
- BLAS library
- Math library

See [here](linearalgebra.html) for details.


```php
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$b = $mo->array([[1,0,0],[0,1,0],[0,0,1]]);

$c = $mo->la()->gemm($a,$b);
## c => [[1,2,3],
##       [4,5,6],
##       [7,8,9]]
```

## Stringification
Array elements, shapes, and data types can be stringified.

```php
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$printable = $mo->toString($a);
$shape = $mo->shapeToString($a->shape());
$dtype = $mo->dtypeToString($a->dtype());
echo $printable."\n";
echo $shape."\n";
echo $dtype."\n";
# [
#  [1,2,3],
#  [4,5,6],
#  [7,8,9]
# ]
# (3,3)
# float32
```

## Saving Arrays
Arrays can be serialized for storage.

```php
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$persistentable = $mo->serializeArray($a);
file_put_contents(__DIR__."./foo.data",$persistentable);
$loadedArray = file_get_contents(__DIR__."./foo.data");
$b = $mo->unserializeArray($loadedArray);
echo $mo->toString($b)."\n";
# [
#  [1,2,3],
#  [4,5,6],
#  [7,8,9]
# ]
```

## Other Functions
- astype : Data type casting
- add : Simple addition
- scale : Constant multiplication
