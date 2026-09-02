---
layout: document
title: "ones"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/notequal
next_section: api/oneslike
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Ones

Create an array filled with ones.

This is a non-backpropagable function.

Methods
-------

### ones
```php
$g->ones(
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
    return $g->ones($g->shape($x),NDArray::int32);
});

# [[1,1],[1,1]

```
