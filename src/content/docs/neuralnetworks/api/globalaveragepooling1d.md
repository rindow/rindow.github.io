---
layout: document
title: "GlobalAveragePooling1D"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/globalmaxpooling3d
next_section: api/globalaveragepooling2d
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: GlobalAveragePooling1D

Global mean for each channel in time series data.

GlobalAveragePooling1D implements the operation:

- output := globalaveragepooling(input)


Methods
-------

### constructor
```php
$builer->GlobalAveragePooling1D(
    string $data_format='channels_last',
    array $input_shape=null,
    string $name=null,
)
```
You can create a GlobalAveragePooling1D layer instances with the Layer Builder.

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
$model->add($nn->layers()->GlobalAveragePooling1D());
```
