---
layout: document
title: "GlobalAveragePooling2D"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/globalaveragepooling1d
next_section: api/globalaveragepooling3d
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: GlobalAveragePooling2D

Global mean for each channel in image data.

GlobalAveragePooling2D implements the operation:

- output := globalaveragepooling(input)


Methods
-------

### constructor
```php
$builer->GlobalAveragePooling2D(
    string $data_format='channels_last',
    array $input_shape=null,
    string $name=null,
)
```
You can create a GlobalAveragePooling2D layer instances with the Layer Builder.

Options

- **data_format**: Either "channels_last" or "channels_first". Specify which of the input shapes is the channel.
- **input_shape**: Specify the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Input shape

[Batch size, height, width, number of channels] when **data_format** is "channels_last", [Batch size, number of input channels,  height, width] when "channels_first".
 Four-dimensional NDArray.


Output shape

[Batch size, channels] regardless of input shape and **data_format**.
 two-dimensional NDArray.

Examples

```php
$model->add($nn->layers()->GlobalAveragePooling2D());
```
