---
layout: document
title: "AveragePooling3D"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/averagepooling2d
next_section: api/globalmaxpooling1d
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: AveragePooling3D

 3D pooling layer.
This layer reduces the size of three-dimensional input data by using the av erage value in the window as a representative value. The number of channels is preserved.
 It can be used for 3D data of more than one channel.
 Input data can be a 5D array of batch size, depth, height, width and number of channels.

AveragePooling3D implements the operation:

- output := averagepooling(input)


Methods
-------

### constructor
```php
$builer->AveragePooling3D(
    array $options=[
        'pool_size'=>2,
        'strides'=>null,
        'padding'=>"valid",
        'data_format'=>'channels_last',
        'input_shape'=>array $shape=null,
    ]
)
```
You can create a AveragePooling3D layer instances with the Layer Builder.

Options

- **pool_size**: Positive integer or array of integer. For a single integer, use a pooling size that has the same depth, height and width. Specify the window size when pooling. default is 2.
- **strides**: Positive integer or array of integer. For a single integer, use a kernel size that has the same depth, height and width. Specify the stride length of the pooling. default is same as pool_size.
- **padding**: Either "valid" or "same". If it is "valid", there is no padding.  Performs pooling with the valid range of input.  In the case of "same", the size of the input is expanded so that the output becomes the same size as the input, and that part is padded with zeros. default is "valid".
- **data_format**: Either "channels_last" or "channels_first". Specify which of the input shapes is the channel.
- **input_shape**: Specify the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Input shape

[Batch size, input data depth, input data height, input data width, number of channels] when **data_format** is "channels_last", [Batch size, number of input channels, input data depth, input data height, input data width] when "channels_first".
 five-dimensional NDArray.

Output shape

[Batch size, output data depth, output data height, output data width, number of filters] regardless of input shape and **data_format**.
 Five-dimensional NDArray.

Examples

```php
$model->add($nn->layers()->AveragePooling3D([
    'pool_size'=>2,
]));
```
