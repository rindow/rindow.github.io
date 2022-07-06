---
layout: document
title: "reduceMean"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/matmul
next_section: api/mnist
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: reduceMean

Differentiable reduce mean function.

Methods
-------

### add
```php
$builer->reduceMean(
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

echo $mo->toString($g->reduceMean($a))."\n";
echo $mo->toString($g->reduceMean($a,axis:0))."\n";
echo $mo->toString($g->reduceMean($a,axis:1))."\n";
echo $mo->toString($g->reduceMean($a,axis:-1))."\n";
echo $mo->toString($g->reduceMean($a,axis:-2))."\n";

# 2.5
# [2,3]
# [1.5,3.5]
# [1.5,3.5]
# [2,3]

$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->reduceMean($a,axis:0);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";

# [2,3]
# [[0.5,0.5],[0.5,0.5]]

```
