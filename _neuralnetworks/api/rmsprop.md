---
layout: document
title: "RMSprop"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/adam
next_section: api/mnist
---

- **namespace**: Rindow\NeuralNetworks\Optimizer
- **classname**: RMSprop

RMSprop optimizer.
Maintain a moving (discounted) average of the square of gradients.

Methods
-------

### constructor
```php
$builer->RMSprop(
    float $lr=0.001,
    float $rho=0.9,
    float $decay=0.0,
    float $epsilon=null,
)
```
You can create a Adam optimizer instances with the Optimizer Builder.

Options

- **lr**: learning rate.
    - float >= 0
    - default is 0.001
- **rho**: Discounting factor for the history/coming gradient.
    - float >= 0
    - default is 0.9
- **decay**: The exponential decay rate.
    - float >= 0
    - default is 0.0
- **epsilon**: "epsilon hat" in the [Kingma and Ba paper](https://arxiv.org/abs/1412.6980)
    - float >= 0
    - default is epsilon defined in backend(see backend).


Examples

```php
$model->compile(
    optimizer:$nn->optimizers()->RMSprop(
        lr:      0.001,
    )
);
```
