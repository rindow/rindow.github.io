---
layout: document
title: "increment"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/greater
next_section: api/less
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Increment

Add a constant value to an array. The following formula returns the result: alpha and beta are scalar values.

- Y = alpha*X + beta

Methods
-------

### increment
```php
$g->increment(
    Variable|NDArray $x,
    Variable|Scalar  $beta,
    ?Variable|Scalar  $alpha=null,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments is Variable or NDArray. 
- **beta**: The increment.
- **alpha**: Scale each element of the array by a multiplier. If omitted, it's treated as 1.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[1,2],[3,4]]);
$y = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->increment($x,10);
});
echo $mo->toString($y)."\n";
```
