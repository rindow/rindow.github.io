---
layout: document
title: "concat"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/clipbyvalue
next_section: api/div
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Concat

Differentiable concatenation function.

Concatenates a list of inputs on the specified axis.

Methods
-------

### concat
```php
$g->concat(
    array $values,
    ?int $axis=null,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **values**: An array of Variable or NDArray. Implicitly create Variable for NDArray.

Options

- **axis**: Axis to join. The default is -1.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([[1,2],[3,4]]);
$b = $g->Variable([[5,6],[7,8]]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a,$b) {
    return $g->concat([$a,$b],axis:-1);
});
[$da,$db] = $tape->gradient($c,[$a,$b]);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";
echo $mo->toString($db)."\n";

# [[1,2,5,6],[3,4,7,8]]
# [[1,1],[1,1]]
# [[1,1],[1,1]]

```
