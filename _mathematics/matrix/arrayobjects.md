---
layout: document
title: "Array objects"
upper_section: index
previous_section: matrix/matrix
next_section: matrix/dimensionoperations
---
## NDArray Interface

### Overview
Rindow Math Matrix provides an N-dimensional array type called NDArray. This represents a collection of "items" of the same type. Items can be indexed using, for example, N floating-point values.


All items contained in an NDArray hold values of the same type. All items are specified by the standard PHP interface "ArrayAccess." A single value's data type is an integer type, floating-point type, or boolean type defined in NDArray.

The N-dimensional array is mapped to a one-dimensional array buffer and stored as a contiguous region.

![NDArray](images/ndarray.png)

Most importantly, the NDArray interface is not part of the Rindow framework. **The interface is defined independently**, and it can be freely implemented by other frameworks.

```php
use Interop\Polite\Math\Matrix\NDArray;
```

For details, refer to [interop-phpobjects/polite-math](https://github.com/interop-phpobjects/polite-math).

### Methods

#### offsetGet
Items are retrieved using the "offsetGet" method of the ArrayAccess interface.

For an NDArray with two or more dimensions, the "offsetGet" method returns an NDArray type. This enables the implementation of N-dimensional arrays. In this case, the buffer is not copied but shared between the two NDArrays.

```php
# $a is a 2D NDArray of float32
dimensions
$b = $a[1];
# $b is a 1D NDArray of float32
if ($b instanceof NDArray) {
    echo "b is an NDArray\n";
}
if ($b[2] == $a[1][2]) {
    echo "Same item\n";
}
if (spl_object_id($a->buffer()) == spl_object_id($b->buffer())) {
    echo "Buffer is shared!!\n";
}
```

It is also possible to specify a range as an index using a PHP array.

The specified range is returned as an NDArray. Again, the buffer is shared.

```php
# $a is a 2D NDArray of float32
dimensions
$b = $a[[1,4]];
# $b references elements 1 to 3 in a 2D NDArray of float32
```

> In version 1, the range was [1,3], but starting from version 2, it is written as [1,4].
> This change was made for consistency with other systems and to simplify notation in many cases.

#### offsetSet
Items are set using the "offsetSet" method of the ArrayAccess interface.

When using the "offsetSet" method on an NDArray with two or more dimensions, the array is copied.
The copied array must have the same shape.

```php
# $a is a 2D NDArray of float32 with shape [3,2]
# $b is a 1D NDArray of float32 with shape [2]
$a[1] = $b;
```

#### offsetExists
Since values always exist within the range of an NDArray, "offsetExists" returns the result of the range check.

#### offsetUnset
It is not possible to delete an item's region.

#### count
Returns the number of elements in the first dimension of the NDArray.

```php
# $a is a 2D NDArray of float32 with shape [3,2]
echo $a->count() . "\n";
# 3
echo count($a) . "\n";
# 3
```

#### dtype
Returns the data type of the NDArray.

```php
# $a is a 2D NDArray of float32 with shape [3,2]
echo $a->dtype() . "\n";
# 12 // NDArray::float32
```

#### shape
Retrieves the shape of the N-dimensional array defined in NDArray.

```php
$shape = $a->shape();
var_dump($shape);
# array(2) {
#   [0] =>
#   int(3)
#   [1] =>
#   int(2)
# }
```

#### ndim
Retrieves the number of dimensions of the array.

```php
# $a is a 2D NDArray of float32 with shape [3,2]
$ndim = $a->ndim();
echo $ndim;
# 2
```

#### buffer
Retrieves the buffer object.

```php
$buffer = $a->buffer();
```

#### offset
Retrieves the offset referenced by the NDArray in the buffer object.

```php
$offset = $a->offset();
```

#### size
Retrieves the total number of items in the array. This is not the buffer size.

```php
# $a is a 2D NDArray of float32 with shape [3,2]
$size = $a->size();
echo $size."\n";
# 6
```

#### reshape
Returns an NDArray with a modified shape. The size must be the same as the original array. The buffer is shared, meaning modifying the reshaped array also updates the original array.

```php
# $a is a 2D NDArray of float32 with shape [3,2]
$flatA = $a->reshape([6]);
```

#### toArray
Converts the NDArray to a PHP array type.

```php
$array = $a->toArray();
```

### Constants
NDArray has constants representing its data types.

Various data types are defined for convenience, but it is not necessary to implement all of them.

- bool
- int8
- int16
- int32
- int64
- uint8
- uint16
- uint32
- uint64
- float8
- float16
- float32
- float64
- complex16
- complex32
- complex64
- complex128

## Buffer Object

### Overview
The buffer object stores the actual data of an NDArray. It implements a one-dimensional array.
It must implement PHP's standard ArrayAccess and Countable interfaces. Since various implementations are expected, a basic Buffer interface is defined.

A one-dimensional array can be implemented in any manner, but contiguous memory regions generally allow the CPU to perform faster operations. Referencing memory at the C language level makes data exchange with high-speed computation libraries easier.

For these reasons, NDArray uses a one-dimensional array buffer object instead of a PHP array. This interface is also **defined independently** and can be freely implemented by other frameworks.

```php
use Interop\Polite\Math\Matrix\Buffer;
```

### Methods

#### offsetGet
The index must be an integer.
Retrieves the item's value.

#### offsetSet
The index must be an integer.
Sets the item's value.

#### offsetExists
The index must be an integer.
Returns whether the index is within range.

#### offsetUnset
The index must be an integer.
Sets the item to zero.

#### count
Retrieves the number of items. This is not the reserved memory size.

## Linear Buffer Object

The basic Buffer interface does not specify internal binary representation, but the LinearBuffer guarantees a flat memory region as an internal representation. This allows data to be passed to external libraries via a C language interface.

Methods inherit from the basic Buffer interface.

```php
use Interop\Polite\Math\Matrix\LinearBuffer;
```

## Device Buffer Object

Unlike LinearBuffer, which ensures direct memory access, DeviceBuffer represents data stored on separate hardware, such as GPU memory.

Methods inherit from the basic Buffer interface.

```php
use Interop\Polite\Math\Matrix\DeviceBuffer;
```

