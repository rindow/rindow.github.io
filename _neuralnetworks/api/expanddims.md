---
layout: document
title: "ExpandDims"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/flatten
next_section: api/concatenate
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: ExpandDims

Extends the specified dimension of the input.
This layer only transforms the shape of the input data.
It does not affect the batch size.

ExpandDims implements the operation:

- If axis == 0
- then output := input->reshape(batchSize, 1, inputSize)
- If axis == 1
- then output := input->reshape(batchSize, inputFirstDim, 1, inputOtherDims)
- If axis == -1
- then output := input->reshape(batchSize, inputSize, 1)

Methods
-------

### constructor
```php
$builer->ExpandDims(
    int $axis,
    array $input_shape=null,
    string $name=null,
)
```
You can create a ExpandDims layer instances with the Layer Builder.


Options

- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Examples

```php
$model->add($nn->layers()->ExpandDims(
    -1,
    input_shape:[28,28,3],
));
```
