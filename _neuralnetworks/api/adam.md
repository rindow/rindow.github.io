---
layout: document
title: "Adam"
grand_upper_section: index
upper_section: apitoc
previous_section: adam
next_section: mnist
---

- **namespace**: Rindow\NeuralNetworks\Optimizer
- **classname**: Adam

Adam optimization is a stochastic gradient descent method that is based on adaptive estimation of first-order and second-order moments.

Methods
-------

### constructor
```php
$builer->Adam(
    array $options=[
        'lr'      => 0.001,
        'beta1'   => 0.9,
        'beta2'   => 0.999,
        'epsilon' => null,
    ]
)
```
You can create a Adam optimizer instances with the Optimizer Builder.

Options

- **lr**: learning rate.
    - float >= 0
    - default is 0.001
- **beta1**: The exponential decay rate for the 1st moment estimates.
    - float >= 0
    - default is 0.9
- **beta2**: The exponential decay rate for the 2nd moment estimates.
    - float >= 0
    - default is 0.999
- **epsilon**: "epsilon hat" in the [Kingma and Ba paper](https://arxiv.org/abs/1412.6980)
    - float >= 0
    - default is epsilon defined in backend(see backend).


Examples

```php
$model->compile([
    $nn->optimizers()->Adam([
        'lr'      => 0.001,
        'beta1'   => 0.9,
        'beta2'   => 0.999,
        'epsilon' => 1e-7,
    ]),
]);
```
