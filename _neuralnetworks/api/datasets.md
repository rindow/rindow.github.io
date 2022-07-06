---
layout: document
title: "Datasets"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/gradient
next_section: api/data
---
Overview
-------

- namespace: Rindow\NeuralNetworks\Builder
- classname: Datasets

Create an instance of each dataset by calling method with the same name as the class name of the datasets.
Please refer to each dataset for usage.

Datasets
--------

- [**Mnist**](mnist.html): MNIST handwritten digits dataset.
- [**FashionMnist**](fashionmnist.html): Fashion MNIST dataset.
- [**Cifar10**](cifar10.html): CIFAR-10 image dataset.


Examples
--------

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$mnist = $nn->datasets()->mnist(),
```
