---
layout: document
title: "AbstractModel"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/modelloader
next_section: api/dense
---

- **namespace**: Rindow\NeuralNetworks\Model
- **classname**: AbstractModel

Abstract model to inherit when creating a custom model.

Methods
-------

### constructor
```php
public function __construct(
    $backend,
    $builder,
    $hda=null
)
```
Create a model with confidence in the back-end arithmetic library that can be obtained from the builder and the builder object.
Since it is an abstract class, it must be inherited to the custom model created by the developer.

- **backend**: the back-end arithmetic library.
- **builder**: the builder object.
- **hda**: the structured data module.

Examples

```php
class MyModel extends AbstractModel
{
    public function __construct($backend,$builder)
    {
        parent::__construct($backend,$builder);
        $this->dense1 = $builder->Dense(10,['input_shape'=>[8]]);
    }

    public function call($inputs)
    {
        $outputs = $this->dense1->forward($inputs);
        return $outputs;
    }
}
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$model = new MyModel($nn->backend(),$nn);

```

### backend
```php
protected $backend;
```
Backend calculation library.

### builder
```php
protected $builder;
```
Builder instance.

### call
```php
protected function call(...$inputs)
```
The method to be called.
The model implementation is described in this method.

### compile
```php
public function compile(
    array $options=[
        'optimizer'=>'SGD',
        'loss'=>'SparseCategoricalCrossEntropy',
        'metrics'=>array<string> $metrics=['loss','accuracy'],
    ]=null
) : void
```
Compile a model to configure the learning process.
Several options can be specified.

- **optimizer**:
    - Specify the optimizer instance.
    - Default is the SGD.
- **loss**:
    - Specify an instance of the loss function.
    - Default is the SparseCategoricalCrossEntropy.
- **metrics**:
    - Specify the type of metrics in the list.
    - The default is ['loss', 'accuracy'].

Examples


```php
# For Adam,MeanSquaredError
$model->compile([
    'optimizer'=>$nn->optimizers()->Adam(),
    'loss'=>$nn->losses()->MeanSquaredError(),
    'metrics'=>['accuracy','loss'],
]);
```
```php
# For Defaults: SparseCategoricalCrossEntropy, SGD
$model->compile();
```


### fit
```php
public function fit(
        NDArray $inputs,
        NDArray $tests,
        array $options=[
            'batch_size'=>32,
            'epochs'=>1,
            'verbose'=>1,
            'validation_data'=>array<NDArray>$val_data=null,
            'shuffle'=>true,
        ]=null
) : array
return array $history
```
The models are trained on the NDArray of input data and labels.
For training a model, you will typically use the fit method.

- **inputs**: Input data in most cases.
    - Normally, the input data is in the form of batch data.
    - NDArray datasets.
- **tests**: Test target data in most cases.
    - The test data is arranged in the order corresponding to the input data.
    - NDArray datasets.

Several options can be specified.

- **batch_size**: Batch size
    - Number of samples per paramator values update.
    - Default is 32.
- **epochs**: Specify an instance of the loss function.
    - How many times to train the model repeatedly
    - Default is 1.
- **verbose**: Verbosity mode.
    - 0 = silent, 1 or greater = progress bar and metrics per epoch.
    - The default is 1.
- **validation_data**: evaluate data set.
    - Data on which to evaluate the loss and any model metrics at the end of each epoch.
    - List [inputs_val, tests_val] of NDArray
    - The default is Null. Mean not to evaluate
- **shuffle**: Shuffle mode.
    - Boolean whether to shuffle the training data before each epoch
    - The default is true.

Returns

- **history**: metrics history
    - Array with key as metrics name which is the list of float values.

Examples

```php
# Train the model
$history = $model->fit($data,$labels,[
        'epochs'=>10,'batch_size'=>8,'verbose'=>1,
        'validation_data'=>[$inputs_val, $tests_val],
        'shuffle'=>true,
]);
$loss = $mo->array($history['loss']);
$accuracy = $mo->array($history['accuracy']);
```

### evaluate
```php
public function evaluate(
    NDArray $inputs,
    NDArray $tests,
    array $options=[
        'batch_size'=>32,
        'verbose'=>0,
    ]=null
) : array<float>
return [$loss,$accuracy]
```
Returns the loss value & metrics values for the model in test mode.

The models evaluate on the NDArray of input data and tests.

- **inputs**: Input data in most cases.
    - Normally, the input data is in the form of batch data.
    - NDArray datasets.
- **tests**: Test target data in most cases.
    - The test data is arranged in the order corresponding to the input data.
    - NDArray datasets.

Several options can be specified.

- **batch_size**: Batch size
    - Number of samples per paramator values update.
    - Default is 32.
- **verbose**: Verbosity mode.
    - 0 = silent, 1 or greater = progress bar and metrics per epoch.
    - The default is 0.

Returns

- **loss**: test loss
- **accuracy**: test accuracy

Examples

```php
[$loss,$accuracy] = $model->evaluate($data,$labels,[
        'batch_size'=>8,'verbose'=>1,
]);
```

### predict
```php
public function predict(
    NDArray $inputs
) : NDArray
return $predictions
```
Returns predictions for sample data.

The models predict on the NDArray of input data.

- **inputs**: Input data in most cases.
    - Normally, the input data is in the form of batch data.
    - NDArray datasets.

Returns

- **predictions**: test accuracy
    - The prediction data is arranged in the order corresponding to the input data.
    - NDArray datasets.

Examples

```php
$data = $mo->array([[1,2,3],[4,5,6]]);
$predictions = $model->predict($data);
```

### saveWeights
```php
public function saveWeights(
    &$modelWeights,
    $portable=false
) : void
```
Saves all layer weights.

- **modelWeights**: model weights container
    - Specify the save destination objecct or array.
- **portable**: Save mode.
    - **true**: Save in a hardware-independent format. However, the conversion takes time and the weight information has an error due to the conversion.
    - **false**:Save in a hardware-dependent format. You can save at high speed.

Examples

```php
$modelWeights = [];
$model->saveWeights(
    $modelWeights, $portable=true);
```

### loadWeights
```php
public function loadWeights(
    $modelWeights
) : void
```
Load the weight information saved by saveWeights into the model.

- **modelWeights**: model weights container

Examples

```php
$model->loadWeights($modelWeights);
```

### saveWeightsToFile
```php
public function saveWeightsToFile($filepath,$portable=null) : void
```
Save the weights in the model to a file


### loadWeightsFromFile
```php
public function loadWeightsFromFile($filepath)
```
Load the weights in the model from the file


### summary
```php
public function summary()
```
Show internal structure

### forward
```php
public function forward(...$inputs)
```
Model forward step. "call" method is called.

Use this method when calling a child model from within
a parent model by nesting the model.

### trueValuesFilter
```php
protected function trueValuesFilter(NDArray $trues) : NDArray
```
Process the trues input when performing training or evaluation.

Raw data is passed to the model input, and processed data is passed to the loss function and accuracy function.
