---
layout: document
title: "Math libray"
upper_section: index
previous_section: openblas/blaslibrary
next_section: acceleration/opencl
---

Overview
--------
The "Math" library is a library of frequently used matrix operations useful for machine learning.
When used in conjunction with BLAS, matrix operations can complete all operations within a buffer object.
To process matrix operations quickly, it is very important to minimize the number of data exchanges between PHP's numeric variables and buffers.

Implemented Methods
-------------------
Memory space is received via a Buffer object and passed to the Math library.

Currently the following features are supported:

- sum
- imax
- imin
- increment
- reciprocal
- maximum
- minimum
- greater
- greaterEqual
- less
- lessEqual
- multiply
- add
- duplicate
- square
- sqrt
- rsqrt
- pow
- exp
- log
- tanh
- sin
- con
- tan
- zeros
- updateAddOnehot
- softmax
- equal
- notEqual
- not
- astype
- matrixcopy
- imagecopy
- fill
- nan2num
- isnan
- searchsorted
- cumsum
- transpose
- bandpart
- gather
- reduceGather
- slice
- repeat
- reduceSum
- reduceMax
- reduceArgMax
- randomUniform
- randomNormal
- randomSequence
- im2col1d
- im2col2d
- im2col3d


Usage on PHP
------------
Here is the sample code.

```php
use Interop\Polite\Math\Matrix\NDArray;
$bufferFactory = new Rindow\Math\Buffer\FFI\BufferFactory()
$matlibFactory = new Rindow\Matlib\FFI\MatlibFactory()
$x = $bufferFactory->Buffer(3,NDArray::float32);
$math = $matlibFactory->Math();
$x[0] = 1.0;
$x[1] = 1.5;
$x[2] = 2.0;
$sum = $math->sum(count($x),$x,$offset=0,$incX=1);
### sum => 4.5
```
