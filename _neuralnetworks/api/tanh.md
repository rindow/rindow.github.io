---
layout: document
title: "Tanh"
grand_upper_section: index
upper_section: apitoc
previous_section: softmax
next_section: meansquarederror
---

- **namespace**: Rindow\NeuralNetworks\Activation
- **classname**: Tanh

Tanh activation function.

Methods
-------

### constructor
```php
Rindow\NeuralNetworks\Activation\FunctionFactory::factory($backend,'tanh');
```
You can create a Tanh function instances with the FunctionFactory.
Generally, FunctionFactory is called inside the layer class.

Examples

```php
$model->add($nn->layers()->Activation('tanh'));
...
$model->add($nn->layers()->SimpleRNN(10,['activation'=>'tanh']));
```
