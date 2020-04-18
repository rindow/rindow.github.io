---
layout: document
title: "Getting started"
upper_section: index
previous_section: index
next_section: builders
---

Getting started with the Sequential model
-----------------------------------------

The Sequential model is a linear stack of layers.

You can create a Sequential model by passing a list of layer instances with the Builder:

```php
$mo = new Rindow\Math\Matrix\MatrixOperator();
$nn = new Rindow\NeuralNetworks\Builder\NeuralNetworks($mo);

$model = $nn->models()->Sequential([
    $nn->layers()->Dense(128,['input_shape'=>[784]]),
    $nn->layers()->Sigmoid(),
    $nn->layers()->Dense(10),
    $nn->layers()->Softmax(),
]);
```

You can also simply add layers via the add() method:

```php
$model = $nn->models()->Sequential();
$model->add($nn->layers()->Dense(128,['input_shape'=>[784]]));
$model->add($nn->layers()->Sigmoid());
```

Specifying the input shape
--------------------------
The model needs to know what input shape it should expect.
For this reason, the first layer in a Sequential model (and only the first, because following layers can do automatic shape inference) needs to receive information about its input shape.

To do this, use the "input_shape" option.
Pass an input_shape argument to the first layer. This is a shape array of integers. In input_shape, the batch dimension is not included.

As such, the following snippets are strictly equivalent:

```php
$model = $nn->models()->Sequential();
$model->add($nn->layers()->Dense(128,['input_shape'=>[784]]));
```

Compilation
-----------
Before training a model, you need to configure the learning process, which is done via the compile method. It receives three options:

- An optimizer. This could be an instance of the Optimizer. The default is "SGD". see Optimizers
- An loss function. This is the objective that the model will try to minimize. It can be an instance of loss function. The default is "SparseCategoricalCrossEntropy". See Losses.
- A list of metrics. Specify a list of strings of items to be written to the history of training. Currently, only "accuracy" and "loss" can be specified.

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

Training
--------
The models are trained on the NDArray of input data and labels. For training a model, you will typically use the fit method.

```php
# classification model with 3 classes
$model = $nn->models()->Sequential([
    $nn->layers()->Dense(128,
        ['input_shape'=>[3],'kernel_initializer'=>'relu_normal']),
    $nn->layers()->ReLU(),
    $nn->layers()->Dense(3),
    $nn->layers()->Softmax(),
]);
$model->compile([
    'optimizer'=>$nn->optimizers()->Adam(),
    #'loss'=>$nn->losses()->SparseCategoricalCrossEntropy(), <<== default
    'metrics'=>['accuracy','loss'],
]);
# Classification sample data
use Interop\Polite\Math\Matrix\NDArray;
$data = $mo->asType($mo->random()->choice(10,300)->reshape([100,3]),NDArray::float32);
$labels = $mo->argMax($data,$axis=1);
# Train the model
$history = $model->fit($data,$labels,[
        'epochs'=>10,'batch_size'=>8,'verbose'=>1,
]);
```

Survey
------
Using the "$history", which is the return value of the model,
you can survey the training history by graphing it.

```php
$plt = new Rindow\Math\Plot\Plot(null,$mo);
[$fig,$ax] = $plt->subplots(1,2);
$ax[0]->plot($mo->array($history['loss']),null,null,'loss');
$ax[1]->plot($mo->array($history['accuracy']),null,null,'accuracy');
$ax[0]->legend();
$ax[0]->setTitle('Loss function');
$ax[1]->legend();
$ax[1]->setTitle('Learning curve');
$plt->show();
```

Prediction
----------
Predict data using the "predict" method of the trained model.

```php
$predicts = $model->predict($mo->array([[2,7,1]]));

$plt->bar(['#0','#1','#2'],$predicts[0],null,null,'probability');
$plt->title('Maximum value prediction');
$plt->show();
```
