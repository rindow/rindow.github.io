---
layout: document
title: "GradienGraphFunction"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/gradienttape
next_section: api/add
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Core
- **classname**: GraphFunction

Create a calculated graph from a function.

Once the created function is executed, the calculation graph inside the function is constructed and stored, so the construction is omitted from the second time onward.

Methods
-------

### constructor
```php
$builer->Function(
    callable $func,
    object $alternateCreator=null
)
```
You can create a GradientTape instances with the Gradient Builder.

Arguments

- **func**: A function that create computational graphs.

Options

- **alternateCreator**: Computation graph root function.


### __invoke
```php
public function __invoke(...$inputs)
```
You can create a GradientTape instances with the Gradient Builder.

Arguments

- **inputs**: Arguments must be Variables.


Examples

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();

$func = $g->Function(function($a, $b) use ($g) {
    $x = $g->add($a,$b);
    return $g->mul($a,$x);
}); 


$a = $g->Variable([1,2]);
$b = $g->Variable([2,3]);

$c = $func($a,$b);

echo $mo->toString($c)."\n";
# [3,10]
```
