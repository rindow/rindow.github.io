---
layout: document
title: "log"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/exp
next_section: api/matmul
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Log

Differentiable logarithm function.

Methods
-------

### add
```php
$builer->log(
    Variable|NDArray $a
) : Variable
```
Create and execute the function in the builder method

Arguments

- **a**: The argument is Variable or NDArray. Implicitly create Variable for NDArray.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([1,2]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->log($a);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c, '%6.3f')."\n";
echo $mo->toString($da,'%6.3f')."\n";

# [ 0.000, 0.693]
# [ 1.000, 0.500]

```
