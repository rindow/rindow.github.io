---
layout: document
title: "Array buffer"
upper_section: index
previous_section: openblas/overviewopenblas
next_section: openblas/blaslibrary
---

Concepts
--------
PHP's Array type is not suitable for matrix operations.
We need a common format. It exchanges data between C language programs that realize high-speed matrix operations and PHP programs that handle matrix operations.

In general, fast matrix operations use a contiguous memory area that stores numbers. For example, if you want to use the SIMD instruction of the CPU, or a data area to transfer to the GPU.

The Buffer class can handle a continuous memory area as an array in PHP.

The memory area can be accessed from PHP as a one-dimensional array. The data is just a single sequence of numbers.

How you use it as an N-dimensional array is up to the program that uses it. This allows it to be defined as a simple specification.

PHP interface
-------------
Buffer is created by specifying data type and size.
Since it has an ArrayAccess interface and a Count interface, it can be used like an array.

The universal Buffer has the following interface for convenience:
```php
use Interop\Polite\Math\Matrix\Buffer as BufferInterface;

class Buffer implements BufferInterface {
    public function __construct(int $size, int $dtype);
    public function dtype() : int;
    public function value_size() : int;
    public function count() : int;
    public function offsetExists(mixed $offset) : bool;
    public function offsetGet(mixed $offset): mixed;
    public function offsetSet(mixed $offset, mixed $value): void;
    public function offsetUnset(mixed $offset): void;
    public function dump() : string;
    public function load(string $string) : void;
}
```
The definition of the Buffer interface is as follows.
```php
namespace Interop\Polite\Math\Matrix;

use Countable;
use ArrayAccess;

interface BufferInterface extends Countable,ArrayAccess
{
}
```

To enable a C language interface, rindow-math-buffer-ffi via FFI adds a LinearBuffer interface that inherits from Buffer and an addr method.

LinearBuffer represents a continuous memory space buffer such as in C language.

```php
namespace Rindow\Math\Buffer\FFI;
use Interop\Polite\Math\Matrix\LinearBuffer;
use FFI;

class Buffer implements LinearBuffer {
    public function __construct(int $size, int $dtype);
    public function dtype() : int;
    public function value_size() : int;
    public function count() : int;
    public function addr(int $offset) : FFI\CData
    public function offsetExists(mixed $offset) : bool;
    public function offsetGet(mixed $offset): mixed;
    public function offsetSet(mixed $offset, mixed $value): void;
    public function offsetUnset(mixed $offset): void;
    public function dump() : string;
    public function load(string $string) : void;
}
```

To standardize the interface, be sure to use a factory to generate objects.
```php
namespace Rindow\Math\Buffer\FFI;

class BufferFactory
{
    public function isAvailable() : bool;
    public function Buffer(int $size, int $dtype) : Buffer;
}
```


Usage on PHP
------------
Here is the sample code.

```php
use Interop\Polite\Math\Matrix\NDArray;
$factory = new Rindow\Math\Buffer\FFI\BufferFactory()
$buffer = $factory->Buffer(10,NDArray::float32);
$buffer[0] = 1.0;
$buffer[1] = 1.5;
$x = $buffer[0]+$buffer[1];
$count = count($buffer);
```

You can quickly dump the data in the buffer.
```php
$x = $factory->Buffer(10,NDArray::float32);
$y = $factory->Buffer(10,NDArray::float32);
$x[0] = 1.0;
$x[1] = 1.5;
$data = $x->dump();
$y->load($data);
```
