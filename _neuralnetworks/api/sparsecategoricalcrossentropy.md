---
layout: document
title: "SparseCategoricalCrossEntropy"
grand_upper_section: index
upper_section: apitoc
previous_section: categoricalcrossentropy
next_section: sgd
---

- **namespace**: Rindow\NeuralNetworks\Losses
- **classname**: SparseCategoricalCrossEntropy

Sparse Categorical Cross Entropy loss function.

Use this crossentropy loss function when there are two or more label classes.
We expect labels to be provided as integers. If you want to provide labels
using `one-hot` representation, please use `CategoricalCrossentropy` loss.


Methods
-------

### constructor
```php
$builer->SparseCategoricalCrossEntropy()
```
You can create a SparseCategoricalCrossEntropy loss function instances with the Losses Builder.

Examples

```php
$model->compile([
    'loss'=>$nn->losses()->SparseCategoricalCrossEntropy(),
]);
```
