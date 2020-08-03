---
layout: document
title: "Conv3D"
grand_upper_section: index
upper_section: apitoc
previous_section: conv2d
next_section: maxpooling1d
---


- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Conv3D

 3D convolution layer.
This layer performs a 3D convolution of the input data with kernel parameters.
 It can be used for convolving 3D data of more than 1 channel.
 Input data can be a 5D array of batch size, depth, height, width, and number of channels.
 

Conv3D implements the operation:

- output := convolution(input,kernel) + bias


Methods
-------

### constructor
```php
$builer->Conv3D(
    int $filters,
    $kernel_size,
    array $options=[
        'strides'=>1,
        'padding'=>null,
        'data_format'=>null,
        'input_shape'=>array $shape=null,
        'activation'=>null,
        'use_bias'=>true,
        'kernel_initializer'=>'sigmoid_normal',
        'bias_initializer'=>'zeros',
    ]
)
```
You can create a Conv3D layer instances with the Layer Builder.

Arguments

- **filters**: Positive integer. Number of output filters in the convolution. Reflected in the number of dimensions in the output space. 
- **kernel_size**: Positive integer or array of integer. For a single integer, use a kernel size that has the same depth, height and width. Specify the window size when performing convolution.  This size is reflected in the size of the kernel parameter. 


Options

- **strides**: Positive integer or array of integer. For a single integer, use a kernel size that has the same depth, height and width. Specify the stride length of the convolution. default is 1.
- **padding**: Either "valid" or "same". If it is "valid", there is no padding.  Performs convolution with the valid range of input.  In the case of "same", the size of the input is expanded so that the output becomes the same size as the input, and that part is padded with zeros. default is "valid".
- **data_format**: Either "channels_last" or "channels_first". Specify which of the input shapes is the channel.
- **input_shape**: Specify the first layer the shape of the input data. In input_shape, the batch dimension is not included.
- **activation**: N/A. Currently not implemented
- **use_bias**: N/A. Currently not implemented. always true.
- **kernel_initializer**: name of kernel initializer
- **bias_initializer**: name of bias initializer

Input shape

[Batch size, input data depth,  input data height, input data width, number of channels] when **data_format** is "channels_last", [Batch size, number of input channels, input data depth,  input data height, input data width] when "channels_first".
 Five-dimensional NDArray.

Output shape

[Batch size, output data depth, output data height, output data width, number of filters] regardless of input shape and **data_format**.
 Five-dimensional NDArray.

Examples

```php
$model->add($nn->layers()->Conv3D(30,3,[
    'stride'=>1,
    'input_shape'=>[28,28,28,3],
    'kernel_initializer'=>'relu_normal',
    'bias_initializer'=>'zeros',
]));
```