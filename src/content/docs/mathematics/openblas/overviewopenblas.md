---
layout: document
title: "Rindow Matlib and OpenBLAS"
upper_section: index
next_section: openblas/arraybuffer
---
## Overview

The Rindow-MatlibFFI service functions as a backend library for Rindow-math-matrix, calling external libraries to provide high-speed numerical computation capabilities implemented in the C language.

### Key Features

* Provides a one-dimensional universal buffer that enables efficient data exchange between C and PHP.
* Offers a low-level interface to the OpenBLAS library that is almost identical to its C API, accessible from PHP. This allows for flexible numerical operations independent of array shapes.
* The Rindow-matlib library is also accessible from PHP through a low-level interface that is almost identical to its C API.
* By combining with [Rindow Math Matrix](https://www.google.com/search?q=/mathematics/matrix/matrix.html), high-performance N-dimensional array operations can be executed at high speed.

It demonstrates high performance in deep learning development with PHP.

### High-Speed Operations

OpenBLAS and Rindow-Matlib are the primary backends that enable high-speed CPU-based computations written in the C language.

OpenBLAS is a widely known high-performance linear algebra library, and Rindow-Matlib provides a variety of function groups useful for machine learning. These libraries achieve high-speed processing by leveraging multi-threaded parallel computation and CPU SIMD instructions.

### Portability

From version 2 onwards, the method of calling C language interface libraries has been changed to use PHP's FFI (Foreign Function Interface) functionality (version 1 used a PHP extension).

This eliminates the need for PHP-specific extensions, resulting in high portability. It can be used immediately by simply installing the pre-built binaries provided for each platform supported by the libraries: Windows, Linux, and macOS.

Furthermore, the backend is provided through a general-purpose interface called the Buffer interface, which is independent of Rindow-Math-Matrix. This allows it to be used directly by other systems without going through Rindow-Math-Matrix, or conversely, to create custom backends that comply with the Buffer interface and use them with Rindow-Math-Matrix.

Each function can be used directly from PHP as a low-level interface almost identical to the C language interfaces of OpenBLAS and Rindow-Matlib, making it easy to port applications developed in C/C++.

## Requirements

* PHP 8.1, PHP 8.2, PHP 8.3, or PHP 8.4
* Windows 10/11, Linux (Ubuntu 22.04 or later, Debian 12 or later), macOS
* OpenBLAS library version 0.3.20 or later
* Rindow-Math library version 1.1 or later

## Installation Instructions from Pre-built Binaries

### Downloading Pre-built Binaries

Please download the pre-built binary files from the release pages of each of the following projects. By linking these libraries, high-speed N-dimensional array operations become possible.

* Pre-built Binaries
    * [Rindow Matlib](https://github.com/rindow/rindow-matlib/releases)
    * [OpenBLAS](https://github.com/OpenMathLib/OpenBLAS/releases)

### Configuration on Windows

Unzip the downloaded binary files and copy them to the PHP execution directory.

* `rindow-matlib-X.X.X-win64.zip`
* `OpenBLAS-X.X.X-x64.zip`

Add a setting to enable the FFI extension in the `php.ini` file.

```shell
C:\TMP> cd C:\path\to\php\directory  # Move to the PHP installation directory
C:\PHP> notepad php.ini               # Open php.ini in a text editor

; extension=ffi                       # Remove the semicolon at the beginning of this line or add this line
extension=ffi
C:\PHP> php -m                        # Verify that the FFI extension is enabled
```

```shell
C:\TMP> set PATH=%PATH%;C:\path\to\binary\directories\bin  # Add the path to the bin directory of the downloaded binaries
C:\TMP> cd C:\your\project\directory                      # Move to the root directory of your project
C:\PRJ> composer require rindow/rindow-math-matrix
C:\PRJ> composer require rindow/rindow-math-matrix-matlibffi
C:\PRJ> vendor/bin/rindow-math-matrix                      # Execute the configuration check command
Service Level  : Advanced
Buffer Factory : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver    : Rindow\OpenBLAS\FFI\Blas
LAPACK Driver  : Rindow\OpenBLAS\FFI\Lapack
Math Driver    : Rindow\Matlib\FFI\Matlib
```

### Configuration on Linux

Use the `apt` command to install the necessary libraries.

First, make sure the FFI extension is enabled.

```shell
$ php -m | grep FFI
FFI
```

**Installing OpenBLAS:**

Since Rindow-matlib currently uses `pthreads`, please select the `pthread` version of OpenBLAS as well. Previous versions (1.0) recommended the OpenMP version, but now the pthread version is recommended.

Using the OpenMP version of OpenBLAS may cause conflicts, leading to system instability or performance degradation. This issue does not occur in the Windows environment.

```shell
$ sudo apt install libopenblas0 liblapacke
```

**Installing Rindow-Matlib:**

Download the pre-built binary file from the following URL:

* [https://github.com/rindow/rindow-matlib/releases](https://github.com/rindow/rindow-matlib/releases)

Install the downloaded `.deb` file using the `apt` command.

```shell
$ sudo apt install ./rindow-matlib_X.X.X_amd64.deb
```

**Installing Rindow-Matlib-FFI:**

Install it to your project using `composer`.

```shell
$ cd /your/project/directory  # Move to the root directory of your project
$ composer require rindow/rindow-math-matrix
$ composer require rindow/rindow-math-matrix-matlibffi
$ vendor/bin/rindow-math-matrix # Execute the configuration check command
Service Level  : Advanced
Buffer Factory : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver    : Rindow\OpenBLAS\FFI\Blas
LAPACK Driver  : Rindow\OpenBLAS\FFI\Lapack
Math Driver    : Rindow\Matlib\FFI\Matlib
```

### Troubleshooting on Linux

If the OpenMP version of OpenBLAS is already installed, remove it with the following command:

```shell
$ sudo apt remove libopenblas0-openmp
```

If you cannot remove it due to dependencies, you can switch to the pthread version using the `update-alternatives` command.

```shell
$ sudo update-alternatives --config libopenblas.so.0-x86_64-linux-gnu
$ sudo update-alternatives --config liblapack.so.3-x86_64-linux-gnu
```

(Follow the prompts and select the pthread version option.)

If you absolutely must use the OpenMP version of OpenBLAS, you need to switch Rindow-matlib to the OpenMP version.

```shell
$ sudo update-alternatives --config librindowmatlib.so

There are 3 choices for the alternative librindowmatlib.so (providing /usr/lib/librindowmatlib.so).

  Selection    Path                                              Priority   Status
------------------------------------------------------------
* 0            /usr/lib/rindowmatlib-thread/librindowmatlib.so   95        auto mode
  1            /usr/lib/rindowmatlib-openmp/librindowmatlib.so   95        manual mode
  2            /usr/lib/rindowmatlib-serial/librindowmatlib.so   90        manual mode
  3            /usr/lib/rindowmatlib-thread/librindowmatlib.so  100        manual mode

Press <enter> to keep the current choice[*], or type selection number: 1
```

If the above is displayed, enter "1" to select `rindowmatlib-openmp`.
