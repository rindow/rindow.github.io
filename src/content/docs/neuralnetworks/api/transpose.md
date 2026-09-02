---
layout: document
title: "transpose"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/sub
next_section: api/zeros
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: Transpose

Convert to a transpose matrix. 

Methods
-------

### transpose
```php
$g->transpose(
    NDArray $x,
    ?array $perm=null,
    ?string $name=null,
) : Variable|NDArray
```
Create and execute the function in the builder method

Arguments

- **x**: The arguments are Variable or NDArray. Implicitly create Variable for NDArray.
- **perm**: A PHP-style array constant that specifies the dimension axis to be used after transforming the original array's dimensions. When you omit (or suppress), the dimension axis flips.

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();
$x = $g->Variable([[1,2],[3,4]]);

$y = $nn->with($tape=$g->GradientTape(),function() use ($g,$x) {
    return $g->transpose($x,[1,0]);
});
echo $mo->toString($y)."\n";

# [[1,3],[2,4]]

```
