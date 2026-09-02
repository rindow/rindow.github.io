---
layout: document
title: "repeat"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/reducesum
next_section: api/reshape
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Repeat

Repeating elements in an array.

Methods
-------

### repeat
```php
$g->repeat(
    NDArray $x,
    Variable|Scalar|int $repeats,
    ?int $axis=null,
    ?bool $keepdims=null,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments are Variable or NDArray. Implicitly create Variable for NDArray.
- **repeats**: Number of repetitions

Options

- **axis**: Axis to reduce. If null, return the overall average. If it is negative, it is negative from the maximum dimension.
- **keepdims**: If true, Repeat elements within an array without increasing its dimensions.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[1,2],[3,4]]);

$y = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->repeat($x,2,axis:-1,keepdims:true);
});
$dx = $tape->gradient($y,$x);
echo $mo->toString($y)."\n";
echo $mo->toString($da)."\n";

# [[1, 1, 2, 2],[3,3,4,4]]
# [[2,2],[2,2]]

```
