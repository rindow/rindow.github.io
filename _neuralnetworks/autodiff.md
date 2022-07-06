---
layout: document
title: "Automatic Differentiation"
upper_section: index
previous_section: custommodel
---

Automatic Differentiation and Gradients
---------------------------------------
Sometimes it can't be written in a custom model.
In that case, the programmer can also directly write the update of the neural network parameters by automatic differentiation and gradient.

The most basic usage of automatic differentiation is described below.

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

#### Results ####
# c=6
# da=3
# db=2

```

In the practical automatic differentiation including the model and layer, it is described as follows.

```php
<?php
include __DIR__.'/../rindow-neuralnetworks/vendor/autoload.php';

use Rindow\NeuralNetworks\Model\AbstractModel;
$mo = new Rindow\Math\Matrix\MatrixOperator();
$nn = new Rindow\NeuralNetworks\Builder\NeuralNetworks($mo);
$K = $nn->backend();
$g = $nn->gradient();
$plt = new Rindow\Math\Plot\Plot(null,$mo);

class TestModel extends AbstractModel
{
    public function __construct(
        $backend,
        $builder
        )
    {
        parent::__construct($backend,$builder);
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
$train_tests = $mo->array([0, 0, 0, 1, 1, 1]);
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

Calculation graphs
------------------
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

$z = $nn->with($tape=$g->GradientTape(),function() use ($g,$func,$a,$b,$c) {
    $y = $func($a,$b,$c);
    return $g->square($y);
});

$grads = $tape->gradient($z,[$a,$b]);

echo "z=".$mo->toString($c)."\n";
echo "da=".$mo->toString($grads[0])."\n";
echo "db=".$mo->toString($grads[1])."\n";

#### Results ####
# z=6
# da=60
# db=40
```
