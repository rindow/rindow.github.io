---
layout: document
title: "square"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/sqrt
next_section: api/stopgradient
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Square

Differentiable Square function.

Methods
-------

### square
```php
$builer->square(
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
    return $g->square($a);
});
$da = $tape->gradient($c,$a);
echo $mo->toString($c, '%6.3f')."\n";
echo $mo->toString($da,'%6.3f')."\n";

# [ 1.000, 4.000]
# [ 2.000, 4.000]

```
