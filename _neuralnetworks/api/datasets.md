---
layout: document
title: "Datasets"
grand_upper_section: index
upper_section: apitoc
previous_section: optimizers
next_section: sequential
---
Overview
-------

- namespace: Rindow\NeuralNetworks\Builder
- classname: Datasets

Create an instance of each dataset by calling method with the same name as the class name of the datasets.
Please refer to each dataset for usage.

Datasets
--------

- [**mnist**](minist.html): MNIST handwritten digits dataset.


Examples
--------

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$mnist = $nn->datasets()->mnist(),
```
