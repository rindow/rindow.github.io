---
layout: document
title: "ReLU"
grand_upper_section: index
upper_section: apitoc
previous_section: flatten
next_section: sigmoid
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: ReLU

Rectified Linear Unit activation function.

Methods
-------

### constructor
```php
$builer->ReLU()
```
You can create a ReLU layer instances with the Layer Builder.

Examples

```php
$model->add($nn->layers()->ReLU());
```
