---
layout: document
title: "GradientTape"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/variable
next_section: api/graphfunction
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Core
- **classname**: GradientTape

Tape for recording calculation graphs.


Methods
-------

### constructor
```php
$tape = $g->GradientTape(
    bool $persistent=false
)
```
You can create a GradientTape instances with the Gradient Builder.

Options

- **persistent**: Whether or not to store the removed gradient so that it can be taken out again.


### gradient
```php
public function gradient(
    Variable $target,
    Variable|array $sources,
) : NDArray|array
```
Assign a value to the variable.

Arguments

- **target**: Differentiate target variable
- **sources**: Variable(s) for which you want to find the gradient. Specify one Variable or a list of Variables.


Returns
- **grads**: Gradient(s). NDArray or a list of NDArrays.

Examples

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$a = $g->Variable([1,2]);
$b = $g->Variable([2,3]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$a,$b) {
    return $g->mul($a,$b);
});
[$da,$db] = $tape->gradient($c,[$a,$b]);
echo $mo->toString($c)."\n";
echo $mo->toString($da)."\n";
echo $mo->toString($db)."\n";

# [2,6]
# [2,3]
# [1,2]
```
