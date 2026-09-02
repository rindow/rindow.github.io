---
layout: document
title: "MultiHeadAttention"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/attention
next_section: api/addlayer
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: MultiHeadAttention

Multi Head attention layer.

Inputs are query tensor of shape [batch_size, Tq, dim], value tensor of shape [batch_size, Tv, dim] and key tensor of shape [batch_size, Tv, dim].

Outputs shape of tensor is [batch_size, Tq, dim].

Please refer to the following paper for details of the operation.
- Attention is All You Need (Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L. & Polosukhin, S. 2017). 
- https://arxiv.org/abs/1706.03762



Methods
-------

### constructor
```php
$builer->MultiHeadAttention(
    ?int $num_heads,
    ?int $key_dim,
    ?int $value_dim=null,
    ?float $dropout=null,
    ?bool $use_bias=null,
    ?array $input_shapes=null,
    int|array|null $attention_axes=null,
    string|object|null $kernel_initializer=null,
    string|object|null $bias_initializer=null,
)
```
You can create a MultiHeadAttention layer instances with the Layer Builder.

Arguments
- **num_heads**: Number of heads.
- **key_dim**: Attention key dimension size.

Options
- **value_dim**: Attention key dimension size. If we omit this, key_dim will be the same.
- **dropout**: Fraction of the input data to drop. If you omit it, it won't drop.
- **use_bias**: Use bias in input and output characteristics.
- **input_shapes**: Array list of shapes. Tell the first layer the shape of the input data. In input_shapes, the batch dimension is not included.

### forward
```php
public function forward(
        array $inputs, 
        Variable|bool|null $training=null, 
        Variable|bool|null $returnAttentionScores=null,
        ?array $mask=null,
        ?NDArray $attention_mask=null,
        Variable|bool|null $useCausalMask=null,
) : Variable|array
```
Arguments
- **inputs**: A 3D NDArray with shape (batch, timesteps, feature).
- **training**: When training, it is true.
- **returnAttentionScores**: bool, it True, returns the attention scores (after masking and softmax) as an additional output argument.
- **mask**: List of the following tensors:
query_mask: A boolean mask tensor of shape (batch_size, Tq). If given, the output will be zero at the positions where mask==False.
value_mask: A boolean mask tensor of shape (batch_size, Tv). If given, will apply the mask such that values at positions where mask==False do not contribute to the result.
- **attention_mask**: Reserved. always null or omited.
- **useCausalMask**: boolean. True when used to mask causal relationships.


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
the scores shape is [batch_size, Heads, Tq, Tv]

```php
$attention = $builder->layers()->MultiHeadAttention(8,256); // heads=8, key_dim=256
....
$query = $mo->ones([4,3,5]);
$value = $mo->ones([4,2,5]);
....
[$outputs,$scores] = $attention->forward([$query,$value],true,
                                    ['return_attention_scores'=>true]);
# $outputs->shape() : [4,3,5]
# $scores->shape() : [4,8,3,2]
```

Example of usage
----------------

```php
class Foo extends AbstractModel
{
    public function __construct($backend,$builder)
    {
        ...
        $this->attention = $builder->layers()->MuitiHeadAttention(8,256);
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
