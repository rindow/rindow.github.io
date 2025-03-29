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
    ?int $input_length=null,
    string|callable $embeddings_initializer='random_uniform',
    ?bool $mask_zero=null,
    ?string $name=null,
)
```
You can create a Attention layer instances with the Layer Builder.

Arguments
- **inputDim**: Size of the vocabulary. A value one greater than the maximum value in the input sequences
- **outputDim**: Dimension of the output embedding vectors

Options

- **input_length**: Sequence length.
- **mask_zero**: A boolean value indicating whether the input value 0 should be masked as a special "padding" value. This is useful when using recurrent layers or attention layers that handle variable-length inputs. If this is set to True, all subsequent layers in the model must support masking, otherwise the masking information will be lost. The masking information will also be lost if it passes through anything other than a layer. When mask_zero is set to True, as a result, index 0 becomes unavailable for use in the vocabulary (input_dim must be equal to vocabulary size + 1).

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
    input_length:3
);
....
$sequences = $mo->array([[4,3,1],[2,1,0]],NDArray::int32);

....
$outputs = $embedding->forward($sequences,true);
# $outputs->shape() : [2,3,4]
```
