---
layout: document
title: "stopGradient"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/square
next_section: api/sub
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Core
- **classname**: StopGradient

This function prevents certain inputs from being taken into account when building a computation graph to calculate gradients.  A 'gradient generator' works by finding the derivative of the loss and adding the relevant parts of the graph to it. When this function is added, it stops the gradient generator from considering that particular input during the calculation.

This is useful any time you want to compute a value with TensorFlow but need to pretend that the value was a constant. 

This is helpful when you want to calculate a value using the automatic gradient function, but that value needs to behave like a constant.

This is a non-backpropagable function.

Methods
-------

### stopGradient
```php
$g->stopGradient(
    Variable|NDArray $x,
) : ArrayShape
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments are Variable or NDArray. Implicitly create Variable for NDArray.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[1,2],[3,4]]);

$y = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->stopGradient($x);
});
echo $mo->toString($y)."\n";

# [[1,2],[3,4]]

```
