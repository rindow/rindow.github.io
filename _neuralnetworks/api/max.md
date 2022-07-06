---
layout: document
title: "Max"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/gather
next_section: api/dropout
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Max

Max the inputs on the specified axis.

Max implements the operation:

- output := reduce_max(input, axis)


Methods
-------

### constructor
```php
$builer->Max(
    int $axis=-1,
    array $input_shape=null,
    string $name=null,
)
```
You can create a Flatten layer instances with the Layer Builder.


Options

- **axis**: axis of input to compute
- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Examples

```php
$model->add($nn->layers()->Max(
    axis:0,
));
```
