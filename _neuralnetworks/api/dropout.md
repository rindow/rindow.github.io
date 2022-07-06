---
layout: document
title: "Dropout"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/max
next_section: api/batchnormalization
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Dropout

Dropout layer.

Applies Dropout to the input.

Methods
-------

### constructor
```php
$builer->Dropout(
    float $rate,
    string $name=null,
)
```
You can create a Dropout layer instances with the Layer Builder.

Arguments

- **rate**: Fraction of the input units to drop.
    - Float between 0 and 1.

Examples

```php
$model->add($nn->layers()->Dropout(0.15));
```
