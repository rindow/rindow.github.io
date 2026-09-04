---
layout: document
title: "logSoftmax"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/log1p
next_section: api/masking
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: LogSoftmax

Differentiable log softmax function.

Computes log(softmax(x)) in a numerically stable way.
The input must be a vector or an array with a batch dimension.

Methods
-------

### logSoftmax
```php
$g->logSoftmax(
    Variable|NDArray $x,
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
    return $g->logSoftmax($a);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c,'%6.3f')."\n";
echo $mo->toString($da,'%6.3f')."\n";

# [-2.408,-1.408,-0.408]

```
