---
layout: document
title: "Buffer"
grand_upper_section: index
upper_section: api/apitoc
next_section: api/blas
---
- **namespace**: Rindow\\OpenBLAS
- **classname**: Buffer

Buffer object for array. Allocate contiguous memory area.


Class implementation
--------------------
```php
namespace Rindow\OpenBLAS;
use ArrayAccess;
use Countable;
class Buffer implement ArrayAccess,Countable
{}
```

Methods
-------
{:.no_toc}
* Table of contents
{:toc}

### constructor
```php
public function __construct(int $size,int $dtype);
```

Arguments
- **size**: buffer size.
    - Number of elements in array. (Note that it is not the memory size)
- **dtype**: data type.
    - Specify one of the data types defined in Interop\\Polite\\Math\\Matrix\\NDArray.

Example
```php
use Interop\Polite\Math\Matrix\NDArray;
$buffer = new Rindow\OpenBLAS\Buffer(10,NDArray::float32);
```

### offsetExists
```php
public function offsetExists($offset)
```
One of the ArrayAccess interface.

Arguments
- **offset**: Array access offset.
    - Must be an integer.

### offsetGet
```php
public function offsetGet($offset)
```
One of the ArrayAccess interface.

Arguments
- **offset**: Array access offset.
    - Must be an integer.

### offsetSet
```php
public function offsetSet($offset,$value)
```
One of the ArrayAccess interface.

Arguments
- **offset**: Array access offset.
    - Must be an integer.
- **value**: Value to set.

### offsetUnset
```php
public function offsetUnset($offset)
```
One of the ArrayAccess interface.

Set the value of the element to 0. Element cannot be deleted.

Arguments
- **offset**: Array access offset.
    - Must be an integer.

### count
```php
public function count()
```
One of the Countable interface.

Return
- Number of elements in array.

### dtype
```php
public function dtype() : int
```
Array data type.

Return
- Array data type.

### dump
```php
public function dump() : string
```
Returns the memory area of the array as a PHP string.

Return
- binary string.

### load
```php
public function load(string $data) : void
```
Load PHP string type into memory area of array.

Arguments
- **data**: binary string.
