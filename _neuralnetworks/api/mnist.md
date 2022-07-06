---
layout: document
title: "Mnist"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/reducemean
next_section: api/fashionmnist
---


- **namespace**: Rindow\NeuralNetworks\Dataset
- **classname**: Mnist

MNIST handwritten digits sample dataset.
See [MNIST web site](http://yann.lecun.com/exdb/mnist/).

Methods
-------

### constructor
```php
$builer->mnist()
return $mnist
```
You can create a Mnist dataset instances with the Dataset Builder.


### loadData
```php
public function loadData(string $filePath=null)
return [[$train_images, $train_labels],
        [$test_images,  $test_labels ]];
```
Load dataset from the MNIST public site. And translate to NDArray.
Downloaded data is cached.

Arguments:

- **filePath**: path where to cache the dataset locally.
    - Default path is sys_get_temp_dir().'/rindow/nn/datasets/mnist'

Examples

```php
$mnist = $nn->datasets()->mnist();
[[$train_images, $train_labels],
 [$test_images,  $test_labels ]] = $mnist->loadData(__DIR__.'/../data/mnist');
```
