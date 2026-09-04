---
layout: document
title: "randomCategorical"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/oneslike
next_section: api/randomnormal
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: RandomCategorical

Random categorical sampling function.

Samples category indices from logits. Gradients are not propagated to the input.

Methods
-------

### randomCategorical
```php
$g->randomCategorical(
    Variable|NDArray $logits,
    ?array $batchShape=null,
    ?bool $softmax=null,
    ?int $dtype=null,
    ?int $seed=null,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **logits**: A Variable or NDArray of unnormalized log probabilities. The last dimension is the number of categories. Implicitly create Variable for NDArray.

Options

- **batchShape**: Shape of the batch to sample. If specified, the input must be one-dimensional.
- **softmax**: If true, apply softmax to the logits before sampling. The default is true.
- **dtype**: Data type of the output indices. The default is int32.
- **seed**: Random seed.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$logits = $g->Variable([[1,2,3],[1,1,1]]);
$y = $g->randomCategorical($logits,seed:0);
echo $mo->toString($y)."\n";

# shape: [2]

```
