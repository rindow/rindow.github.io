---
layout: document
title: "where"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/transpose
next_section: api/zeros
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Where

Differentiable where function.

Selects elements from x when the condition is true, and from y otherwise. Gradients are propagated to x and y, but not to the condition.

Methods
-------

### where
```php
$g->where(
    Variable|NDArray $condition,
    Variable|NDArray $x,
    Variable|NDArray $y,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **condition**: A boolean Variable or NDArray. Implicitly create Variable for NDArray. Gradients are not propagated to the condition.
- **x**: A Variable or NDArray selected when the condition is true. It must have the same shape as y and condition.
- **y**: A Variable or NDArray selected when the condition is false. It must have the same shape as x and condition.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$condition = $g->Variable([[true,false],[false,true]]);
$x = $g->Variable([[1,2],[3,4]]);
$y = $g->Variable([[5,6],[7,8]]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$condition,$x,$y) {
    return $g->where($condition,$x,$y);
});
[$dx,$dy] = $tape->gradient($c,[$x,$y]);
echo $mo->toString($c)."\n";
echo $mo->toString($dx)."\n";
echo $mo->toString($dy)."\n";

# [[1,6],[7,4]]
# [[1,0],[0,1]]
# [[0,1],[1,0]]

```
