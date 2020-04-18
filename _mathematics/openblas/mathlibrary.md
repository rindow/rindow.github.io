---
layout: document
title: "Math libray"
upper_section: index
previous_section: blaslibrary
---

Overview
--------
The "Math" library is a library of frequently used matrix operations.
When used in combination with BLAS, matrix operations can be completed in Buffer.
It is very important to minimize the number of data exchanges between PHP numeric variables and Buffers in order to process matrix operations at high speed.


How it is implemented
---------------------
The memory area is received via the Buffer object and passed to the Math library.

Currently the following functions are supported:

- sum
- imax
- imin
- increment
- reciprocal
- maximum
- minimum
- greater
- less
- multiply
- add
- duplicate
- square
- sqrt
- rsqrt
- pow
- exp
- log
- zeros
- selectAxis0
- selectAxis1
- updateAddOnehot
- softmax
- equal
- reduceSum
- astype


Usage on PHP
------------
Here is the sample code.

```php
use Interop\Polite\Math\Matrix\NDArray;
$x = new Rindow\OpenBLAS\Buffer(3,NDArray::float32);
$math = new Rindow\OpenBLAS\Math();
$x[0] = 1.0;
$x[1] = 1.5;
$x[2] = 2.0;
$sum = $math->sum(count($x),$x,$offset=0,$incX=1);
### sum => 4.5
```
