---
layout: document
title: "ModelLoader"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/sequential
next_section: api/dense
---

- **namespace**: Rindow\NeuralNetworks\Model
- **classname**: ModelLoader

Instantiates a model from saved model informations.
ModelLoader is implicitly instantiated by the builder and called directly from the builder method. see [models builder](models.html)

Methods
-------

### modelFromConfig
```php
public function modelFromConfig(
    $config
)
return $model
```

Instantiates a model from its configuration.
This configuration does not include weight information. The model can be learned from the initial state.

- **config**: Configuration array or object.

Returns

- **model**: model instance.


Examples

```php
$model = $nn->models()->modelFromConfig($config);
```

### loadModel
```php
public function loadModel(
    $filepath
)
return $model
```
Loads a model saved via the "save" method of a model.
This instance does not contain the stored weight information.

- **filepath**: String, path to the saved model.

Returns

- **model**: model instance.


Examples

```php
$model = $nn->models()->loadModel(__DIR__.'/../data/samples.model');
```
