---
layout: document
title: "Conv1D"
grand_upper_section: index
upper_section: apitoc
previous_section: batchnormalization
next_section: conv2d
---


- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Conv1D

 1D convolution layer.
 This layer performs a one-dimensional convolution of the input data with kernel parameters.
 It can be used for convolution such as fluctuation of signal data of more than 1 channel.  It can also be used as a vector sequence of N-dimensional vectors.
 Input data can be a 3D array of batch size, data length and number of channels.

Conv1D implements the operation:

- output := convolution(input,kernel) + bias


Methods
-------

### constructor
```php
$builer->Conv1D(
    int $filters,
    $kernel_size,
    array $options=[
        'strides'=>1,
        'padding'=>"valid",
        'data_format'=>'channels_last',
        'input_shape'=>array $shape=null,
        'activation'=>null,
        'use_bias'=>true,
        'kernel_initializer'=>'sigmoid_normal',
        'bias_initializer'=>'zeros',
    ]
)
```
You can create a Conv1D layer instances with the Layer Builder.

Arguments

- **filters**: Positive integer. Number of output filters in the convolution. Reflected in the number of dimensions in the output space. 
- **kernel_size**: Positive integer or array of integer. Specify the window size when performing convolution.  This size is reflected in the size of the kernel parameter. 


Options

- **strides**: Positive integer or array of integer. Specify the stride length of the convolution. default is 1.

- **padding**: Either "valid" or "same". If it is "valid", there is no padding.  Performs convolution with the valid range of input.  In the case of "same", the size of the input is expanded so that the output becomes the same size as the input, and that part is padded with zeros. default is "valid".
- **data_format**: Either "channels_last" or "channels_first". Specify which of the input shapes is the channel.
- **input_shape**: Specify the first layer the shape of the input data. In input_shape, the batch dimension is not included.
- **activation**: N/A. Currently not implemented
- **use_bias**: N/A. Currently not implemented. always true.
- **kernel_initializer**: name of kernel initializer
- **bias_initializer**: name of bias initializer


Input shape

[Batch size, input data size, number of channels] when **data_format** is "channels_last", [Batch size, number of input channels, input data size] when "channels_first".
 Three-dimensional NDArray.

Output shape

[Batch size, output data size, number of filters] regardless of input shape and **data_format**.
 Three-dimensional NDArray.
 
Examples

```php
$model->add($nn->layers()->Conv1D(30,3,[
    'stride'=>1,
    'input_shape'=>[64,1],
    'kernel_initializer'=>'relu_normal',
    'bias_initializer'=>'zeros',
]));
```