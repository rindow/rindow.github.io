---
layout: document
title: "AveragePooling1D"
grand_upper_section: index
upper_section: apitoc
previous_section: maxpooling3d
next_section: averagepooling2d
---


- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: AveragePooling1D

 1D pooling layer.
 
 This layer reduces the size of one-dimensional input data by using the average value within the window as a representative value.  The number of channels is preserved.
 It can be used for signal data of more than one channel or vector sequence of N-dimensional vector.
 Input data can be a 3D array of batch size, data length and number of channels.
 
AveragePooling1D implements the operation:

- output := averagepooling(input)


Methods
-------

### constructor
```php
$builer->AveragePooling1D(
    array $options=[
        'pool_size'=>2,
        'strides'=>null,
        'padding'=>"valid",
        'data_format'=>'channels_last',
        'input_shape'=>array $shape=null,
    ]
)
```
You can create a AveragePooling1D layer instances with the Layer Builder.

Options

- **pool_size**: Positive integer or array of integer. Specify the window size when pooling. default is 2.
- **strides**: Positive integer or array of integer. Specify the stride length of the pooling. default is same as pool_size.
- **padding**: Either "valid" or "same". If it is "valid", there is no padding.  Performs pooling with the valid range of input.  In the case of "same", the size of the input is expanded so that the output becomes the same size as the input, and that part is padded with zeros. default is "valid".
- **data_format**: Either "channels_last" or "channels_first". Specify which of the input shapes is the channel.
- **input_shape**: Specify the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Input shape

[Batch size, input data size, number of channels] when **data_format** is "channels_last", [Batch size, number of input channels, input data size] when "channels_first".
 Three-dimensional NDArray.


Output shape

[Batch size, output data size, number of filters] regardless of input shape and **data_format**.
 three-dimensional NDArray.
 
Examples

```php
$model->add($nn->layers()->AveragePooling1D([
    'pool_size'=>2,
]));
```