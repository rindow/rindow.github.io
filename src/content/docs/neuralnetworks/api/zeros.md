---
layout: document
title: "zeros"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/transpose
next_section: api/zeroslike
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Zeros

Create an array filled with zeros.

This is a non-backpropagable function.

Methods
-------

### zeros
```php
$g->zeros(
    ArrayShape|array $shape,
    int $dtype,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **shape**: The arguments is array or ArrayShape. 
- **dtype**: constant integer. the array's data type.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[1,2],[3,4]],dtype:NDArray::float32);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->zeros($g->shape($x),NDArray::int32);
});

# [[0,0],[0,0]

```
