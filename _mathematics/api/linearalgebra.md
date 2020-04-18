---
layout: document
math: enable
title: "LinearAlgebra"
grand_upper_section: index
upper_section: apitoc
previous_section: random
---
- **namespace**: Rindow\Math\Matrix
- **classname**: LinearAlgebra

Linear algebra library for arrays.
For this library, speed is more important than flexibility.

The input data area and output data area are shared by many functions.
So note that the contents of the input array will be destroyed.

The BLAS library and the MATH library specified by "MatrixOperator" are used internally.
When the rindow_openblas extension is specified, high-speed operations are possible.

Methods
-------
{:.no_toc}
* Table of contents
{:toc}

### constructor
```php
$la = $matrixoperator->la();
```

Example
```php
$mo = new MatrixOperator();
$la = $mo->la();
```

### alloc
```php
public function alloc(array $shape,$dtype=null)
```
Creates the specified NDArray and does not initialize its contents.

Arguments
- **shape**: Shape of array
- **dtype**: data type of array

Example
```php
$x = $mo->la()->alloc([2,2]);
```

### zeros
$$
\begin{align*}
X := 0
\end{align*}
$$
```php
public function zeros(NDArray $X) : NDArray
```
Initialize the array with zeros.

Arguments
- **X**: The array to be initialized

Result
- An initialized array. The same instance as the input array.

Example
```php
$x = $mo->la()->zeros($mo->la()->alloc([2,2]));
```

### astype
$$
\begin{align*}
y_i :=  \left \{ \begin{array}{l} 1 \hspace{5mm} ( x_i = y_i ) \\ 0 \hspace{5mm} ( x_i \neq y_i ) \end{array} \right.
\end{align*}
$$
```php
public function astype(NDArray $X, $dtype) : NDArray
```
Cast an array to a specified data type.

Arguments
- **X**: the vector X.
- **dtype**: data type.
    - NDArray data type constant

Result
- new vector.

Examples

```php
use Interop\Polite\Math\Matrix\NDArray;
$x = $mo->array([[1,2,3],[4,5,6]],NDArray::float32);
$y = $mo->la()->astype($x,NDArray::uint8);
## y => [[1,2,3],[4,5,6]] <uint8>
```

### copy
$$
\begin{align*}
Y := X
\end{align*}
$$
```php
public function copy(
    NDArray $X,
    NDArray $Y=null ) : NDArray
```
Copy array elements

Arguments
- **X**: Original vector.
- **Y**: Destination vector.
    - If omitted, it will be allocated automatically.

Result
- Same instance as vector Y.

Example
```php
$x = $mo->array([1,-2,-3]);
$y = $mo->la()->copy($x);
## y => [1.0, -2.0, -3.0]
```

### scal
$$
\begin{align*}
X := \alpha X
\end{align*}
$$
```php
public function scal(
    float $alpha,
    NDArray $X) : NDArray
```
Scales a vector by a constant.

Arguments
- **alpha**: a constant.
- **X**: a vector.
    - Input and output are shared.

Result
- The same instance as the input array.

Example
```php
$x = $mo->array([1,2,3]);
$mo->la()->scale(2,$x);
```

### axpy
$$
\begin{align*}
Y := \alpha X + Y
\end{align*}
$$
```php
public function axpy(
    NDArray $X,
    NDArray $Y,
    float $alpha=null) : NDArray
```
Scales a vector by a constant.

Arguments
- **X**: the vector X.
- **Y**: the vector Y.
    - Input and output are shared.
- **alpha**: a constant.
    - Default is 1.0.

Result
- The same instance as the Y.

Example
```php
$x = $mo->array([1,2,3]);
$y = $mo->array([1,2,3]);
$mo->la()->axpy($x,$y,2.0);
## y => [ 3.0, 6.0, 9.0]
```


### dot
$$
\begin{align*}
f = \sum_{k=0}^n x_k y_k
\end{align*}
$$
```php
public function dot(
    NDArray $X,
    NDArray $Y)
```
Dot product of vectors.
Vectors are treated as one-dimensional arrays, regardless of shape.

Arguments
- **X**: the vector X.
- **Y**: the vector Y.

Result
- value of result.

Example
```php
$x = $mo->array([1,2,3]);
$y = $mo->array([1,2,3]);
$z = $mo->la()->dot($x,$y);
## z => 14.0
```

### asum
$$
\begin{align*}
f = \sum_{k=0}^n \begin{vmatrix}x_k\end{vmatrix}
\end{align*}
$$
```php
public function asum(NDArray $X) : float
```
Sum of absolute values of array elements

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,-2,-3]);
$z = $mo->la()->asum($x);
## z => 6.0
```

### iamax
$$
\begin{align*}
f = \arg \max \begin{vmatrix}x_k\end{vmatrix}
\end{align*}
$$
```php
public function iamax(NDArray $X) : int
```
Get the element number of the maximum absolute value in array element

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,-2,-3]);
$z = $mo->la()->iamax($x);
## z => 2
```

### iamin
$$
\begin{align*}
f = \arg \min \begin{vmatrix}x_k\end{vmatrix}
\end{align*}
$$
```php
public function iamin(NDArray $X) : int
```
Get the element number of the minimum absolute value in array element

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,-2,-3]);
$z = $mo->la()->iamin($x);
## z => 0
```

### amax
$$
\begin{align*}
f = \max \begin{vmatrix}x_k\end{vmatrix}
\end{align*}
$$
```php
public function amax(NDArray $X) : int
```
Get the maximum absolute value in array element

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,-2,-3]);
$z = $mo->la()->amax($x);
## z => -3.0
```

### amin
$$
\begin{align*}
f = \min \begin{vmatrix}x_k\end{vmatrix}
\end{align*}
$$
```php
public function amin(NDArray $X) : int
```
Get the minimum absolute value in array element

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,-2,-3]);
$z = $mo->la()->amin($x);
## z => 1.0
```

### gemv
$$
\begin{align*}
    y :=  \alpha A \times x +  \beta y
\end{align*}
$$
```php
public function gemv(
    NDArray $A,
    NDArray $X,
    float $alpha=null,
    float $beta=null,
    NDArray $Y=null,
    bool $trans=null) : NDArray
```
Cross product of matrix and vector

Arguments
- **A**: A matrix.
- **X**: X vector.
- **alpha**: constant value.
    - If omitted, default is 1.0
- **beta**: constant value.
    - If omitted, default is 0.0
- **Y**: Y vector.
    - If omitted, it will be allocated automatically.
    - Input and output are shared.
- **trans**: transpose A matrix.
    - If omitted, default is false.

Result
- Same instance as vector Y.

Example
```php
$a = $mo->array([[1,2,3],[4,5,6]]);
$x = $mo->array([1,2,3]);
$y = $mo->array([1,1]);
$mo->la()->gemv($a,$x,2,3,$y);
## y => [31.0, 67.0]
```

### gemm
$$
\begin{align*}
    C :=  \alpha A \times B + \beta C
\end{align*}
$$
```php
public function gemm(
    NDArray $A,
    NDArray $B,
    float $alpha=null,
    float $beta=null,
    NDArray $C=null,
    bool $transA=null,
    bool $transB=null) : NDArray
```
Cross product of matrix and matrix

Arguments
- **A**: A matrix.
- **B**: B matrix.
- **alpha**: constant value.
    - If omitted, default is 0.1
- **beta**: constant value.
    - If omitted, default is 0.0
- **C**: C matrix.
    - If omitted, it will be allocated automatically.
    - Input and output are shared.
- **transA**: transpose A matrix.
    - If omitted, it is false.
- **transB**: transpose B matrix.
    - If omitted, it is false.

Result
- Same instance as vector C.

Example
```php
$a = $mo->array([[1,2,3],[4,5,6]]);
$b = $mo->array([[1,2],[3,4],[5,6]]);
$c = $mo->array([[1,2],[3,4]]);
$mo->la()->gemm($a,$b,2,3,$c);
## c => [[47,62],[107,140]]
```

### sum
$$
\begin{align*}
f = \sum_{k=0}^n x_k
\end{align*}
$$
```php
public function sum(NDArray $X) : float
```
Sum of array elements

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,2,3]);
$z = $mo->la()->sum($x);
## z => 6.0
```

### imax
$$
\begin{align*}
f = \arg \max x_k
\end{align*}
$$
```php
public function imax(NDArray $X) : int
```
Get the element number of the maximum value in array element

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,2,3]);
$z = $mo->la()->imax($x);
## z => 2
```

### imin
$$
\begin{align*}
f = \arg \min x_k
\end{align*}
$$
```php
public function imin(NDArray $X) : int
```
Get the element number of the minimum value in array element

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,2,3]);
$z = $mo->la()->imin($x);
## z => 0
```

### max
$$
\begin{align*}
f = \max x_k
\end{align*}
$$
```php
public function max(NDArray $X) : float
```
Get the maximum value in array element

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,2,3]);
$z = $mo->la()->max($x);
## z => 3
```

### min
$$
\begin{align*}
f = \min x_k
\end{align*}
$$
```php
public function min(NDArray $X) : float
```
Get the minimum value in array element

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,2,3]);
$z = $mo->la()->min($x);
## z => 1
```

### increment
$$
\begin{align*}
X := \alpha X + \beta
\end{align*}
$$
```php
public function increment(
    NDArray $X,
    float $beta=null,
    float $alpha=null) : NDArray
```
Increment the entire array element by a constant

Arguments
- **X**: the vector X.
    - Input and output are shared.
- **beta**: Increment constant.
- **alpha**: multiply constant.

Result
- Same instance as vector X.

Examples

$$
\begin{align*}
X := X + 1
\end{align*}
$$
```php
$x = $mo->array([1,2,3]);
$mo->la()->increment($x,1);
## x => [2.0, 3.0, 4.0]
```

$$
\begin{align*}
X := 1 - X
\end{align*}
$$
```php
$x = $mo->array([1,2,3]);
$mo->la()->increment($x,1,-1);
## x => [0.0, -1.0, -2.0]
```

### reciprocal
$$
\begin{align*}
X := \frac{1}{\alpha X + \beta}
\end{align*}
$$
```php
public function reciprocal(
    NDArray $X,
    float $beta=null,
    float $alpha=null) : NDArray
```
Compute the reciprocal of a vector element

Arguments
- **X**: the vector X.
    - Input and output are shared.
- **beta**: Increment constant.
- **alpha**: multiply constant.

Result
- Same instance as vector X.

Examples

$$
\begin{align*}
X := \frac{1}{X + 1}
\end{align*}
$$
```php
$x = $mo->array([1,2,3]);
$mo->la()->reciprocal($x,1);
## x => [0.5, 0.33333334326744, 0.25]
```

$$
\begin{align*}
X := \frac{1}{1 - X}
\end{align*}
$$
```php
$x = $mo->array([2,3,4]);
$mo->la()->reciprocal($x,1,-1);
## x => [-1,-0.5,-0.33333334326744]
```

### maximum
$$
\begin{align*}
x_k :=  \left \{ \begin{array}{l} x_k \hspace{5mm} (x_k > \alpha) \\ \alpha \hspace{5mm} (x_k \leqq \alpha) \end{array} \right.
\end{align*}
$$
```php
public function maximum(float $alpha, NDArray $X) : NDArray
```
Set the larger of vector elements and constant

Arguments
- **alpha**: Constant to compare.
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([2,3,4]);
$mo->la()->maximum(3,$x);
## x => [3.0, 3.0, 4.0]
```

### minimum
$$
\begin{align*}
x_k :=  \left \{ \begin{array}{l} x_k \hspace{5mm} (x_k < \alpha) \\ \alpha \hspace{5mm} (x_k \geqq \alpha) \end{array} \right.
\end{align*}
$$
```php
public function minimum(float $alpha, NDArray $X) : NDArray
```
Set the smaller of the vector elements and constant

Arguments
- **alpha**: Constant to compare.
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([2,3,4]);
$mo->la()->minimum(3,$x);
## x => [2.0, 3.0, 3.0]
```

### greater
$$
\begin{align*}
x_k :=  \left \{ \begin{array}{l} 1 \hspace{5mm} (x_k > \alpha) \\ 0 \hspace{5mm} (x_k \leqq \alpha) \end{array} \right.
\end{align*}
$$
```php
public function greater(float $alpha, NDArray $X) : NDArray
```
Check if vector element is greater than constant

Arguments
- **alpha**: Constant to compare.
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([2,3,4]);
$mo->la()->greater(3,$x);
## x => [0.0, 0.0, 1.0]
```

### less
$$
\begin{align*}
x_k :=  \left \{ \begin{array}{l} 1 \hspace{5mm} (x_k < \alpha) \\ 0 \hspace{5mm} (x_k \geqq \alpha) \end{array} \right.
\end{align*}
$$
```php
public function less(float $alpha, NDArray $X) : NDArray
```
Check if vector element is less than constant

Arguments
- **alpha**: Constant to compare.
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([2,3,4]);
$mo->la()->less(3,$x);
## x => [1.0, 0.0, 0.0]
```

### multiply
$$
\begin{align*}
a_{ij} :=  x_j a_{ij}
\end{align*}
$$
```php
public function multiply(NDArray $X, NDArray $A, bool $trans=null) : NDArray
```
Broadcast vector X to array A and multiply.

Arguments
- **X**: the vector X.
    - It need not be a one-dimensional array.
- **A**: the matrix A.
    - Input and output are shared.
    - The same shape as the shape of the vector X, or the shape of an array for multiple vectors X
- **trans**: transpose the matrix A.
    - default is false.

Result
- Same instance as vector A.

Examples

```php
$a = $mo->array([[1,2,3],[4,5,6]]);
$x = $mo->array([30,20,10]);
$mo->la()->multiply($x,$a);
## a => [[30.0, 40.0, 30.0],[120.0, 100.0, 60.0]]
```
```php
$a = $mo->array([[1,2,3],[4,5,6]]);
$x = $mo->array([20,10]);
$mo->la()->multiply($x,$a,true);
## a => [[20.0, 40.0, 60.0],[40.0, 50.0, 60.0]]
```


### add
$$
\begin{align*}
a_{ij} := \alpha x_j + a_{ij}
\end{align*}
$$
```php
public function add(
   NDArray $X,
   NDArray $A,
   float $alpha=null,
   bool $trans=null
   ) : NDArray
```
Broadcast vector X to array A and add.

Arguments
- **X**: the vector X.
    - It need not be a one-dimensional array.
- **A**: the matrix A.
    - Input and output are shared.
    - The same shape as the shape of the vector X, or the shape of an array for multiple vectors X
- **alpha**: the constant
    - default is 1.0
- **trans**: transpose the matrix A.
    - default is false.

Result
- Same instance as vector A.

Examples

$$
\begin{align*}
X := X + A
\end{align*}
$$
```php
$a = $mo->array([[1,2,3],[4,5,6]]);
$x = $mo->array([10,20,30]);
$mo->la()->add($x,$a);
## a => [[11.0, 22.0, 33.0],[14.0, 25.0, 36.0]]
```

$$
\begin{align*}
X := A + X
\end{align*}
$$
```php
$a = $mo->array([[10,20,30],[40,50,60]]);
$x = $mo->array([1,2,3]);
$mo->la()->add($x,$a,-1);
## a => [[9,18,27],[39,48,57]]
```

### square
$$
\begin{align*}
x_k := (x_k)^2
\end{align*}
$$
```php
public function square(NDArray $X) : NDArray
```
Square array elements

Arguments
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[1,2,3],[4,5,6]]);
$mo->la()->square($x);
## x => [[1.0, 4.0, 9.0],[16.0, 25.0, 36.0]]
```

### sqrt
$$
\begin{align*}
x_k := \sqrt{x_k}
\end{align*}
$$
```php
public function sqrt(NDArray $X) : NDArray
```
Square root of array elements

Arguments
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[0,1,4],[9,16,25]]);
$mo->la()->sqrt($x);
## x => [[0.0, 1.0, 2.0],[3.0, 4.0, 5.0]]
```

### rsqrt
$$
\begin{align*}
x_k := \frac{1}{\alpha \sqrt{x_k} + \beta}
\end{align*}
$$
```php
public function rsqrt(
    NDArray $X,
    float $beta=null,
    float $alpha=null) : NDArray
```
Square root of array elements and reciprocal it.

Arguments
- **X**: the vector X.
    - Input and output are shared.
- **alpha**: constant value.
    - If omitted, default is 1.0
- **beta**: constant value.
    - If omitted, default is 0.0

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([1,4,9,16,25]);
$mo->la()->rsqrt($x);
## x => [1,0.5,0.33333334326744,0.25,0.20000000298023]
```

### pow
$$
\begin{align*}
x_k := (x_k)^\alpha
\end{align*}
$$
```php
public function pow(NDArray $X, float $alpha) : NDArray
```
To power array elements

Arguments
- **X**: the vector X.
    - Input and output are shared.
- **alpha**: the constant

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[0,1,2],[3,4,5]]);
$mo->la()->pow($x,3);
## x => [[0.0, 1.0, 8.0],[27.0, 64.0, 125.0]]
```

### exp
$$
\begin{align*}
x_k := e^{x_k}
\end{align*}
$$
```php
public function exp(NDArray $X) : NDArray
```
calculate "e" to a power

Arguments
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[0,1,2],[3,4,5]]);
$mo->la()->exp($x);
## x => [[1.0, 2.7182817459106,7.3890562057495],[20.085536956787,54.598148345947,148.41316223145]]
```

### log
$$
\begin{align*}
x_k := \log x_k
\end{align*}
$$
```php
public function log(NDArray $X) : NDArray
```
Calculate the natural logarithm

Arguments
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[1,2,3],[4,5,6]]);
$mo->la()->log($x);
## x => [[0.0, 0.6931471824646,1.0986123085022],[1.3862943649292,1.6094379425049,1.7917594909668]]
```

### equal
$$
\begin{align*}
y_i :=  \left \{ \begin{array}{l} 1 \hspace{5mm} ( x_i = y_i ) \\ 0 \hspace{5mm} ( x_i \neq y_i ) \end{array} \right.
\end{align*}
$$
```php
public function equal(
    NDArray $X,
    NDArray $Y) : NDArray
```
Aggregate the average value of array elements in the specified dimension

Arguments
- **X**: the vector X.
- **Y**: the vector Y.
    - Input and output are shared.

Result
- Same instance as vector Y.

Examples

```php
$x = $mo->array([[1,2,3],[6,5,4]]);
$y = $mo->array([[1,0,3],[4,5,6]]);
$mo->la()->equal($x,$y);
## y => [[1,0,1],[0,1,0]]
```

### duplicate
$$
\begin{align*}
a_{ij} :=  x_j
\end{align*}
$$
```php
public function duplicate(
    NDArray $X,
    int $repeats=null,
    bool $trans=null,
    NDArray $A=null) : NDArray
```
Copy vector X multiple times

Arguments
- **X**: the vector X.
    - It need not be a one-dimensional array.
- **repeats**: Number of copies
    - default is 1.
- **trans**: transpose the matrix A.
    - default is false.
- **A**: Destination matrix.
    - If omitted, it will be allocated automatically.

Result
- Same instance as vector A.

Examples

```php
$x = $mo->array([1,2,3]);
$a = $mo->la()->duplicate($x,2);
## a => [[1.0,2.0,3.0],[1.0,2.0,3.0]]
```
```php
$x = $mo->array([1,2]);
$a = $mo->la()->duplicate($x,3,true);
## a => [[1.0,1.0,1.0],[2.0,2.0,2.0]]
```

### select
$$
\begin{align*}
y_{ij} :=  \left \{ \begin{array}{l} a_{xj} \hspace{5mm} ( axis = 0 ) \\ a_{ix} \hspace{5mm} ( axis = 1 ) \end{array} \right.
\end{align*}
$$
```php
public function select(
    NDArray $A,
    NDArray $X,
    int $axis=null,
    NDArray $Y=null) : NDArray
```
Select values from source array by indexes.

Arguments
- **A**: source data.
- **X**: selection index vector.
    - Must be one-dimensional integer array.
- **axis**: selection dimension
    - default is 0.
- **Y**: Destination matrix.
    - If omitted, it will be allocated automatically.

Result
- Same instance as vector Y.

Examples

```php
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$x = $mo->array([0,2]);
$y = $mo->la()->select($a,$x);
## y => [[1,2,3],[7,8,9]]
```
```php
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$x = $mo->array([0,2,1]);
$y = $mo->la()->select($a,$x,$axis=1);
## y => [1,6,8]
```

### onehot
$$
\begin{align*}
y_{ij} :=  \left \{ \begin{array}{l} a \hspace{5mm} ( x_i = j ) \\ 0 \hspace{5mm} ( x_i \neq j ) \end{array} \right.
\end{align*}
$$
```php
public function onehot(
    NDArray $X,
    int $numClass,
    float $a=null,
    NDArray $Y=null) : NDArray
```
Convert classification number to the onehot format.

Arguments
- **X**: classification numbers.
    - Must be one-dimensional integer array.
- **numClass**: Total number of classifications
- **a**: Scalar value.
    - Default is 1.0.
    - The result is multiplied.
- **Y**: Destination matrix.
    - If omitted, it will be allocated automatically.
    - If you specify an existing array, the result is added.

Result
- Same instance as vector Y.

Examples

$$
\begin{align*}
Y := {\rm onehot} X
\end{align*}
$$
```php
$x = $mo->array([0,1,2,0]);
$y = $mo->la()->onehot($x,3);
## y => [[1.0, 0.0, 0.0],[0.0, 1.0, 0.0],[0.0, 0.0, 1.0],[1.0, 0.0, 0.0]]
```
$$
\begin{align*}
Y := Y - \frac{ 1 }{ 2 }{\rm onehot} X
\end{align*}
$$
```php
$y = $mo->array([[1,1,1],[1,1,1],[1,1,1],[1,1,1]]);
$x = $mo->array([0,1,2,0]);
$mo->la()->onehot($x,3,-0.5,$y);
## y => [[0.5, 1.0, 1.0],[1.0, 1.0, 5,0],[1.0, 1.0, 0.5],[0.5, 1.0, 1.0]]
```

### softmax
$$
\begin{align*}
y_i =  \frac{ e^{x_i} }{ \sum_{j=0}^{n} e^{x_j}}
\end{align*}
$$
```php
public function softmax(
    NDArray $X
    ) : NDArray
```
Softmax function

Arguments
- **X**: Must be a two-dimensional array.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$mo->la()->softmax($x);
## x => [[0.090030573308468,0.2447284758091,0.66524094343185],
## [0.090030573308468,0.2447284758091,0.66524094343185],
## [0.090030573308468,0.2447284758091,0.66524094343185]]
```

### reduceArgMax
$$
\begin{align*}
x_i =  \arg {\rm maximum} (a_j)
\end{align*}
$$
```php
public function reduceArgMax(
    NDArray $A,
    int $axis,
    NDArray $X=null,
    $dtypeX=null) : NDArray
```
Aggregate the index of the array element with the maximum value for the specified dimension.

Arguments
- **A**: source data array.
    - Must be a two-dimensional array.
- **axis**: Aggregate dimension
    - Must be 0 or 1.
- **X**: Array to store the result.
    - If omitted, it will be allocated automatically.
- **dtypeX**: Data type when creating array X.
    - If omitted, it will be int64.

Result
- Same instance as vector X.

Examples

```php
$a = $mo->array([[1,2,3],[6,5,4]]);
$x = $mo->la()->reduceArgMax($a,1);
## x => [2,0]
$x = $mo->la()->reduceArgMax($a,0);
## x => [1,1,1]
```

### reduceMax
$$
\begin{align*}
x_i =  {\rm maximum} (a_j)
\end{align*}
$$
```php
public function reduceMax(
    NDArray $A,
    int $axis,
    NDArray $X=null,
    $dtypeX=null) : NDArray
```
Aggregate the array element with the maximum value for the specified dimension.

Arguments
- **A**: source data array.
    - Must be a two-dimensional array.
- **axis**: Aggregate dimension
    - Must be 0 or 1.
- **X**: Array to store the result.
    - If omitted, it will be allocated automatically.
- **dtypeX**: Data type when creating array X.
    - If omitted, same as original data

Result
- Same instance as vector X.

Examples

```php
$a = $mo->array([[1,2,3],[6,5,4]]);
$x = $mo->la()->reduceMax($a,1);
## x => [3,6]
$x = $mo->la()->reduceMax($a,0);
## x => [6,5,4]
```

### reduceSum
$$
\begin{align*}
x_i = \sum_{j=0}^n a_ij
\end{align*}
$$
```php
public function reduceSum(
   NDArray $A,
   int $axis=null,
   NDArray $X=null
   $dtypeX=null) : NDArray
```
Aggregate the sum of array elements in the specified dimension

Arguments
- **A**: source data array.
    - Must be a two-dimensional array.
- **axis**: Aggregate dimension
    - Must be 0 or 1.
    - Default is 0.
- **X**: Array to store the result.
    - If omitted, it will be allocated automatically.
- **dtypeX**: Data type when creating array X.
    - If omitted, same as original data

Result
- Same instance as vector X.

Examples

```php
$a = $mo->array([[1,2,3],[6,5,4]]);
$x = $mo->la()->reduceSum($a,1);
## x => [6, 15]
$x = $mo->la()->reduceSum($a,0);
## x => [7, 7, 7]
```

### reduceMean
$$
\begin{align*}
x_i = \frac{ \sum_{j=0}^n a_j }{ n }
\end{align*}
$$
```php
public function reduceMean(
    NDArray $A,
    int $axis,
    NDArray $X=null,
    $dtypeX=null) : NDArray
```
Aggregate the average value of array elements in the specified dimension

Arguments
- **A**: source data array.
    - Must be a two-dimensional array.
- **axis**: Aggregate dimension
    - Must be 0 or 1.
- **X**: Array to store the result.
    - If omitted, it will be allocated automatically.
- **dtypeX**: Data type when creating array X.
    - If omitted, same as original data

Result
- Same instance as vector X.

Examples

```php
$a = $mo->array([[1,2,3],[6,5,4]]);
$x = $mo->la()->reduceMean($a,1);
## x => [2,5]
$x = $mo->la()->reduceMean($a,0);
## x => [3.5, 3.5, 3.5]
```
