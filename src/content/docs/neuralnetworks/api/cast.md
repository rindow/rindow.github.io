---
layout: document
title: "cast"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/bandpart
next_section: api/clipbyvalue
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Cast

Casts a tensor to a new type.

This is a non-backpropagable function.

Methods
-------

### cast
```php
$g->cast(
    Variable|NDArray $x,
    int $dtype,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments is Variable or NDArray.
- **dtype**: The destination type. The list of supported dtypes is the same as x.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable($mo->la()->ones([2,3,3]));
$y = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    $y = $g->cast($x,NDArray::int32);
    return $y;
});
echo $mo->dtypeToString($y)."\n";
```
