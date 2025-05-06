---
layout: document
title: "Array buffer"
upper_section: index
previous_section: openblas/overviewopenblas
next_section: openblas/blaslibrary
---

## Concept

PHP's array type is not suitable for high-speed matrix operations.
To achieve high-speed matrix operations, a common format is necessary that allows efficient data exchange between C language programs, which use contiguous memory regions to store numerical values, and PHP programs that handle these programs. This is important, for example, when using CPU SIMD instructions or transferring data to a GPU.

The Buffer class is a low-level service module that allows such contiguous memory regions to be handled like arrays within PHP.

From PHP, this memory region can be accessed as a one-dimensional array. Internally, the data is stored as a simple sequence of consecutive numerical values.

How this one-dimensional array is interpreted and used as an N-dimensional array is the role of the program that utilizes it. For example, in Rindow Math Matrix, the NDArrayPhp class extracts a portion of a Buffer object and handles it as an N-dimensional array through the NDArray interface.
On the other hand, the Buffer interface itself can keep its specification simple by treating the physical memory region as a simple one-dimensional array.

The Buffer interface is mainly a mechanism for utilizing C language interfaces. However, even when used solely in a pure PHP environment, an implementation is also provided that uses PHP arrays internally and makes them accessible through the Buffer interface, so that arrays can be accessed with a common interface. This is useful in web hosting services where external C language libraries cannot be used.

Furthermore, when using a GPU, a Buffer interface that supports the GPU's API is required. Standard Rindow-Math adopts OpenCL as the GPU API.

Three Buffer modules are provided according to the current environment:

  * **Math-Buffer**: Provided by the `rindow-math-buffer-ffi` package. Supports linking with external C language libraries.
  * **PhpBuffer**: Standardly included in the `rindow-math-matrix` package. Can operate with pure PHP only.
  * **OpenCL-Buffer**: Provided by the `rindow-opencl-ffi` package. Buffer interface for GPU memory compatible with OpenCL.

In the future, by developing Buffer interfaces compatible with other C language libraries, we plan to make Rindow-Math usable in various environments.

For details on `rindow-opencl-ffi`, please refer to [here](https://www.google.com/search?q=/mathematics/acceleration/mathematics/opencl.html).

## PHP Interface

Buffer objects are created by specifying the data type and size.
Since they implement the ArrayAccess and Countable interfaces, they can be handled in the same way as PHP arrays.

The general-purpose Buffer interface has the following methods for convenience:

```php
use Interop\Polite\Math\Matrix\Buffer as BufferInterface;

class Buffer implements BufferInterface {
    public function __construct(int $size, int $dtype);
    public function dtype() : int; // Get the data type
    public function value_size() : int; // Get the number of bytes per element
    public function count() : int; // Get the number of elements
    public function offsetExists(mixed $offset) : bool; // Check if the specified offset exists
    public function offsetGet(mixed $offset): mixed; // Read the value at the specified offset
    public function offsetSet(mixed $offset, mixed $value): void; // Write a value to the specified offset
    public function offsetUnset(mixed $offset): void; // Unset the value at the specified offset (usually not supported)
    public function dump() : string; // Get the buffer contents as a binary string
    public function load(string $string) : void; // Restore the buffer contents from a binary string
}
```

The definition of the Buffer interface is as follows:

```php
namespace Interop\Polite\Math\Matrix;

use Countable;
use ArrayAccess;

interface Buffer extends Countable,ArrayAccess
{
}
```

In the `rindow-math-buffer-ffi` package, which is used to enable the C language interface, a `LinearBuffer` interface that extends the `Buffer` interface and has an `addr` method is added.

The LinearBuffer interface represents a buffer with a contiguous memory space in C.

```php
namespace Rindow\Math\Buffer\FFI;
use Interop\Polite\Math\Matrix\LinearBuffer;
use FFI;

class Buffer implements LinearBuffer {
    public function __construct(int $size, int $dtype);
    public function dtype() : int;
    public function value_size() : int;
    public function count() : int;
    public function addr(int $offset) : FFI\CData; // Get the memory address of the specified offset as FFI\CData type
    public function offsetExists(mixed $offset) : bool;
    public function offsetGet(mixed $offset): mixed;
    public function offsetSet(mixed $offset, mixed $value): void;
    public function offsetUnset(mixed $offset): void;
    public function dump() : string;
    public function load(string $string) : void;
}
```

To standardize the interface, always use a factory class to create objects.

```php
namespace Rindow\Math\Buffer\FFI;

class BufferFactory
{
    public function isAvailable() : bool; // Check if FFI functionality is available
    public function Buffer(int $size, int $dtype) : Buffer; // Create a Buffer object
}
```

## Usage in PHP

The following shows basic usage examples of the Buffer class.

```php
use Interop\Polite\Math\Matrix\NDArray;
use Rindow\Math\Buffer\FFI\BufferFactory; // Added use of BufferFactory

$factory = new BufferFactory();
// Create a buffer of size 10 with float32 data type
$buffer = $factory->Buffer(10, NDArray::float32);
// Access like an array
$buffer[0] = 1.0;
$buffer[1] = 1.5;
$x = $buffer[0] + $buffer[1];
// Get the number of elements
$count = count($buffer); // or $buffer->count()
```

An example of dumping data in the buffer in binary format and loading it into another buffer.

```php
use Interop\Polite\Math\Matrix\NDArray;
use Rindow\Math\Buffer\FFI\BufferFactory; // Added use of BufferFactory

$factory = new BufferFactory();
$x = $factory->Buffer(10, NDArray::float32);
$y = $factory->Buffer(10, NDArray::float32);
$x[0] = 1.0;
$x[1] = 1.5;
// Get the contents of $x as a binary string
$data = $x->dump();
// Load the contents of $x into $y
$y->load($data);
```

An example of passing the buffer address to a C language library.

```php
use Interop\Polite\Math\Matrix\NDArray;
use Rindow\Math\Buffer\FFI\BufferFactory; // Added use of BufferFactory
use FFI; // Added use of FFI

$factory = new BufferFactory();
$ffi = FFI::cdef(/*Definition of foo*/); // Describe the C language definition
$x = $factory->Buffer(10, NDArray::float32);
$y = $factory->Buffer(10, NDArray::float32);

$x[0] = 1.0;
$x[1] = 1.5;

switch($x->dtype()) {
    case NDArray::float32: {
        $ffi->foo_float($x->addr(0),$y->addr(0));
        break;
    }
    case NDArray::float64: {
        $ffi->foo_double($x->addr(0),$y->addr(0));
        break;
    }
    default: {
        throw new \RuntimeException("Unsupported data type.");
    }
}
```
