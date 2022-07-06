---
layout: document
title: "matmul"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/log
next_section: api/reducemean
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Matmul

Differentiable matrix product function.

Methods
-------

### add
```php
$builer->matmul(
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
$a = $g->Variable([[1,2],[2,3]]);
$b = $g->Variable([[2,3],[3,4]]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a,$b) {
    return $g->matmul($a,$b);
});
[$da,$db] = $tape->gradient($c,[$a,$b]);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";
echo $mo->toString($db)."\n";

# [[8,11],[13,18]]
# [[5,7],[5,7]]
# [[3,3],[5,5]]

```
