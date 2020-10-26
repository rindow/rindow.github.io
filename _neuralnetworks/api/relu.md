---
layout: document
title: "ReLU"
grand_upper_section: index
upper_section: apitoc
previous_section: attention
next_section: sigmoid
---

- **namespace**: Rindow\NeuralNetworks\Activation
- **classname**: ReLU

Rectified Linear Unit activation function.

Methods
-------

### constructor
```php
Rindow\NeuralNetworks\Activation\FunctionFactory::factory($backend,'relu');
```
You can create a ReLU function instances with the FunctionFactory.
Generally, FunctionFactory is called inside the layer class.

Examples

```php
$model->add($nn->layers()->Activation('relu'));
...
$model->add($nn->layers()->Dense(10,['activation'=>'relu']));
```
