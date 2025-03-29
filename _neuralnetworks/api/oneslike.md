---
layout: document
title: "onesLike"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/ones
next_section: api/reducemean
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: OnesLike

Create an array filled with ones, in the same format and data type as the input array.

This is a non-backpropagable function.

Methods
-------

### onesLike
```php
$g->onesLike(
    Variable|NDArray $x,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments is Variable or NDArray. 

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[1,2],[3,4]]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->onesLike($x);
});

# [[1,1],[1,1]

```
