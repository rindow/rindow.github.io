---
layout: document
title: "Concatenate"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/expanddims
next_section: api/embedding
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Concatenate

Layer that concatenates a list of inputs.

Combines the listed NDArrays on the specified axis and outputs.


Concatenate implements the operation:

- output := concat([input1, input2....], axis=-1)


Methods
-------

### constructor
```php
$builer->Concatenate(
    int $axis=-1,
    array $input_shapes=null,
    string $name=null,
)
```
You can create a Concatenate layer instances with the Layer Builder.


Options

- **axis**: Axis to join.
- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Input shape
-----------
All shapes except the concatenate axis must be the same.

Output shape
------------
The concatenate axis is the sum of each array,
and the other shapes are the same as the input.

```php
$concat = $builder->layers()->Concatenate();
....
$a = $mo->ones([4,3,2]);
$b = $mo->ones([4,3,3]);
$c = $mo->ones([4,3,4]);
....
$outputs = $concat->forward([$a,$b,$c],true);
# $outputs->shape() : [4,3,9]
```


Example of usage
----------------

```php
class Foo extends AbstractModel
{
    public function __construct($backend,$builder)
    {
        ...
        $this->concat = $builder->layers()->Concatenate();
        ....
    }

    protected function call(.....) : NDArray
    {
        ...
        $outputs = $this->concat->forward([$input1, $input2],$training);
        ...
    }
}
```
