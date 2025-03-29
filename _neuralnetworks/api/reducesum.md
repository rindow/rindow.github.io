---
layout: document
title: "reduceSum"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/reducemean
next_section: api/repeat
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: reduceSum

Differentiable reduce sum function.

Methods
-------

### reduceMean
```php
$g->reduceMean(
    Variable|NDArray $x,
    int $axis=null
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments are Variable or NDArray. Implicitly create Variable for NDArray.

Options

- **axis**: Axis to reduce. If null, return the overall average. If it is negative, it is negative from the maximum dimension.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([[1,2],[3,4]]);

echo $mo->toString($g->reduceSum($a))."\n";
echo $mo->toString($g->reduceSum($a,axis:0))."\n";
echo $mo->toString($g->reduceSum($a,axis:1))."\n";
echo $mo->toString($g->reduceSum($a,axis:-1))."\n";
echo $mo->toString($g->reduceSum($a,axis:-2))."\n";

# 10
# [4,6]
# [3,7]
# [3,7]
# [4,6]

$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->reduceSum($a,axis:0);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";

# [4,6]
# [[1,1],[1,1]]

```
