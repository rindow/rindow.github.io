---
layout: document
title: "Dense"
grand_upper_section: index
upper_section: apitoc
previous_section: modelloader
next_section: activation
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
    array $options=[
        'input_shape'=>array $shape=null,
        'activation'=>null,
        'use_bias'=>true,
        'kernel_initializer'=>'glorot_uniform',
        'bias_initializer'=>'zeros',
    ]
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
$model->add($nn->layers()->Dense(128,[
    'input_shape'=>[10],
    'kernel_initializer'=>'relu_normal',
    'bias_initializer'=>'zeros',
]));
```
