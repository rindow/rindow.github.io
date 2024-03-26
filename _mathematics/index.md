---
layout: document
title: "Rindow mathematics libraries"
meta_description: "An environment for vector operations suitable for scientific calculation and machine learning is provided on PHP. It also provides a C library that is optimal for vector operations."
next_section: matrix/matrix
---

Overview
--------
A project that provides a math library for PHP.

Most scientific computing and machine learning use vector operations.
However, PHP functions are just scalar operations.
Also, PHP Arrays are not suitable for vector operations.

Therefore, the basic idea is to define a suitable Array object.
Build everything on top of that for vector operations.

It has the following characteristics.

- Defines a common Array object interface "NDArray".
- Provides a flexible matrix calculation library.
- Link external math libraries to speed up matrix operations.
- Utilize GPU to speed up matrix operations.
- Provides a mathematical data visualization library

Libraries
---------
Divided into 6 libraries

- [**Rindow Math Matrix**](matrix/matrix.html): NDArray and array operations
- [**Rindow Math Plot**](plot/overviewplot.html): Visualization mathematical data
- [**Rindow OpenBLAS FFI**](openblas/overviewopenblas.html): C language interface and High-speed operation
- [**Rindow Matlib FFI**](openblas/overviewopenblas.html): C language interface and High-speed operation
- [**Rindow OpenCL FFI**](acceleration/opencl.html#rindow-opencl-ffi): Supports GPU acceleration
- [**Rindow CLBlast FFI**](acceleration/opencl.html#rindow-clblast-ffi): Supports GPU acceleration
