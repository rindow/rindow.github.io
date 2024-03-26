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
- Compatible with OpenBLAS


requirements
------------
- PHP 8.1, 8.2, 8.3
    - (If using in PHP 7.2 to 8.0 environment, please use release 1.1.)
- Window 10, 11, or Linux (if using OpenBLAS)


Recommends
----------
- [**Rindow Math Plot**](/mathematics/plot/overviewplot.html): Visualization mathematical data
- [**Rindow Matlib and OpenBLAS**](/mathematics/openblas/overviewopenblas.html): C language interface and High-speed operation
- [**OpenCL and CLBlast**](/mathematics/acceleration/openblas.html): Supports GPU acceleration


Installation
------------
### Install the Rindow Math Matrix
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

### Install accelarators

To use OpenBLAS and Rindow-Matlib, read and install them [here](/mathematics/openblas/overviewopenblas.html).


To use GPU, please read [here](/mathematics/acceleration/openblas.html) and install it.


### How to use the Rindow Math Matrix
```php
include 'vendor/autoload.php';

$mo = new Rindow\Math\Matrix\MatrixOperator();

$a = $mo->array([1.0, 2.0]);
$b = $mo->array([3.0, 4.0]);

$c = $mo->add($a,$b);

echo $mo->toString($c)."\n";

### If you want to create a graph like this:

$plt = new Rindow\Math\Plot\Plot();

$plt->bar(['x','y'],$c);
$plt->show();
```

If you want to use the linear algebra library:
```php
include 'vendor/autoload.php';

$mo = new Rindow\Math\Matrix\MatrixOperator();
$la = $mo->la();

$a = $mo->array([[1.0, 2.0],[3.0, 4.0]]);
$b = $mo->array([[3.0, 4.0],[5.0, 6.0]]);

$c = $la->gemm($a,$b);

echo $mo->toString($c)."\n";

### If you want to create a graph like this:

$plt = new Rindow\Math\Plot\Plot();

$plt->bar(['x','y'],$c);
$plt->show();
```

If you want to use the GPU version of the linear algebra library:
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

### If you want to create a graph like this:

$plt = new Rindow\Math\Plot\Plot();

$plt->bar(['x','y'],$c);
$plt->show();
```
