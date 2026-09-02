---
layout: document
title: "BLAS libray"
upper_section: index
previous_section: openblas/arrayobjects
next_section: openblas/mathlibrary
---
## What is BLAS?

"BLAS" stands for Basic Linear Algebra Subprograms.
It is a library that provides standard building blocks for performing basic vector and matrix operations.
BLAS is often used in the development of high-quality linear algebra software because it is efficient, portable, and widely available.

OpenBLAS is a representative library that implements BLAS with a C language interface.
For more details, please refer to the [OpenBLAS website](https://www.openblas.net/).

However, since BLAS has a relatively low-level programming interface, it is difficult to use directly from applications. Therefore, it is often used as a backend for higher-level, application-friendly libraries.
Rindow Math Matrix also utilizes BLAS as a backend for its LinearAlgebra class to achieve high-speed computations.

## How it is implemented in PHP

The `Blas` class in Rindow allows you to use BLAS in PHP.
The following are backend libraries that comply with the BLAS interface:

  * `PhpBLAS` class: Implemented purely in PHP, it can be used in any operating environment without requiring additional installations.
  * `rindow-openblas-ffi` package: Calls OpenBLAS for high-speed computations.
  * `rindow-clblast-ffi` package: Calls CLBlast to perform high-speed computations using the GPU.

> For details on `rindow-clblast-ffi`, please refer to [here](/mathematics/acceleration/mathematics/opencl.html).

These can be called from the LinearAlgebra class depending on the user's environment.
You can also create your own backend library that complies with the BLAS interface and use it with the LinearAlgebra class.

The BLAS library provides a very large number of functions, but this `rindow-openblas-ffi` only provides the most frequently used ones.

Memory regions are received via `Buffer` objects and passed to the OpenBLAS library.
The difference from the OpenBLAS C language interface is the use of a buffer object and an offset to represent the starting address of the memory region. This is to minimize the number of memory copies when dealing with multi-dimensional arrays.
For a detailed explanation of `Buffer`, please refer to [here](/mathematics/openblas/arraybuffer.md).

The most important point to note is that the OpenBLAS library only supports 32-bit and 64-bit floating-point numbers.
Integer calculations are not possible.

Currently, the following functions are supported:

## Implemented Methods

The BLAS library provides many functions, but some functions are not yet implemented in this Rindow OpenBLAS FFI. Complex numbers have been supported since version 2.0.

Memory space is received via `Buffer` objects and passed to the OpenBLAS library.
The difference from the C language interface is the use of a buffer object and an offset to represent the starting address of the memory space. This is to minimize the number of memory copies when dealing with multi-dimensional arrays.

The most important point to note is that BLAS-compatible libraries only support 32-bit and 64-bit floating-point numbers.
For integer calculations, you must use other libraries.

Currently, the following functions are supported:
For detailed specifications of each function, please refer to [netlib.org/blas](https://netlib.org/blas).

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
  - rotm
  - rotmg
  - swap
  - gemv
  - gemm
  - symm
  - syrk
  - syr2k
  - trmm
  - trsm
  - omatcopy

## Differences in Function Specifications

There are two differences in function specifications compared to the original BLAS:

  * Offset Position
  * Data Type

### Offset Position

Instead of passing the address of an array, you pass an object of the Buffer interface and an offset position to the function.
This is because there are cases where you cannot directly specify a physical address, such as with GPU memory. By passing the handle and offset position of allocated GPU memory, it works the same as passing a memory address.

**In the case of OpenBLAS**

```c
void cblas_sscal(
    OPENBLAS_CONST blasint N,
    OPENBLAS_CONST float alpha,
    float *X,
    OPENBLAS_CONST blasint incX
);
```

**In the case of Rindow-OpenBLAS-FFI**

```php
public function scal(
    int $n,
    object|float $alpha,
    Buffer $x,      // Buffer object
    int $offset,    // Offset position
    int $incX,
) : void;
```

### Data Type

In OpenBLAS, the difference in data types is expressed by the function name, for example, `cblas_sscal` and `cblas_dscal`.
However, in Rindow-Math, the data type is included in the Buffer object. The difference in function names due to data types is consolidated into the same name except for some complex number functions. (For complex numbers, the names need to be separated because there are several processing methods.)

**In the case of OpenBLAS**

```c
/** Single-precision floating-point number **/
void cblas_sscal(
    OPENBLAS_CONST blasint N,
    OPENBLAS_CONST float alpha,
    float *X,
    OPENBLAS_CONST blasint incX
);
/** Double-precision floating-point number **/
void cblas_dscal(
    OPENBLAS_CONST blasint N,
    OPENBLAS_CONST double alpha,
    double *X,
    OPENBLAS_CONST blasint incX
);
/** Single-precision complex number **/
void cblas_cscal(
    OPENBLAS_CONST blasint N,
    OPENBLAS_CONST void *alpha,
    void *X,
    OPENBLAS_CONST blasint incX
);
/** Double-precision complex number **/
void cblas_zscal(
    OPENBLAS_CONST blasint N,
    OPENBLAS_CONST void *alpha,
    void *X,
    OPENBLAS_CONST blasint incX
);
```

**In the case of Rindow-OpenBLAS-FFI**

```php
/** Common for single-precision/double-precision floating-point numbers and complex numbers **/
public function scal(
    int $n,
    object|float $alpha,
    Buffer $x,      // Data type information is included in the Buffer object.
    int $offset,
    int $incX,
) : void;
```

## Usage in PHP

The following is a sample code.

```php
use Interop\Polite\Math\Matrix\NDArray;
$bufferFactory = new Rindow\Math\Buffer\FFI\BufferFactory();
$openblasFactory = new Rindow\OpenBLAS\FFI\OpenBLASFactory();
$x = $bufferFactory->Buffer(3, NDArray::float32);
$blas = $openblasFactory->Blas();
$x[0] = 1.0;
$x[1] = 1.5;
$x[2] = 2.0;
$alpha = 2.0;
$offset = 0;
$incX = 1;
$blas->scal(count($x), $alpha, $x, $offset, $incX);
for($i=0; $i<count($x); $i++) {
    echo $x[$i], ',';
}
### 2,3,4,
```
