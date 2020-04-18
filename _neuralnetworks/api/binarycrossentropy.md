---
layout: document
title: "BinaryCrossEntropy"
grand_upper_section: index
upper_section: apitoc
previous_section: meansquarederror
next_section: categoricalcrossentropy
---

- **namespace**: Rindow\NeuralNetworks\Losses
- **classname**: BinaryCrossEntropy

Binary Cross Entropy loss function.

Use this cross-entropy loss when there are only two label classes (assumed to be 0 and 1). For each example, there should be a single floating-point value per prediction.

Methods
-------

### constructor
```php
$builer->BinaryCrossEntropy()
```
You can create a BinaryCrossEntropy loss function instances with the Losses Builder.

Examples

```php
$model->compile([
    'loss'=>$nn->losses()->BinaryCrossEntropy(),
]);
```
