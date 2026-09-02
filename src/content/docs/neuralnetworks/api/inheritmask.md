---
layout: document
title: "InheritMask"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/einsumdense
next_section: api/relu
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Func
- **classname**: InheritMask

Inherit a mask tensor from another array.


Methods
-------

### Construct
```php
$inheritmask = $builder->InheritMask(
    ?array $input_shapes=null,
    ?string $name=null,
) : Variable
```
Create and execute the function in the builder method

Options

- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.

### forward
```php
public function forward(
    array $inputs,
    ?bool $training=null,
) : NDArray
```

Arguments

- **inputs**: A set of arrays that contain input arrays and mask tensors. [inputs,mask_owner].
- **training**: N/A

Examples

```php
$embeding = $nn->layers()->Embedding(256,256,mask_zero:true)
$inheritmask = $nn->layers()->InheritMask();
...
$inputs = $g->Variable([[1,2,0],[3,4,0]],NDArray::int32);
...
$source = $embeding->forward($inputs);
$x = $foo->forward($source);
$output = $inheritmask->forward([$x,$source]);
```
