---
layout: document
title: "Rindow Neural Networks installation"
upper_section: index
previous_section: index
next_section: gettingstarted
---

- [Operating environment](#operating-environment)
- [Installation procedure for Windows](#installation-procedure-for-windows)
- [Installation procedure for Ubuntu](#installation-procedure-for-ubuntu)
- [GPU/OpenCL support](#gpuopencl-support)

Operating environment
---------------------
Rindow Neural Networks has been tested in the following operating environment.

- PHP 7.2, 7.3, 7.4
- Windows 10 20H2
- Ubuntu 18.04, 20.04
- AMD CPU/APU 64bit(SSE2)
- OpenBLAS (0.3.13 Windows-x64, 0.3.8 Ubuntu2004, 0.2.20 Ubuntu1804)

It will also work on Intel CPUs.

Installation procedure for Windows
----------------------------------
PHP installation

For Windows 10, install PHP for Windows.

+ Download the PHP7.4 (or 7.2,7.3) x64 Thread Safe version from https://windows.php.net/download/.
+ Unzip to the location of your choice.
+ Copy php.ini-development to create php.ini.
+ Set the execution PATH for PHP.EXE.
+ Make sure PHP works with PHP -v.

```shell
C:TEMP>COPY C:\php\php74\php.ini-development C:\php\php74\php.ini

Edit php.ini to your liking.

C:TEMP>PATH %PATH%;C:\php\php74
C:TEMP>php -v
PHP 7.4.13 (cli) (built: Nov 24 2020 12:43:32) ( ZTS Visual C++ 2017 x64 )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.13, Copyright (c), by Zend Technologies
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

Install the required PHP extensions for Rindow Neural Networks.

+ Download and unzip the latest version of rindow_openblas from https://github.com/rindow/rindow-openblas/releases.
+ Download and unzip OpenBLAS with the corresponding release number from https://github.com/xianyi/OpenBLAS/releases.
+ Set the OpenBLAS DLL path to the execution path.
+ Copy php_rindow_openblas.dll to PHP's ext directory.
+ Make the necessary settings in php.ini.
     - memory_limit = 8G
     - extension = rindow_openblas
     - extension = pdo_sqlite
     - extension = gd2
     - extension = mbstring
     - extension = openssl
+ Make sure rindow_openblas is loaded with PHP -m.

```shell
C:TEMP>PATH %PATH%;C:\OpenBLAS\OpenBLAS-0.3.13-x64\bin
C:TEMP>COPY php_rindow_openblas-0.1.6-7.4-ts-vc15-x64\php_rindow_openblas.dll C:\php\php-7.4.13-Win32-vc15-x64\ext

Edit php.ini

C:TEMP>php -m
[PHP Modules]
...
pdo_sqlite
...
rindow_openblas
...
C:TEMP>
```

Install Rindow Neural Networks.

+ Create your project directory.
+ Install rindow / rindow-neural networks with composer.
+ Install rindow / rindow-math-plot with composer for graph display.
+ Run the sample and check the operation.
+ The result is displayed as a graph.

```shell
C:TEMP>MKDIR \tutorials
C:TEMP>CD \tutorials
C:tutorials>composer require rindow/rindow-neuralnetworks
C:tutorials>MKDIR samples
C:tutorials>CD samples
C:tutorials\samples>COPY ..\vendor\rindow\rindow-neuralnetworks\samples\* .
C:tutorials\samples>php mnist-basic-clasification.php
Downloading train-images-idx3-ubyte.gz ...Done
....
Epoch 4/5 ........................ - 10 sec.
 loss:0.1276 accuracy:0.9641 val_loss:0.1162 val_accuracy:0.9649
Epoch 5/5 ........................ - 11 sec.
 loss:0.1063 accuracy:0.9703 val_loss:0.1059 val_accuracy:0.9688

The graph is displayed
```

Installation procedure for Ubuntu
---------------------------------

Install php.

+ Install php-cli, php-mbstring, gd and unzip with the apt command.

```shell
$ sudo apt install php-cli7.4 php7.4-mbstring php7.4-sqlite3 php7.4-gd unzip
$ php -v
PHP 7.4.3 (cli) (built: Oct  6 2020 15:47:56) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.3, Copyright (c), by Zend Technologies
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
Composer version 2.0.8 2020-12-03 17:20:38
```

Install the required PHP extensions for Rindow Neural Networks.

+ Download the latest version of rindow_openblas from https://github.com/rindow/rindow-openblas/releases.
+ Install the downloaded deb file with the apt command.
+ Make sure rindow_openblas is loaded with PHP -m.

```shell
$ sudo apt install ./rindow-openblas-php7.4_0.2.0-1+ubuntu20.04_amd64.deb
$ php -m
[PHP Modules]
...
rindow_openblas
...
```

Install Rindow Neural Networks.

+ Set the image display command of rindow-math-plot.
+ Create your project directory.
+ Install rindow / rindow-neural networks with composer.
+ Install rindow / rindow-math-plot with composer for graph display.
+ Run the sample and check the operation.
+ The result is displayed as a graph.

```shell
$ RINDOW_MATH_PLOT_VIEWER=/some/bin/dir/png-file-viewer
$ export RINDOW_MATH_PLOT_VIEWER
$ mkdir ~/tutorials
$ cd ~/tutorials
$ composer require rindow/rindow-neuralnetworks
$ composer require rindow/rindow-math-plot
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

The result is displayed as a graph.
```


GPU/OpenCL support
------------------

Download binaries and setup PHP extension and libraries.

- [Rindow OpenCL extension](https://github.com/rindow/rindow-opencl/releases)
- [Rindow CLBlast extension](https://github.com/rindow/rindow-clblast/releases)
- [CLBlast library](https://github.com/CNugteren/CLBlast/releases)

Set environment variable.

```shell
C:tutorials>RINDOW_NEURALNETWORKS_BACKEND=clblast
C:tutorials>export RINDOW_NEURALNETWORKS_BACKEND
C:tutorials>cd samples
C:samples>php mnist-basic-clasification.php
```
