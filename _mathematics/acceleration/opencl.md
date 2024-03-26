---
layout: document
title: "Supports GPU acceleration on PHP"
upper_section: index
---
Overview
--------
We initially chose OpenCL because it supports a variety of arithmetic accelerations, including GPUs.
As a result, you can expect faster GPU speeds even in an inexpensive notebook PC environment.

To speed up numerical operations, you need not only support for OpenCL, but also a calculation library that uses OpenCL. CLBlast is a BLAS compatible library currently under development.
In addition to this, Rindow Math Matrix allows you to perform other MATH functions and various necessary operations on OpenCL.


Rindow OpenCL FFI
-----------------------
OpenCL is available from PHP through [Rindow OpenCL FFI](https://github.com/rindow/rindow-opencl-ffi).
OpenCL version is limited to 1.2 and is compatible with a wide range of environments.

Our goal is to use it with the Rindow neural network library, so it currently only has the bare minimum of functionality. It will be expanded in the future.


Rindow CLBlast FFI
-----------------------
CLBlast is a BLAS library on top of OpenCL. [Click here for details](https://github.com/CNugteren/CLBlast).

[Rindow CLBlast FFI](https://github.com/rindow/rindow-clblast) is a PHP binding for the above library.


OpenCLMath library for Rindow Math Matrix
--------------------------------------
Provides useful functions on OpenCL that are not included in the BLAS library.


Requirements
------------

- PHP8.1 or PHP8.2 or PHP8.3
- interop-phpobjects/polite-math 1.0.6 or later
- OpenCL 1.1 or later drivers/libraries.
- Windows 10, 11 or Linux (Ubuntu 20.04 or later)
- Rindow Math Matrix
- Rindow OpenCL FFI
- Rindow CLBlast FFI

GPU/OpenCL support for Windows
------------------------------
OpenCL can be used by default on Windows.

Please download the pre-build binaries and set the execution path.

- [OpenBLAS](https://github.com/OpenMathLib/OpenBLAS/releases)
- [Rindow Matlib](https://github.com/rindow/matlib/releases)
- [CLBlast](https://github.com/CNugteren/CLBlast/releases)

```shell
C:TEMP>PATH %PATH%;C:\CLBlast\bin;C:\OpenBLAS\bin;C:\Matlib\bin
```

Configure the PHP. Edit php.ini to use FFI extension

```shell
extension = ffi
```

Set up rindow-math-matrix to use OpenCL using composer. And make sure you are in Advanced mode.

```shell
C:yourproject> composer require rindow/rindow-math-matrix
C:yourproject> composer require rindow/rindow-math-matrix-matlibffi
C:yourproject> vendor\bin\rindow-math-matrix
Service Level   : Accelerated
Buffer Factory  : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver     : Rindow\OpenBLAS\FFI\Blas
LAPACK Driver   : Rindow\OpenBLAS\FFI\Lapack
Math Driver     : Rindow\Matlib\FFI\Matlib
OpenCL Factory  : Rindow\OpenCL\FFI\OpenCLFactory
CLBlast Factory : Rindow\CLBlast\FFI\CLBlastFactory

```
If you are unable to successfully set the target GPU, please check the OpenCL device status using the clinfo command.

```shell
C:tutorials>vendor\bin\clinfo
Number of platforms(1)
Platform(0)
    CL_PLATFORM_NAME=Intel(R) OpenCL
    CL_PLATFORM_PROFILE=FULL_PROFILE
....
...
..
```


GPU/OpenCL support for Ubuntu
------------------------------
Install the libraries required.

+ Install OpenBLAS with apt command
+ Download the latest version of Rindow-Matlib's pre-built binary files from https://github.com/rindow/rindow-matlib/releases.
+ Install the downloaded deb file using the apt command.
+ Set Rindow-Matlib to serial mode for use with PHP.

```shell
$ sudo apt install libopenblas-base liblapacke
$ wget https://github.com/rindow/rindow-matlib/releases/download/X.X.X/rindow-matlib_X.X.X_amd64.deb
$ sudo apt install ./rindow-matlib_X.X.X_amd64.deb
$ sudo update-alternatives --config librindowmatlib.so
There are 2 choices for the alternative librindowmatlib.so (providing /usr/lib/librindowmatlib.so).

  Selection    Path                                             Priority   Status
------------------------------------------------------------
* 0            /usr/lib/rindowmatlib-openmp/librindowmatlib.so   95        auto mode
  1            /usr/lib/rindowmatlib-openmp/librindowmatlib.so   95        manual mode
  2            /usr/lib/rindowmatlib-serial/librindowmatlib.so   90        manual mode

Press <enter> to keep the current choice[*], or type selection number: 2
```

It is essential that OpenCL works properly in the Linux environment.
(That's quite difficult)

Install the OpenCL environment.

```shell
$ sudo apt install clinfo
$ sudo apt install intel-opencl-icd
```
Ubuntu standard OpenCL drivers include:
- mesa-opencl-icd
- beignet-opencl-icd
- intel-opencl-icd
- nvidia-opencl-icd-xxx
- pocl-opencl-icd

The standard Linux OpenCL driver does not work properly, so we deal with it on a case-by-case basis to make it work somehow for each driver and version.

Check that OpenCL is running using the clinfo command.

```shell
$ clinfo
Number of platforms                               1
  Platform Name                                   Intel Gen OCL Driver
  Platform Vendor                                 Intel
....
...
..
```

Download and install the CLBlast library.
Scripts are available for easy download and installation.

+ Check the latest version: [CLBlast library](https://github.com/CNugteren/CLBlast/releases)
+ Copy script
+ Change the version at the beginning of the script
+ Run script and create deb file
+ Install deb file

```shell
$ cp vendor/rindow/rindow-clblast-ffi/clblast-packdeb.sh .
$ vi clblast-packdeb.sh
CLBLASTVERSION=1.6.2   <===== change
$ sh clblast-packdeb.sh
$ sudo apt install ./clblast_X.X.X-1+ubuntuXX.XX_amd64.deb
```

Configure the rindow-math-matrix.

+ Verify that rindow-math-matrix is Accelerated and the OpenCL driver is recognized.

```shell
$ composer rindow/rindow-math-matrix
$ composer rindow/rindow-math-matrix-ffi
$ vendor\bin\rindow-math-matrix
Service Level   : Accelerated
Buffer Factory  : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver     : Rindow\OpenBLAS\FFI\Blas
LAPACK Driver   : Rindow\OpenBLAS\FFI\Lapack
Math Driver     : Rindow\Matlib\FFI\Matlib
OpenCL Factory  : Rindow\OpenCL\FFI\OpenCLFactory
CLBlast Factory : Rindow\CLBlast\FFI\CLBlastFactory

```
