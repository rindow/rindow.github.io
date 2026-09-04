---
layout: document
title: "minimum"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/maximum
next_section: api/mul
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Minimum

Differentiable element-wise minimum function.

Returns the smaller of each element of two inputs.

Methods
-------

### minimum
```php
$g->minimum(
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
    return $g->minimum($a,$x);
});
[$da,$dx] = $tape->gradient($c,[$a,$x]);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";
echo $mo->toString($dx)."\n";

# [1,2]
# [1,0]
# [0,1]

```
