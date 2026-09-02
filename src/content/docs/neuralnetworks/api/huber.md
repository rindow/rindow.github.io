---
layout: document
title: "Huber"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/sparsecategoricalcrossentropy
next_section: api/sgd
---

- **namespace**: Rindow\NeuralNetworks\Losses
- **classname**: Huber

Huber loss function.

For each value x in x = trues - predicts, d = delta
Specify the delta value and use the two expressions properly

- loss = 0.5 * x^2                  if |x| <= d
- loss = 0.5 * d^2 + d * (|x| - d)  if |x| > d

Methods
-------

### constructor
```php
$builer->Huber(
    float $delta=1.0
)
```
You can create a BinaryCrossEntropy loss function instances with the Losses Builder.

Examples

```php
$model->compile(
    loss:$nn->losses()->Huber(delta:0.8),
);
```
