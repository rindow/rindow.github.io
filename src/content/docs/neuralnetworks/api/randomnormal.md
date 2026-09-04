---
layout: document
title: "randomNormal"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/randomcategorical
next_section: api/reducemax
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: RandomNormal

Random normal sampling function.

Generates random numbers following a normal distribution with the shape of the input. Gradients are not propagated to the input.

Methods
-------

### randomNormal
```php
$g->randomNormal(
    Variable|NDArray $x,
    ?float $mean=null,
    ?float $scale=null,
    ?array $batchShape=null,
    ?int $seed=null,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: A Variable or NDArray that determines the shape and data type of the output. Implicitly create Variable for NDArray.

Options

- **mean**: Mean of the normal distribution. The default is 0.0.
- **scale**: Standard deviation of the normal distribution. The default is 1.0.
- **batchShape**: Additional batch shape prepended to the input shape.
- **seed**: Random seed.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[0,0],[0,0]]);
$y = $g->randomNormal($x,mean:0,scale:1,seed:0);
echo $mo->toString($y->shape())."\n";

# [2,2]

```
