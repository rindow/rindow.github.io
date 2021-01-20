---
layout: document
title: "BLAS libray"
upper_section: index
previous_section: arrayobjects
next_section: mathlibrary
---
The Rindow\\OpenBLAS\\Blas class makes OpenBLAS available in php.

What is BLAS
------------
"BLAS" is the Basic Linear Algebra Subprograms library.
It is routines that provide standard building blocks for performing basic vector and matrix operations.
Because the BLAS are efficient, portable, and widely available, they are commonly used in the development of high quality linear algebra software.

OpenBLAS is a representative library with a c language interface that implements BLAS.
See the [OpenBLAS website](https://www.openblas.net/) for details.

How it is implemented
---------------------
The BLAS library provides a very large number of functions, but this Linden OpenBLAS extension only provides very commonly used functions.

The memory area is received via the Buffer object and passed to the OpenBLAS library.
The distinction from the c-language interface of OpenBLAS is that it uses a buffer object and an offset to represent the start address of the memory area. This is to minimize the number of copies of the memory area when dealing with multidimensional arrays.

Most importantly, OpenBLAS library only supports 32-bit and 64-bit floating point.
Integers cannot be calculated.

Currently the following functions are supported:

- scal
- axpy
- dot
- asum
- iamax
- iamin
- copy
- nrm2
- rotg
- rot
- swap
- gemv
- gemm
- symm
- syrk
- syr2k
- trmm
- trsm


Usage on PHP
------------
Here is the sample code.

```php
use Interop\Polite\Math\Matrix\NDArray;
$x = new Rindow\OpenBLAS\Buffer(3,NDArray::float32);
$blas = new Rindow\OpenBLAS\Blas();
$x[0] = 1.0;
$x[1] = 1.5;
$x[2] = 2.0;
$blas->scal(count($x),$alpha=2.0,$x,$offset=0,$incX=1);
for($i=0;$i<count($x);$i++) {
    echo $x[$i],',';
}
### 2,3,4,
```
