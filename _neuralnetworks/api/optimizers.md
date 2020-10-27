---
layout: document
title: "Optimizers"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/losses
next_section: api/datasets
---
Overview
-------

- **namespace**: Rindow\NeuralNetworks\Builder
- **classname**: Optimizers

Create new optimizer instances.

Create an instance of each optimizer by calling method with the same name as the class name of the optimizer.
Refer to the constructor of each optimizer for details.

Optimizers
----------

- [**Adam**](adam.html): Adam optimization.
- [**SGD**](sgd.html): Stochastic gradient descent and momentum optimizer.

Examples
--------

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$model->compile([
    'optimizer'=>$nn->optimizers()->SGD(['lr'=>0.01]),
]);
```
