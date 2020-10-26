---
layout: document
title: "BatchNormalization"
grand_upper_section: index
upper_section: apitoc
previous_section: dropout
next_section: conv1d
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: BatchNormalization

Batch Normalization layer.

Normalize the previous activation function layer at each batch

Methods
-------

### constructor
```php
$builer->BatchNormalization(
    array $options=[
        'momentum'=>0.99,
        'epsilon'=>0.001,
        'beta_initializer'=>'zeros',
        'gamma_initializer'=>'ones',
        'moving_mean_initializer'=>'zeros',
        'moving_variance_initializer'=>'ones',
    ]
)
```
You can create a BatchNormalization layer instances with the Layer Builder.

Options

- **momentum**: Momentum for the moving average.
    - default is 0.99
- **epsilon**: Small float added to variance to avoid dividing by zero.
    - default is 0.001
- **beta_initializer**: name of initializer for the beta weight.
    - default is zeros
- **gamma_initializer**: name of initializer for the gamma weight.
    - default is ones
- **moving_mean_initializer**: name of initializer for the moving mean.
    - default is zeros
- **moving_variance_initializer**: name of initializer for the moving variance.
    - default is ones

Examples

```php
$model->add($nn->layers()->BatchNormalization([
    'momentum'=>0.99,
    'epsilon'=>0.001,
    'beta_initializer'=>'zeros',
    'gamma_initializer'=>'ones',
    'moving_mean_initializer'=>'zeros',
    'moving_variance_initializer'=>'ones',
]));
```
