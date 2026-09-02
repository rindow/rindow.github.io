---
layout: document
title: "Attention"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/gru
next_section: api/multiheadattention
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
    ?array $input_shapes=null,
    ?bool $use_scale=null,
    ?string $name=null,
)
```
You can create a Attention layer instances with the Layer Builder.


Options

- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.
- **use_scale**: If True, will create a scalar variable to scale the attention scores.

### forward
```php
public function forward(
        array $inputs, 
        Variable|bool|null $training=null, 
        Variable|bool|null $returnAttentionScores=null,
        ?array $mask=null,
) : Variable|array
```
Arguments
- **inputs**: A 3D NDArray with shape (batch, timesteps, feature).
- **training**: When training, it is true.
- **returnAttentionScores**: bool, it True, returns the attention scores (after masking and softmax) as an additional output argument.
- **mask**: List of the following tensors:
query_mask: A boolean mask tensor of shape (batch_size, Tq). If given, the output will be zero at the positions where mask==False.
value_mask: A boolean mask tensor of shape (batch_size, Tv). If given, will apply the mask such that values at positions where mask==False do not contribute to the result.


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
