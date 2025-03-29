---
layout: document
title: "bandpart"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/add
next_section: api/cast
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Bandpart

Copy a tensor setting everything outside a central band in each innermost matrix to zero.

This is a non-backpropagable function.

Methods
-------

### bandpart
```php
$g->bandpart(
    Variable|NDArray $x,
    int $lower,
    int $upper,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments is Variable or NDArray.
- **lower**: integer. Number of subdiagonals to keep. If negative, keep entire lower triangle.
- **upper**: integer. Number of superdiagonals to keep. If negative, keep entire upper triangle.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable($mo->la()->ones([2,3,3]));
$y = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    $y = $g->bandpart($x,0,-1);
    $y = $g->mul($x,$y);
    return $y;
});
$dx = $tape->gradient($y,$x);
echo $mo->toString($y,indent:true)."\n";
echo $mo->toString($dx,indent:true)."\n";
```
