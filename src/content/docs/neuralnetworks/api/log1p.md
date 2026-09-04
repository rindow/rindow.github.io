---
layout: document
title: "log1p"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/log
next_section: api/logsoftmax
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Log1p

Differentiable log(1+x) function.

Computes the natural logarithm of one plus the input accurately for small values.

Methods
-------

### log1p
```php
$g->log1p(
    Variable|NDArray $x
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The argument is Variable or NDArray. Implicitly create Variable for NDArray.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([0,1]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->log1p($a);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c,'%6.3f')."\n";
echo $mo->toString($da,'%6.3f')."\n";

# [ 0.000, 0.693]
# [ 1.000, 0.500]

```
