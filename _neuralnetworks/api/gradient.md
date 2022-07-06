---
layout: document
title: "Gradient"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/optimizers
next_section: api/datasets
---
Overview
-------

- namespace: Rindow\NeuralNetworks\Builder
- classname: Gradient

Creation of objects with automatic differentiation function

gradient utilities
------------------
- [**Variable**](variable.html) : Create variable
- [**GradientTape**](gradienttape.html) : Tape for recording calculation graphs
- [**GraphFunction**](graphfunction.html) : Creating a differentiable function
- **isUndetermined**: Check variable.

Differentiable functions
------------------------
- [**add**](add.html)
- [**sub**](sub.html)
- [**mul**](mul.html)
- [**div**](div.html)
- [**square**](square.html)
- [**sqrt**](sqrt.html)
- [**exp**](exp.html)
- [**log**](log.html)
- [**matmul**](matmul.html)
- [**reduceMean**](reducemean.html)

Examples
--------

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
