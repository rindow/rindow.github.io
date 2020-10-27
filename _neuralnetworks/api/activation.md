---
layout: document
title: "Activation"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/dense
next_section: api/flatten
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Activation

Applies an activation function to an output.

Methods
-------

### constructor
```php
$builer->Activation(
    $activation,
    array $options=[
        'input_shape'=>array $shape=null,
    ]
)
```
You can create a Activation layer instances with the Layer Builder.

Argument

- **activation**: Strings and activation function object instances are allowed as arguments. 'sigmoid','softmax', etc.

Options

- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Examples

```php
$model->add($nn->layers()->Activation('softmax'));
```
