---
layout: document
title: "reduceMax"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/randomnormal
next_section: api/reducemean
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: ReduceMax

Differentiable reduce max function.

Methods
-------

### reduceMax
```php
$g->reduceMax(
    Variable|NDArray $x,
    ?int $axis=null,
    ?bool $keepdims=null,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The argument is Variable or NDArray. Implicitly create Variable for NDArray.

Options

- **axis**: Axis to reduce. If null, return the overall maximum. If it is negative, it is negative from the maximum dimension.
- **keepdims**: If true, the reduced dimension is retained with size 1.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([[1,2],[3,4]]);

echo $mo->toString($g->reduceMax($a))."\n";
echo $mo->toString($g->reduceMax($a,axis:0))."\n";
echo $mo->toString($g->reduceMax($a,axis:1))."\n";

# 4
# [3,4]
# [2,4]

$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->reduceMax($a,axis:0);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";

# [3,4]
# [[0,0],[1,1]]

```
