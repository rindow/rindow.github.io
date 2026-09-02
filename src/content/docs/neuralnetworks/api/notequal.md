---
layout: document
title: "notEqual"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/mul
next_section: api/ones
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: NotEqual

Compare each element in the array. If the values differ, it becomes 1; if they are the same, it becomes 0.

This is a non-backpropagable function.

Methods
-------

### notEqual
```php
$g->notEqual(
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
$b = $g->Variable([3,2]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a,$b) {
    return $g->notEqual($a,$b);
});
echo $mo->toString($c)."\n";
```
