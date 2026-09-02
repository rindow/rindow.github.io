---
layout: document
title: "shape"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/scale
next_section: api/sqrt
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Shape

Get the shape of an array.

This is a non-backpropagable function.

Methods
-------

### shape
```php
$g->shape(
    Variable|NDArray $x,
) : ArrayShape
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments are Variable or NDArray. Implicitly create Variable for NDArray.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[1,2],[3,4]]);

$y = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->shape($x);
});
echo $mo->shapeToString($y->toArray())."\n";

# [2, 2]

```
