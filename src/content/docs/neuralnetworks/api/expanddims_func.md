---
layout: document
title: "expandDims"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/exp
next_section: api/gather_func
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: ExpandDims

Differentiable expand dims function.

Inserts a dimension of size 1 at the specified axis.

Methods
-------

### expandDims
```php
$g->expandDims(
    Variable|NDArray $inputs,
    int $axis,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **inputs**: The argument is Variable or NDArray. Implicitly create Variable for NDArray.
- **axis**: Axis to insert a dimension of size 1.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([[1,2]]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->expandDims($a,axis:0);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";

# [[[1,2]]]
# [[1,1]]

```
