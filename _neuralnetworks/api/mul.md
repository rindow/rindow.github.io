---
layout: document
title: "mul"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/sub
next_section: api/div
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Mul

Differentiable Multiplication function.

Methods
-------

### add
```php
$builer->mul(
    Variable|NDArray $a,
    Variable|NDArray $b
) : Variable
```
Create and execute the function in the builder method

Arguments

- **a,b**: The arguments are Variable or NDArray. Implicitly create Variable for NDArray.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([1,2]);
$b = $g->Variable([2,3]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a,$b) {
    return $g->mul($a,$b);
});
[$da,$db] = $tape->gradient($c,[$a,$b]);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";
echo $mo->toString($db)."\n";

# [2,6]
# [2,3]
# [1,2]


```
