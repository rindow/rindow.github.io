---
layout: document
title: "How to create a custom model"
upper_section: index
previous_section: sequentialmodel
next_section: autodiff
---

Getting started with the Custom model
-----------------------------------------
Neural network models cannot always be built with a linear stack.
Sometimes the developer himself wants to describe the order in which the layers are executed.

For such cases, this framework provides how to create a Custom Model.

Inherit AbstractModel to define a class for your model.

```php
use Rindow\NeuralNetworks\Model\AbstractModel;
class MyModel extends AbstractModel
{
    ........
}
```

Create the layer to be used in the constructor in advance.

```php
class MyModel extends AbstractModel
{
    public function __construct($backend,$builder)
    {
        parent::__construct($backend,$builder);
        $this->dense1 = $builder->layers->Dense($units=128,
            input_shape:[(int)array_product([28,28,1])],
            kernel_initializer:'he_normal',
            activation:'relu',
        );
        $this->dense2 = $builder->layers->Dense($units=10);
    }

    ........
}
```

Describe the layer execution procedure in the call method.

Considering that it will be called from the fit method later, the call method arguments are the input data first, the Boolean value of whether or not training is being performed second, and the teacher data third. Generally, teacher data is not used, so it can be omitted.

The layer's forward step calls the forward method.

```php
class MyModel extends AbstractModel
{
    ........

    protected function call($inputs,$training)
    {
        $x = $this->dense1->forward($inputs,$training);
        $outputs = $this->dense2->forward($x,$training);
        return $outputs;
    }
}
```

Create an instance of the model.

```php
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$model = new MyModel($nn->backend(),$nn);
```

Compilation
-----------
Call the compile method before training the model to automatically build the computational graph.

It receives three options:

- An optimizer. This could be an instance of the Optimizer. The default is "SGD". see Optimizers
- An loss function. This is the objective that the model will try to minimize. It can be an instance of loss function. The default is "SparseCategoricalCrossEntropy". See Losses.
- A list of metrics. Specify a list of strings of items to be written to the history of training. Currently, only "accuracy" and "loss" can be specified.

```php
$model->compile(
    loss:$nn->losses()->SparseCategoricalCrossentropy(from_logits:true),
    optimizer:'adam',
);
$model->summary();
```

Training
--------
The models are trained on the NDArray of input data and labels. For training a model, you will typically use the fit method.

```php
$history = $model->fit($train_img,$train_label,
    epochs:5,batch_size:256,validation_data:[$test_img,$test_label]);
```

Survey
------
Using the "$history", which is the return value of the model,
you can survey the training history by graphing it.

```php
$plt = new Rindow\Math\Plot\Plot(null,$mo);
$plt->plot($mo->array($history['accuracy']),null,null,'accuracy');
$plt->plot($mo->array($history['val_accuracy']),null,null,'val_accuracy');
$plt->plot($mo->array($history['loss']),null,null,'loss');
$plt->plot($mo->array($history['val_loss']),null,null,'val_loss');
$plt->legend();
$plt->title($dataset);
```

Prediction
----------
Predict data using the "predict" method of the trained model.

```php
$predicts = $model->predict($data);
```
