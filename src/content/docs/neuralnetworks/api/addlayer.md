---
layout: document
title: "Add"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/multiheadattention
next_section: api/einsumdense
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Add

Adds two arrays. It is primarily used as a residual connection. 

Methods
-------

### constructor
```php
$builer->Add(
    array $input_shapes=null,
    string $name=null,
)
```
You can create a Add layer instances with the Layer Builder.


Options

- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.

Input shape
-----------
All shapes must be the same.

Output shape
------------
the shape is the same as the inputs.

```php
$add = $builder->layers()->Add();
....
$a = $mo->ones([4,3,2]);
$b = $mo->ones([4,3,2]);
....
$outputs = $add->forward([$a,$b],true);
# $outputs->shape() : [4,3,2]
```


Example of usage
----------------

```php
class Foo extends AbstractModel
{
    public function __construct($backend,$builder)
    {
        ...
        $this->add = $builder->layers()->Add();
        ....
    }

    protected function call(.....) : NDArray
    {
        ...
        $outputs = $this->add->forward([$input1, $input2],$training);
        ...
    }
}
```
