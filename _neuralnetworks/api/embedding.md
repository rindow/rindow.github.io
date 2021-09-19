---
layout: document
title: "Embedding"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/concatenate
next_section: api/repeatvector
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: Embedding

Learn and Translate from positive integer to vectors with weights.

Inputs are positive integer sequences of shape [batch_size, input_length].
Outputs are vectors of shape [batch_size, input_length, output_dim].
Weights of shape are [input_dim, output_dim].

Methods
-------

### constructor
```php
$builer->Embedding(
    int $inputDim,
    int $outputDim,
    array $options=[
        'input_length'=>null,
    ]
)
```
You can create a Attention layer instances with the Layer Builder.

Arguments
- **inputDim**: Size of the vocabulary. A value one greater than the maximum value in the input sequences
- **outputDim**: Dimension of the output embedding vectors

Options

- **input_length**: Sequence length.

Input shape
-----------
[batch_size, input_length]
The value contained in the sequence must be a positive integer and less than input_dim.

Output shape
------------
[batch_size, input_length, output_dim]

Example of usage
----------------
```php
$embedding = $builder->layers()->Embedding(
    $inputDim=5
    $outputDim=4,
    ['input_length'=>3]
);
....
$sequences = $mo->array([[4,3,1],[2,1,0]],NDArray::int32);

....
$outputs = $embedding->forward($sequences,true);
# $outputs->shape() : [2,3,4]
```
