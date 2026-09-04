---
layout: document
title: "masking"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/logsoftmax
next_section: api/matmul
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Masking

Differentiable masking function.

Applies a boolean mask to the data. The mask itself is not differentiable.

Methods
-------

### masking
```php
$g->masking(
    Variable|NDArray $mask,
    Variable|NDArray $data,
    ?int $batchDims=null,
    ?int $axis=null,
    ?float $fill=null,
    ?int $mode=null,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **mask**: A boolean Variable or NDArray. Implicitly create Variable for NDArray. Gradients are not propagated to the mask.
- **data**: A Variable or NDArray. Implicitly create Variable for NDArray.

Options

- **batchDims**: Number of batch dimensions.
- **axis**: Axis to apply the mask.
- **fill**: Fill value for masked positions.
- **mode**: Masking mode.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$mask = $g->Variable([[true,false],[false,true]]);
$data = $g->Variable([[1,2],[3,4]]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$mask,$data) {
    return $g->masking($mask,$data,fill:0);
});
$dData = $tape->gradient($c,$data);
echo $mo->toString($c)."\n";
echo $mo->toString($dData)."\n";

```
