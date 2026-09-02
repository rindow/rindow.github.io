---
layout: document
title: "Rindow mathematics libraries"
meta_description: "An environment for vector operations suitable for scientific calculation and machine learning is provided on PHP. It also provides a C library that is optimal for vector operations."
next_section: matrix/matrix
---

## Overview
This project provides a mathematics library for PHP.

Many scientific computations and machine learning tasks use vector operations.  
However, PHP functions support only scalar operations, and PHP arrays are not well-suited for vector operations.

Therefore, the fundamental idea of this project is to define an appropriate array object.  
Everything for vector operations is built on top of this.


## Features:
- Defines a common array object interface, **"NDArray"**.
- Provides a flexible matrix computation library.
- Links with external mathematical libraries to accelerate matrix operations.
- Utilizes GPUs to speed up matrix calculations.
- Offers a library for visualizing mathematical data.
- Modularized from higher to lower layers for flexible combinations.


## Libraries
The project is divided into seven libraries:

- [**Rindow Math Matrix**](matrix/matrix.html): NDArray and array operations  
- [**Rindow Math Plot**](plot/overviewplot.html): Visualization of mathematical data  
- [**Rindow Math Buffer FFI**](openblas/overviewopenblas.html): Buffer enabling NDArray access via C language interface  
- [**Rindow Matlib FFI**](openblas/overviewopenblas.html): C language interface and high-speed computation  
- [**Rindow OpenBLAS FFI**](openblas/overviewopenblas.html): C language interface for BLAS functions and high-speed computation  
- [**Rindow OpenCL FFI**](acceleration/opencl.html#rindow-opencl-ffi): Supports GPU acceleration  
- [**Rindow CLBlast FFI**](acceleration/opencl.html#rindow-clblast-ffi): GPU acceleration for BLAS functions

