---
layout: document
title: "relu"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/reducesum
next_section: api/repeat
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Relu

Differentiable rectified linear unit function.

Methods
-------

### relu
```php
$g->relu(
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
$a = $g->Variable([-1,2]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->relu($a);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";

# [0,2]
# [0,1]

```
