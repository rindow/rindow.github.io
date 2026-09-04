---
layout: document
title: "maximum"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/matmul
next_section: api/minimum
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Maximum

Differentiable element-wise maximum function.

Returns the larger of each element of two inputs.

Methods
-------

### maximum
```php
$g->maximum(
    Variable|NDArray $a,
    Variable|NDArray $x,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **a,x**: The arguments are Variable or NDArray. Implicitly create Variable for NDArray. The number of dimensions of variable #1 must be greater than or equal to variable #2.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([1,4]);
$x = $g->Variable([3,2]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a,$x) {
    return $g->maximum($a,$x);
});
[$da,$dx] = $tape->gradient($c,[$a,$x]);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";
echo $mo->toString($dx)."\n";

# [3,4]
# [0,1]
# [1,0]

```
