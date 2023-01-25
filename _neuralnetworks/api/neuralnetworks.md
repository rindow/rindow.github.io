---
layout: document
title: "NeuralNetworks"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/tableofconents
next_section: api/models
---
Overview
-------

- **namespace**: Rindow\NeuralNetworks\Builder
- **classname**: NeuralNetworks

The instance of each PHP class is created using builders.
This builder is the root builder and creates other subclass builders.

Methods
-------

### constructor

```php
public function __construct(
    $matrixOperator=null,
    $backend=null
)
```
For $matrixOperator, specify the instance of the data operation module to be used.
If omitted, it will be created inside Rindow\Math\Matrix\MatrixOperator.

For $backend, specify the backend instance to be used.
If omitted, Rindow\NeuralNetworks\Backend\RindowBlas\Backend will be created internally.


### models
```php
public function models()
return $models
```
Get models subclass builder Rindow\NeuralNetworks\Builder\Models.
The builder is a singleton.

### layers
```php
public function layers()
return $layers
```
Get layers subclass builder Rindow\NeuralNetworks\Builder\Layers.
The builder is a singleton.

### losses
```php
public function losses()
return $losses
```
Get losses subclass builder Rindow\NeuralNetworks\Builder\Losses.
The builder is a singleton.

### optimizers
```php
public function optimizers()
return $optimizers
```
Get optimizers subclass builder Rindow\NeuralNetworks\Builder\Optimizers.
The builder is a singleton.

### gradient
```php
public function gradient()
return $gradient
```
Get gradient subclass builder Rindow\NeuralNetworks\Builder\Gradient.
The builder is a singleton.

### datasets
```php
public function datasets()
return $datasets
```
Get datasets subclass builder Rindow\NeuralNetworks\Builder\Datasets.
The builder is a singleton.

### utils
```php
public function utils()
return $utils
```
Get utils subclass builder Rindow\NeuralNetworks\Builder\Utils.
The builder is a singleton.


Example
-------

```php
use Rindow\Math\Matrix\MatrixOperator;
use Rindow\NeuralNetworks\Builder\NeuralNetworks;

$mo = new MatrixOperator();
$nn = new NeuralNetworks($mo);
$model = $nn->models()->Sequential([
    $dense   = $nn->layers()->Dense(128,['input_shape'=>[10]]);
    $softmax = $nn->layers()->Sigmoid();
    $dense   = $nn->layers()->Dense(1);
    $softmax = $nn->layers()->Sigmoid();
]);
```

Environment variable for backend engine
-------
You can specify a backend engine by setting a string name and options in an environment variable.

- **name**: RINDOW_NEURALNETWORKS_BACKEND

You can specify a backend computation engine written for rindow-neuralnetworks.
The built-in engine is as follows.

- rindowblas:    OpenBLAS and rindow-openblas
- rindowclblast: CLBlast(One of BLAS implementation by OpenCL)

If no environment variable is specified, rindowblas will be used by default.

If you want to use the original backend engine created by the developer, please specify it in the constructor argument of the class.

### OpenBLAS backend engine
Calculation engine based on OpenBLAS and Rindow-OpenBLAS original functions. 

If the rindow-openblas PHP extension is not installed, a compatible PHP implementation will automatically be used. A compatible PHP implementation is very slow but works without PHP extensions.


### CLBlast backend engine
CLBlast is an OpenCL BLAS compatible calculation engine.

To run this engine you need:

- OpenBLAS library
- Rindow-OpenBLAS PHP extension
- CLBlast library
- Rindow-clblast PHP extension
- OpenCL device driver
- Rindow - OpenCL PHP extension

You can specify options to identify OpenCL devices in environment variables.

Below is an example;

- rindowclblast       => platform #0, device #0
- rindowclblast::GPU  => GPU type device: Integrated GPU, etc.
- rindowclblast::CPU  => CPU type device: pocl-opencl-icd, etc.
- rindowclblast::0,0  => platform #0, device #0
- rindowclblast::0,1  => platform #0, device #1
- rindowclblast::1,0  => platform #1, device #0


### Example of setting environment variables

```shell
$ RINDOW_NEURALNETWORKS_BACKEND=rindowclblast
$ export RINDOW_NEURALNETWORKS_BACKEND
$ php sample.php
```
