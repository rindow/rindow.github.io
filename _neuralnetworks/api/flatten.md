---
layout: document
title: "Flatten"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/activation
next_section: api/expanddims
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Flatten

Flattens the input. Just reshape from input data to flat shape in this layer.
Does not affect the batch size.

Flatten implements the operation:

- output := input->reshape(batchSize, inputSize)


Methods
-------

### constructor
```php
$builer->Flatten(
    array $options=[
        'input_shape'=>array $shape=null,
    ]
)
```
You can create a Flatten layer instances with the Layer Builder.


Options

- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Examples

```php
$model->add($nn->layers()->Flatten([
    'input_shape'=>[28,28,3],
]));
```
