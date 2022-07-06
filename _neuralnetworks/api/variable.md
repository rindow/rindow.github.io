---
layout: document
title: "Variable"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/rmsprop
next_section: api/gradienttape
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Core
- **classname**: Variable

Variables store numbers manipulated by functions.
It is also incorporated into computational graphs to support backpropagation.

Methods
-------

### constructor
```php
$builer->Variable(
    $value,
    string $name=null,
    bool $reference=false,
    bool $trainable=true,
    bool $undetermined=false,
)
```
You can create a Variable instances with the Gradient Builder.

Arguments

- **value**: If it is Variable, use its contents. Use NDArray as it is. In case of float and array, use after converting to NDArray. For bool, save the bool value. However, if the "undetermined" option is specified, the value will be ignored.

Options

- **reference**: Normally, NDArray and Varible are duplicated and stored.
If "reference" is set to True, the object will be stored without duplication.
Therefore, when the value in Variable is updated, the object with the value specified at the time of creation is also updated.
- **trainable**: Among the Variables included in the Model, a flag indicating whether or not it is a training target is added. Affects the trainableVariables () method of the model.
Also, if it is not a training target, it will not be a differential target.
- **undetermined**: I will prepare a vessel, but the value has not been decided yet.
You can assign the value later.

Examples

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();

$a = $g->Variable($mo->array([1,2]));
$b = $g->Variable([1,2]);
$c = $g->Variable(1);
$d = $g->Variable(true);
$e = $g->Variable($a);

```

### assign
```php
public function assign(
        $value,
        bool $reference=false,
) : void
```
Assign a value to the variable.

Arguments

- **value**: If it is Variable, use its contents. Use NDArray as it is. In case of float and array, use after converting to NDArray. For bool, save the bool value. However, if the "undetermined" option is specified, the value will be ignored.

Options

- **reference**: Normally, NDArray and Varible are duplicated and stored.
If "reference" is set to True, the object will be stored without duplication.
Therefore, when the value in Variable is updated, the object with the value specified at the time of creation is also updated.

Examples

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();

$a = $g->Variable(null,undetermined:true);
$v = $mo->array([1,2]);
$a->assign($v);
echo $mo->toString($a)."\n";

# [1,2]
```
