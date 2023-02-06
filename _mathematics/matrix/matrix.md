---
layout: document
title: "Rindow Math Matrix"
upper_section: index
next_section: matrix/arrayobjects
---

Overview
--------
"Rindow Math Matrix" is a library that provides a vector computing environment.

It is made to resemble python numpy to save time for many people to learn.

It has the following features.

- Implement a common Array object interface "NDArray".
- Provides a flexible N-dimensional array operation library.
- Compatible with Rindow OpenBLAS extension


Requirements
------------
- PHP 8.0, 8.1, 8.2
  - (If you want to use it on PHP 7.(2,3,4) environment, please use Release 1.1.x.) 
- Window 10,11 or Linux when using Rindow OpenBLAS extension

Recommends
----------
- [**Rindow Math Plot**](plot/overviewplot.html): Visualization mathematical data
- [**Rindow OpenBLAS extension**](openblas/overviewopenblas.html): C language interface and High-speed operation
- [**Rindow OpenCL extension**](https://github.com/rindow/rindow-opencl/releases): Supports GPU acceleration
- [**Rindow CLBlast extension**](https://github.com/rindow/rindow-clblast/releases): Supports GPU acceleration


Installation
------------

### Install the Rindow Math Matrix

If you want to use extensions, download and setup pre-build binaries.
See the README for each extension.

- https://github.com/rindow/rindow-openblas
- https://github.com/rindow/rindow-opencl
- https://github.com/rindow/rindow-clblast

> If you are using Windows, you must Download the version of OpenBLAS binaries that correspond to the
> rindow_openblas binaries. The compatible OpenBLAS Library release number is included in the filename
> of the rindow-openblas pre-built archive file. If you use the wrong OpenBLAS release number DLL,
> it will not work properly.
> All so rindow_clblast and Clblast Library release number.

Make sure the php extension is loaded.

```shell
$ php -m
[PHP Modules]
...
rindow_openblas
rindow_opencl
rindow_clblast
...
```

Please set up with composer.

```shell
$ composer require rindow/rindow-math-matrix
```


If you want a graphical display, set up rindow-math-plot.

```shell
$ composer require rindow/rindow-math-plot
```

For Linux, image viewer settings are required for rindow-math-plot.

```shell
$ RINDOW_MATH_PLOT_VIEWER=/some/bin/dir/png-file-viewer
$ export RINDOW_MATH_PLOT_VIEWER
```
Note: Specify "viewnior" etc. for RINDOW_MATH_PLOT_VIEWER

### How to use the Rindow Math Matrix
```php
<?php
include 'vendor/autoload.php';

$mo = new Rindow\Math\Matrix\MatrixOperator();

$a = $mo->array([1.0, 2.0]);
$b = $mo->array([3.0, 4.0]);

$c = $mo->add($a,$b);

echo $mo->toString($c)."\n";
print_r($c->toArray());

### If you want to create a graph like this:

$plt = new Rindow\Math\Plot\Plot();

$plt->bar(['x','y'],$c);
$plt->show();
```

If you want to use the linear algebra library:
```php
<?php
include 'vendor/autoload.php';

$mo = new Rindow\Math\Matrix\MatrixOperator();
$la = $mo->la();

$a = $mo->array([[1.0, 2.0],[3.0, 4.0]]);
$b = $mo->array([[3.0, 4.0],[5.0, 6.0]]);

$c = $la->gemm($a,$b);

echo $mo->toString($c)."\n";
print_r($c->toArray());

### If you want to create a graph like this:

$plt = new Rindow\Math\Plot\Plot();

$plt->bar(['x','y'],$c);
$plt->show();
```

If you want to use the GPU version of the linear algebra library:
```php
<?php
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
print_r($c->toArray());

### If you want to create a graph like this:

$plt = new Rindow\Math\Plot\Plot();

$plt->bar(['x','y'],$c);
$plt->show();
```
