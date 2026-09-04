---
layout: document
title: "softmax"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/sigmoid_func
next_section: api/squeeze
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Softmax

Differentiable softmax function.

Methods
-------

### softmax
```php
$g->softmax(
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
$a = $g->Variable([1,2,3]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->softmax($a);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c,'%6.3f')."\n";

# [ 0.090, 0.245, 0.665]

```
