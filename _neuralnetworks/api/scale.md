---
layout: document
title: "scale"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/reshape
next_section: api/shape
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: scale

Add a constant value to an array. The following formula returns the result: alpha and beta are scalar values.

- Y = alpha*X

Methods
-------

### scale
```php
$g->scale(
    Variable|Scalar  $alpha,
    Variable|NDArray|ArrayShape $x,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **alpha**: Scale each element of the array by a multiplier.
- **x**: The arguments is Variable or NDArray. 

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[1,2],[3,4]]);
$y = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->scale($x,10);
});
echo $mo->toString($y)."\n";
```
