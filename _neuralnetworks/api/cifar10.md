---
layout: document
title: "Cifar10"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/fashionmnist
next_section: api/preprocessor
---

- **namespace**: Rindow\NeuralNetworks\Dataset
- **classname**: Cifar10

CIFAR-10 images sample dataset.
See [CIFAR-10 web site](https://www.cs.toronto.edu/~kriz/cifar.html).

Methods
-------

### constructor
```php
$builer->cifar10()
return $dataset
```
You can create a CIFAR-10 dataset instances with the Dataset Builder.


### loadData
```php
public function loadData(string $filePath=null)
return [[$train_images, $train_labels],
        [$test_images,  $test_labels ]];
```
Load dataset from the CIFAR-10 public site. And translate to NDArray.
Downloaded data is cached.

Arguments:

- **filePath**: path where to cache the dataset locally.
    - Default path is sys_get_temp_dir().'/rindow/nn/datasets/cifar-10-batches-bin'

Examples

```php
$cifar10 = $nn->datasets()->cifar10();
[[$train_images, $train_labels],
 [$test_images,  $test_labels ]] = $cifar10->loadData(__DIR__.'/../data/cifar10');
```
