---
layout: document
title: "Attention"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/gru
next_section: api/relu
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Attention

Dot-product attention layer.

Inputs are query tensor of shape [batch_size, Tq, dim], value tensor of shape [batch_size, Tv, dim] and key tensor of shape [batch_size, Tv, dim].
The calculation follows the steps:

+ Calculate scores with shape [batch_size, Tq, Tv] as a query-key dot product: scores = matmul(query, key, transpose_b=True).
+ Use scores to calculate a distribution with shape [batch_size, Tq, Tv]: distribution = softmax(scores).
+ Use distribution to create a linear combination of value with shape [batch_size, Tq, dim]: return matmul(distribution, value).


Methods
-------

### constructor
```php
$builer->Attention(
    array $input_shapes=>null,
    string $name=null,
)
```
You can create a Attention layer instances with the Layer Builder.


Options

- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.
- **return_attention_scores**: If True, returns the attention scores after softmax.

Input shape
-----------
Input is a list in the form of [query,value] or [query,value,key].
If the key is omitted, the same tensor as value is entered.
the query tensor shape is [batch_size, Tq, dim].
the value tensor shape is [batch_size, Tv, dim].
the key tensor shape is [batch_size, Tv, dim].

Output shape
------------
if return_attention_scores is true, list of [outputs,scores].
the outputs shape is [batch_size, Tq, dim].
the scores shape is [batch_size, Tq, Tv]

```php
$attention = $builder->layers()->Attention();
....
$query = $mo->ones([4,3,5]);
$value = $mo->ones([4,2,5]);
....
[$outputs,$scores] = $attention->forward([$query,$value],true,
                                    ['return_attention_scores'=>true]);
# $outputs->shape() : [4,3,5]
# $scores->shape() : [4,3,2]
```

Example of usage
----------------

```php
class Foo extends AbstractModel
{
    public function __construct($backend,$builder)
    {
        ...
        $this->attention = $builder->layers()->Attention();
        ....
    }

    protected function call(.....) : NDArray
    {
        ...
        $outputs = $this->attention->forward([$key, $value],$training);
        ...
    }
}
```
