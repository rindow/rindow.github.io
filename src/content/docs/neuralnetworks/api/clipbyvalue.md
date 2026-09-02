---
layout: document
title: "clipByValue"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/cast
next_section: api/div
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: ClipByValue

Clip values to the upper and lower limits.

Methods
-------

### clipByValue
```php
$g->clipByValue(
    Variable|NDArray $x,
    float $min,
    float $max,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments is Variable or NDArray.
- **min**: The minimum value to clip by.
- **max**: The maximum value to clip by.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([0,1,2,3]);
$y = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->clipByValue($x,1,2);
});
$dx = $tape->gradient($y,$x);
echo $mo->toString($x)."\n";
echo $mo->toString($y)."\n";
echo $mo->toString($dx)."\n";

```
