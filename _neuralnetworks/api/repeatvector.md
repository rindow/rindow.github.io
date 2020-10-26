---
layout: document
title: "RepeatVector"
grand_upper_section: index
upper_section: apitoc
previous_section: concatenate
next_section: dropout
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: RepeatVector

Layer that concatenates a list of inputs.

Combines the listed NDArrays on the specified axis and outputs.


Concatenate implements the operation:

- output := concat([input1, input2....], axis=-1)


Methods
-------

### constructor
```php
$builer->RepeatVector(
    int $repeats,
    array $options=[
        'input_shape'=>array $shape=null,
    ]
)
```
You can create a Concatenate layer instances with the Layer Builder.


Arguments

- **repeats**: Number of repetitions.

Options

- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.


Input shape
-------------------
2D array of shape.

[batchsize, features]

Output shape
-------------------
3D array of shape.

[batchsize, repeats, features]

```php
$concat = $builder->layers()->RepeatVector($repeats=3);
....
$inputs = $mo->ones([4,2]);
....
$outputs = $concat->forward($inputs,true);
# $outputs->shape() : [4,3,2]
```

Examples
--------

```php
$model->add($nn->layers()->RepeatVector($repeats=8));
```
