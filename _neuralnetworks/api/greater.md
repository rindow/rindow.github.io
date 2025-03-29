---
layout: document
title: "greater"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/get
next_section: api/increment
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Greater

This function compares each element of the array and returns an array where each element is either 1 if 'a' is greater than 'b', or 0 if 'a' is equal to or less than 'b'.

This is a non-backpropagable function.

Methods
-------

### greater
```php
$g->greater(
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
    return $g->greater($a,$b);
});
echo $mo->toString($c)."\n";
```
