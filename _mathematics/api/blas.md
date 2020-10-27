---
layout: document
title: "Blas"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/buffer
next_section: api/math
---
- **namespace**: Rindow\\OpenBLAS
- **classname**: Blas

Call OpenBLAS functions.

Methods
-------
{:.no_toc}
* Table of contents
{:toc}

### constructor
```php
public function __construct();
```

### getNumThreads
```php
public function getNumThreads() : int
```
Call the openblas_get_num_threads()

Return
- number of threads

### getNumProcs
```php
public function getNumProcs() : int
```
Call the openblas_get_num_procs()

Return
- number of process

### getConfig
```php
public function getConfig() : string
```
Call the openblas_get_config()

Return
- config string

### getCorename
```php
public function getCorename() : string
```
Call the openblas_get_corename()

Return
- cpu core name

### scal
```php
public function scal(
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX) : void
```
Call the cblas_sscal() or cblas_dscal()

Arguments
- **n**: Number of array elements.
- **alpha**: scale.
- **X**: Buffer X.
- **offsetX**: Offset buffer.
- **incX**: Incremental X

### axpy
```php
public function axpy(
    int $n,
    float $alpha,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $incY ) : void
```
Call the cblas_saxpy() or cblas_daxpy()

Arguments
- **n**: Number of array elements.
- **alpha**: scale.
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer Y.
- **incY**: Incremental Y

### dot
```php
public function dot(
    int $n,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $incY ) : float
```
Call the cblas_sdot() or cblas_ddot()

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer Y.
- **incY**: Incremental Y

Return
- result dot.

### asum
```php
public function asum(
    int $n,
    Buffer $X, int $offsetX, int $incX ) : float
```
Call the cblas_asum() or cblas_asum()

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X

Return
- result asum.

### iamax
```php
public function iamax(
    int $n,
    Buffer $X, int $offsetX, int $incX ) : int
```
Call the cblas_isamax() or cblas_idamax()

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X

Return
- result iamax.

### iamin
```php
public function iamin(
    int $n,
    Buffer $X, int $offsetX, int $incX ) : int
```
Call the cblas_isamin() or cblas_idamin()

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X

Return
- result iamin.

### copy
```php
public function copy(
    int $n,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $incY ) : void
```
Call the cblas_scopy() or cblas_dcopy() or memcpy()

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X

### gemv
```php
public function gemv(
    int $order,
    int $trans,
    int $m,
    int $n,
    float $alpha,
    Buffer $A, int $offsetA, int $ldA,
    Buffer $X, int $offsetX, int $incX,
    float $beta,
    Buffer $Y, int $offsetY, int $incY ) : void
```
Call the cblas_sgemv() or cblas_dgemv()

Arguments
- **order**: Matrix order.
    - order code in Interop\\Polite\\Math\\BLAS.
- **trans**: transpose.
    - transpose code in Interop\\Polite\\Math\\BLAS.
- **m**: Number of array elements.
- **n**: Number of array elements.
- **alpha**: scale.
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X
- **beta**: bias.
- **Y**: Buffer Y.
- **offsetY**: Offset buffer Y.
- **incY**: Incremental Y

### gemm
```php
public function gemm(
    int $order,
    int $transA,
    int $transB,
    int $m,
    int $n,
    int $k,
    float $alpha,
    Buffer $A, int $offsetA, int $ldA,
    Buffer $B, int $offsetB, int $ldB,
    float $beta,
    Buffer $C, int $offsetC, int $ldC ) : void
```
Call the cblas_sgemm() or cblas_dgemm()

Arguments
- **order**: Matrix order.
    - order code in Interop\\Polite\\Math\\BLAS.
- **transA**: transpose A.
    - transpose code in Interop\\Polite\\Math\\BLAS.
- **transB**: transpose B.
    - transpose code in Interop\\Polite\\Math\\BLAS.
- **m**: Number of array elements.
- **n**: Number of array elements.
- **k**: Number of array elements.
- **alpha**: scale.
- **A**: Buffer B.
- **offsetA**: Offset buffer A.
- **ldA**: leading Dimension A.
- **B**: Buffer B.
- **offsetB**: Offset buffer B.
- **ldB**: leading Dimension B.
- **beta**: bias.
- **C**: Buffer C.
- **offsetC**: Offset buffer C.
- **ldC**: leading Dimension C.
