---
layout: document
math: enable
title: "Math"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/blas
---
- **namespace**: Rindow\\OpenBLAS
- **classname**: Math

Mathematics functions library.

Methods
-------
{:.no_toc}
* Table of contents
{:toc}

### constructor
```php
public function __construct();
```

Arguments
- **size**: buffer size.
    - Number of elements in array. (Note that it is not the memory size)
- **dtype**: data type.
    - Specify one of the data types defined in Interop\\Polite\\Math\\Matrix\\NDArray.

### sum
$$
\begin{align*}
f = \sum_{k=0}^n x_k
\end{align*}
$$
```php
public function sum(
    int $n,
    Buffer $X, int $offsetX, int $incX ) : float
```
sum of array element.

Supported deta types
- float32, float64, bool, int8, int16, int32, int64, uint8, uint16, uint32, uint64

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

Return
- result sum

### imax
$$
\begin{align*}
f = \arg \max x_k
\end{align*}
$$
```php
public function imax(
    int $n,
    Buffer $X, int $offsetX, int $incX) : int
```
Index of max value.

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

Return
- result imax

### imin
$$
\begin{align*}
f = \arg \min x_k
\end{align*}
$$
```php
public function imin(
    int $n,
    Buffer $X, int $offsetX, int $incX) : int
```
Index of max value.

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

Return
- result imin

### increment
$$
\begin{align*}
a_{ij} :=  x_j a_{ij}
\end{align*}
$$
```php
public function increment(
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX,
    float $beta) : void
```
increment array.

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **alpha**: scale.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X
- **beta**: bias.

### reciprocal
$$
\begin{align*}
X := \frac{1}{\alpha X + \beta}
\end{align*}
$$
```php
public function reciprocal(
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX,
    float $beta) : void
```
increment array.

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **alpha**: scale.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X
- **beta**: bias.

### maximum
$$
\begin{align*}
x_k :=  \left \{ \begin{array}{l} x_k \hspace{5mm} (x_k > \alpha) \\ \alpha \hspace{5mm} (x_k \leqq \alpha) \end{array} \right.
\end{align*}
$$
```php
public function maximum(
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX) : void
```
maximum values in comparison with the threshold

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **alpha**: scale.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### minimum
$$
\begin{align*}
x_k :=  \left \{ \begin{array}{l} x_k \hspace{5mm} (x_k < \alpha) \\ \alpha \hspace{5mm} (x_k \geqq \alpha) \end{array} \right.
\end{align*}
$$
```php
public function minimum(
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX) : void
```
minimum values in comparison with the threshold

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **alpha**: scale.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### greater
$$
\begin{align*}
x_k :=  \left \{ \begin{array}{l} 1 \hspace{5mm} (x_k > \alpha) \\ 0 \hspace{5mm} (x_k \leqq \alpha) \end{array} \right.
\end{align*}
$$
```php
public function greater(
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX) : void
```
Whether it is greater compared to the threshold.

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **alpha**: scale.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### less
$$
\begin{align*}
x_k :=  \left \{ \begin{array}{l} 1 \hspace{5mm} (x_k < \alpha) \\ 0 \hspace{5mm} (x_k \geqq \alpha) \end{array} \right.
\end{align*}
$$
```php
public function less(
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX) : void
```
Whether it is less compared to the threshold.

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **alpha**: scale.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### multiply
$$
\begin{align*}
a_{ij} :=  x_j a_{ij}
\end{align*}
$$
```php
public function multiply(
    bool $trans,
    int $m,
    int $n,
    Buffer $X, int $offsetX, int $incX,
    Buffer $A, int $offsetA, int $ldA ) : void
```
broadcast and multiply

Supported deta types
- float32, float64

Arguments
- **trans**: transpose.
- **m**: Number of array elements.
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X
- **A**: Buffer A.
- **offsetA**: Offset buffer.
- **ldA**: leading Dimension A.

### add
$$
\begin{align*}
a_{ij} := \alpha x_j + a_{ij}
\end{align*}
$$
```php
public function add(
    int $trans,
    int $m,
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX,
    Buffer $A, int $offsetA, int $ldA ) : void
```
broadcast and add

Supported deta types
- float32, float64

Arguments
- **trans**: transpose.
- **m**: Number of array elements.
- **n**: Number of array elements.
- **alpha**: scale.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X
- **A**: Buffer A.
- **offsetA**: Offset buffer.
- **ldA**: leading Dimension A.

### duplicate
$$
\begin{align*}
a_{ij} :=  x_j
\end{align*}
$$
```php
public function duplicate(
    bool $trans,
    int $m,
    int $n,
    Buffer $X, int $offsetX, int $incX,
    Buffer $A, int $offsetA, int $ldA ) : void
```
broadcast and copy

Supported deta types
- float32, float64

Arguments
- **trans**: transpose.
- **m**: Number of array elements.
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X
- **A**: Buffer A.
- **offsetA**: Offset buffer.
- **ldA**: leading Dimension A.

### square
$$
\begin{align*}
x_k := (x_k)^2
\end{align*}
$$
```php
public function square(
    int $n,
    Buffer $X, int $offsetX, int $incX) : void
```
Square the elements

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### sqrt
$$
\begin{align*}
x_k := \sqrt{x_k}
\end{align*}
$$
```php
public function sqrt(
    int $n,
    Buffer $X, int $offsetX, int $incX) : void
```
Square root the elements

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### rsqrt
$$
\begin{align*}
x_k := \frac{1}{\alpha \sqrt{x_k} + \beta}
\end{align*}
$$
```php
public function rsqrt(
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX,
    float $beta) : void
```
Square root the elements

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### pow
$$
\begin{align*}
x_k := (x_k)^\alpha
\end{align*}
$$
```php
public function pow(
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX) : void
```
Power the elements

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **alpha**: Exponentiate.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### exp
$$
\begin{align*}
x_k := e^{x_k}
\end{align*}
$$
```php
public function exp(
    int $n,
    Buffer $X, int $offsetX, int $incX) : void
```
Exponentiate the elements

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### log
$$
\begin{align*}
x_k := \log x_k
\end{align*}
$$
```php
public function log(
    int $n,
    Buffer $X, int $offsetX, int $incX) : void
```
 Logarithm the elements

Supported deta types
- float32, float64

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### zeros
$$
\begin{align*}
X := 0
\end{align*}
$$
```php
public function zeros(
    int $n,
    Buffer $X, int $offsetX, int $incX) : void
```
set zero to elements

Supported deta types
- float32, float64, bool, int8, int16, int32, int64, uint8, uint16, uint32, uint64

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### selectAxis0
$$
\begin{align*}
y_{ij} := a_{xj}
\end{align*}
$$
```php
public function selectAxis0(
    int $m,
    int $n,
    int $k,
    Buffer $A, int $offsetA, int $ldA,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $ldY ) : void
```
Select the element indexed by axis 0.

Supported deta types
- float32, float64, bool, int8, int16, int32, int64, uint8, uint16, uint32, uint64

Arguments
- **m**: Number of array elements.
- **n**: Number of array elements.
- **k**: Number of array elements.
- **A**: Buffer A.
- **offsetA**: Offset buffer.
- **ldA**: leading dimension
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer.
- **ldY**: leading dimension

### selectAxis1
$$
\begin{align*}
y_{ij} := a_{ix}
\end{align*}
$$
```php
public function selectAxis1(
    int $m,
    int $n,
    Buffer $A, int $offsetA, int $ldA,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $incY ) : void
```
Select the element indexed by axis 1.

Supported deta types
- float32, float64, bool, int8, int16, int32, int64, uint8, uint16, uint32, uint64

Arguments
- **m**: Number of array elements.
- **n**: Number of array elements.
- **A**: Buffer A.
- **offsetA**: Offset buffer.
- **ldA**: leading dimension
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer.
- **incY**: Incremental X

### updateAddOnehot
$$
\begin{align*}
y_{ij} :=  \left \{ \begin{array}{l} y_{ij} + a \hspace{5mm} ( x_i = j ) \\ y_{ij} \hspace{5mm} ( x_i \neq j ) \end{array} \right.
\end{align*}
$$
```php
public function updateAddOnehot(
    int $m,
    int $n,
    float $a,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $ldY ) : void
```
Translate one-hot and add it.

Supported deta types
- float32, float64

Arguments
- **m**: Number of array elements.
- **n**: Number of array elements.
- **a**: Incremental value
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer.
- **ldY**: leading dimension

### softmax
$$
\begin{align*}
y_{ij} :=  \left \{ \begin{array}{l} a \hspace{5mm} ( x_i = j ) \\ 0 \hspace{5mm} ( x_i \neq j ) \end{array} \right.
\end{align*}
$$
```php
public function softmax(
    int $m,
    int $n,
    Buffer $A, int $offsetA, int $ldA) : void
```
softmax function.

Supported deta types
- float32, float64

Arguments
- **m**: Number of array elements.
- **n**: Number of array elements.
- **A**: Buffer A.
- **offsetA**: Offset buffer.
- **ldA**: leading dimension

### equal
$$
\begin{align*}
y_i :=  \left \{ \begin{array}{l} 1 \hspace{5mm} ( x_i = y_i ) \\ 0 \hspace{5mm} ( x_i \neq y_i ) \end{array} \right.
\end{align*}
$$
```php
public function equal(
    int $n,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $incY ) : void
```
equal function.

Supported deta types
- float32, float64, bool, int8, int16, int32, int64, uint8, uint16, uint32, uint64

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer.
- **incY**: Incremental Y

### reduceSum
$$
\begin{align*}
x_i = \sum_{j=0}^n a_{ij}
\end{align*}
$$
```php
public function reduceSum(
    bool $trans,
    int $m,
    int $n,
    Buffer $A, int $offsetA, int $ldA,
    Buffer $X, int $offsetX, int $incX ) : void
```
equal function.

Supported deta types
- float32, float64

Arguments
- **trans**: transpose.
- **m**: Number of array elements.
- **n**: Number of array elements.
- **A**: Buffer A.
- **offsetA**: Offset buffer.
- **ldA**: leading dimension
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### astype
$$
\begin{align*}
y_i :=  \left \{ \begin{array}{l} 1 \hspace{5mm} ( x_i = y_i ) \\ 0 \hspace{5mm} ( x_i \neq y_i ) \end{array} \right.
\end{align*}
$$
```php
public function astype(
    int $n,
    int $dtype,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $incY) : void
```
translate data type.

Supported deta types
- float32, float64, bool, int8, int16, int32, int64, uint8, uint16, uint32, uint64

Arguments
- **n**: Number of array elements.
- **dtype**: data type of NDArray.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer.
- **incY**: Incremental Y
