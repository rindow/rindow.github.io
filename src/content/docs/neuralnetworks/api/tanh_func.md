---
layout: document
title: "tanh"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/sub
next_section: api/transpose
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Tanh

Differentiable hyperbolic tangent function.

Methods
-------

### tanh
```php
$g->tanh(
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
    return $g->tanh($a);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c,'%6.3f')."\n";
echo $mo->toString($da,'%6.3f')."\n";

# [ 0.000, 0.762]
# [ 1.000, 0.420]

```
