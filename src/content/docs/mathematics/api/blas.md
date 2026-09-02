---
layout: document
title: "Blas"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/buffer
next_section: api/math
---
- **namespace**: Rindow\\OpenBLAS\\FFI
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
Call the cblas_sscal, cblas_dscal, cblas_cscal, cblas_zscal

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
Call the cblas_saxpy, cblas_daxpy, cblas_caxpy, cblas_zaxpy

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
Call the cblas_sdot, cblas_ddot

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

### dotu
```php
public function dotu(
    int $n,
    BufferInterface $X, int $offsetX, int $incX,
    BufferInterface $Y, int $offsetY, int $incY ) : object
```
Call the cblas_cdotu, cblas_zdotu

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

### dotc
```php
public function dotc(
    int $n,
    BufferInterface $X, int $offsetX, int $incX,
    BufferInterface $Y, int $offsetY, int $incY ) : object
```
Call the cblas_cdotc, cblas_zdotc

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
Call the cblas_asum, cblas_asum, cblas_scasum, cblas_dzasum

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
Call the cblas_isamax, cblas_idamax, cblas_icamax, cblas_izamax

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
Call the cblas_isamin, cblas_idamin, cblas_icamin, cblas_izamin

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
Call the cblas_scopy, or cblas_dcopy, cblas_ccopy, cblas_zcopy, memcpy

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer Y.
- **incY**: Incremental Y

### nrm2
```php
public function nrm2(
    int $n,
    Buffer $X, int $offsetX, int $incX
    ) : float
```
Call the cblas_snrm2, cblas_dnrm2, cblas_scnrm2, cblas_dznrm2

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X


### rotg
```php
public function rotg(
    Buffer $A, int $offsetA,
    Buffer $B, int $offsetB,
    Buffer $C, int $offsetC,
    Buffer $S, int $offsetS
    ) : void
```
Call the cblas_srotg, cblas_drotg

Arguments
- **A**: Buffer A.
- **offsetA**: Offset buffer A.
- **B**: Buffer B.
- **offsetB**: Offset buffer B.
- **C**: Buffer C.
- **offsetC**: Offset buffer C.
- **S**: Buffer S.
- **offsetS**: Offset buffer S.

### rot
```php
public function rot(
    int $n,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $incY,
    Buffer $C, int $offsetC,
    Buffer $S, int $offsetS
    ) : void
```
Call the cblas_srot, cblas_drot

Arguments
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer Y.
- **incY**: Incremental Y
- **C**: Buffer C.
- **offsetC**: Offset buffer C.
- **S**: Buffer S.
- **offsetS**: Offset buffer S.

### rotm
```php
public function rotm(
    int $N,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $incY,
    Buffer $P, int $offsetP
    ) : void
```
Call the cblas_srot, cblas_drot

Arguments
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer Y.
- **incY**: Incremental Y
- **P**: Buffer P.
- **offsetP**: Offset buffer P.

### rotmg
```php
public function rotmg(
    Buffer $D1, int $offsetD1,
    Buffer $D2, int $offsetD2,
    Buffer $B1, int $offsetB1,
    Buffer $B2, int $offsetB2,
    Buffer $P, int $offsetP
    ) : void
```
Call the cblas_srotmg, cblas_drotmg

Arguments
- **D1**: Buffer D1.
- **offsetD1**: Offset buffer D1.
- **D2**: Buffer D2.
- **offsetD2**: Offset buffer D2.
- **B1**: Buffer B1.
- **offsetB1**: Offset buffer B1.
- **B2**: Buffer B2.
- **offsetB2**: Offset buffer B2.
- **P**: Buffer P.
- **offsetP**: Offset buffer P.


### swap
```php
public function swap(
    int $n,
    Buffer $X, int $offsetX, int $incX,
    Buffer $Y, int $offsetY, int $incY ) : void
```
Call the cblas_scopy, cblas_dcopy, cblas_cswap, cblas_zswap

Arguments
- **n**: Number of array elements.
- **X**: Buffer X.
- **offsetX**: Offset buffer X.
- **incX**: Incremental X
- **Y**: Buffer Y.
- **offsetY**: Offset buffer Y.
- **incY**: Incremental Y


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
Call the cblas_sgemv, cblas_dgemv, cblas_cgemv, cblas_zgemv

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
Call the cblas_sgemm, cblas_dgemm, cblas_cgemm, cblas_zgemm

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


### symm
```php
public function symm(
    int $order,
    int $side,
    int $uplo,
    int $m,
    int $n,
    float|object $alpha,
    Buffer $A, int $offsetA, int $ldA,
    Buffer $B, int $offsetB, int $ldB,
    float|object $beta,
    Buffer $C, int $offsetC, int $ldC ) : void
```
Call the cblas_ssymm, cblas_dsymm, cblas_csymm, cblas_zsymm

Arguments
- **order**: Matrix order.
    - order code in Interop\\Polite\\Math\\BLAS.
- **side**: side.
    - Left/Right code in Interop\\Polite\\Math\\BLAS.
- **uplo**: Up or Low.
    - Up/Low code in Interop\\Polite\\Math\\BLAS.
- **m**: Number of array elements.
- **n**: Number of array elements.
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

### syrk
```php
public function syrk(
    int $order,
    int $uplo,
    int $trans,
    int $n,
    int $k,
    float|object $alpha,
    Buffer $A, int $offsetA, int $ldA,
    float|object $beta,
    Buffer $C, int $offsetC, int $ldC ) : void
```
Call the cblas_ssyrk, cblas_dsyrk, cblas_csyrk, cblas_zsyrk

Arguments
- **order**: Matrix order.
    - order code in Interop\\Polite\\Math\\BLAS.
- **uplo**: Up or Low.
    - Up/Low code in Interop\\Polite\\Math\\BLAS.
- **trans**: transpose.
    - transpose code in Interop\\Polite\\Math\\BLAS.
- **n**: Number of array elements.
- **k**: Number of array elements.
- **alpha**: scale.
- **A**: Buffer B.
- **offsetA**: Offset buffer A.
- **ldA**: leading Dimension A.
- **beta**: bias.
- **C**: Buffer C.
- **offsetC**: Offset buffer C.
- **ldC**: leading Dimension C.


### syr2k
```php
public function syr2k(
    int $order,
    int $uplo,
    int $trans,
    int $n,
    int $k,
    float|object $alpha,
    Buffer $A, int $offsetA, int $ldA,
    Buffer $B, int $offsetB, int $ldB,
    float|object $beta,
    Buffer $C, int $offsetC, int $ldC ) : void
```
Call the cblas_ssyr2k, cblas_dsyr2k, cblas_csyr2k, cblas_zsyr2k

Arguments
- **order**: Matrix order.
    - order code in Interop\\Polite\\Math\\BLAS.
- **uplo**: Up or Low.
    - Up/Low code in Interop\\Polite\\Math\\BLAS.
- **trans**: transpose.
    - transpose code in Interop\\Polite\\Math\\BLAS.
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

### trmm
```php
public function trmm(
    int $order,
    int $side,
    int $uplo,
    int $trans,
    int $diag,
    int $m,
    int $n,
    float|object $alpha,
    Buffer $A, int $offsetA, int $ldA,
    Buffer $B, int $offsetB, int $ldB) : void
```
Call the cblas_strmm, cblas_dtrmm, cblas_ctrmm, cblas_ztrmm

Arguments
- **order**: Matrix order.
    - order code in Interop\\Polite\\Math\\BLAS.
- **side**: side.
    - Left/Right code in Interop\\Polite\\Math\\BLAS.
- **uplo**: Up or Low.
    - Up/Low code in Interop\\Polite\\Math\\BLAS.
- **trans**: transpose.
    - transpose code in Interop\\Polite\\Math\\BLAS.
- **diag**: Unit or NonUnit.
    - diag code in Interop\\Polite\\Math\\BLAS.
- **m**: Number of array elements.
- **n**: Number of array elements.
- **alpha**: scale.
- **A**: Buffer B.
- **offsetA**: Offset buffer A.
- **ldA**: leading Dimension A.
- **B**: Buffer B.
- **offsetB**: Offset buffer B.
- **ldB**: leading Dimension B.


### trmm
```php
public function trsm(
    int $order,
    int $side,
    int $uplo,
    int $trans,
    int $diag,
    int $m,
    int $n,
    float|object $alpha,
    Buffer $A, int $offsetA, int $ldA,
    Buffer $B, int $offsetB, int $ldB) : void
```
Call the cblas_strsm, cblas_dtrsm, cblas_ctrsm, cblas_ztrsm

Arguments
- **order**: Matrix order.
    - order code in Interop\\Polite\\Math\\BLAS.
- **side**: side.
    - Left/Right code in Interop\\Polite\\Math\\BLAS.
- **uplo**: Up or Low.
    - Up/Low code in Interop\\Polite\\Math\\BLAS.
- **trans**: transpose.
    - transpose code in Interop\\Polite\\Math\\BLAS.
- **diag**: Unit or NonUnit.
    - diag code in Interop\\Polite\\Math\\BLAS.
- **m**: Number of array elements.
- **n**: Number of array elements.
- **alpha**: scale.
- **A**: Buffer B.
- **offsetA**: Offset buffer A.
- **ldA**: leading Dimension A.
- **B**: Buffer B.
- **offsetB**: Offset buffer B.
- **ldB**: leading Dimension B.

### omatcopy
```php
public function omatcopy(
    int $order,
    int $trans,
    int $m,
    int $n,
    float|object $alpha,
    Buffer $A, int $offsetA, int $ldA,
    Buffer $B, int $offsetB, int $ldB,
) : void
```
Call the cblas_sgemm, cblas_dgemm, cblas_cgemm, cblas_zgemm

Arguments
- **order**: Matrix order.
    - order code in Interop\\Polite\\Math\\BLAS.
- **trans**: transpose.
    - transpose code in Interop\\Polite\\Math\\BLAS.
- **m**: Number of array elements.
- **n**: Number of array elements.
- **alpha**: scale.
- **A**: Buffer B.
- **offsetA**: Offset buffer A.
- **ldA**: leading Dimension A.
- **B**: Buffer B.
- **offsetB**: Offset buffer B.
- **ldB**: leading Dimension B.

