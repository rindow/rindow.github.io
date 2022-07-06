---
layout: document
title: "GRU"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/lstm
next_section: api/attention
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: GRU

Gated Recurrent Unit RNN Layer.

Methods
-------

### constructor
```php
$builer->GRU(
    int $units,
    array $input_shape=null,
    string|object $activation='tanh',
    string|object $recurrent_activation='sigmoid',
    bool $use_bias=true,
    string|callable $kernel_initializer='glorot_uniform',
    string|callable $recurrent_initializer='orthogonal',
    string|callable $bias_initializer='zeros',
    bool $return_sequences=false,
    bool $return_state=false,
    bool $go_backwards=false,
    bool $stateful=false,
    bool $reset_after=true,
    string $name=null,
)
```
You can create a GRU layer instances with the Layer Builder.

Arguments
- **units**: Dimensionality of the output space.

Options

- **input_shape**: Tell the first layer the shape of the input data. In input_shape, the batch dimension is not included.
- **activation**: Activation function. Default is 'tanh'.
- **recurrent_activation**: Recurrent Activation function. Default is 'sigmoid'.
- **use_bias**: Use bias. Default is true.
- **kernel_initializer**: Default is 'glorot_uniform'.
- **recurrent_initializer**: Default is 'orthogonal'.
- **bias_initializer**: Default is 'zeros'.
- **return_sequences**: Whether to return the last output in the output sequence, or the full sequence. Default is false.
- **return_state**: Whether to return the last state in addition to the output. Default is false.
- **go_backwards**: If True, process the input sequence backwards and return the reversed sequence. Default is false.
- **stateful**: N/A.
- **reset_after**: whether to apply reset gate after or before matrix multiplication. Default is true.

### forward
```php
public function forward(
    NDArray $inputs,
    Variable|bool $training,
    array $initialStates=null,
    array $options=null
)
```
Arguments
- **inputs**: A 3D NDArray with shape [batch, timesteps, feature].
- **training**: When training, it is true.
- **initialStates**: List of initial state. Number of the state is one. Shape of the state is [batch, units]. When it have no state, give a null.
- **options**: N/A

Input shape
-----------
3D array of shape.

[batchsize, timesteps, features]

Output shape
------------
If "return_state" is true then it returns the list of [outputs, states].
If "return_state" is false then it returns just outputs.

If "return_sequences" is false then the shape of outputs is 2D [batchsize, units].
If "return_sequences" is true then the shape of outputs is 3D [batchsize, timesteps, units].

States shape
------------
The states is list of state. Shape of it is 2D [batchsize, units].

```php
$rnn = $builder->layers()->GRU($units=256,
    return_sequences:true,return_state:true);
....
$inputs = $mo->ones([64,32,128]);
$initialStates = [$mo->ones([64,256])];
....
[$outputs,$states] = $rnn->forward($inputs,true,$initialStates);
# $outputs->shape() : [64,32,256]
# $states[0]->shape() : [64,256]
```


Example of usage
----------------

```php
class Foo extends AbstractModel
{
    public function __construct($backend,$builder)
    {
        ...
        $this->rnn = $builder->layers()->GRU($units=256,
            return_sequences:true,return_state:true);
        ....
    }

    protected function call(.....) 
    {
        ...
        [$outputs,$states] = $this->rnn->forward($inputs,$training,$initialStates);
        ...
    }
}
```
