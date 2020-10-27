---
layout: document
title: "Losses"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/layers
next_section: api/optimizers
---
Overview
-------

- **namespace**: Rindow\NeuralNetworks\Builder
- **classname**: Losses

Create new loss function instances.

Create an instance of each loss function by calling method with the same name as the class name of the loss function.
Refer to the constructor of each loss function for details.

Loss functions
--------------

- [**MeanSquaredError**](meansquarederror.html): Mean Squared Error.
- [**BinaryCrossEntropy**](binarycrossentropy.html): Binary Cross Entropy.
- [**CategoricalCrossEntropy**](categoricalcrossentropy.html): Multi Categorical Cross Entropy.
- [**SparseCategoricalCrossEntropy**](sparsecategoricalcrossentropy.html): Sparse Multi Categorical Cross Entropy.

Examples
--------

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$model->compile([
    'loss'=>$nn->losses()->MeanSquaredError(),
]);
```
