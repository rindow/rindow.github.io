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

Buffer has the following interface for convenience.
```php
namespace Rindow\OpenBLAS;
use ArrayAccess;
use Countable;
class Buffer implement ArrayAccess,Countable
{
    public function __construct(int $size,int $dtype);
    public function offsetExists(int $offset);
    public function offsetGet(int $offset);
    public function offsetSet(int $offset,$value);
    public function offsetUnset(int $offset);
    public function count() : int;
    public function dtype() : int;
    public function dump() : string;
    public function load(string $data) : void;
}
```

Usage on PHP
------------
Here is the sample code.

```php
use Interop\Polite\Math\Matrix\NDArray;
$buffer = new Rindow\OpenBLAS\Buffer(10,NDArray::float32);
$buffer[0] = 1.0;
$buffer[1] = 1.5;
$x = $buffer[0]+$buffer[1];
$count = count($buffer);
```

You can quickly dump the data in the buffer.
```php
use Interop\Polite\Math\Matrix\NDArray;
$x = new Rindow\OpenBLAS\Buffer(10,NDArray::float32);
$y = new Rindow\OpenBLAS\Buffer(10,NDArray::float32);
$x[0] = 1.0;
$x[1] = 1.5;
$data = $x->dump();
$y->load($data);
```

C language interface
--------------------
See include/Rindow/OpenBLAS/Buffer.h in the source code.

Include this header file and use Buffer in C language.

The php object structure is as follows.
```c
typedef struct {
    zend_long size;
    zend_long dtype;
    zend_long value_size;
    void* data;
    zend_object std;
} php_rindow_openblas_buffer_t;
```

Usage on C language
-------------------
The object passed in the PHP extension already has a memory area allocated for data.

Determine the data type with dtype and cast the data pointer.

The buffer size can be found in the size member

Object type checking must be defined.
You cannot use the Buffer structure unless you check whether it is a Buffer type object.

Use it as follows.
```c
#include <php.h>
#include <Rindow/OpenBLAS/Buffer.h>

static PHP_METHOD(Sample, foo)
{
    php_rindow_openblas_buffer_t* buffer;
    zend_long size;
    zval* x=NULL;
    float* data;

    ZEND_PARSE_PARAMETERS_START_EX(ZEND_PARSE_PARAMS_THROW, 1, 1)
        Z_PARAM_OBJECT(x)
    ZEND_PARSE_PARAMETERS_END();
    buffer = Z_RINDOW_OPENBLAS_BUFFER_OBJ_P(x);

    if(buffer->dtype!=php_rindow_openblas_dtype_float32) {
        zend_throw_exception(spl_ce_RuntimeException, "Unsupported data type.", 0);
        return;
    }
    size = buffer->size;
    data = (float*)buffer->data;
}
ZEND_BEGIN_ARG_INFO_EX(ai_Sample_foo, 0, 0, 1)
    ZEND_ARG_OBJ_INFO(0, x, Rindow\\OpenBLAS\\Buffer, 0)
ZEND_END_ARG_INFO()
```
