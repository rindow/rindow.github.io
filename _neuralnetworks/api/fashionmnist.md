---
layout: document
title: "FashionMnist"
grand_upper_section: index
upper_section: apitoc
previous_section: mnist
next_section: cifar10
---


- **namespace**: Rindow\NeuralNetworks\Dataset
- **classname**: FashionMnist

Fashion MNIST images sample dataset.
See [Fashion MNIST web site](https://github.com/zalandoresearch/fashion-mnist).

Methods
-------

### constructor
```php
$builer->fashionMnist()
return $mnist
```
You can create a Fashion Mnist dataset instances with the Dataset Builder.


### loadData
```php
public function loadData(string $filePath=null)
return [[$train_images, $train_labels],
        [$test_images,  $test_labels ]];
```
Load dataset from the Fashion-MNIST public site. And translate to NDArray.
Downloaded data is cached.

Arguments:

- **filePath**: path where to cache the dataset locally.
    - Default path is sys_get_temp_dir().'/rindow/nn/datasets/fashionmnist'

Examples

```php
$mnist = $nn->datasets()->fashionMnist();
[[$train_images, $train_labels],
 [$test_images,  $test_labels ]] = $mnist->loadData(__DIR__.'/../data/mnist');
```
