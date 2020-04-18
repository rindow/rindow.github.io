---
layout: document
title: "Layers"
grand_upper_section: index
upper_section: apitoc
previous_section: models
next_section: losses
---
Overview
-------

- **namespace**: Rindow\NeuralNetworks\Builder
- **classname**: Layers

Create new layer instances.

Create an instance of each layer by calling method with the same name as the class name of the layer.
Refer to the constructor of each layer for details.

Layers
------

- [**Dense**](dense.html): Regular densely-connected Neural Networks layer.
- [**ReLU**](relu.html): Rectified Linear Unit activation function.
- [**Sigmoid**](sigmoid.html): Sigmoid activation function.
- [**Softmax**](softmax.html): Softmax activation function.
- [**Dropout**](dropout.html): Applies Dropout to the input.
- [**BatchNormalization**](batchnormalization.html): Normalize the previous activation function layer at each batch.


Examples
--------

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;

$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$model = $nn->models()->Sequential([
    $nn->layers()->Dense(128,['input_shape'=>[10]]);
    $nn->layers()->Sigmoid();
    $nn->layers()->Dense(1);
    $nn->layers()->Sigmoid();
]);
```
