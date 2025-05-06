---
layout: document
title: "Rindow Math Matrix"
upper_section: index
next_section: matrix/arrayobjects
---

## Overview

"Rindow Math Matrix" is a library that provides a vector calculation environment.

It is designed to resemble Python's NumPy to save learning time for many users.

It has the following features:

- Implements a common array object interface "NDArray".
- Provides a flexible N-dimensional array calculation library.
- Optional: Uses OpenBLAS as a backend external library.
- Optional: Hardware such as GPUs can be used with OpenCL.

## Requirements

- PHP 8.1, 8.2, 8.3, 8.4
    - (For environments PHP 7.2 to 8.0, please use release 1.1.)
- Windows 10, 11, or Linux (when using OpenBLAS)

## Recommendations

- [**Rindow Math Plot**](/mathematics/plot/overviewplot.html): Visualization of mathematical data
- [**Rindow Matlib and OpenBLAS**](/mathematics/openblas/overviewopenblas.html): C language interface and high-speed operations
- [**OpenCL and CLBlast**](/mathematics/acceleration/opencl.html): Supports GPU acceleration

## Installation

### Install Rindow Math Matrix
Please set up using composer.

```shell
$ composer require rindow/rindow-math-matrix
```

If you need graphical display, set up rindow-math-plot.

Enable the GD extension

**For Windows**:

Edit in php.ini.
```
extension = gd
```

**For Linux**:

install the gd extension.
```shell
$ sudo apt install phpX.X-gd
```

Install rindow-math-plot.
```shell
$ composer require rindow/rindow-math-plot
```

For Linux, image viewer settings are required for rindow-math-plot.

```shell
$ RINDOW_MATH_PLOT_VIEWER=/some/bin/dir/png-file-viewer
$ export RINDOW_MATH_PLOT_VIEWER
```
Note: Specify "viewnior" etc. for RINDOW_MATH_PLOT_VIEWER.

### Accelerate with CPU only

First, enable FFI and install external libraries.

**For Windows**:

Enable FFI.
Enable the FFI extension in php.ini.
```
extension = ffi
```
Confirm that ffi is enabled.
```shell
work> php -m | find "FFI"
```

Download and extract the OpenBLAS Windows binaries from the following site.
- [https://github.com/OpenMathLib/OpenBLAS/releases/](https://github.com/OpenMathLib/OpenBLAS/releases/)
Download and extract the Rindow-Matlib Windows binaries from the following site.
- [https://github.com/rindow/rindow-matlib/releases/](https://github.com/rindow/rindow-matlib/releases/)

Set each bin directory in PATH.
```shell
work> SET PATH=%PATH%;C:\OpenBLAS\bin;C:\Matlib\bin
```

**For Linux**:

install the FFI extension, openblas, and lapacke with the apt command.
```shell
$ sudo apt install phpX.X-ffi libopenblas0 liblapacke
```
Download and extract the Rindow-Matlib Linux binaries from the following site.
- [https://github.com/rindow/rindow-matlib/releases/](https://github.com/rindow/rindow-matlib/releases/)
```shell
$ wget https://github.com/rindow/rindow-matlib/releases/rindow-matlib_X.X.X_amd64.deb
$ sudo apt install ./rindow-matlib_X.X.X_amd64.deb
```

Install the service for acceleration.

**Common to Windows and Linux**

Install rindow-math-matrix-matlibffi.
```shell
$ composer require rindow/rindow-math-matrix-matlibffi
```
Confirm that it is installed.
```shell
$ vendor\bin\rindow-math-matrix
Service Level   : Advanced
Buffer Factory  : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver     : Rindow\OpenBLAS\FFI\Blas
LAPACK Driver   : Rindow\OpenBLAS\FFI\Lapack
Math Driver     : Rindow\Matlib\FFI\Matlib
```
If the service level is Basic, the external library is not available for some reason.
Check with the command's detailed information option.
```shell
$ vendor\bin\rindow-math-matrix -v
```

For detailed installation instructions, see [here](/mathematics/openblas/overviewopenblas.html).

### Accelerate with GPU
First, set up the library with "Accelerate with CPU" in the previous section.
Then install the GPU acceleration library.

**For Windows**:

Download and extract the CLBlast Windows binaries from the following site.
- [https://github.com/CNugteren/CLBlast/releases](https://github.com/CNugteren/CLBlast/releases)

Set the bin directory in PATH.
```shell
work> SET PATH=%PATH%;C:\CLBlast\bin
```

**For Linux**:

Install OpenCL and CLBlast.
OpenCL drivers vary depending on the hardware.
The following are standard on Ubuntu.
- **For Intel iGPU**: intel-opencl-icd
- **For AMD APU**: mesa-opencl-icd
Other GPUs require drivers specific to each manufacturer.

```shell
$ sudo apt install clinfo
$ sudo apt install XXX-XXX-icd
$ sudo apt install libclblast0
```

Confirm that the service level is "Accelerated" with the command.

**Common to Windows and Linux**

```shell
$ vendor\bin\rindow-math-matrix
Service Level   : Accelerated
Buffer Factory  : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver     : Rindow\OpenBLAS\FFI\Blas
LAPACK Driver   : Rindow\OpenBLAS\FFI\Lapack
Math Driver     : Rindow\Matlib\FFI\Matlib
OpenCL Factory  : Rindow\OpenCL\FFI\OpenCLFactory
CLBlast Factory : Rindow\CLBlast\FFI\CLBlastFactory
```
If the service level is Basic or Advanced, the external library is not available for some reason.
Check with the command's detailed information option.
```shell
$ vendor\bin\rindow-math-matrix -v
```

For detailed installation instructions, see [here](/mathematics/acceleration/opencl.html)

### How to use Rindow Math Matrix
```php
include 'vendor/autoload.php';

$mo = new Rindow\Math\Matrix\MatrixOperator();

$a = $mo->array([1.0, 2.0]);
$b = $mo->array([3.0, 4.0]);

$c = $mo->add($a,$b);

echo $mo->toString($c)."\n";

### To create a graph like this:

$plt = new Rindow\Math\Plot\Plot();

$plt->bar(['x','y'],$c);
$plt->show();
```

When using the linear algebra library:
```php
include 'vendor/autoload.php';

$mo = new Rindow\Math\Matrix\MatrixOperator();
$la = $mo->la();

$a = $mo->array([[1.0, 2.0],[3.0, 4.0]]);
$b = $mo->array([[3.0, 4.0],[5.0, 6.0]]);

$c = $la->gemm($a,$b);

echo $mo->toString($c)."\n";

### To create a graph of this:

$plt = new Rindow\Math\Plot\Plot();

$plt->bar(['x','y'],$c);
$plt->show();
```

When using the GPU version of the linear algebra library:
```php
include 'vendor/autoload.php';

use Interop\Polite\Math\Matrix\OpenCL;

$mo = new Rindow\Math\Matrix\MatrixOperator();
$la = $mo->laAccelerated('clblast',['deviceType'=>OpenCL::CL_DEVICE_TYPE_GPU]);
$la->blocking(true);

$a = $mo->array([[1.0, 2.0],[3.0, 4.0]]);
$b = $mo->array([[3.0, 4.0],[5.0, 6.0]]);

$a = $la->array($a);
$b = $la->array($b);
$c = $la->gemm($a,$b);
$c = $la->toNDArray($c);

echo $mo->toString($c)."\n";

### To create a graph of this:

$plt = new Rindow\Math\Plot\Plot();

$plt->bar(['x','y'],$c);
$plt->show();
```

