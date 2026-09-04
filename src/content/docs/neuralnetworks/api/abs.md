---
layout: document
title: "abs"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/modules
next_section: api/add
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Abs

Differentiable absolute value function.

Methods
-------

### abs
```php
$g->abs(
    Variable|NDArray $x
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The argument is Variable or NDArray. Implicitly create Variable for NDArray.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([-1,2]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a) {
    return $g->abs($a);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";

# [1,2]
# [-1,1]

```
