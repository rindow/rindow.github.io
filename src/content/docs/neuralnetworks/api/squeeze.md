---
layout: document
title: "squeeze"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/softmax_func
next_section: api/sqrt
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Squeeze

Differentiable squeeze function.

Removes the dimension of size 1 at the specified axis.

Methods
-------

### squeeze
```php
$g->squeeze(
    Variable|NDArray $inputs,
    int $axis,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **inputs**: The argument is Variable or NDArray. Implicitly create Variable for NDArray.
- **axis**: Axis of size 1 to remove.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([[[1,2]]]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->squeeze($a,axis:0);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";

# [[1,2]]
# [[[1,1]]]

```
