---
layout: document
title: "Gather"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/repeatvector
next_section: api/max
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Gather

Gather slices from params axis according to indices. 

Methods
-------

### constructor
```php
$builer->Gather(
    int $axis=-1,
    array $input_shapes=null,
    string $name=null,
)
```
You can create a Gather layer instances with the Layer Builder.


Options

- **axis**: The axis of the input data to slice.
- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Examples

```php
$model->add($nn->layers()->Gather(
    axis:1,
));
```
