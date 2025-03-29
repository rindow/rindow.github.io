---
layout: document
title: "Automatic Differentiation"
upper_section: index
previous_section: custommodel
---

Automatic Differentiation and Gradients
-------------
In some cases, custom models may not be sufficient.
In such cases, programmers can directly update the neural network parameters using automatic differentiation and gradients.

Automatic differentiation records the computation process and determines gradients by tracing back from the results. Gradients are then used to update the network parameters.


Variables
----
Generally, calculations are performed using values and functions, but special variables and functions that support automatic differentiation are used.

First, create an NDArray array in PHP. This represents a value and is treated as a constant in automatic differentiation.
```php
$mo = new Rindow\Math\Matrix\MatrixOperator();
$nn = new Rindow\NeuralNetworks\Builder\NeuralNetworks($mo);

$value = $mo->array([2,3]);
echo $mo->toString($value)."\n";
# [2,3]
```

Now, let's store this in a variable. Use the 'gradient' builder to create a variable.
```php
$g = $nn->gradient();
$a = $g->Variable($value);
echo $mo->toString($a)."\n";
# [2,3]
```

Note that the PHP variable `$value` represents a value and is typically copied when generating a variable in the automatic differentiation framework.

```php
$value = $mo->array([2,3]);
$a = $g->Variable($value);
echo "a=".$mo->toString($a)."\n";
$value[0] = 0;
$value[1] = 0;
echo "value=".$mo->toString($value)."\n";
echo "a=".$mo->toString($a)."\n";
# a=[2,3]
# value=[0,0]
# a=[2,3]
```

You can also directly provide a PHP array to generate a variable containing an array.
```php
$b = $g->Variable([4,5]);
echo "b=".$mo->toString($b)."\n";
# b=[4,5]
```

Functions
----
Similarly, functions that support automatic differentiation are also generated using the 'gradient' builder.

```php
$a = $g->Variable(2.0);
$b = $g->Variable(3.0);
$c = $g->mul($a,$b);
echo "c=".$mo->toString($c)."\n";
# c=6
```
The result is also generated as a variable.


Gradient Calculation
-------
To compute gradients, backpropagation is used. This requires recording the computation process and tracing it in reverse order from the result.
When using `GradientTape`, calculations within its scope are recorded, constructing a computational graph.
In this example, computations are recorded in `$tape`.
```php
$a = $g->Variable(2.0);
$b = $g->Variable(3.0);

$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a,$b) {
    $c = $g->mul($a,$b);
    return $c;
});
echo "c=".$mo->toString($c)."\n";
# c=6
```

Gradients are then computed using the recorded `$tape`.

```php
[$da,$db] = $tape->gradient($c,[$a,$b]);
echo "da=".$mo->toString($da)."\n";
echo "db=".$mo->toString($db)."\n";
# da=3
# db=2
```

The most basic usage of automatic differentiation is as follows:

```php
$mo = new Rindow\Math\Matrix\MatrixOperator();
$nn = new Rindow\NeuralNetworks\Builder\NeuralNetworks($mo);
$g = $nn->gradient();

$a = $g->Variable(2.0);
$b = $g->Variable(3.0);

$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a,$b) {
    $c = $g->mul($a,$b);
    return $c;
});

$grads = $tape->gradient($c,[$a,$b]);

echo "c=".$mo->toString($c)."\n";
echo "da=".$mo->toString($grads[0])."\n";
echo "db=".$mo->toString($grads[1])."\n";

# c=6
# da=3
# db=2
```

Within automatic differentiation computations, functions, layers, models, and loss functions can also be used.
Model and layer weight variables can be obtained using `trainableVariables`.
```php
$a = $g->Variable($mo->array([[1,2,3],[2,3,4]]));
$x = $g->Variable($mo->array([[4,5,6],[5,6,7]]));
$target = $g->Variable($mo->array([0,1],NDArray::int32));

dense = $nn->layers()->Dense(10);
$lossfunc = $nn->losses()->SparseCategoricalCrossentropy(from_logits:true);

$loss = $nn->with($tape=$g->GradientTape(),function() use ($g,$dense,$lossfunc,$x,$a,$target) {
    $x = $g->mul($x,$a);
    $x = $dense->forward($x);
    $loss = $lossfunc->forward($target,$x);
    return $loss;
});
$weights = $dense->trainableVariables();
$grads = $tape->gradient($loss,$weights);
```

These gradient values are then used to update the parameters.
```php
$optimizer = $nn->optimizers()->SGD();
$optimizer->update($weights,$grads);
```


Model training
------------------
Now let's actually create a model and train it.

```php
include __DIR__.'/vendor/autoload.php';

use Rindow\NeuralNetworks\Model\AbstractModel;
use Rindow\NeuralNetworks\Layer\Layer;
$mo = new Rindow\Math\Matrix\MatrixOperator();
$nn = new Rindow\NeuralNetworks\Builder\NeuralNetworks($mo);
$K = $nn->backend();
$g = $nn->gradient();
$plt = new Rindow\Math\Plot\Plot(null,$mo);

class TestModel extends AbstractModel
{
    protected Layer $dense1;
    protected Layer $dense2;
    
    public function __construct(
        $backend,
        $builder
        )
    {
        parent::__construct($builder);
        $this->dense1 = $builder->layers->Dense($units=128,
                input_shape:[2], activation:'sigmoid'
            );
        $this->dense2 = $builder->layers->Dense($units=2);
    }

    protected function call($inputs,$training)
    {
        $x = $this->dense1->forward($inputs,$training);
        $outputs = $this->dense2->forward($x,$training);
        return $outputs;
    }
}

$model = new TestModel($K,$nn);
$lossfunc = $nn->losses->SparseCategoricalCrossentropy(from_logits:true);
$optimizer = $nn->optimizers->Adam();
$train_inputs = $mo->array([[1, 3], [1, 4], [2, 4], [3, 1], [4, 1], [4, 2]]);
$train_tests = $mo->array([0, 0, 0, 1, 1, 1],NDArray::int32);
$history = [];
$dataset = $nn->data->NDArrayDataset($train_inputs,
    tests:$train_tests,
    batch_size:64,
    shuffle:false,
);

for($epoch=0;$epoch<100;$epoch++) {
    $totalLoss = 0;
    foreach($dataset as $batchIndex => [$inputs,$trues]) {
        $x = $g->Variable($inputs);
        $t = $g->Variable($trues);
        [$loss,$predicts] = $nn->with($tape=$g->GradientTape(),
            function() use ($epoch,$K,$model,$lossfunc,$x,$t,$trues) {
                $predicts = $model($x,true,$t);
                return [$lossfunc($trues,$predicts),$predicts];
            }
        );
        $params = $model->trainableVariables();
        $gradients = $tape->gradient($loss, $params);

        $optimizer->update($params,$gradients);
        $totalLoss += $K->scalar($loss->value());
    }
    $history[] = $totalLoss;
}
$plt->plot($mo->array($history),null,null,'loss');
$plt->legend();
$plt->title('dynamic mode gradient');
$plt->show();
```


Compiling the computational graph
---------------------------------
Calculation graphs are used inside the automatic differentiation function.
However, the calculation graphs will be created every time and will be discarded when it is used up.
If you can directly call the calculation graph creation function to create it and reuse it many times, you may be able to save waste and speed up the process.

```php
$mo = new Rindow\Math\Matrix\MatrixOperator();
$nn = new Rindow\NeuralNetworks\Builder\NeuralNetworks($mo);
$g = $nn->gradient();

$func = $g->Function(function($a,$b,$c) use ($g) {
    $x = $g->mul($a,$b);
    $y = $g->add($x,$c);
    return $y;
});

$a = $g->Variable(2.0);
$b = $g->Variable(3.0);
$c = $g->Variable(4.0);

// compile function graph
$z = $nn->with($tape=$g->GradientTape(),function() use ($g,$func,$a,$b,$c) {
    $y = $func($a,$b,$c);
    return $g->square($y);
});
$grads = $tape->gradient($z,[$a,$b]);

// execute compiled function
$z = $nn->with($tape=$g->GradientTape(),function() use ($g,$func,$a,$b,$c) {
    $y = $func($a,$b,$c);
    return $g->square($y);
});
$grads = $tape->gradient($z,[$a,$b]);

echo "z=".$mo->toString($c)."\n";
echo "da=".$mo->toString($grads[0])."\n";
echo "db=".$mo->toString($grads[1])."\n";
```
