---
layout: document
title: "Dense"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/abstractmodel
next_section: api/activation
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Dense

Just your regular densely-connected Neural Networks layer.

Dense implements the operation:

- output := dot(input,kernel) + bias


Methods
-------

### constructor
```php
$builer->Dense(
        int $units,
        array $input_shape=null,
        string|object $activation='linear',
        bool $use_bias=true,
        string|callable $kernel_initializer='glorot_uniform',
        string|callable $bias_initializer='zeros',
        string $name=null,
)
```
You can create a Dense layer instances with the Layer Builder.

Arguments

- **units**: Positive integer, dimensionality of the output space.

Options

- **input_shape**: Specify the first layer the shape of the input data. In input_shape, the batch dimension is not included.
- **activation**: Activation function. Default is nothing.
- **use_bias**: Whether the layer uses a bias vector. Default is true.
- **kernel_initializer**: name of kernel initializer
- **bias_initializer**: name of bias initializer

Examples

```php
$model->add($nn->layers()->Dense(128,
    input_shape:[10],
    kernel_initializer:'he_normal',
    bias_initializer:'zeros',
));
```
