---
layout: document
title: "CategoricalCrossEntropy"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/binarycrossentropy
next_section: api/sparsecategoricalcrossentropy
---

- **namespace**: Rindow\NeuralNetworks\Losses
- **classname**: CategoricalCrossEntropy

Categorical Cross Entropy loss function.

Use this crossentropy loss function when there are two or more label classes.
We expect labels to be provided in a `one_hot` representation.
If you want to provide labels as integers, please use `SparseCategoricalCrossentropy` loss.

Methods
-------

### constructor
```php
$builer->CategoricalCrossEntropy()
```
You can create a CategoricalCrossEntropy loss function instances with the Losses Builder.

Examples

```php
$model->compile([
    'loss'=>$nn->losses()->CategoricalCrossEntropy(),
]);
```
