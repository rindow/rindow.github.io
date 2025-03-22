---
layout: document
title: "Rindow Neural Networks installation"
upper_section: index
previous_section: gettingstarted
next_section: tutorials/tutorials
---

- [Operating environment](#operating-environment)
- [Installation instructions for Windows](#installation-instructions-for-windows)
- [Installation instructions for Linux](#installation-instructions-for-linux)
- [GPU/OpenCL support for Windows](#gpuopencl-support-for-windows)
- [GPU/OpenCL support for Linux](#gpuopencl-support-for-linux)


Operating environment
---------------------
Rindow Neural Networks has been tested in the following operating environments:

- PHP 8.1, 8.2, 8.3, 8.4 (When using in PHP 7.x, 8.0 environment, please use Release 1.x.)
- Windows 10 20H2 or later.
- Ubuntu 22.04 or Debian 12 or later
- AMD/Intel CPU/APU 64bit (SSE2 or later)
- OpenBLAS (>=0.3.20:Windows-x64, 0.3.20:Ubuntu-2204, 0.3.21:Debian12)
- CLBlast (>=1.5.2:Windows-x64, 1.5.2:Ubuntu-2204, 1.5.3:Debian12)
- OpenCL (>=1.1)

It also works with Intel/AMD CPU/APU and integrated graphics with OpenCL drivers.


Installation instructions for Windows
-------------------------------------
Installing PHP

For Windows 10/11, install PHP for Windows.

+ Download the PHP x64 version from https://windows.php.net/download/. Either Non Thread Safe or Thread Safe version is fine.
+ Extract to a location of your choice.
+ Create php.ini by copying php.ini-development.
+ Set execution PATH for PHP.EXE.
+ Make sure PHP works with PHP -v.

```shell
C:TEMP>COPY C:\php\php.ini-development C:\php\php.ini
Edit php.ini to your liking.

C:TEMP>PATH %PATH%;C:\php
C:TEMP>php -v
PHP 8.4.5 (cli) (built: Mar 12 2025 12:17:53) (NTS Visual C++ 2022 x64)
Copyright (c) The PHP Group
Zend Engine v4.4.5, Copyright (c) Zend Technologies
    with Zend OPcache v8.4.5, Copyright (c), by Zend Technologies
C:TEMP>
```

Install composer.

+ Download composer from https://getcomposer.org/download/.
+ Copy composer.phar to the directory where the execution PATH is set.
+ Create composer.bat in the same location.

```shell
C:TEMP>COPY composer.phar C:\bin
C:TEMP>CD \bin
C:bin>echo @php "%~dp0composer.phar" %*>composer.bat
```

Install the PHP extensions required by Rindow Neural Networks.

+ Download and unzip the corresponding pre-built binary file from https://github.com/OpenMathLib/OpenBLAS/releases.
+ Download and unzip the corresponding pre-built binary file from https://github.com/rindow/rindow-matlib/releases.
+ Set the OpenBLAS and Rindow-Matlib DLL paths to the execution path.
+ Make the necessary settings in php.ini.
      - memory_limit = 8G
      - extension = curl
      - extension = ffi
      - extension=gd
      - extension = mbstring
      - extension=openssl
      - extension=pdo_sqlite
      - extension=zip
      - zend_extension=opcache
+ Make sure PHP extensions are loaded with PHP -m.

```shell
C:TEMP>PATH %PATH%;C:\OpenBLAS\OpenBLAS-0.X.XX-x64\bin
C:TEMP>PATH %PATH%;C:\Matlib\rindow-matlib-1.1.0-win64\bin

Edit php.ini

C:TEMP>php -m
[PHP Modules]
...
ffi
...
pdo_sqlite
...
C:TEMP>
```

Install Rindow Neural Networks.

+ Create your project directory.
+ Install rindow/rindow-neuralnetworks with composer.
+ Install rindow/rindow-math-matrlix-matlibffi with composer to speed up.
+ Install rindow/rindow-math-plot with composer for graph display.
+ Verify that the state of rindow-math-matrlix is Advanced or Accelerated.

```shell
C:TEMP>MKDIR \tutorials
C:TEMP>CD \tutorials
C:tutorials>composer require rindow/rindow-neuralnetworks
C:tutorials>composer require rindow/rindow-matrlix-matlibffi
C:tutorials>composer require rindow/rindow-math-plot
C:tutorials>vendor/bin/rindow-math-matrix
Service Level   : Advanced
Buffer Factory  : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver     : Rindow\OpenBLAS\FFI\Blas(THREAD)
LAPACK Driver   : Rindow\OpenBLAS\FFI\Lapacke
Math Driver     : Rindow\Matlib\FFI\Matlib(THREAD)
```

If the service level is Basic mode, the additional drivers are not configured correctly.
Run the check command with the -v option to find the cause.
```shell
C:tutorials>vendor/bin/rindow-math-matrix -v
```

Run the sample program

+ Run the sample to see if it works.
+ The results are displayed graphically.

```shell
C:tutorials>MKDIR samples
C:tutorials>CD samples
C:tutorials\samples>COPY ..\vendor\rindow\rindow-neuralnetworks\samples\* .
C:tutorials\samples>php mnist-basic-clasification.php
Downloading train-images-idx3-ubyte.gz ...Done
....
Epoch 4/5 [.........................] 1 sec. remaining:00:00  - 2 sec.
 loss:0.1264 accuracy:0.9640 val_loss:0.1246 val_accuracy:0.9604
Epoch 5/5 [.........................] 1 sec. remaining:00:00  - 2 sec.
 loss:0.1054 accuracy:0.9698 val_loss:0.1129 val_accuracy:0.9675

The graph is displayed
```

Installation instructions for Linux
-----------------------------------------
Install php.

+ Install php-cli, php-mbstring, and unzip using the apt command.

```shell
$ sudo apt install php8.4-cli php8.4-mbstring php8.4-curl php8.4-sqlite3 php8.4-gd php8.4-xml php8.4-opcache unzip
$ php -v
PHP 8.4.5 (cli) (built: Mar 13 2025 15:36:20) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.4.5, Copyright (c) Zend Technologies
    with Zend OPcache v8.4.5, Copyright (c), by Zend Technologies
```

Install composer.

+ Download composer from https://getcomposer.org/download/.
+ Copy composer.phar to the directory where the execution PATH is set.
+ Make composer in the same place.

```shell
$ cp composer.phar ~/.local/bin
$ cd ~/.local/bin
$ cat > composer
#!/usr/bin/env sh
dir=$(cd "${HOME}/.local/bin" && pwd)
php "${dir}/composer.phar" "$@"
^D
$ chmod +x composer
$ composer -V
Composer version 2.8.6 2025-02-25 13:03:50
PHP version 8.4.5 (/usr/bin/php8.4)
```

Install the libraries required by Rindow NeuralNetworks.

+ Install OpenBLAS with apt command
+ Download the latest version of Rindow-Matlib's pre-built binary files from https://github.com/rindow/rindow-matlib/releases.
+ Install the downloaded deb file using the apt command.
+ Set Rindow-Matlib to serial mode for use with PHP.

```shell
$ sudo apt install libopenblas0 liblapacke
$ wget https://github.com/rindow/rindow-matlib/releases/download/X.X.X/rindow-matlib_X.X.X-XX.XX_amd64.deb
$ sudo apt install ./rindow-matlib_X.X.X-XX.XX_amd64.deb
```
But if you are not allowed to use the openmp version of openblas, there is another way.
Click [here](/mathematics/openblas/overviewopenblas.html#troubleshooting-for-linux) for more information.

Install Rindow Neural Networks.

+ Set the image display command for rindow-math-plot.
+ Create your project directory.
+ Install rindow/rindow-neuralnetworks with composer.
+ Install rindow/rindow-math-matrix-matlibffi with composer to speed up.
+ Install rindow/rindow-math-plot with composer for graph display.
+ Verify that the state of rindow-math-matrlix is Advanced or Accelerated.

Configure the image viewer.
```shell
$ RINDOW_MATH_PLOT_VIEWER=/some/bin/dir/png-file-viewer
$ export RINDOW_MATH_PLOT_VIEWER
```
Note: Specify "viewnior" etc. for RINDOW_MATH_PLOT_VIEWER


Install Rindow Neural Networks.
```shell
$ mkdir ~/tutorials
$ cd ~/tutorials
$ composer require rindow/rindow-neuralnetworks
$ composer require rindow/rindow-math-matrix-matlibffi
$ composer require rindow/rindow-math-plot
$ vendor/bin/rindow-math-matrix
Service Level   : Accelerated
Buffer Factory  : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver     : Rindow\OpenBLAS\FFI\Blas(THREAD)
LAPACK Driver   : Rindow\OpenBLAS\FFI\Lapacke
Math Driver     : Rindow\Matlib\FFI\Matlib(THREAD)
```

If the service level is Basic mode, the additional drivers are not configured correctly.
Run the check command with the -v option to find the cause.
```shell
$ vendor/bin/rindow-math-matrix -v
```

Run the sample program

+ Run the sample to see if it works.
+ The results are displayed graphically.

```shell
$ mkdir samples
$ cd samples
$ cp ../vendor/rindow/rindow-neuralnetworks/samples/* .
$ php mnist-basic-clasification.php
Downloading train-images-idx3-ubyte.gz ...Done
....
Epoch 4/5 ........................ - 10 sec.
 loss:0.1276 accuracy:0.9641 val_loss:0.1162 val_accuracy:0.9649
Epoch 5/5 ........................ - 11 sec.
 loss:0.1063 accuracy:0.9703 val_loss:0.1059 val_accuracy:0.9688
```

The result is displayed as a graph.

![Result](images/gettingstarted-result.png)


GPU/OpenCL support for Windows
------------------------------
OpenCL can be used by default on Windows.

Please download the CLBlast library and set the execution path.

- [CLBlast library](https://github.com/CNugteren/CLBlast/releases)

```shell
C:TEMP>PATH %PATH%;C:\CLBlast\CLBlast-X.X.X-Windows-x64\bin
```

Configure the rindow-neuralnetworks backend to use OpenCL.

+ Verify that rindow-math-matrix is Accelerated and the OpenCL driver is recognized.
+ Set environment variables to use GPU in rindow-neuralnetworks backend.
+ Run the sample program.

```shell
C:tutorials>vendor\bin\rindow-math-matrix
Service Level   : Accelerated
Buffer Factory  : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver     : Rindow\OpenBLAS\FFI\Blas(THREAD)
LAPACK Driver   : Rindow\OpenBLAS\FFI\Lapacke
Math Driver     : Rindow\Matlib\FFI\Matlib(THREAD)
OpenCL Factory  : Rindow\OpenCL\FFI\OpenCLFactory
CLBlast Factory : Rindow\CLBlast\FFI\CLBlastFactory

C:tutorials>SET RINDOW_NEURALNETWORKS_BACKEND=rindowclblast::GPU
C:tutorials>cd samples
C:samples>php basic-image-clasification.php
```
Note: RINDOW_NEURALNETWORKS_BACKEND can specify an OpenCL device type or a set of platform ID and device ID in addition to a name such as rindowclblast. If you have two or more GPUs, you can use this specification method to identify them. for example;

- rindowclblast       => platform #0, device #0
- rindowclblast::GPU  => GPU type device: Integrated GPU, etc.
- rindowclblast::CPU  => CPU type device: pocl-opencl-icd, etc.
- rindowclblast::0,0  => platform #0, device #0
- rindowclblast::0,1  => platform #0, device #1
- rindowclblast::1,0  => platform #1, device #0

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


GPU/OpenCL support for Linux
------------------------------
It is essential that OpenCL works properly in the Linux environment.
(That's quite difficult)

Install the OpenCL environment.

```shell
$ sudo apt install clinfo
$ sudo apt install intel-opencl-icd
```
Linux standard OpenCL drivers include:
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

Install the CLBlast library.

```shell
$ sudo apt install libclblast1
```

If you are using Ubuntu 20.04, your distribution does not include clblast.
Download and install the clblast pre-built binaries.
```shell
$ cp vendor/rindow/rindow-clblast-ffi/clblast-packdeb.sh .
$ vi clblast-packdeb.sh
CLBLASTVERSION=1.6.2   <===== change
$ sh clblast-packdeb.sh
$ sudo apt install ./clblast_X.X.X-1_amd64.deb
```

Configure the rindow-neuralnetworks backend to use OpenCL.

+ Verify that rindow-math-matrix is Accelerated and the OpenCL driver is recognized.
+ Set environment variables to use GPU in rindow-neuralnetworks backend.
+ Run the sample program.

```shell
$ vendor\bin\rindow-math-matrix
Service Level   : Accelerated
Buffer Factory  : Rindow\Math\Buffer\FFI\BufferFactory
BLAS Driver     : Rindow\OpenBLAS\FFI\Blas(THREAD)
LAPACK Driver   : Rindow\OpenBLAS\FFI\Lapacke
Math Driver     : Rindow\Matlib\FFI\Matlib(THREAD)
OpenCL Factory  : Rindow\OpenCL\FFI\OpenCLFactory
CLBlast Factory : Rindow\CLBlast\FFI\CLBlastFactory

$ RINDOW_NEURALNETWORKS_BACKEND=rindowclblast::GPU
$ export RINDOW_NEURALNETWORKS_BACKEND
$ cd samples
$ php basic-image-clasification.php
```
Note: RINDOW_NEURALNETWORKS_BACKEND can specify an OpenCL device type or a set of platform ID and device ID in addition to a name such as rindowclblast. If you have two or more GPUs, you can use this specification method to identify them. for example;

- rindowclblast       => platform #0, device #0
- rindowclblast::GPU  => GPU type device: Integrated GPU, etc.
- rindowclblast::CPU  => CPU type device: pocl-opencl-icd, etc.
- rindowclblast::0,0  => platform #0, device #0
- rindowclblast::0,1  => platform #0, device #1
- rindowclblast::1,0  => platform #1, device #0

If you are unable to successfully set the target GPU, please check the OpenCL device status using the clinfo command.
