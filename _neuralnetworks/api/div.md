---
layout: document
title: "div"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/mul
next_section: api/square
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Div

Differentiable Multiplication function.

Methods
-------

### add
```php
$builer->div(
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
    return $g->div($a,$b);
});
[$da,$db] = $tape->gradient($c,[$a,$b]);
echo $mo->toString($c, '%6.3f')."\n";
echo $mo->toString($da,'%6.3f')."\n";
echo $mo->toString($db,'%6.3f')."\n";

# [ 0.500, 0.667]
# [ 0.500, 0.333]
# [-0.250,-0.222]

```
