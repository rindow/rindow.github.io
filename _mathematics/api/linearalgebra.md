---
layout: document
math: enable
title: "LinearAlgebra"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/random
---
- **namespace**: Rindow\Math\Matrix
- **classname**: LinearAlgebra

Linear algebra library for arrays.
For this library, speed is more important than flexibility.

The input data area and output data area are shared by many functions.
So note that the contents of the input array will be destroyed.

The BLAS library and the MATH library specified by "MatrixOperator" are used internally.
When the OpenBLAS FFI is specified, high-speed operations are possible.

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

### array
```php
public function array(mixed $array, ?int $dtype=null) : NDArray
```
NDArray with value specified by PHP array type.

Arguments
- **array**: PHP array or scalar, NDArray
    - If an NDArray is provided, it will return as is.
- **dtype**: data type.
    - If omitted, default float type is used.

Example
```php
$x = $mo->la()->array([[1,2],[3,4]],dtype:NDArray::float32);
```

### toNDArray
```php
public function toNDArray(NDArray $ndarray) : NDArray
```
Ensure that the data resides within the host memory. 

Arguments
- **ndarray**: NDArray
    - If there is no data in the host memory, then we raise an exception.

Example
```php
$x = $mo->la()->toNDArray($x);
```

### scalar
```php
public function scalar(mixed $array) : mixed
```
Convert scalar values in the NDArray to PHP scalars.

Arguments
- **array**: NDArray or PHP scalar vaulue.
    - If an PHP scalar vaulue is provided, it will return as is.

Example
```php
$x = $mo->la()->scalar($x);
```

### expandDims
```php
public function expandDims(NDArray $x, int $axis) : NDArray
```
Expand the NDArray dimension.

Arguments
- **x**: NDArray.
- **axis**: Array dimension.

Example
```php
$x = $mo->zeros([2,3]);
$x = $mo->la()->expandDims($x,axis:1);
// x->shape() : [2,1,3]
```

### squeeze
```php
public function squeeze(NDArray $x, ?int $axis=null) : NDArray
```
Reduces the dimensions of an array.

Arguments
- **x**: NDArray.
- **axis**: The dimension to reduce. Must have a size of 1
  - If omitted, all dimensions with a size of 1 will be reduced.

Example
```php
$x = $mo->zeros([2,1,3]);
$x = $mo->la()->squeeze($x,axis:1);
// x->shape() : [2,3]
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

### ones
$$
\begin{align*}
X := 1
\end{align*}
$$
```php
public function ones(NDArray $X) : NDArray
```
Initialize the array with ones.

Arguments
- **X**: The array to be initialized

Result
- An initialized array. The same instance as the input array.

Example
```php
$x = $mo->la()->ones($mo->la()->alloc([2,2]));
```

### zerosLike
$$
\begin{align*}
X := 0
\end{align*}
$$
```php
public function zerosLike(NDArray $X) : NDArray
```
allocate and initialize the array with zeros.

Arguments
- **X**: An array referencing the shape and data type of a new array.

Result
- An initialized array. The same instance as the input array.

Example
```php
$origX = $mo->la()->alloc([2,2],dtype:NDArray:float32);
$x = $mo->la()->zerosLike($origX);
```

### fill
$$
\begin{align*}
X := n
\end{align*}
$$
```php
public function fill(
    $value,
    NDArray $X
    )
```
Initialize the array with zeros.

Arguments
- **value**: fill value
- **X**: Destination array

Result
- The same instance as X.

Example
```php
$x = $mo->la()->alloc([2,2]);
$mo->la()->fill(1.0, $x);
## x =>
## [[1,1]
##  [1,1]]
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
public function amax(NDArray $X) : float
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
public function amin(NDArray $X) : float
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

### nrm2
$$
\begin{align*}
f = \sqrt{\sum_{k=0}^n (x_k)^2}
\end{align*}
$$
```php
public function nrm2(NDArray $X) : float
```
Get the norm value in array element

Arguments
- **X**: the vector X.

Result
- value of result.

Example
```php
$x = $mo->array([1,2,3]);
$z = $mo->la()->nrm2($x);
## z => 3.7416574954987
```

### rotg
$$
\begin{align*}
r,z,c,s = rotg (x, y)
\end{align*}
$$
```php
public function rotg(
    NDArray $X,
    NDArray $Y,
    NDArray $R=null,
    NDArray $Z=null,
    NDArray $C=null,
    NDArray $S=null) : array
```
Get the Givens rotation.

Currently, complex numbers are supported only when the backend is OpenBLAS or PhpBLAS.
CLBlast also does not support real or complex numbers at all.

Arguments
- **X**: the value of axis X.
- **Y**: the value of axis Y.

Result
- array of result.

Example
```php
$x = $mo->array(3.0);
$y = $mo->array(4.0);
[$r,$z,$c,$s] = $mo->la()->rotg($x,$y);
echo $r->toArray()."\n";
echo $z->toArray()."\n";
echo $c->toArray()."\n";
echo $s->toArray()."\n";
## r => 5
## z => 1.6666666269302
## c => 0.60000002384186
## s => 0.80000001192093

$x = $mo->array([3.0]);
$y = $mo->array([4.0]);
[$r,$z,$c,$s] = $mo->la()->rotg($x,$y);
echo $r[0]."\n";
echo $z[0]."\n";
echo $c[0]."\n";
echo $s[0]."\n";
## r => 5
## z => 1.6666666269302
## c => 0.60000002384186
## s => 0.80000001192093
```

### rot
$$
\begin{align*}
X,Y := rot (X,Y,c,s)
\end{align*}
$$
```php
public function rot(
    NDArray $X,
    NDArray $Y,
    NDArray $C,
    NDArray $S) : void
```
Get Coordinate rotation.

Currently, complex numbers are supported only when the backend is PhpBLAS. OpenBLAS does not support complex numbers because it has cblas_csrot but not cblas_crot.
CLBlast also does not support real or complex numbers at all.

Arguments
- **X**: the value of axis X.
- **Y**: the value of axis Y.
- **c**: the value of cos.
- **s**: the value of sin.

Result
- array of result.

Example
```php
$x = $mo->array([1,2,3]);
$y = $mo->array([1,2,3]);
$c = $mo->array([cos(pi()/4)]);
$s = $mo->array([sin(pi()/4)]);
$mo->la()->rot($x,$y,$c,$s);
echo $mo->toString($x)."\n";
echo $mo->toString($y)."\n";
## x => [1.4142135381699,2.8284270763397,4.2426404953003]
## y => [0,0,0]
```


### swap
$$
\begin{align*}
x,y := y,x
\end{align*}
$$
```php
public function swap(NDArray $X, NDArray $Y) : void
```
Swap the value in array element

Arguments
- **X**: the vector X.
- **Y**: the vector Y.

Result
- value of result.

Example
```php
$x = $mo->array([1, 2, 3]);
$y = $mo->array([4, 5, 6]);
$mo->la()->swap($x,$y);
## x => [4, 5, 6]
## y => [1, 2, 3]
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
    bool $trans=null,
    bool $conj=null,
    ) : NDArray
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
- **conj**: conjugate A matrix.
    - If omitted, default is the same trans.

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
    bool $transB=null,
    bool $conjA=null,
    bool $conjB=null,
    ) : NDArray
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
- **conjA**: conjugate A matrix.
    - If omitted, it is the same transA.
- **conjB**: transpose B matrix.
    - If omitted, it is the same transB.

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


### matmul
$$
\begin{align*}
    C :=  \alpha A \times B + \beta C
\end{align*}
$$
```php
public function matmul(
    NDArray $A,
    NDArray $B,
    ?bool $transA=null,
    ?bool $transB=null,
    ?NDArray $C=null,
    float|object|null $alpha=null,
    float|object|null $beta=null,
    ?bool $conjA=null,
    ?bool $conjB=null,
    ) : NDArray
```
Calculates the matrix multiplication of two multidimensional arrays. Batch processing is also possible depending on the number of dimensions.

Arguments
- **A**: A matrix.
- **B**: B matrix.
- **transA**: transpose A matrix.
    - If omitted, it is false.
- **transB**: transpose B matrix.
    - If omitted, it is false.
- **C**: C matrix.
    - If omitted, it will be allocated automatically.
    - Input and output are shared.
- **alpha**: constant value.
    - If omitted, default is 0.1
- **beta**: constant value.
    - If omitted, default is 0.0
- **conjA**: conjugate A matrix.
    - If omitted, it is the same transA.
- **conjB**: conjugate B matrix.
    - If omitted, it is the same transB.

Result
- Same instance as vector C.

Example
```php
$a = $mo->array([[1,2,3],[4,5,6]]);
$b = $mo->array([[1,2],[3,4],[5,6]]);
$c = $mo->array([[1,2],[3,4]]);
$mo->la()->matmul($a,$b,alpha:2,beta:3,C:$c);
## c => [[47,62],[107,140]]
```


### symm
$$
\begin{align*}
C :=  \left \{ \begin{array}{l} A = Symmetric matrix \\ \alpha \times A B + \beta C \hspace{5mm} ( right = false ) \\ \alpha \times B A + \beta C \hspace{5mm} ( right = true ) \end{array} \right.
\end{align*}
$$
```php
public function symm(
    NDArray $A,
    NDArray $B,
    float $alpha=null,
    float $beta=null,
    NDArray $C=null,
    bool $right=null,
    bool $lower=null
    ) : NDArray
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
- **right**: multiply from right side.
    - If omitted, it is false.
- **lower**: use lower side.
    - If omitted, it is false.

Result
- Same instance as vector C.

Example
```php
$a = $mo->array([
    [1,2,3],
    [0,5,6],
    [0,0,9],
]);
$b = $mo->array([[1,2],[3,4],[5,6]]);
$c = $mo->la()->symm($a,$b);
## c =>
##  [[22.0,28.0],
##   [47.0,60.0],
##   [66.0,84.0]]
```

### syrk
$$
\begin{align*}
C :=  \left \{ \begin{array}{l} \alpha \times A A^T + \beta C \hspace{5mm} ( trans = false ) \\ \alpha \times A^T A + \beta C \hspace{5mm} ( trans = true ) \end{array} \right.
\end{align*}
$$
```php
public function syrk(
    NDArray $A,
    float $alpha=null,
    float $beta=null,
    NDArray $C=null,
    bool $lower=null,
    bool $trans=null,
    bool $conj=null,
    ) : NDArray
```
Cross product of a matrix and transposed

Arguments
- **A**: A matrix.
- **alpha**: constant value.
    - If omitted, default is 0.1
- **beta**: constant value.
    - If omitted, default is 0.0
- **C**: C matrix.
    - If omitted, it will be allocated automatically.
    - Input and output are shared.
- **lower**: use lower side result.
    - If omitted, it is false.
- **trans**: transpose A matrix.
    - If omitted, it is false.
- **conj**: conjugate A matrix.
    - If omitted, it is the same trans.

Result
- Same instance as vector C.

Example
```php
$a = $mo->array([
    [1,2],
    [3,4],
    [5,6],
]);
$c = $mo->la()->syrk($a);
## c =>
## [[5.0,11.0,17.0],
##  [0.0,25.0,39.0],
##  [0.0,0.0,61.0]]
```

### syr2k
$$
\begin{align*}
C :=  \left \{ \begin{array}{l} \alpha \times A B^T + \alpha \times B A^T + \beta C \hspace{5mm} ( trans = false ) \\ \alpha \times B A^T + \alpha \times A B^T + \beta C \hspace{5mm} ( trans = true ) \end{array} \right.
\end{align*}
$$
```php
public function syr2k(
    NDArray $A,
    NDArray $B,
    float $alpha=null,
    float $beta=null,
    NDArray $C=null,
    bool $lower=null,
    bool $trans=null,
    bool $conj=null,
    ) : NDArray
```
Cross product of a matrix and transposed

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
- **lower**: use lower side result.
    - If omitted, it is false.
- **trans**: transpose A matrix.
    - If omitted, it is false.
- **conj**: conjugate A matrix.
    - If omitted, it is the same trans.

Result
- Same instance as vector C.

Example
```php
$a = $mo->array([
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [10,11,12],
]);
$b = $mo->array([
    [1,3,5],
    [2,4,6],
    [7,9,11],
    [8,10,12],
]);
$c = $mo->la()->syr2k($a,$b);
## c =>
## [[10.0, 22.0,  34.0],
##  [ 0.0, 50.0,  78.0],
##  [ 0.0,  0.0, 122.0]]
```

### trmm
$$
\begin{align*}
B :=  \left \{ \begin{array}{l} \alpha \times A B \hspace{5mm} ( trans = false ) \\ \alpha \times B A \hspace{5mm} ( trans = true ) \end{array} \right.
\end{align*}
$$
```php
public function trmm(
    NDArray $A,
    NDArray $B,
    float $alpha=null,
    bool $right=null,
    bool $lower=null,
    bool $trans=null,
    bool $conj=null,
    bool $unit=null) : NDArray
```
Cross product of a triangular matrix

Arguments
- **A**: A matrix.
- **B**: B matrix.
- **alpha**: constant value.
    - If omitted, default is 0.1
- **lower**: use lower side.
    - If omitted, it is false.
- **right**: multiply from right side.
    - If omitted, it is false.
- **trans**: transpose A matrix.
    - If omitted, it is false.
- **conj**: conjugate A matrix.
    - If omitted, it is the same trans.
- **uni­t**: uni­triangular.
    - If omitted, it is false.

Result
- Same instance as vector C.

Example
```php
$a = $mo->array([
    [1,2,3],
    [0,4,5],
    [0,0,6],
]);
$b = $mo->array([
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
]);
$mo->la()->trmm($a,$b);
## b =>
##  [[38.0, 44.0, 50.0, 56.0],
##   [65.0, 74.0, 83.0, 92.0],
##   [54.0, 60.0, 66.0, 72.0]]
```

### trsm
$$
\begin{align*}
B :=  \left \{ \begin{array}{l} \alpha \times A^{-1} B \hspace{5mm} ( trans = false ) \\ \alpha \times B A^{-1} \hspace{5mm} ( trans = true ) \end{array} \right.
\end{align*}
$$
```php
public function trsm(
    NDArray $A,
    NDArray $B,
    float $alpha=null,
    bool $right=null,
    bool $lower=null,
    bool $trans=null,
    bool $conj=null,
    bool $unit=null) : NDArray
```
Cross product of a triangular matrix

Arguments
- **A**: A matrix.
- **B**: B matrix.
- **alpha**: constant value.
    - If omitted, default is 0.1
- **right**: multiply from right side.
    - If omitted, it is false.
- **lower**: use lower side.
    - If omitted, it is false.
- **trans**: transpose A matrix.
    - If omitted, it is false.
- **conj**: conjugate A matrix.
    - If omitted, it is the same trans.
- **uni­t**: uni­triangular.
    - If omitted, it is false.

Result
- Same instance as vector C.

Example
```php
$a = $mo->array([
    [1,2,3],
    [0,4,5],
    [0,0,6],
]);
$b = $mo->array([
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
]);
$mo->la()->trsm($a,$b);
## b =>
## [[-2.250,-1.833,-1.417,-1.000],
##  [-0.625,-0.583,-0.542,-0.500],
##  [ 1.500, 1.667, 1.833, 2.000]]
```

### svd
$$
\begin{align*}
U Σ V^T =  M
\end{align*}
$$
```php
public function svd(NDArray $matrix,$fullMatrices=null)
```
Cross product of a triangular matrix
Complex numbers are not currently supported.

Arguments
- **matrix**: Input matrix.

Result
- List of result value.
    - **U**: left matrix.
    - **S**: Sigma matrix.
    - **VT**: right matrix.

Example
```php
$x = $mo->la()->randomUniform([6,5],-10,10);
[$u,$s,$vt] = $mo->la()->svd($x);
```

### omatcopy
```php
    public function omatcopy(
        NDArray $A,
        ?bool $trans=null,
        ?bool $conj=null,
        float|object|null $alpha=null,
        ?NDArray $B=null,
        ) : NDArray
```
Copy array elements with transpose and conjugate

Arguments
- **matrix A**: Input matrix.
- **trans**: transpose A matrix.
    - If omitted, it is false.
- **conj**: conjugate A matrix.
    - If omitted, it is the same trans.
- **alpha**: multiply constant.
    - If omitted, default is 1.0.
- **matrix B**: Output matrix.

Result
- **matrix B**: Output matrix.

Example
```php
$a = $mo->array([
    [1,2,3],
    [4,5,6],
],dtype:NDArray::float32);
$b = $mo->la()->omatcopy($a,trans:true);
## b => [[1,4],[2,5],[3,6]]
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
a_mn :=  \left \{ \begin{array}{l} a_mn \hspace{5mm} (a_mn > x_n) \\ x_n \hspace{5mm} (a_mn \leqq x_n) \end{array} \right.
\end{align*}
$$
```php
    public function maximum(
        NDArray $A,
        int|float|NDArray $X,
        ) : NDArray
```
Set the larger of matrix elements and constant

Arguments
- **A**: the matrix A.
    - Input and output are shared.
- **X**: Constant to compare. scalar value or vector.

Result
- Same instance as matrix A.

Examples

```php
$a = $mo->array([
    [2,3,4],
    [3,4,5],
]);
$x = $mo->array(
    [3,3,3]
)
$mo->la()->maximum($a,$x);
## a => [[3.0, 3.0, 4.0],[3.0,4.0,5.0]]
```

### minimum
$$
\begin{align*}
a_mn :=  \left \{ \begin{array}{l} a_mn \hspace{5mm} (a_mn < x_n) \\ x_n \hspace{5mm} (a_mn \geqq x_n) \end{array} \right.
\end{align*}
$$
```php
public function minimum(
    NDArray $A,
    int|float|NDArray $X,
    ) : NDArray
```
Set the smaller of the matrix elements and constant

Arguments
- **A**: the matrix A.
    - Input and output are shared.
- **X**: Constant to compare. scalar value or vector.

Result
- Same instance as matrix A.

Examples

```php
$a = $mo->array([
    [2,3,4],
    [3,4,5],
]);
$x = $mo->array(
    [3,3,3]
)
$mo->la()->minimum($a,$x);
## a => [[2.0, 3.0, 3.0],[3.0,3.0,3.0]]
```

### greater
$$
\begin{align*}
a_mn :=  \left \{ \begin{array}{l} 1 \hspace{5mm} (a_mn > x_n) \\ 0 \hspace{5mm} (a_mn \leqq x_n) \end{array} \right.
\end{align*}
$$
```php
    public function greater(
        NDArray $A,
        int|float|NDArray $X,
        ) : NDArray
```
Check if matrix element is greater than constant

Arguments
- **A**: the matrix A.
    - Input and output are shared.
- **X**: Constant to compare. scalar value or vector.

Result
- Same instance as matrix A.

Examples

```php
$a = $mo->array([
    [2,3,4],
    [3,4,5],
]);
$x = $mo->array(
    [3,3,3]
)
$mo->la()->greater($a,$x);
## a => [[0.0, 0.0, 1.0],[0.0,1.0,1.0]]
```

### greaterEqual
$$
\begin{align*}
a_mn :=  \left \{ \begin{array}{l} 1 \hspace{5mm} (a_mn \geqq x_n) \\ 0 \hspace{5mm} (a_mn < x_n) \end
{array} \right.
\end{align*}
$$
```php
    public function greaterEqual(
        NDArray $A,
        int|float|NDArray $X,
        ) : NDArray
```
Check if matrix element is greater than or equal constant

Arguments
- **A**: the matrix A.
    - Input and output are shared.
- **X**: Constant to compare. scalar value or vector.


Result
- Same instance as matrix A.

Examples

```php
$a = $mo->array([
    [2,3,4],
    [3,4,5],
]);
$x = $mo->array(
    [3,3,3]
)
$mo->la()->greaterEqual($a,$x);
## a => [[0.0, 1.0, 1.0],[1.0,1.0,1.0]]
```

### less
$$
\begin{align*}
a_mn :=  \left \{ \begin{array}{l} 1 \hspace{5mm} (a_mn < x_n) \\ 0 \hspace{5mm} (a_mn \geqq x_n) \end{array} \right.
\end{align*}
$$
```php
public function less(
    NDArray $A,
    int|float|NDArray $X,
    ) : NDArray
```
Check if matrix element is less than constant

Arguments
- **A**: the matrix A.
    - Input and output are shared.
- **X**: Constant to compare. scalar value or vector.

Result
- Same instance as matrix A.

Examples

```php
$a = $mo->array([
    [2,3,4],
    [3,4,5],
]);
$x = $mo->array(
    [3,3,3]
)
$mo->la()->less($a,$x);
## a => [[1.0, 0.0, 0.0],[0.0,0.0,0.0]]
```

### lessEqual
$$
\begin{align*}
a_mn :=  \left \{ \begin{array}{l} 1 \hspace{5mm} (a_mn \leqq x_n) \\ 0 \hspace{5mm} (a_mn > x_n) \end{array} \right.
\end{align*}
$$
```php
    public function lessEqual(
        NDArray $A,
        int|float|NDArray $X,
        ) : NDArray
```
Check if matrix element is less than constant

Arguments
- **A**: the matrix A.
    - Input and output are shared.
- **X**: Constant to compare. scalar value or vector.

Result
- Same instance as matrix A.

Examples

```php
$a = $mo->array([
    [2,3,4],
    [3,4,5],
]);
$x = $mo->array(
    [3,3,3]
)
$mo->la()->lessEqual($a,$x);
## a => [[1.0, 1.0, 0.0],[1.0,0.0,0.0]]
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
a_mn := (a_mn)^\alpha
\end{align*}
$$
```php
public function pow(
    NDArray $A,
    float|NDArray $alpha,
    ?bool $trans=null,
    ) : NDArray
```
To power array elements

Arguments
- **A**: the matrix X.
    - Input and output are shared.
- **alpha**: the constant. scalar value or vector.
- **trans**: transpose matrix A.

Result
- Same instance as matrix X.

Examples

```php
$a = $mo->array([[0,1,2],[3,4,5]]);
$alpha = $mo->array([3,3,3])
$mo->la()->pow($a,$alpha);
## a => [[0.0, 1.0, 8.0],[27.0, 64.0, 125.0]]
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

### tanh
$$
\begin{align*}
x_k := \tanh x_k
\end{align*}
$$
```php
public function tanh(NDArray $X) : NDArray
```
Calculate the hyperbolic tangent

Arguments
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[1,2,3],[4,5,6]]);
$mo->la()->tanh($x);
```

### sin
$$
\begin{align*}
x_k := \sin x_k
\end{align*}
$$
```php
public function sin(
    NDArray $X
    ) : NDArray
```
Calculate the sin

Arguments
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[1,2,3],[4,5,6]]);
$mo->la()->sin($x);
```

### cos
$$
\begin{align*}
x_k := \cos x_k
\end{align*}
$$
```php
public function cos(
    NDArray $X
    ) : NDArray
```
Calculate the cos

Arguments
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[1,2,3],[4,5,6]]);
$mo->la()->cos($x);
```

### tan
$$
\begin{align*}
x_k := \tan x_k
\end{align*}
$$
```php
public function tan(
    NDArray $X
    ) : NDArray
```
Calculate the tan

Arguments
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[1,2,3],[4,5,6]]);
$mo->la()->tan($x);
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
Compare the value of array elements

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

### notEqual
$$
\begin{align*}
y_i :=  \left \{ \begin{array}{l} 1 \hspace{5mm} ( x_i \neq y_i ) \\ 0 \hspace{5mm} ( x_i = y_i ) \end{array} \right.
\end{align*}
$$
```php
public function notEqual(
    NDArray $X,
    NDArray $Y) : NDArray
```
Compare the value of array elements

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
$mo->la()->notEqual($x,$y);
## y => [[0,1,0],[1,0,1]]
```

### not
$$
\begin{align*}
y_i :=  \left \{ \begin{array}{l} 1 \hspace{5mm} ( x_i = 0 ) \\ 0 \hspace{5mm} ( x_i \neq 0 ) \end{array} \right.
\end{align*}
$$
```php
public function not(NDArray $X) : NDArray
```
Invert the value as boolean of array elements.

Arguments
- **X**: the vector X.
    - Input and output are shared.

Result
- Same instance as vector X.

Examples

```php
$x = $mo->array([[1,0,3],[-1,5,0]]);
$mo->la()->not($x);
## x => [[0,1,0],[0,0,1]]
```

### duplicate
$$
\begin{align*}
a_{ij} :=  x_j
\end{align*}
$$
```php
public function duplicate(
    NDArray $input,
    ?int $repeats=null,
    ?bool $trans=null,
    ?NDArray $output=null) : NDArray
```
Copy vector X multiple times

Arguments
- **input**: the vector X.
    - It need not be a one-dimensional array.
- **repeats**: Number of copies
    - default is 1.
- **trans**: transpose the matrix A.
    - default is false.
- **output**: Destination matrix.
    - If omitted, it will be allocated automatically.

Result
- Same instance as matrix output.

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

### transpose
$$
\begin{align*}
B =  \alpha \times A^T
\end{align*}
$$
```php
public function transpose(
    NDArray $A,
    array|NDArray|null $perm=null,
    ?NDArray $B=null,
    ) : NDArray
```
Transpose a matrix

Arguments
- **A**: input matrix.
- **perm**: A list of destination dimensions to swap.
    - If omitted, range($A->ndim()-1,0,-1).
- **B**: output matrix

Result
- Same instance as Matrix B.

Examples

```php
$a = $mo->array([[1,2][3,4]]);
$b = $mo->la()->transpose($a);
## b => [[1,3],[2,4]]
```


### gather
$$
\begin{align*}
y :=  \left \{ \begin{array}{l} a_{x,k} \hspace{5mm} ( axis = null ) \\ a_{m,x,k} \hspace{5mm} ( axis \neq null ) \end{array} \right.
\end{align*}
$$
```php
public function gather(
    NDArray $A,
    NDArray $X,
    int $axis=null,
    NDArray $output=null,
    int $dtype=null) : NDArray
```
Select values from source array by indexes.

Arguments
- **A**: source data.
- **X**: selection index vector.
    - N-dimensional integer array.
- **axis**: selection dimension
    - default is null.
    - If null, Match from the beginning of the selector.
    - If not null, Reduce on the specified axis.
- **output**: Destination matrix.
    - If omitted, it will be allocated automatically.

Result
- Same instance as vector output.

Examples

```php
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$x = $mo->array([0,2],NDArray::int32);
$b = $mo->la()->gather($a,$x);
## b => [[1,2,3],[7,8,9]]
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$x = $mo->array([2,1,0],NDArray::int32);
$b = $mo->la()->gather($a,$x,axis:0);
## b => [7,5,3]
$a = $mo->array([[1,2,3],[4,5,6],[7,8,9]]);
$x = $mo->array([2,1,0],NDArray::int32);
$b = $mo->la()->gather($a,$x,axis:1);
## b => [3,5,7]
```

### gatherb
$$
\begin{align*}
y :=  \left \{ \begin{array}{l} a_{x,k} \hspace{5mm} ( axis = null ) \\ a_{m,x,k} \hspace{5mm} ( axis \neq null ) \end{array} \right.
\end{align*}
$$
```php
    public function gatherb(
        NDArray $params,
        NDarray $indices,
        ?int $axis=null,
        ?int $batchDims=null,
        ?int $detailDepth=null,
        ?int $indexDepth=null,
        ?NDArray $outputs=null,
    ) : NDArray
```
Extended gather function.

- **params**: (batches, m, numClass, k, len)
- **indices**: (batches, n, k)
- **outputs**: (batches, m, n, k, len)
- outputs(batches, m, n, k, len) := A(batches, m, X(batches, n, k), k, len)


Arguments

- **params**: source data.
- **indices**: selection index vector.
    - N-dimensional integer array.
- **axis**: selection dimension
    - default is the same of batchDims.
- **batchDims**: define batch dimensions
    - default is 0.
- **detailDepth**: locate detail dimension
    - default is axis+1.
- **indexDepth**: define batch dimensions
    - default is ndim of indexDepth.
- **output**: Destination matrix.
    - If omitted, it will be allocated automatically.

Result
- Same instance as matrix output.

Examples

```php

$shapeA = [4,3];
$a = $la->array([
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [9,10,11],
]);
$x = $la->array([2,2,1,0],dtype:NDArray::int32);
$b = $la->gatherb($a,$x,axis:1,batchDims:1);
## b => [2,5,7,9]
```

### scatter
$$
\begin{align*}
y :=  \left \{ \begin{array}{l} a_{x,k} \hspace{5mm} ( axis = null ) \\ a_{m,x,k} \hspace{5mm} ( axis \neq null ) \end{array} \right.
\end{align*}
$$
```php
public function scatter(
    NDArray $X,
    NDArray $A,
    int $numClass,
    int $axis=null,
    NDArray $output=null,
    $dtype=null) : NDArray
```
Set values to array by indexes. Reverse operation of gather.

Arguments
- **X**: selection index vector.
- **A**: source data vector.
    - N-dimensional integer array.
- **numClass**: The size of the destination array.
    - Must be integer
- **axis**: selection dimension
    - default is null.
    - If null, Match from the beginning of the selector.
    - If not null, Expand on the specified axis.
- **output**: Destination array.

Result
- Same instance as Matrix B.

Examples

```php
$x = $mo->array([0,2],NDArray::int32);
$a = $mo->array([[1,2,3],[4,5,6]]);
$b = $mo->la()->scatter($x,$a,$n=3);
## b => [[1,2,3],[0,0,0],[4,5,6]]
$x = $mo->array([2,1,0],NDArray::int32);
$a = $mo->array([1,2,3]);
$b = $mo->la()->scatter($x,$a,$n=3,$axis=0);
## b => [[0,0,3],[0,2,0],[1,0,0]]
$x = $mo->array([2,1,0],NDArray::int32);
$a = $mo->array([1,2,3]);
$b = $mo->la()->scatter($x,$a,$n=3,$axis=1);
## b => [[0,0,1],[0,2,0],[3,0,0]]
```

### scatterb
$$
\begin{align*}
y :=  \left \{ \begin{array}{l} a_{x,k} \hspace{5mm} ( axis = null ) \\ a_{m,x,k} \hspace{5mm} ( axis \neq null ) \end{array} \right.
\end{align*}
$$
```php
public function scatterb(
    NDarray $indices,
    NDArray $updates,
    array $shape,
    ?int $axis=null,
    ?int $batchDims=null,
    ?int $detailDepth=null,
    ?int $indexDepth=null,
    ?NDArray $outputs=null,
): NDArray
```
Extended scatter function.

- **indices**: (batches, n, k)
- **updates**: (batches, m, n, k, len)
- **outputs**: (batches, m, numClass, k, len)
- outputs(batches, m, n, k, len) := A(batches, m, X(batches, n, k), k, len)

Arguments
- **indices**: selection index vector.
    - N-dimensional integer array.
- **updates**: source data.
- **shape**: shape of output data.
- **axis**: selection dimension
    - default is the same of batchDims.
- **batchDims**: define batch dimensions
    - default is 0.
- **detailDepth**: locate detail dimension
    - default is axis+1.
- **indexDepth**: define batch dimensions
    - default is ndim of indexDepth.
- **output**: Destination matrix.
    - If omitted, it will be allocated automatically.

Result
- Same instance as Matrix output.

Examples

```php
$shapeA = [4];
$a = $la->array([2,5,7,9]);
$x = $la->array([2,2,1,0],dtype:NDArray::int32);
$b = $la->scatterb($x,$a,$shapeB,axis:1,batchDims:1);
## b => [
##  [0,0,2],
##  [0,0,5],
##  [0,7,0],
##  [9,0,0]
## ]
```

### scatterAdd
$$
\begin{align*}
B_{x} := B_{x} + A_{x}
\end{align*}
$$
```php
public function scatterAdd(
    NDArray $X,
    NDArray $A,
    NDArray $B,
    int $axis=null,
    $dtype=null) : NDArray
```
Add values to array by indexes.

Arguments
- **X**: selection index vector.
- **A**: source data.
    - N-dimensional integer array.
- **B**: Destination data.
- **axis**: selection dimension
    - default is null.
    - If null, Match from the beginning of the selector.
    - If not null, Expand on the specified axis.

Result
- Same instance as Matrix B.

Examples

```php
$x = $mo->array([0,2],NDArray::int32);
$a = $mo->array([[1,2,3],[4,5,6]]);
$b = $mo->array([[1,1,1],[1,1,1],[1,1,1]]);
$mo->la()->scatterAdd($x,$a,$b);
## b => [[2,3,4],[1,1,1],[5,6,7]]
$x = $mo->array([2,1,0],NDArray::int32);
$a = $mo->array([1,2,3]);
$b = $mo->array([[1,1,1],[1,1,1],[1,1,1]]);
$mo->la()->scatterAdd($x,$a,$b,$axis=0);
## b => [[1,1,4],[1,3,1],[2,1,1]]
$x = $mo->array([2,1,0],NDArray::int32);
$a = $mo->array([1,2,3]);
$b = $mo->array([[1,1,1],[1,1,1],[1,1,1]]);
$mo->la()->scatterAdd($x,$a,$b,$axis=1);
## b => [[1,1,2],[1,3,1],[4,1,1]]
```

### scatterbAdd
$$
\begin{align*}
B_{x} := B_{x} + A_{x}
\end{align*}
$$
```php
public function scatterbAdd(
    NDarray $indices,
    NDArray $updates,
    array $shape,
    ?int $axis=null,
    ?int $batchDims=null,
    ?int $detailDepth=null,
    ?int $indexDepth=null,
    ?NDArray $outputs=null,
): NDArray
```
Extended scatterAdd function.

Arguments
- **indices**: selection index vector.
    - N-dimensional integer array.
- **updates**: source data.
- **shape**: shape of output data.
- **axis**: selection dimension
    - default is the same of batchDims.
- **batchDims**: define batch dimensions
    - default is 0.
- **detailDepth**: locate detail dimension
    - default is axis+1.
- **indexDepth**: define batch dimensions
    - default is ndim of indexDepth.
- **output**: Destination matrix.
    - If omitted, it will be allocated automatically.

Result
- Same instance as Matrix output.

Examples

```php
$shapeA = [4];
$a = $la->array([2,5,7,9]);
$x = $la->array([2,2,1,0],dtype:NDArray::int32);
$shapeB = [4,3];
$b = $la->scatterbAdd($x,$a,$shapeB,axis:1,batchDims:1);
## b => [
##  [0,0,2],
##  [0,0,5],
##  [0,7,0],
##  [9,0,0]
## ]
```

### slice

```php
public function slice(
    NDArray $input,
    array $begin,
    array $size,
    NDArray $output=null
    ) : NDArray
```
Slice a array with indicator.

Arguments
- **input**: source data.
- **begin**: begin of slice.
    - Must be integer array.
- **size**: size of slice.
    - Must be integer array.
- **output**: Destination array.

Result
- Same instance as Matrix output.

Examples

```php
$x = $mo->array($mo->arange(24,null,null,NDArray::float32)->reshape([2,4,3]));
$y = $la->slice(
    $x,
    $start=[0,1],
    $size=[-1,2]
    );
## y =>
##   [[[3,4,5],
##     [6,7,8],],
##    [[15,16,17],
##     [18,19,20],],
##   ]
```

### stick

```php
public function stick(
    NDArray $input,
    NDArray $output,
    array $begin,
    array $size
    ) : NDArray
```
Stick values to array with indicator.

Arguments
- **input**: values.
- **output**: Destination array.
- **begin**: begin of value index.
    - Must be integer array.
- **size**: size of values.
    - Must be integer array.
- **output**: Destination array.

Result
- Same instance as Matrix output.

Examples

```php
$x = $mo->array($mo->arange(12,null,null,NDArray::float32)->reshape([2,2,3]));
$y = $mo->array($mo->zeros([2,4,3]));
$mo->la()->stick(
    $x,
    $y,
    $start=[0,1],
    $size=[-1,2]
    );
## y =>
##   [[[0,0,0],
##     [0,1,2],
##     [3,4,5],
##     [0,0,0]],
##    [[0,0,0],
##     [6,7,8],
##     [9,10,11],
##     [0,0,0]],]
```

### stack

```php
public function stack(
    array $values,
    int $axis=null
)
```
Concat arrays with a axis.

Arguments
- **values**: list of input array.
    - Must be list of NDArray that are same the shapes.
- **axis**: Coordinate axes to combine.

Result
- NDArray as Matrix output.

Examples

```php
$a = $mo->array($mo->arange(6,0,null,NDArray::float32)->reshape([2,3]));
$b = $mo->array($mo->arange(6,6,null,NDArray::float32)->reshape([2,3]));
$y = $mo->la()->stack(
    [$a,$b],
    $axis=0
    );
## y =>
##  [[[0,1,2],
##    [3,4,5]],
##   [[6,7,8],
##    [9,10,11]],]
```

### concat

```php
public function concat(
    array $values,
    int $axis=null
) : NDArray
```
Concat arrays with a axis.

Arguments
- **values**: list of input array.
    - Must be list of NDArray that are same the shapes.
- **axis**: Coordinate axes to combine.

Result
- NDArray as Matrix output.

Examples

```php
$a = $mo->array($mo->arange(6,$start=0,null,NDArray::float32)->reshape([3,2]));
$b = $mo->array($mo->arange(4,$start=6,null,NDArray::float32)->reshape([2,2]));
$y = $mo->la()->concat(
    [$a,$b],
    $axis=0
    );
## y =>
##  [[0,1],
##   [2,3],
##   [4,5],
##   [6,7],
##   [8,9],]
```

### split

```php
public function split(
    NDArray $input, array $sizeSplits, $axis=null
    ) : array
```
Split a array with a axis.

Arguments
- **input**: input array.
- **sizeSplits**: list of size.
    - Must be integer list
- **axis**: Coordinate axes to split.

Result
- List of NDArray as Matrix output.

Examples

```php
$x = $mo->array([
    [0,1],
    [2,3],
    [4,5],
    [6,7],
    [8,9],
]);
$y = $mo->la()->split(
    $x,
    [3,2],
    $axis=0
);
## $y[0] =>
##  [[0,1],
##   [2,3],
##   [4,5]]
## $y[1] =>
##  [[6,7],
##   [8,9]]

```

### repeat

```php
public function repeat(
    NDArray $A,
    int $repeats,
    ?int $axis=null,
    ?bool $keepdims=null
    ) : NDArray
```
Repeat array.

Arguments
- **A**: values.
- **repeats**: number of repeat.
- **axis**: repeat axis.
    - If null, flat array output
    - If not null, repeat with specified axis.
- **keepdims**: Keep dimensions.

Result
- Repeaded Matrix output.

Examples

```php
$A = $mo->array([[1,2,3],[4,5,6]]);
$B = $la->repeat($X,2);
## b => [1,2,3,4,5,6,1,2,3,4,5,6]
$B = $la->repeat($X,2,$axis=0);
## b => [[[1,2,3],[4,5,6]],[[1,2,3],[4,5,6]]]
$B = $la->repeat($X,2,$axis=1);
## b => [[[1,2,3],[1,2,3]],[[4,5,6],[4,5,6]]]
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
    NDArray $output=null) : NDArray
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
public function reduceArgMax( // reduceMaxArgEx
    NDArray $input,
    ?int $axis=null,
    ?bool $keepdims=null,
    ?NDArray $output=null,
    ?int $dtype=null) : NDArray
```
Aggregate the index of the array element with the maximum value for the specified dimension.

Arguments
- **A**: source data array.
- **axis**: Aggregate dimension
    - Must be integer. If you give a negative number, it will be specified from the right.
- **keepdims**: Keep dimensions.
- **output**: Array to store the result.
    - If omitted, it will be allocated automatically.
- **dtype**: Data type when creating output array .
    - If omitted, it will be int64 or int32.

Result
- Same instance as matrix B.

Examples

```php
$a = $mo->array([[1,2,3],[6,5,4]]);
$b = $mo->la()->reduceArgMax($a,1);
## b => [2,0]
$b = $mo->la()->reduceArgMax($a,0);
## b => [1,1,1]
$a = $mo->array([
    [[1,2],[5,6]],
    [[7,8],[3,4]]]);
$b = $mo->la()->reduceArgMax($a,1);
echo $mo->toString($b)."\n";
## b => [[1,1],[0,0]]

```

### reduceMax
$$
\begin{align*}
x_i =  {\rm maximum} (a_j)
\end{align*}
$$
```php
public function reduceMax(
    NDArray $input,
    ?int $axis=null,
    ?bool $keepdims=null,
    ?NDArray $output=null,
    ?int $dtype=null) : NDArray
```
Aggregate the array element with the maximum value for the specified dimension.

Arguments
- **A**: source data array.
- **axis**: Aggregate dimension
    - Must be integer. If you give a negative number, it will be specified from the right.
- **keepdims**: Keep dimensions.
- **output**: Array to store the result.
    - If omitted, it will be allocated automatically.
- **dtype**: Data type when creating output array .
    - If omitted, same as original data

Result
- Same instance as output matrix.

Examples

```php
$a = $mo->array([[1,2,3],[6,5,4]]);
$b = $mo->la()->reduceMax($a,1);
## b => [3,6]
$b = $mo->la()->reduceMax($a,0);
## b => [6,5,4]
$a = $mo->array([
    [[1,2],[5,6]],
    [[7,8],[3,4]]]);
$b = $mo->la()->reduceMax($a,1);
echo $mo->toString($b)."\n";
## b => [[5,6],[7,8]]
```

### reduceSum
$$
\begin{align*}
x_i = \sum_{j=0}^n a_ij
\end{align*}
$$
```php
public function reduceSum( // reduceSumEx
    NDArray $input,
    ?int $axis=null,
    ?bool $keepdims=null,
    ?NDArray $output=null,
    ?int $dtype=null) : NDArray
```
Aggregate the sum of array elements in the specified dimension

Arguments
- **input**: source data array.
- **axis**: Aggregate dimension
    - Must be integer. If you give a negative number, it will be specified from the right.
    - Default is 0.
- **keepdims**: Keep dimensions.
- **output**: Array to store the result.
    - If omitted, it will be allocated automatically.
- **dtype**: Data type when creating output array.
    - If omitted, same as original data

Result
- Same instance as matrix output.

Examples

```php
$a = $mo->array([[1,2,3],[6,5,4]]);
$b = $mo->la()->reduceSum($a,1);
## b => [6, 15]
$b = $mo->la()->reduceSum($a,0);
## b => [7, 7, 7]
$a = $mo->array([
    [[1,2],[5,6]],
    [[7,8],[3,4]]]);
$b = $mo->la()->reduceSum($a,1);
echo $mo->toString($b)."\n";
## b => [[6,8],[10,12]]
```

### reduceMean
$$
\begin{align*}
x_i = \frac{ \sum_{j=0}^n a_j }{ n }
\end{align*}
$$
```php
public function reduceMean(
    NDArray $input,
    ?int $axis=null,
    ?bool $keepdims=null,
    ?NDArray $output=null,
    ?int $dtype=null) : NDArray
```
Aggregate the average value of array elements in the specified dimension

Arguments
- **input**: source data array.
- **axis**: Aggregate dimension
    - Must be 0 or 1.
- **keepdims**: Keep dimensions.
- **output**: Array to store the result.
    - If omitted, it will be allocated automatically.
- **dtype**: Data type when creating output array.
    - If omitted, same as original data

Result
- Same instance as output matrix.

Examples

```php
$a = $mo->array([[1,2,3],[6,5,4]]);
$b = $mo->la()->reduceMean($a,1);
## b => [2,5]
$b = $mo->la()->reduceMean($a,0);
## b => [3.5, 3.5, 3.5]
$a = $mo->array([
    [[1,2],[5,6]],
    [[7,8],[3,4]]]);
$b = $mo->la()->reduceSum($a,1);
echo $mo->toString($b)."\n";
## b => [[3,4],[5,6]]
```

### im2col
```php
public function im2col(
    NDArray $images,
    array $filterSize=null,
    array $strides=null,
    bool $padding=null,
    bool $channels_first=null,
    array $dilation_rate=null,
    bool $cols_channels_first=null,
    NDArray $cols=null
    ) : NDArray
```
Convert image data to cols format.

Arguments
- **images**: Batch set of 1D or 2D or 3D data with channels.
    - The 1D data must be 3D NDArray. The 2D data must be 4D NDArray. The 3D data must be 5D NDArray.
- **filterSize**: convolution filter size.
    - Integer list that matches the input data.
- **strides**: strides size.
    - Integer list that matches the input data.
- **padding**: Whether to padding.
    - When padded, the output image will be the same size as the input image.
- **channels_first**: Input image data format.
    - The input image NDArray is whether the channel is the first axes.
    - If false : images shape [batchs,image_width,channels]
    - If true : images shape [batchs,channels,image_width]
- **dilation_rate**: dilation rate size.
    - Integer list that matches the input data.
- **cols_channels_first**: Output image data format.
    - The output cols NDArray is whether the channel is before the filters.
    - If false : cols shape [batches,image_width,filter_size,channels]. Used in convolution.
    - If true : cols shape [batches,image_width,channels,filter_size]. Used in pooling.
- **cols**: Output cols data.
    - Converted output.


Result
- Same instance as Matrix Cols.

Examples

```php
$batches = 8;
$channels = 3;
$images = $mo->ones([$batches,28,28,$channels]);
$cols = $la->im2col(
    $images,
    $filterSize=[4,4],
    $strides=[1,1],
    $padding=false,
    $channels_first=false,
    $dilation_rate=[1,1],
    $cols_channels_first=false
);
## cols->shape() => [8,25,25,4,4,3]
```

### col2im
```php
public function col2im(
    NDArray $cols,
    NDArray $images,
    array $filterSize=null,
    array $strides=null,
    bool $padding=null,
    bool $channels_first=null,
    array $dilation_rate=null,
    bool $cols_channels_first=null
    ) : NDArray
```
Convert cols format to image data.

Arguments
- **cols**: Input cols data.
    - Converted output.
- **images**: Ouput batch set of 1D or 2D or 3D data with channels.
    - The 1D data must be 3D NDArray. The 2D data must be 4D NDArray. The 3D data must be 5D NDArray.
- **filterSize**: convolution filter size.
    - Integer list that matches the input data.
- **strides**: strides size.
    - Integer list that matches the input data.
- **padding**: Whether to padding.
    - When padded, the output image will be the same size as the input image.
- **channels_first**: Input image data format.
    - The output image NDArray is whether the channel is the first axes.
- **dilation_rate**: dilation rate size.
    - Integer list that matches the input data.
- **cols_channels_first**: Output image data format.
    - The input cols NDArray is whether the channel is the first axes.


Result
- Same instance as Matrix Cols.

Examples

```php
$batches = 8;
$channels = 3;
$cols = $mo->ones([$batches,25,25,4,4,$channels]);
$images = $mo->ones([$batches,28,28,$channels]);
$la->col2im(
    $cols,
    $images,
    $filterSize=[4,4],
    $strides=[1,1],
    $padding=false,
    $channels_first=false,
    $dilation_rate=[1,1],
    $cols_channels_first=false
);
```

### randomUniform
```php
public function randomUniform(
    array $shape,
    int|float $low,
    int|float $high,
    ?int $dtype=null,
    ?int $seed=null,
    ?NDArray $X=null) : NDArray
```
Generate random numbers.

Arguments
- **shape**: Output shape.
    - Integer list.
- **low**: lower value.
    - float value.
- **high**: higher value.
    - float value.
- **dtype**: NDArray data type.
    - Constant of NDArray data type.
- **seed**: seed for randomize.
- **output**: output.
    - The output image NDArray is whether the channel is the first axes.

Result
- Same instance as Matrix Cols.

Examples

```php
$x = $mo->la()->randomUniform(
    [2,2],
    0.0, 1.0
);
```

### randomNormal
```php
public function randomNormal(
    array $shape,
    float $mean,
    float $scale,
    ?int $dtype=null,
    ?int $seed=null,
    ?NDArray $X=null) : NDArray
```
Generate dormal distribution random numbers.

Arguments
- **shape**: Output shape.
    - Integer list.
- **mean**: mean of values.
    - float value.
- **scale**: scale of values.
    - float value.
- **dtype**: NDArray data type.
    - Constant of NDArray data type.
- **seed**: seed for randomize.
- **output**: output.
    - The output image NDArray is whether the channel is the first axes.

Result
- Same instance as Matrix output.

Examples

```php
$x = $mo->la()->randomNormal(
    [2,2],
    0.0, 1.0
);
```

### randomSequence
```php
public function randomSequence(
    int $base,
    ?int $size=null,
    ?int $seed=null,
    ?int $dtype=null,
    ?NDArray $output=null,
    ) : NDArray
```
Randomly selected from the population.
Returns a uniquely selected value from a population of sequential integers.

Arguments
- **base**: Population size.
    - Integer.
- **size**: Data size to generate.
    - If omitted, it is the same size as the population.
- **seed**: seed for randomize.
- **dtype**: NDArray data type.
- **output**: output.

Result
- output Matrix.

Examples

```php
$x = $mo->la()->randomSequence(10);
```

### bandpart
```php
public function bandpart(
    NDArray $A,
    int $lower,
    int $upper,
) : NDArray
```
Sets everything outside the center band of the matrix to zero. The input matrix is ​​not copied, it is rewritten.

Arguments
- **A**: The matrix to be reset to a banded matrix.
    - More than 2D
- **lower**: band of lower. If negative, keep entire lower triangle.
- **upper**: band of upper. If negative, keep entire upper triangle.

Result
- same A object.

Examples

```php
$a = $la->ones($la->alloc([5,5]));
$la->bandpart($a,-1,0);
## A = [[1,0,0,0,0],
##      [1,1,0,0,0],
##      [1,1,1,0,0],
##      [1,1,1,1,0],
##      [1,1,1,1,1]]
```

### imagecopy
```php
public function imagecopy(
    NDArray $A,
    NDArray $B=null,
    bool $channels_first=null,
    int $heightShift=null,
    int $widthShift=null,
    bool $verticalFlip=null,
    bool $horizontalFlip=null
    ) : NDArray
```
Copy 2D image data with various conversions

Arguments
- **A**: Source 2D image data.
    - 3D NDArray. [h,w,c] or [c,h,w]
- **B**: Destination.
    - Default is allocated output.
    - Same shape as A.
- **channels_first**: data format.
    - Default false,
    - If false, the format is channels_last [h,w,c].
    - If true, the format is channels_first [c,h,w].
- **heightShift**: Up and down shift range.
- **widthShift**: Left and right shift range.
- **verticalFlip**: Upside down.
- **horizontalFlip**: Left-right reversal.

Result
- same B object.

Examples

```php
$A = $mo->array([
    [1,2,3],
    [4,5,6],
    [7,8,9]
])->reshape([3,3,1]);
$B = $mo->la()->imagecopy($A,null,null,null,
    $heightShift=null,$widthShift=null,$verticalFlip=true)->reshape([3,3]);
## B = [[3,2,1],
##      [6,5,4],
##      [9,8,7]]
```


### searchsorted
```php
public function searchsorted(
    NDArray $A,
    NDArray $X,
    ?bool $right=null,
    ?int $dtype=null,
    ?NDArray $Y=null
    ) : NDArray
```
Searches for where a value would go in a sorted sequence.

It compares the value of argument X in the sequence of argument A, and outputs the position where X does not exceed the value of A.

Arguments
- **A**: A sorted one-dimensional array containing the sequences to be searched for, or a batch of such arrays.
    - 1D or 2D
- **X**: A sorted sequence of search values, or the search values ​​for each batch if A is 2D.
- **right**: Search from the right.
- **dtype**: The data type of the output index array. Default is int32.
- **Y***: The index array where the value was found.

Result
- same A object.

Examples

```php
$A = $mo->array([0.1, 0.3, 0.5, 0.7, 0.9]);
$X = $mo->array([0.0, 0.5, 1.0]);
$Y = $la->searchsorted($A,$X);
# Y=[0,2,5],

$A = $mo->array([
    [1,   3,  5,   7,   9],
    [1,   2,  3,   4,   5],
    [0, 100, 20, 300, 400]
]);
$X = $mo->array([
    0,
    5,
    10
]);
$Y = $la->searchsorted($A,$X);
# Y=[
#   0,
#   4,
#   1
# ],

```

### cumsum
```php
public function cumsum(
    NDArray $inputs,
    ?int $axis=null,
    ?bool $exclusive=null,
    ?bool $reverse=null,
    ?NDArray $outputs=null
    ) : NDArray
```
Compute the cumulative sum of the tensor x along axis.

Arguments
- **inputs**: source data.
- **axis**: Must be in the range (-rank(x), rank(x)). Default is zero.
- **exclusive**: If true, perform exclusive cumsum.
- **reverse**: If true, reverse output
- **outputs***: output array

Result
- same outputs object.

Examples

```php
$X = $mo->array([1,2,1,2]);
$Y = $la->cumsum($X);
# outputs=[1,3,4,6],

$X = $mo->array([1,2,1,2]);
$Y = $la->cumsum($X,exclusive:true);
# outputs=[0,1,3,4],

$X = $mo->array([1,2,1,2]);
$Y = $la->cumsum($X,reverse:true);
# outputs=[6,5,3,2],

$X = $la->array([
    [1,2,3,4],
    [5,6,7,8],
]);
$Y = $la->cumsum($X,axis:1);
# Y= [
#  [1,3,6,10],
#  [5,11,18,26]
# ]
```

### nan2num
```php
public function nan2num(
    NDArray $X,
    ?float $alpha=null
    ) : NDArray
```
Replace NaN with numbers.

Arguments
- **X**: Arrays containing NAN.
- **alpha**: The replacement number. Default is zero.

Result
- same X object.

Examples

```php
$X = $mo->array([NAN,2,1,NAN]);
$la->cumsum($X);
# X=[0,2,1,0],
```

### isnan
```php
public function isnan(
    NDArray $X
    ) : NDArray
```
Returns which elements are NAN.
Replaces NAN with 1, non-NAN with 0.

Arguments
- **X**: Arrays containing NAN.

Result
- same X object.

Examples

```php
$X = $mo->array([NAN,2,1,NAN, INF]);
$la->cumsum($X);
# X=[1,0,0,1,0],
```

### linspace
```php
public function linspace(
    float $start,
    float $stop,
    int $num,
    ?int $dtype=null
    ) : NDArray
```
Generates uniformly spaced values ​​at regular intervals.

Arguments
- **start**:  First entry in the range.
- **stop**: Last entry in the range.
- **num**: Number of values to generate.
- **dtype**: Data type. Default float32

Result
- output array.

Examples

```php
$X = $la->linspace($start=10,$stop=100,$num=10);
# X = [10,20,30,40,50,60,70,80,90,100],
```

### range
```php
public function range(
    int|float $limit,
    int|float|null $start=null,
    int|float|null $delta=null,
    ?int $dtype=null
    ) : NDArray
```
Creates a sequence of numbers.

Arguments
- **limit**: Last entry in the range.
- **start**: First entry in the range. Defaults to 0
- **delta**: Number that increments start. Defaults to 1.
- **dtype**: Data type. Default float32

Result
- output array.

Examples

```php
$X = $la->range(5);
# X = [0,1,2,3,4],

$X = $la->range(start:1, limit:5);
# X = [1,2,3,4],

$X = $la->range(start:1, limit:10, delta:2);
# X = [1,3,5,7,9],

```

### einsum
```php
public function einsum(
    string $equation,
    NDArray $a,
    NDArray $b,
) : NDArray
```
Multiplication of multidimensional arrays using Einstein contraction notation.

Arguments
- **equation**: a str describing the contraction,.
- **a**: First array in equation.
- **b**: Second array in equation.

Result
- output array.

Examples

```php
// cross product
$a = $mo->array([[1,2],[3,4]]);
$b = $mo->array([[5,6],[7,8]]);
$c = $la->einsum('ik,kj->ij',$a,$b);
# c = [
#     [19,22],
#     [43,50]
# ]
```

### einsum4p1
```php
public function einsum4p1(
    string $equation,
    NDArray $a,
    NDArray $b,
    ?NDArray $c=null,
) : NDArray
```
Speeding up einsum by limiting the dimensions of the array to 4+1 equations.

Arguments
- **equation**: a str describing the contraction,.
- **a**: First array in equation.
- **b**: Second array in equation.
- **c**: output

Result
- same output array object.

Examples

```php
// cross product
$a = $mo->array([[1,2],[3,4]]);
$b = $mo->array([[5,6],[7,8]]);
$c = $la->einsum4p1('ik,kj->ij',$a,$b);
# c = [
#     [19,22],
#     [43,50]
# ]
```

### masking
```php
public function masking(
    NDArray $mask,
    NDArray $data,
    ?int $batchDims=null,
    ?int $axis=null,
    ?float $fill=null,
    ?int $mode=null,
    ) : NDArray
```
Masks an array with the specified boolean array.

Arguments
- **mask**: Boolean array. The value of true will remain unchanged, and 0 or the value specified by fill will be written to false locations.
- **data**: Input data array.
- **batchDims**: Interprets input array dimensions 0 through the specified dimension as the batching dimensions. default is zero.
- **axis**: Masks the input array starting from the specified dimension. The skipped dimensions are broadcast with the mask array. default is the same to batchDims.
- **fill**: The value to set for the masked element. default is zero.
- **mode**: Whether to set or add the fill value. set=0, add=1. default is set.

Result
- same data array object.

Examples

```php
# X:(2,3)
# A:(2,3)
$X = $la->array([[true,false,true],[false,true,false]], dtype:NDArray::bool);
$A = $la->array([[1,10,100],[-1,-10,-100]]);
$la->masking($X,$A);
# A=[[1, 0,100],[0,-10, 0]]

// broadcast to details
// X:(2,3  )
// A:(2,3,4)
// outer:(2,3),bro:(4),inner:(),bro2:()
$X = $la->array([
    [true,false,true],
    [false,true,false]
], dtype:NDArray::bool);
$A = $la->array([
    [[1,11,111,1111],[2,12,122,1222],[-3,13,133,1333]],
    [[1,21,121,1211],[2,22,222,2222],[-3,23,233,2333]]
]);
$la->masking($X,$A,batchDims:$X->ndim(),axis:$A->ndim());
# A = [
#     [[1,11,111,1111],[0, 0,  0,   0],[-3,13,133,1333]],
#     [[0, 0,  0,   0],[2,22,222,2222],[0, 0,  0,   0]]
# ]

# broadcast to rows (implicit batchDims:0)
# X:(  2,3)
# A:(4,2,3)
# outer:(),bro:(4),inner:(2,3),bro2:()
$X = $la->array([[true,false,true],[false,true,false]],dtype:NDArray::bool);
$A = $la->array([
    [[1,11,111],[2,12,112]],
    [[1,21,211],[2,22,222]],
    [[1,31,311],[2,32,322]],
    [[1,41,411],[2,42,422]],
]);
$la->masking($X,$A,axis:1);
# A=[
#     [[1, 0,111],[0,12,  0]],
#     [[1, 0,211],[0,22,  0]],
#     [[1, 0,311],[0,32,  0]],
#     [[1, 0,411],[0,42,  0]],
# ]

```
