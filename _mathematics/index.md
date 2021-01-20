---
layout: document
title: "Rindow mathematics libraries"
meta_description: "An environment for vector operations suitable for scientific calculation and machine learning is provided on PHP. It also provides a PHP array extension that is optimal for vector operations."
next_section: matrix/matrix
---

Overview
--------
A project to provide a mathematical libraries for PHP.

Most scientific calculations and machine learning use vector operations,
but PHP functions are only scalar operations.
Also, PHP Array is not suitable for vector operation.

Therefore, the basic policy is to define an Array object suitable
for vector operation and build everything on it.

It has the following features.

- Define a common Array object interface "NDArray".
- Provides a flexible matrix operation library.
- Provide C language interface of Array object by PHP extension
- High-speed matrix operation provided by PHP extension
- Provides a visualization library for mathematical data

Libraries
---------
Divided into five libraries

- [**Rindow Math Matrix**](matrix/matrix.html): NDArray and array operations
- [**Rindow Math Plot**](plot/overviewplot.html): Visualization mathematical data
- [**Rindow OpenBLAS extension**](openblas/overviewopenblas.html): C language interface and High-speed operation
- [**Rindow OpenCL extension**](https://github.com/rindow/rindow-opencl/releases): GPU Support
- [**Rindow CLBlast extension**](https://github.com/rindow/rindow-clblast/releases): GPU Support
