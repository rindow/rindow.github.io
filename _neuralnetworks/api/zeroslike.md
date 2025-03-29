---
layout: document
title: "zerosLike"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/zeros
next_section: api/mnist
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: OnesLike

Create an array filled with zeros, in the same format and data type as the input array.

This is a non-backpropagable function.

Methods
-------

### ones
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
    return $g->zerosLike($x);
});

# [[0,0],[0,0]

```
