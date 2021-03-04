---
layout: document
title: "GlobalMaxPooling1D"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/averagepooling3d
next_section: api/globalmaxpooling2d
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: GlobalMaxPooling1D

Global max value for each channel in time series data.

GlobalMaxPooling1D implements the operation:

- output := globalmaxpooling(input)


Methods
-------

### constructor
```php
$builer->GlobalMaxPooling1D(
    array $options=[
        'data_format'=>'channels_last',
        'input_shape'=>array $shape=null,
    ]
)
```
You can create a GlobalMaxPooling1D layer instances with the Layer Builder.

Options

- **data_format**: Either "channels_last" or "channels_first". Specify which of the input shapes is the channel.
- **input_shape**: Specify the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Input shape

[Batch size, input data size, number of channels] when **data_format** is "channels_last", [Batch size, number of input channels, input data size] when "channels_first".
 Three-dimensional NDArray.


Output shape

[Batch size, channels] regardless of input shape and **data_format**.
 two-dimensional NDArray.

Examples

```php
$model->add($nn->layers()->GlobalMaxPooling1D());
```
