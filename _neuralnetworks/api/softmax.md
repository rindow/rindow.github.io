---
layout: document
title: "Softmax"
grand_upper_section: index
upper_section: apitoc
previous_section: sigmoid
next_section: dropout
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Softmax

Softmax activation function.

Methods
-------

### constructor
```php
$builer->Softmax()
```
You can create a Softmax layer instances with the Layer Builder.

Examples

```php
$model->add($nn->layers()->Softmax());
```
