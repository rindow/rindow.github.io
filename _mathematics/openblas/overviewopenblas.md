---
layout: document
title: "Rindow Matlib and OpenBLAS"
upper_section: index
next_section: openblas/arraybuffer
---

Overview
--------
Rindow-math-matrix can call external libraries written in C language etc. to speed up matrix operations.
You can call OpenBLAS, the most famous linear algebra library, and Rindow-Matlib, which is useful for machine learning.

From the latest version 2, we use PHP's FFI function to call the C language interface library. (Version 1 used PHP extensions)

The following low-layer interfaces are mainly provided.

- Provides a one-dimensional universal buffer for data exchange between C and PHP.
- You can use almost the same low-layer interface as the OpenBLAS library in PHP. This allows for flexible usage that does not depend on the array shape.
- Rindow-matlib can also be used in PHP with almost the same low-layer interface as C language.
- Can be combined with [Rindow Math Matrix](/mathematics/matrix/matrix.html) to perform very fast and advanced N-dimensional array operations.

Very useful when you want to do deep learning with PHP!


requirements
------------

- PHP8.1 or PHP8.2 or PHP8.3
- Windows 10, 11 or Linux (Ubuntu 20.04 or Debian 12 or later)
- OpenBLAS library 0.3.20 or later
- Rindow-Math Library 1.0 or later


Installation instructions from pre-build binaries
-------------------------------------------------

### Download pre-build binaries from each projects

You can perform very fast N-dimensional array operations in conjunction.
Download the pre-build binary files from each project's release page.

- Pre-build binaries
  - [Rindow Matlib](https://github.com/rindow/rindow-matlib/releases)
  - [OpenBLAS](https://github.com/OpenMathLib/OpenBLAS/releases)

### Setup for Windows

Download the binary file, unzip it, and copy it to the execution directory.

- rindow-matlib-X.X.X-win64.zip
- OpenBLAS-X.X.X-x64.zip

Add FFI extension to php.ini

```shell
C:\TMP> cd \path\to\php\directory
C:\PHP> notepad php.ini

extension=ffi
C:\PHP> php -m

C:\TMP> PATH %PATH%;\path\to\binary\directories\bin
C:\TMP> cd \your\progject\directory
C:\PRJ> composer require rindow/rindow-math-matrix
C:\PRJ> composer require rindow/rindow-math-matrix-matlibffi
C:\PRJ> vendor/bin/rindow-math-matrix
Service Level   : Advanced
Buffer Factory  : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver     : Rindow\OpenBLAS\FFI\Blas
LAPACK Driver   : Rindow\OpenBLAS\FFI\Lapack
Math Driver     : Rindow\Matlib\FFI\Matlib
```

### Setup for Linux

Install each library using the apt command.

Make sure FFI extension is enabled.
```shell
$ php -m | grep FFI
FFI
```

**Install OpenBLAS:**

Since rindow-matlib currently uses OpenMP, choose the OpenMP version for OpenBLAS as well.

Using the pthread version of OpenBLAS can cause conflicts and become unstable and slow.
This issue does not occur on Windows.

```shell
$ sudo apt install libopenblas0-openmp liblapacke
```

**Install Rindow-Matlib:**

Download the pre-build binary file.

- https://github.com/rindow/rindow-matlib/releases

Please install using the apt command. 
```shell
$ sudo apt install ./rindow-matlib_X.X.X_amd64.deb
```
Just it.

**Install Rindow-Matlib-FFI:**

Set it up using composer.

```shell
$ cd \your\progject\directory
$ composer require rindow/rindow-math-matrix
$ composer require rindow/rindow-math-matrix-matlibffi
$ vendor/bin/rindow-math-matrix
Service Level   : Advanced
Buffer Factory  : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver     : Rindow\OpenBLAS\FFI\Blas
LAPACK Driver   : Rindow\OpenBLAS\FFI\Lapack
Math Driver     : Rindow\Matlib\FFI\Matlib
```


### Troubleshooting for Linux

If you have already installed the pthread version of OpenBLAS,
```shell
$ sudo apt remove libopenblas0-pthread
```

But if you can't remove it, you can switch to it using the update-alternatives command.

```shell
$ sudo update-alternatives --config libopenblas.so.0-x86_64-linux-gnu
$ sudo update-alternatives --config liblapack.so.3-x86_64-linux-gnu
```

If you really want to use the pthread version of OpenBLAS, please switch to the serial version of rindow-matlib.

There are no operational mode conflicts with OpenBLAS on Windows.

But, If you really want to use the pthread version of OpenBLAS, please switch to the serial version of rindow-matlib.

```shell
$ sudo update-alternatives --config librindowmatlib.so
There are 2 choices for the alternative librindowmatlib.so (providing /usr/lib/librindowmatlib.so).

  Selection    Path                                             Priority   Status
------------------------------------------------------------
* 0            /usr/lib/rindowmatlib-openmp/librindowmatlib.so   95        auto mode
  1            /usr/lib/rindowmatlib-openmp/librindowmatlib.so   95        manual mode
  2            /usr/lib/rindowmatlib-serial/librindowmatlib.so   90        manual mode

Press <enter> to keep the current choice[*], or type selection number: 2
```
Choose the "rindowmatlib-serial".

