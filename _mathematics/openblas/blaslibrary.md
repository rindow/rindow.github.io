---
layout: document
title: "BLAS libray"
upper_section: index
previous_section: openblas/arrayobjects
next_section: openblas/mathlibrary
---
The Rindow\\OpenBLAS\\FFI\\Blas class makes OpenBLAS available in php.

What is BLAS
------------
"BLAS" is the Basic Linear Algebra Subprograms library.
This is a routine that provides standard building blocks for performing basic vector and matrix operations.
BLAS is often used to develop high-quality linear algebra software because it is efficient, portable, and widely available.

OpenBLAS is a typical library with a C language interface that implements BLAS.
For details, please see the [OpenBLAS website](https://www.openblas.net/).

How it is implemented
---------------------
The BLAS library provides a very large number of functions, but this Rindow OpenBLAS FFI only provides very commonly used functions.

The memory area is received via the Buffer object and passed to the OpenBLAS library.
The distinction from the c-language interface of OpenBLAS is that it uses a buffer object and an offset to represent the start address of the memory area. This is to minimize the number of copies of the memory area when dealing with multidimensional arrays.

Most importantly, OpenBLAS library only supports 32-bit and 64-bit floating point.
Integers cannot be calculated.

Currently the following functions are supported:

Implemented Methods
-------------------
Although the BLAS library provides a large number of functions, this Rindow OpenBLAS FFI leaves a few unimplemented functions. Starting from version 2.0, complex numbers are now supported.

Memory space is received via a Buffer object and passed to the OpenBLAS library.
OpenBLAS differs from the C language interface in that it uses a buffer object and an offset to represent the starting address of memory space. This is to minimize the number of memory copies when working with multidimensional arrays.

Most importantly, the OpenBLAS library only supports 32-bit and 64-bit floating point.
Integers cannot be calculated.

Currently the following features are supported:

- scal
- axpy
- dot
- dotu
- dotc
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
- omatcopy



Usage on PHP
------------
Here is the sample code.

```php
use Interop\Polite\Math\Matrix\NDArray;
$bufferFactory = new Rindow\Math\Buffer\FFI\BufferFactory()
$openblasFactory = new Rindow\OpenBLAS\FFI\OpenBLASFactory()
$x = $bufferFactory->Buffer(3,NDArray::float32);
$blas = $openblasFactory->Blas();
$x[0] = 1.0;
$x[1] = 1.5;
$x[2] = 2.0;
$blas->scal(count($x),$alpha=2.0,$x,$offset=0,$incX=1);
for($i=0;$i<count($x);$i++) {
    echo $x[$i],',';
}
### 2,3,4,
```
