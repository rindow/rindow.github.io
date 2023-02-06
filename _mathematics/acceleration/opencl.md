---
layout: document
title: "Supports GPU acceleration on PHP"
upper_section: index
---
Overview
--------
We chose OpenCL first because it supports various arithmetic accelerations including GPU.
This allows you to expect GPU acceleration even in an inexpensive laptop environment.

Not only OpenCL support but also an operation library using OpenCL is required to speed up numerical operations. CLBlast is an OpenCL-compatible library that is currently under active development.
In addition to this, various necessary operations provide OpenCL programs on PHP in Rindow Math Matrix.


Rindow OpenCL extension
-----------------------
OpenCL can be used from PHP through [Rindow OpenCL extension](https://github.com/rindow/rindow-opencl).
The version of OpenCL is limited to version 1.2, and we are considering porting to a wide range of environments.

Since our goal is to use it with the Rindow Neural Network Library, we currently only have the minimum required functionality. It will be expanded in the future.


Rindow CLBlast extension
-----------------------
CLBlast is BLAS library on OpenCL. [Click here for details](https://github.com/CNugteren/CLBlast).

[Rindow CLBlast extension](https://github.com/rindow/rindow-clblast) is a PHP binding for the above library.


OpenCLMath liblary in Rindow Math Matrix
----------------------------------------
It provides useful functions on OpenCL that are not included in the BLAS library.



Requirements
------------

- PHP7.2 or PHP7.3 or PHP7.4 or PHP8.0 or PHP8.1 or PHP8.2
- interop-phpobjects/polite-math 1.0.4 or later
- LinearBuffer implements for interop-phpobjects (Rindow OpenBLAS extension etc.)
- OpenCL 1.2 drivers/libraries.
- Windows 10,11 or Linux(Ubuntu)
- Rindow Math Matrix
- Rindow OpenCL extension
- Rindow CLBlast extension

Currently it does not support Linux environment.


How to setup pre-build binaries
-------------------------------
You can download and use pre-built Windows binaries.
Download the binary for your version of PHP.

- https://github.com/rindow/rindow-openblas/releases
- https://github.com/xianyi/OpenBLAS/releases
- https://github.com/rindow/rindow-opencl/releases
- https://github.com/rindow/rindow-clblast/releases
- https://github.com/CNugteren/CLBlast/releases

Please download the following two binaries and extract.

- The PHP extension of rindow-opencl that matches the php version.
- The PHP extension of rindow-openblas that matches the php version.
- The PHP extension of rindow-clblast that matches the php version.
- DLL of OpenBLAS library.
- DLL of CLBlast library.

> If you are using Windows, you must Download the version of OpenBLAS binaries that correspond to the
> rindow_openblas binaries. The compatible OpenBLAS Library release number is included in the filename
> of the rindow-openblas pre-built archive file. If you use the wrong OpenBLAS release number DLL,
> it will not work properly.
> All so rindow_clblast and Clblast Library release number.

Copy the shared library to the PHP extension directory and set it in php.ini.
And OpenBLAS DLL's path to Windows PATH environment variable.

```shell
C:\tmp>copy rindow_openblas.dll /path/to/php-installation-path/ext
C:\tmp>copy rindow_opencl.dll /path/to/php-installation-path/ext
C:\tmp>copy rindow_clblast.dll /path/to/php-installation-path/ext
C:\tmp>echo extension=rindow_openblas.dll >> /path/to/php-installation-path/php.ini
C:\tmp>echo extension=rindow_opencl.dll >> /path/to/php-installation-path/php.ini
C:\tmp>echo extension=rindow_clblast.dll >> /path/to/php-installation-path/php.ini
C:\tmp>PATH %PATH%;/path/to/OpenBLAS/bin;/path/to/CLBlast-Library/lib
C:\tmp>cd /some/app/directory
C:\app\dir>composer require rindow/rindow-math-matrix
```
