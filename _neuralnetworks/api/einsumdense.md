---
layout: document
title: "EinsumDense"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/addlayer
next_section: api/inheritmask
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: EinsumDense

Just your regular densely-connected Neural Networks layer.

EinsumDense implements the operation:

- output := einsum(equation,input,kernel) + bias


Methods
-------

### constructor
```php
$builer->EinsumDense(
        string $equation,
        int|array $output_shape,
        ?array $input_shape=null,
        string|Activation|null $activation=null,
        ?string $bias_axes=null,
        string|callable|null $kernel_initializer=null,
        string|callable|null $bias_initializer=null,
        ?string $name=null,
)
```
You can create a EinsumDense layer instances with the Layer Builder.

Arguments

- **equation**: Equation String.
- **output_shape**: Output shape. the batch dimension is not included.

Options

- **input_shape**: Specify the first layer the shape of the input data. In input_shape, the batch dimension is not included.
- **activation**: Activation function. Default is nothing.
- **bias_axes**: Bias axes. Default is not use bias.
- **kernel_initializer**: name of kernel initializer
- **bias_initializer**: name of bias initializer

Examples

```php
$dense = $nn->layers()->EinsumDense(
    'ab,bc->ac',
    [256],
);
...
$x = $g->Variable([[0.1,0.2,0.3],[0.4,0.5,0.6]]);
...
$output = $dense->forward($x);
```
