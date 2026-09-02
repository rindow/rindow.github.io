---
layout: document
title: "Preprocessor"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/cifar10
next_section: api/tokenizer
---


- **namespace**: Rindow\NeuralNetworks\Data\Sequence
- **classname**: Preprocessor

Sequence data preprocessor.

Methods
-------

### constructor
```php
public function __construct($matrixOperator)
```


### padSequences
```php
public function padSequences(
    iterable $sequences,
    int $maxlen=null,
    int $dtype=NDArray::int32,
    string $padding='pre',
    string $truncating='pre',
    float|int|bool $value=0,
) : NDArray
```
Padding sequences and make instance of NDArray.

Arguments

- **sequences**: list of sequence data.

Options
- **maxlen**: sequence max length. If the sequence is short, it will be padded. If the sequence is long, it will be truncated. If Null, the maximum length of the sequence will be applied.
- **dtype**: Output NDArray data type.
- **padding**: If "pre", it will be padded before. If it is "post", it will be padded later.
- **truncating**: If "pre", the front is truncated. If it is "post", the rest will be truncated.
- **value**: Value to be padded.

Examples

```php
$sequences = [
    [1,2],
    [1,2,3],
    [1,2,3,4],
];
$tensor = $preprocessor->padSequences($sequences,maxlen:3);
# $tensor->toArray() :
#    [[0,1,2],[1,2,3],[1,2,3]]
```
