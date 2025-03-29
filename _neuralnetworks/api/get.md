---
layout: document
title: "get"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/exp
next_section: api/greater
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Get

Gets elements from the given location.

This is a non-backpropagable function.

Methods
-------

### get
```php
$g->get(
    Variable|NDArray|ArrayShape $x,
    Variable|Scalar  $offset,
    ?Variable|Scalar  $count=null,
) : Variable
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments is Variable or NDArray or ArrayShape. 
- **offset**: This is the offset position to retrieve the value.
- **count**: This specifies the number of elements to extract.  A value of 1 returns a Scalar type, while values of 2 or greater return an ndarray or ArrayShape type identical to the input. If omitted, it's treated as 1.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[1,2],[3,4]]);
$c = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->get($g->shape($x),0);
});
```
