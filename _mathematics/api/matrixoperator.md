---
layout: document
title: "MatrixOperator"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/ndarrayphp
next_section: api/random
---
- **namespace**: Rindow\Math\Matrix
- **classname**: MatrixOperator

General operations on N-dimensional arrays.
If you have loaded the “rindow_openblas” extension, enable it.

Methods
-------
{:.no_toc}
* Table of contents
{:toc}

### constructor
```php
public function __construct($blas=null,$math=null)
```

Arguments
- **blas**: blas library instance.
    - Default is Rindow\Math\Matrix\PhpBlas
- **math**: math library instance.
    - Default is Rindow\Math\Matrix\PhpMath

Example
```php
$mo = new Rindow\Math\Matrix\MatrixOperator();
```

### setDefaultIntType
```php
public function setDefaultIntType($dtype)
```
Set default of Integer type of NDArray

If not set, the default is int32.


Example
```php
use Interop\Polite\Math\Matrix\NDArray;
$mo->setDefaultIntType(NDArray::int32);
```

### setDefaultFloatType
```php
public function setDefaultFloatType($dtype)
```
Set default of Float type of NDArray

If not set, the default is float32.

Example
```php
use Interop\Polite\Math\Matrix\NDArray;
$mo->setDefaultFloatType(NDArray::float32);
```

### array
```php
public function array($array,$dtype=null) : NDArray
```
NDArray with value specified by PHP array type.

Arguments
- **array**: PHP array.
- **dtype**: data type.
    - If omitted, default float type is used.

Example
```php
$a = $mo->array([[1,2],[3,4]]);
## a => [[1.0, 2.0], [3.0, 4.0]]  ... float32
```
```php
$a = $mo->array([[1,2],[3,4]], NDArray::int32);
## a => [[1, 2], [3, 4]]  ... int32
```
```php
$a = $mo->array([true,false], NDArray::bool);
## a => [true,false]  ... bool
```

### zeros
```php
public function zeros(array $shape, $dtype=null) : NDArray
```
Create an NDArray of the shape specified by "shape" and fill it with zeros.

Arguments
- **shape**: NDArray shape.
- **dtype**: data type.
    - If omitted, default float type is used.

Example
```php
$a = $mo->zeros([2,3]);
## a => [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]  ... float32
```
```php
$a = $mo->zeros([2,3],NDArray::int32);
## a => [[0, 0, 0], [0, 0, 0]]  ... int32
```

### ones
```php
public function ones(array $shape, $dtype=null) : NDArray
```
Create an NDArray of the shape specified by "shape" and fill it with ones.

Arguments
- **shape**: NDArray shape.
- **dtype**: data type.
    - If omitted, default float type is used.

Example
```php
$a = $mo->zeros([2,3]);
## a => [[1.0, 1.0, 1.0], [1.0, 1.0, 1.0]]  ... float32
```
```php
$a = $mo->zeros([2,3],NDArray::int32);
## a => [[1, 1, 1], [1, 1, 1]]  ... int32
```

### full
```php
public function full(array $shape, $value, $dtype=null) : NDArray
```
Create an NDArray of the shape specified by "shape" and fill it with "value".

Arguments
- **shape**: NDArray shape.
- **value**: Fill value
- **dtype**: data type.
    - If omitted, According to the specified "value" type.

Example
```php
$a = $mo->full([2,3],2.0);
## a => [[2.0, 2.0, 2.0], [2.0, 2.0, 2.0]]  ... float32
$a = $mo->full([2,3],3);
## a => [[3, 3, 3], [3, 3, 3]]  ... int32
$a = $mo->full([2,3],false);
## a => [[false, false, false], [false, false, false]]  ... bool
```
```php
$a = $mo->full([2,3],2.0,NDArray::float64);
## a => [[2.0, 2.0, 2.0], [2.0, 2.0, 2.0]]  ... float64
$a = $mo->full([2,3],3,NDArray::uint8);
## a => [[3, 3, 3], [3, 3, 3]]  ... uint8
```

### zerosLike
```php
public function zerosLike(NDArray $array)
```
Create an NDArray with the same shape as the specified NDArray and fill it with zeros

Arguments
- **array**: NDArray.

Example
```php
$org = $mo->array([[1,2],[3,4]]);
$a = $mo->zerosLike($org);
## a => [[0.0, 0.0], [0.0, 0.0]]  ... float32
```
```php
$org = $mo->array([[1,2],[3,4]], NDArray::int32);
$a = $mo->zerosLike($org);
## a => [[0, 0], [0, 0]]  ... int32
```

### fullLike
```php
public function fullLike(NDArray $array,$value)
```
Create an NDArray with the same shape as the specified NDArray and fill it with "value"

Arguments
- **array**: NDArray.

Example
```php
$org = $mo->array([[1,2],[3,4]]);
$a = $mo->fullLike($org, 1);
## a => [[1.0, 1.0], [1.0, 1.0]]  ... float32
```
```php
$org = $mo->array([[1,2],[3,4]], NDArray::int32);
$a = $mo->fullLike($org, 1);
## a => [[1, 1], [1, 1]]  ... int32
```

### astype
```php
public function astype(NDArray $array, $dtype) : NDArray
```
Create NDArray with changed data type, convert array elements and copy

Arguments
- **array**: NDArray of copy source.
- **dtype**: Data type to be converted

Example
```php
$org = $mo->array([[1,2],[3,4]],NDArray:int32);
$a = $mo->astype($org, NDArray::float32);
## a => [[1.0, 2.0], [3.0, 4.0]]  ... float32
```

### arange
```php
public function arange(int $count ,$start=null, $step=null, $dtype=null) : NDArray
```
Create an NDArray containing consecutive values.

Note that it is different from numpy.

Arguments
- **count**: Element count.
- **start**: Starting value
    - Default is 0
- **step**: incremental
    - Default is 1
- **dtype**: Data type of NDArray
    - Default depends on start value

Example
```php
$a = $mo->arange(3);
## a => [0, 1, 2]  ... int32
$a = $mo->arange(3, 0.0);
## a => [0.0, 1.0, 2.0]  ... float32
```
```php
$a = $mo->arange(3, 1, 2);
## a => [1, 3, 5]  ... int32
$a = $mo->arange(3, 0, 10, NDArray::float32);
## a => [0.0, 10.0, 20.0]  ... float32
```

### copy
```php
public function copy(NDArray $array) : NDArray
```
Copies the NDArray and the internal buffer instance.

Arguments
- **array**: NDArray of copy source.

Example
```php
$org = $mo->array([[1,2],[3,4]]);
$a = $mo->copy($org);
## a => [[1.0, 2.0], [3.0, 4.0]]  ... float32
```

### cross
```php
public function cross(NDArray $x, NDArray $y) : NDArray
```
Calculates the cross product.

Operations on arrays of three or more dimensions conform to numpy.
See the section ["Dimension Operations"](../matrix/dimensionoperations.html#dot-product-and-cross-product) for details.

Arguments
- **x**: Left matrix
- **y**: Right matrix

Example

```php
$x = $mo->array([[1,2],[3,4]]);
$y = $mo->array([[1,0],[0,1]]);
$z = $mo->cross($x,$y);
## z => [[1.0, 2.0], [3.0, 4.0]]
```

### dot
```php
public function dot(NDArray $x, NDArray $y)
```
Calculates the dot product.
See the section ["Dimension Operations"](../matrix/dimensionoperations.html#dot-product-and-cross-product) for details.

Example
```php
$a = $mo->array([1,2,3,4,5,6]);
$b = $mo->array([3,4,5,6,7,8]);
$c = $mo->dot($a,$b);
## c ==> 133.0
```

### transpose
```php
public function transpose(NDArray $x) : NDArray
```
Get the transpose matrix.

Example
```php
$x = $mo->array([[1,2],[3,4],[5,6]]);
$y = $mo->transpose($x);
## y => [[1.0, 3.0, 5.0],[2.0, 4.0, 6.0]]
```

### add
```php
public function add(NDArray $x, NDArray $y) : NDArray
```
Sum of Matrix

Example
```php
$x = $mo->array([[1,2],[3,4]]);
$y = $mo->array([[10,20],[30,40]]);
$z = $mo->add($x,$y);
## z => [[11.0, 22.0],[33.0, 44.0]]
```

### scale
```php
public function scale($a, NDArray $X) : NDArray
```
Scale of Matrix

Example
```php
$x = $mo->array([[1,2],[3,4]]);
$y = $mo->add(10,$x);
## y => [[10.0, 20.0],[30.0, 40.0]]
```


### sum
```php
public function sum(NDArray $x,int $axis=null)
```
Sum of matrix elements.

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,2],[3,4]]);
$y = $mo->sum($x);
## y => 10.0
$y = $mo->sum($x,0);
## y => [4.0, 6.0]
$y = $mo->sum($x,1);
## y => [3.0, 7.0]
```

### sum
```php
public function asum(NDArray $x,int $axis=null)
```
Sum of absolute values of array elements

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,-2],[3,-4]]);
$y = $mo->asum($x);
## y => 10.0
$y = $mo->asum($x,0);
## y => [4.0, 6.0]
$y = $mo->asum($x,1);
## y => [3.0, 7.0]
```

### max
```php
public function max(NDArray $x,int $axis=null)
```
Maximum value of array element

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,-2],[3,-4]]);
$y = $mo->max($x);
## y => 3.0
$y = $mo->max($x,0);
## y => [3.0, -2.0]
$y = $mo->max($x,1);
## y => [1.0, 3.0]
```

### argMax
```php
public function argMax(NDArray $x,int $axis=null)
```
Index of maximum value array element.
If the array has two or more dimensions, returns the position represented in one dimension.

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,-2],[3,-4]]);
$y = $mo->argMax($x);
## y => 2
$y = $mo->argMax($x,0);
## y => [1, 0]
$y = $mo->argMax($x,1);
## y => [0, 0]
```


### amax
```php
public function amax(NDArray $x,int $axis=null)
```
Maximum absolute value of array element

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,-2],[3,-4]]);
$y = $mo->amax($x);
## y => -4.0
$y = $mo->amax($x,0);
## y => [3.0, -4.0]
$y = $mo->amax($x,1);
## y => [-2.0, -4.0]
```

### argAmax
```php
public function argAmax(NDArray $x,int $axis=null)
```
Index of maximum absolute value array element.
If the array has two or more dimensions, returns the position represented in one dimension.

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,-2],[3,-4]]);
$y = $mo->argAmax($x);
## y => 3
$y = $mo->argAmax($x,0);
## y => [1, 1]
$y = $mo->argAmax($x,1);
## y => [1, 1]
```

### min
```php
public function min(NDArray $x,int $axis=null)
```
Minimum value of array element

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,-2],[3,-4]]);
$y = $mo->min($x);
## y => -4.0
$y = $mo->min($x,0);
## y => [1.0, -4.0]
$y = $mo->min($x,1);
## y => [-2.0, -4.0]
```

### argMin
```php
public function argMin(NDArray $x,int $axis=null)
```
Index of Minimum value array element.
If the array has two or more dimensions, returns the position represented in one dimension.

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,-2],[3,-4]]);
$y = $mo->argMin($x);
## y => 3
$y = $mo->argMin($x,0);
## y => [0, 1]
$y = $mo->argMin($x,1);
## y => [1, 1]
```

### amin
```php
public function amin(NDArray $x,int $axis=null)
```
Minimum absolute value of array element

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,-2],[3,-4]]);
$y = $mo->amin($x);
## y => 1.0
$y = $mo->amin($x,0);
## y => [1.0, -2.0]
$y = $mo->amin($x,1);
## y => [1.0, 3.0]
```

### argAmin
```php
public function argAmin(NDArray $x,int $axis=null)
```
Index of Minimum absolute value array element.
If the array has two or more dimensions, returns the position represented in one dimension.

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,-2],[3,-4]]);
$y = $mo->argAmin($x);
## y => 0
$y = $mo->argAmin($x,0);
## y => [0, 0]
$y = $mo->argAmin($x,1);
## y => [0, 0]
```

### mean
```php
public function mean(NDArray $x,int $axis=null)
```
Minimum absolute value of array element

Arguments
- **x**: Input matrix.
- **axis**: which dimension to summarize.

Example
```php
$x = $mo->array([[1,-2],[3,-4]]);
$y = $mo->mean($x);
## y => -0.5
$y = $mo->mean($x,0);
## y => [2.0, -3.0]
$y = $mo->mean($x,1);
## y => [-0.5, -0.5]
```

### f
```php
public function f(callable $func,NDArray $x, ...$args) : NDArray
```
Apply functions to array elements.

Arguments
- **func**: All type of functions available for call_user_func()
- **x**: Input matrix.
- **args**: Argument specified by call_user_func()

Example
```php
$x = $mo->array([[0,1],[4,9]]);
$y = $mo->f('sqrt',$x);
## y => [[0.0, 1.0], [2.0, 3.0]]
$y = $mo->f(fn($a,$b)=>$a*$a+$b, $x, 100);
## y => [[100.0, 101.0],[116.0, 181.0]]

```

### u
```php
public function u(NDArray $x, callable $func, ...$args) : NDArray
```
Update by applying function to array elements


Arguments
- **x**: Input matrix.
- **func**: All type of functions available for call_user_func()
- **args**: Argument specified by call_user_func()

Return
- Returns the updated **x**.

Example
```php
$x = $mo->array([[0,1],[4,9]]);
$mo->u($x,'sqrt');
## x => [[0.0, 1.0], [2.0, 3.0]]
$x = $mo->array([[0,1],[4,9]]);
$mo->u($x, fn($a,$b)=>$a*$a+$b, 100);
## x => [[100.0, 101.0],[116.0, 181.0]]
$x = $mo->zeros([2,2]);
$mo->u($mo->u($x,fn($a)=>$a+1),fn($a)=>$a+1);
## x => [[2.0, 2.0], [2.0, 2.0]]
```


### op
```php
public function op($X, string $operator, $Y, NDArray $R=null) : NDArray
```
Broadcast operators for array elements.

See the section ["Broadcasting"](../matrix/dimensionoperations.html#broadcasting) for details.

Arguments
- **X**,**Y**: Input matrix.
- **operator**: Operator characters such as arithmetic operations
- **R**: Array space for storing results
  - Specify this when you want to store the operation result in a prepared array.
  - Create an array to automatically store if not specified

Valid operator characters
- **Numerical calculations**: + - * / % **
- **Conditional operator**: == != > >= < <=

Return
- Calculation result

Example
```php
$x = $mo->array([[1,2],[3,4]]);
$y = $mo->array([[10,20],[30,40]]);
$z = $mo->op($x,'+',$y);
## z => [[11.0, 22.0], [33.0, 44.0]]
$x = $mo->array([[1,2],[3,4]]);
$y = $mo->array([10,100]);
$z = $mo->op($x,'*',$y);
## z => [[10.0,200.0],[30.0,400.0]]
```

### select
```php
public function select(NDArray $X, NDArray ...$MASKs) : NDArray
```
Selective operation.

See the section ["Selective operation"](../matrix/dimensionoperations.html#selective-operation) for details.

Arguments
- **X**: Input matrix.
- **MASKs**: Array of indices to select or mask array.
    - If you specify more than one, repeat the selection operation multiple times

Example
```php
## Extract from set x by index y
$x = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$y = $mo->array([0,1,2],NDArray::int32);
$z = $mo->select($x, $mo->arange($x->shape()[0]), $y);
## z => [1.0, 5.0, 9.0]
```
```php
## Extract only positive numbers
$x = $mo->array([1,-2,3,-4]);
$z = $mo->select($x, $mo->op($x,'>',0));
## z => [1.0, 3.0]
```

### update
```php
public function update(NDArray $X, string $operator, $value, NDArray ...$MASKs) : NDArray
```
Selective update.

See the section ["Selective operation"](../matrix/dimensionoperations.html#selective-operation) for details.

Arguments
- **X**: Input matrix.
- **operator**: update operator character.
- **value**: update value.
- **MASKs**: Array of indices to select or mask array.
    - If you specify more than one, repeat the selection operation multiple times

Valid operator characters
    - **Numerical calculations**: = += -= *= /= %= **=

Return
- Returns the updated **x**.

Example
```php
## fill zero by index y
$x = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$y = $mo->array([0,1,2]);
$mo->update($x, '=', 0, $mo->arange($x->shape()[0]), $y);
## x => [[0,2,3],[4,0,6],[7,8,0]]
```
```php
## limit x by 5
$x = $mo->array([[1,4,7],[2,5,8],[3,6,9]]);
$mo->update($x, '=', 5, $mo->op($x,'>',5));
## x => [[1,4,5],[2,5,5],[3,5,5]]
```

### dtypeToString
```php
public function dtypeToString($dtype) : string
```
Convert dtype of NDarray to string

Example
```php
$x = $mo->array([[1,2,3]]);
echo $mo->dtypeToString($x->dtype());
## float32
$x = $mo->arange(3);
echo $mo->dtypeToString($x->dtype());
## int32
```

### toString
```php
public function toString(NDArray $array) : string
```
Convert NDarray to string

Example
```php
$x = $mo->array([[1,2,3]]);
echo $mo->toString($x);
## [[1,2,3]]
$x = $mo->arange(3);
echo $mo->toString($x);
## [0,1,2]
```


### random
```php
public function random()
```
Get random number library

See the section ["Random library"](random.html) for details.

Example
```php
$x = $mo->random()->rand(10);
```

### la
```php
public function la()
```
Get linear algebra library

See the section ["Linear algebra library"](linearalgebra.html) for details.

Example
```php
$x = $mo->array([1,2,3]);
$mo->la()->scal(10,$x);
```
