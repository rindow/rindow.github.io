---
layout: document
title: "LSTM"
grand_upper_section: index
upper_section: apitoc
previous_section: simplernn
next_section: gru
---

- **namespace**: Rindow\NeuralNetworks\Layer
- **classname**: LSTM

Long Short-Term Memory RNN layer.

Methods
-------

### constructor
```php
$builer->LSTM(
    int $units,
    array $options=[
        'input_shape'=>null,
        'activation'=>'tanh',
        'recurrent_activation'=>'sigmoid',
        'use_bias'=>true,
        'kernel_initializer'=>'glorot_uniform',
        'recurrent_initializer'=>'orthogonal',
        'bias_initializer'=>'zeros',
        'return_sequences'=>false,
        'return_state'=>false,
        'go_backwards'=>false,
        'stateful'=>false,
    ]
)
```
You can create a LSTM layer instances with the Layer Builder.

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

### forward
```php
public function forward(
    NDArray $inputs,
    bool $training,
    array $initialStates=null,
    array $options=null)
```
Arguments
- **inputs**: A 3D NDArray with shape [batch, timesteps, feature].
- **training**: When training, it is true.
- **initialStates**: List of initial state. Number of the state is two. Shape of the state is [batch, units]. When it have no state, give a null.
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
$rnn = $builder->layers()->LSTM($units=256,
    ['return_sequences'=>true,'return_state'=>true]);
....
$inputs = $mo->ones([64,32,128]);
$initialStates = [$mo->ones([64,256]),$mo->ones([64,256])];
....
[$outputs,$states] = $rnn->forward($inputs,true,$initialStates);
# $outputs->shape() : [64,32,256]
# $states[0]->shape() : [64,256]
# $states[1]->shape() : [64,256]
```


Example of usage
----------------

```php
class Foo extends AbstractModel
{
    public function __construct($backend,$builder)
    {
        ...
        $this->rnn = $builder->layers()->LSTM($units=256,
            ['return_sequences'=>true,'return_state'=>true]);
        ....
    }

    protected function buildLayers(.....) : void
    {
        ...
        [$outputShape,$statesShapes] = $this->registerLayer($this->rnn,$inputShape);
        ...
    }

    protected function forwardStep(.....) : NDArray
    {
        ...
        [$outputs,$states] = $this->rnn->forward($inputs,$training,$initialStates);
        ...
    }

    protected function backwardStep(.....) : NDArray
    {
        ...
        [$dInputs,$dInitialStates] = $this->rnn->backward($dOutputs,$dStates);
        ...
    }
}
```
