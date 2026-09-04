---
layout: document
title: "l2norm"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/increment
next_section: api/less
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: L2Norm

Differentiable L2 norm function.

Methods
-------

### l2norm
```php
$g->l2norm(
    Variable|NDArray $x,
    ?int $axis=null,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The argument is Variable or NDArray. Implicitly create Variable for NDArray.

Options

- **axis**: Axis to compute the norm. If null, return the norm of the whole array. If it is negative, it is negative from the maximum dimension.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([[3,4]]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->l2norm($a,axis:-1);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";

# [5]
# [[0.6,0.8]]

```
