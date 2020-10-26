---
layout: document
title: "Sigmoid"
grand_upper_section: index
upper_section: apitoc
previous_section: relu
next_section: softmax
---

- **namespace**: Rindow\NeuralNetworks\Activation
- **classname**: Sigmoid

Sigmoid activation function.

Methods
-------

### constructor
```php
Rindow\NeuralNetworks\Activation\FunctionFactory::factory($backend,'sigmoid');
```
You can create a Sigmoid function instances with the FunctionFactory.
Generally, FunctionFactory is called inside the layer class.

Examples

```php
$model->add($nn->layers()->Activation('sigmoid'));
...
$model->add($nn->layers()->Dense(10,['activation'=>'sigmoid']));
```
