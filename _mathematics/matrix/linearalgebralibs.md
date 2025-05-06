---
layout: document
title: "Dimension Operations"
upper_section: index
previous_section: matrix/dimensionoperations
next_section: plot/overviewplot
---
## Overview

Rindow Math Matrix provides functions related to linear algebra as a dedicated `LinearAlgebra` library.

This library focuses on high-speed processing.
However, this comes at the expense of flexibility and ease of use, so please be aware of this trade-off.

The library mainly includes the following function groups:
- Some functions from Basic Linear Algebra Subprograms (BLAS)
- Array generation and initialization
- Basic mathematical functions adapted for arrays
- Set operations
- Random number generation

## Important Notes
Since this library prioritizes performance, please keep the following points in mind:

- Many functions target 1D and 2D arrays. When processing multidimensional arrays, you must first convert them into flat arrays.
- Unlike standard mathematical libraries, many functions are destructive. Input values are overwritten, and the computation results replace them in the same memory space.
- Array allocation and initialization are separated. This avoids wasting time initializing arrays intended for output-only purposes.
- Complex nonlinear functions and activation functions used in machine learning are not included, but you can build them using the provided functions.
- Currently, complex number support is limited to BLAS functions.

## Basic Usage
To use the library, create an object from `MatrixOperator`. Below is an example of array creation and computation:

In this example, the array is allocated using `alloc()`, initialized with `ones()`, or created directly with `array()` by specifying element values.

Also, in `axpy()`, `$b` is given as an input value, but it is overwritten, and the result is stored in `$b`.

`axpy()` is one of the BLAS functions and can perform extremely fast computations when linked to an optimized external library.

```php
use Rindow\Math\Matrix\MatrixOperator;
$mo = new MatrixOperator();
$la = $mo->la(); // Generate LinearAlgebra object

$a = $la->ones($la->alloc([2,2], dtype: NDArray::float32));
$b = $la->array([[1,2],[3,4]], dtype: NDArray::float32);
$la->axpy($a, $b, alpha: 2.0); // b = 2a + b
echo $mo->toString($b)."\n";
# [[3,4],[5,6]]
```

`axpy()` can be used for simple addition by omitting `alpha`, and it can also perform subtraction.

```php
$a = $la->array([[1,2],[3,4]], dtype: NDArray::float32);
$b = $la->array([[5,6],[7,8]], dtype: NDArray::float32);
$la->axpy($a, $b, alpha: -1.0); // b = b - a
echo $mo->toString($b)."\n";
# [[4,4],[4,4]]
```

Since `axpy()` returns `$b` as a function return value, you can also write it as follows:

```php
$c = $la->axpy(
    $la->array([[1,2],[3,4]], dtype: NDArray::float32),
    $la->array([[5,6],[7,8]], dtype: NDArray::float32),
    alpha: -1.0
);
echo $mo->toString($c)."\n";
# [[4,4],[4,4]]
```

As seen above, the `LinearAlgebra` library prioritizes performance over intuitive ease of use.

For details on various functions, refer to [here](/mathematics/api/linearalgebra.html).

## Service Levels
The `LinearAlgebra` library is typically used by linking to an external library for high-speed computation, but it can also operate purely in PHP.

- **Basic**: Runs purely in PHP but is slower.
- **Advanced**: Links to an external library for faster computation.
- **Accelerated**: Uses hardware acceleration libraries like GPUs.

If the service level shown by the status command is Basic, external libraries are unavailable. If it is "Accelerated," GPU or other hardware acceleration is in use.

Currently, when using a GPU-accelerated library, a separate library compatible with `LinearAlgebra` must be used. Thus, you need to create a different GPU-specific library object instead of using `$mo->la()`.

This means that even when the mode confirmed by the status command is "Accelerated", you need to explicitly generate a GPU-specific library object.

```php
$lacu = $mo->laAccelerated('clblast', ['deviceType' => OpenCL::CL_DEVICE_TYPE_GPU]);
```

## Hardware Acceleration

Rindow Math Matrix allows various plugins to be integrated.  
By default, the built-in plugin for hardware acceleration is `LinearAlgebraCL`, which utilizes OpenCL.

This plugin follows the standard `LinearAlgebra` interface, but its usage differs in several ways.

When using a GPU, data is typically transferred from the CPU's memory to the GPU's memory.  
This transfer time often becomes the bottleneck of the entire process.  
To minimize the need for such transfers, the interface is intentionally restricted in certain ways, and the format of the obtained values is adjusted to avoid unnecessary transfers.

As a result, complete code compatibility is not guaranteed.

Writing code that runs on both CPU and GPU requires careful design.

## Basic Usage of LinearAlgebraCL  
The following example demonstrates operations from array creation to computation.  
Always be mindful of the differences between CPU and GPU memory regions.  

```php
use Rindow\Math\Matrix\MatrixOperator;
$mo = new MatrixOperator();
$la = $mo->la(); // Create LinearAlgebra
$lacu = $mo->laAccelerated('clblast', ['deviceType' => OpenCL::CL_DEVICE_TYPE_GPU]);
$lacu->blocking(true); // Enable blocking mode

// Create arrays on the CPU
$a = $la->ones($la->alloc([2,2], dtype:NDArray::float32));
$b = $la->array([[1,2],[3,4]], dtype:NDArray::float32);
// Transfer arrays to the GPU
$a = $lacu->array($a);
$b = $lacu->array($b);
// Perform computation on the GPU
$lacu->axpy($a, $b, alpha:2.0); // b = 2a + b
// Transfer the result back to the CPU
$b = $lacu->toNDArray($b);
echo $mo->toString($b) . "\n";
# [[3,4],[5,6]]
```

Some functions support asynchronous processing, while others do not.  
If you want to avoid handling this distinction, use `blocking(true)` to disable asynchronous processing.  
By default, operations are performed asynchronously, so you need to wait for completion.


## Return Values of LinearAlgebraCL

When a function in `LinearAlgebraCL` returns a scalar value, it defaults to returning an NDArray-type scalar value stored in GPU memory instead of a PHP float or int.  

This behavior is designed to avoid frequent data transfers between the GPU and CPU. If the function were to return a PHP scalar value, every function call would require transferring the result from the GPU to the CPU, converting it to a PHP number, and then transferring it back to the GPU for the next function call. This process would be highly time-consuming. By keeping the result in GPU memory, it can be directly used in subsequent GPU computations.  

If you want the function to return a PHP numeric value, similar to the standard `LinearAlgebra`, you can explicitly set this behavior using `scalarNumeric(true)`.  

### Example:
```php
$lacu = $mo->laAccelerated('clblast',['deviceType'=>OpenCL::CL_DEVICE_TYPE_GPU]);
$a = $lacu->array([[1,2],[3,4]],dtype:NDArray::float32);
$asum = $lacu->sum($a);
echo get_class($asum) ."\n";
echo $mo->toString($asum)."\n";
# Rindow\Math\Matrix\NDArrayCL
# 10

$lacu->scalarNumeric(true);
$asum = $lacu->sum($a);
echo gettype($asum)."\n";
echo $asum."\n";
# float
# 10
```


## Array Access in NDArrayCL

The NDArray type used in `LinearAlgebraCL` is an `NDArrayCL` object.  
In the current version, there are restrictions on retrieving and writing values in this array type.  

If the value handled by `offsetGet` or `offsetSet` becomes a PHP scalar value, an exception will be thrown.  
For example, attempting to retrieve a single element from a one-dimensional array will result in an exception:  

```php
$a = $lacu->array([1,2,3,4]);
$value = $a[0];
# Exception: OutOfRangeException("This object is scalar.")
```

If the accessed value is an array, an `NDArrayCL` object will be generated and returned.  
For instance, retrieving a row from a two-dimensional array works as follows:  

```php
$a = $lacu->array([[1,2],[3,4]]);
$row = $a[0];
echo $mo->toString($row)."\n";
# [1,2]
```

Therefore, if you want to extract a single element from a one-dimensional array, you should do the following:  

```php
$a = $lacu->array([1,2,3,4]);
$value = $a[[0,1]];
echo $mo->toString($value)."\n";
# [1]
```

However, the handling of PHP scalar values may be generally revised in future versions.


## Asynchronous Mode

In `LinearAlgebraCL`, the default mode is asynchronous. However, due to the current specifications of CLBlast, operation pipelining is not possible. CLBlast does not provide a mechanism to notify the next operation when the previous one has finished.

As a result, most functions other than those using CLBlast can be used in a practical asynchronous mode. However, for functions that call CLBlast, while function execution itself can be asynchronous, PHP must wait for the completion of the previous function’s event, making asynchronous execution effectively meaningless.

### Example of Asynchronous Execution Without CLBlast

```php
$lacu = $mo->laAccelerated('clblast',['deviceType'=>OpenCL::CL_DEVICE_TYPE_GPU]);
$lacu->blocking(false); // Enable asynchronous mode (default state)

$a = $lacu->array([[1,2],[3,4]],dtype:NDArray::float32);
$b = $lacu->array([[5,6],[7,8]],dtype:NDArray::float32);

// Generate an event list for the square operation
$squareEvents = $lacu->newEvents();
// Queue the square operation and obtain events
$lacu->square($a,events:$squareEvents);
// Generate an event list for the add operation
$addEvents = $lacu->newEvents();
// Queue the add operation with a wait condition for the square operation and obtain events
$lacu->add($a,$b,events:$addEvents,waitEvents:$squareEvents);
// Wait for the add operation to complete
$addEvents->wait();
echo $mo->toString($b)."\n";
# [[6,10],[16,24]]
```

### Example of Asynchronous Execution With CLBlast

In this case, `waitEvents` cannot be used.

```php
$lacu = $mo->laAccelerated('clblast',['deviceType'=>OpenCL::CL_DEVICE_TYPE_GPU]);
$lacu->blocking(false); // Enable asynchronous mode (default state)

$a = $lacu->array([[1,2],[3,4]],dtype:NDArray::float32);
$b = $lacu->array([[5,6],[7,8]],dtype:NDArray::float32);

// Generate an event list for the square operation
$squareEvents = $lacu->newEvents();
// Queue the square operation and obtain events
$lacu->square($a,events:$squareEvents);
// Wait for the square operation to complete
$squareEvents->wait();
// Queue the add operation and obtain events
$lacu->axpy($a,$b,events:$addEvents); // `waitEvents` cannot be used
// Wait for the add operation to complete
$addEvents->wait();
echo $mo->toString($b)."\n";
# [[6,10],[16,24]]
```
