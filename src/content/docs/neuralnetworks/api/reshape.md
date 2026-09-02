---
layout: document
title: "reshape"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/repeat
next_section: api/scale
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Reshape

Reshapes an array.

Methods
-------

### reshape
```php
$g->reshape(
    Variable|NDArray $x,
    array|ArrayShape $shape,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments are Variable or NDArray. Implicitly create Variable for NDArray.
- **shape**: shape of array

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[1,2],[3,4]]);

$y = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->reshape($x,[1,4]);
});
$dx = $tape->gradient($y,$x);
echo $mo->toString($y)."\n";
echo $mo->toString($dx)."\n";

# [1, 2, 3, 4]
# [[1,1],[1,1]]

```
