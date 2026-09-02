---
layout: document
title: "Softmax"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/sigmoid
next_section: api/tanh
---

- **namespace**: Rindow\NeuralNetworks\Activation
- **classname**: Softmax

Softmax activation function.

Methods
-------

### constructor
```php
Rindow\NeuralNetworks\Activation\FunctionFactory::factory($backend,'softmax');
```
You can create a Softmax function instances with the FunctionFactory.
Generally, FunctionFactory is called inside the layer class.

Examples

```php
$model->add($nn->layers()->Activation('softmax'));
...
$model->add($nn->layers()->Dense(10,activation:'softmax'));
```
