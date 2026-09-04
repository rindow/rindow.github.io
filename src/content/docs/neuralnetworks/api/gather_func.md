---
layout: document
title: "gather"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/expanddims_func
next_section: api/get
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Gather

Differentiable gather function.

Gathers slices from params according to indices. Gradients are propagated to params, but not to indices.

Methods
-------

### gather
```php
$g->gather(
    Variable|NDArray $params,
    Variable|NDArray $indices,
    ?int $axis=null,
    ?int $batchDims=null,
    ?int $detailDepth=null,
    ?int $indexDepth=null,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **params**: A Variable or NDArray to gather slices from. Implicitly create Variable for NDArray.
- **indices**: A Variable or NDArray of indices. Implicitly create Variable for NDArray. Gradients are not propagated to indices.

Options

- **axis**: Axis of params to gather.
- **batchDims**: Number of batch dimensions.
- **detailDepth**: Depth of the detail dimensions.
- **indexDepth**: Depth of the index dimensions.


```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$params = $g->Variable([[1,2],[3,4],[5,6]]);
$indices = $g->Variable([0,2]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$params,$indices) {
    return $g->gather($params,$indices,axis:0);
});
$dParams = $tape->gradient($c,$params);
echo $mo->toString($c)."\n";
echo $mo->toString($dParams)."\n";

```
