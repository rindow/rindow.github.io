---
layout: document
title: "Models"
grand_upper_section: index
upper_section: apitoc
previous_section: neuralnetworks
next_section: layers
---
Overview
-------

- **namespace**: Rindow\NeuralNetworks\Builder
- **classname**: Models

Create a new model or generate a model instance from a saved model.

Methods
-------

### Sequential

```php
public function Sequential(
    array $layers=null
)
return $model
```
Create the new Sequential model instance.

See the constructor of the ["Sequential"](sequential).

### loadModel

```php
public function loadModel(
    $filepath
)
return $model
```
Generate the saved model instance from $filepath.

See the loadModel method of the "ModelLoader".

### modelFromConfig

```php
public function modelFromConfig(
    $modelFromConfig
)
return $model
```
Generate the saved model instance from $modelFromConfig.
The generated model does not include the trained data.

See the loadModel method of the "ModelLoader".


Examples
--------

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;

$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$model = $nn->models()->Sequential([
    $dense   = $nn->layers()->Dense(128,['input_shape'=>[10]]);
    $softmax = $nn->layers()->Sigmoid();
    $dense   = $nn->layers()->Dense(1);
    $softmax = $nn->layers()->Sigmoid();
]);
```

```php
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$model = $nn->models()->loadModel(__DIR__.'/mnist_model.model');
```

```php
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$model = $nn->models()->modelFromConfig($config);
```
