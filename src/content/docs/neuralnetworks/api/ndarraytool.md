---
layout: document
title: "Variable"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/graphfunction
next_section: api/arrayspec
---

- **namespace**: Rindow\NeuralNetworks\Gradient

Converts a Variable or NDArray to an NDArray. If a Mask tensor is included, the Mask tensor will also be removed.
Use this when you want to use the output result of the automatic differentiation formula in normal LinearAlgebra calculations.

Methods
-------

### constructor
```php
$g->ndarray(
    NDArray $variable,
)
```

Arguments

- **value**: Variable or NDArray or MaskedNDArray.

Examples

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();

$variable_a = $g->Variable([1,2]);

$value_a = $g->ndarray($variable_a)

```
