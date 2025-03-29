---
layout: document
title: "less"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/increment
next_section: api/log
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Less

This function compares each element of the array and returns an array consisting of elements where 'a' is less than 'b', yielding a value of 1, or where 'a' is equal to or greater than 'b', yielding a value of 0.

This is a non-backpropagable function.

Methods
-------

### less
```php
$g->less(
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
    return $g->less($a,$b);
});
echo $mo->toString($c)."\n";
```
