---
layout: document
title: "ArraySpec"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/ndarraytool
next_section: api/modules
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Core
- **class**: ArraySpec

A container that combines the shape and dtype information of an NDArray. Unlike an NDArray, it does not have a value.
It is used when defining the input specifications of a model.

Methods
-------

### constructor
```php
$g->ArraySpec(
    ArrayShape|array $shape,
    ?int $dtype=null,
    ?string $name=null,
) : ArraySpec
```

Arguments

- **shape**: shape of array.
- **dtype**: data type of array


### shape
```php
public function shape(
) : ArrayShape
```

Result
- **shape**: Returns the value of the ArrayShape type representing the shape of an array.


### dtype
```php
public function dtype(
) : int
```

Result
- **dtype**: Returns the array's data type.


Examples

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$g = $nn->gradient();

$spec = $g->ArraySpec([1,2],dtype:NDArray::float32);
....
...
$customModel->build($spec);
$customModel->summary();

```
