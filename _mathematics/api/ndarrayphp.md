---
layout: document
title: "NDArrayPhp"
grand_upper_section: index
upper_section: apitoc
previous_section: apitoc
next_section: matrixoperator
---
- **namespace**: Rindow\Math\Matrix
- **classname**: NDArrayPhp
- **implements**:
    - Interop\Polite\Math\Matrix\NDArray
    - Serializable

A N-dimensional array

Methods
-------
{:.no_toc}
* Table of contents
{:toc}

### shape
```php
public function shape() : array
```
Shape of the array.

### ndim
```php
public function ndim() : int
```
Number of array dimensions

### dtype
```php
public function dtype()
```
Data type.
Data type of array element represented by NDArray constant
(NDArray::int32, NDArray::float32 etc.)

### buffer
```php
public function buffer() : ArrayAccess
```
Data buffer object.

Examples

```php
$org = $matrixoperator->array([[1,2],[3,4]]);
$a = $org[1];
$bufferOrg = $org->buffer();
$bufferA = $a->buffer();
## bufferOrg => [1,2,3,4]
## bufferA => [1,2,3,4]   <=== same buffer instance
```

### offset
```php
public function offset() : int
```
Data buffer offset.

Examples

```php
$org = $matrixoperator->array([[1,2],[3,4]]);
$a = $org[1];
$offsetOrg = $org->offset();
$offsetA = $a->offset();
## offsetOrg => 0
## offsetA => 2
## a->buffer() => [1,2,3,4]
## a => [3,4]
```

### size
```php
public function size() : int
```
Total number of array elements.

Examples

```php
$org = $matrixoperator->array([[1,2],[3,4]]);
$a = $org[1];
$size = $a->size();
## size => 2
## a => [3,4]
```


### reshape
```php
public function reshape(array $shape) : NDArray
```
Get an array with a different shape. The original array is not changed.
The buffer objects of the new array and the original array are shared.

Examples

```php
$org = $matrixoperator->array([[1,2],[3,4]]);
$a = $org->reshape([4]);
## org => [[1,2],[3,4]]
## a => [1,2,3,4]
## org->buffer() => [1,2,3,4]
## a->buffer() => [1,2,3,4]   <== same buffer instance
```


### toArray
```php
public function toArray() : array
```
Convert to php array format.

### offsetExists
```php
public function offsetExists( $offset )
```
One of the methods of ArrayAccess Interface.

- **offset**: Array index to check for existence.
    - an integer or array.

### offsetGet
```php
public function offsetGet( $offset )
```
One of the methods of ArrayAccess Interface.

- **offset**: Array index to get.
    - If it is an integer, get one element of the array.
    - If offset is an array type, it indicates the range to be extracted. Gives a pair of start offset and end offset in array type.

Result
- For a one-dimensional array, returns the data value.
- For two-dimensional arrays and above, returns the NDArray type. In this case, the buffer object is shared with the buffer of the original NDArray.

Examples
```php
$array = $matrixOperator->array([[1,2],[3,4],[5,6],[7,8]]);
## get a element.
$a = $array[0];
# a => NDArray type [1,2]

## Get elements 0 to 4
$b = $array[[1,2]];
# b => NDArray type [[3,4],[5,6]]

## get a array[0], then get a array[0][1].
$c = $array[0][1];
# c => float type 2.0
```

### offsetSet
```php
public function offsetSet( $offset , $value )
```
One of the methods of ArrayAccess Interface.

- **offset**: Array index to set.
    - Only integers are supported. Indicates the index of the array element.
    - Range specification is not currently supported.
- **value**: Value to set.
    - If the array is a one-dimensional array, set a scalar value to the array element.
    - If the array is two or more dimensions array, the NDArray that has the same shape as the NDArray that is the array element is received in "value" and the array element is copied.
    - If it does not match the expected "value" type, throw an InvalidArgumentException.

Examples
```php
$array = $matrixOperator->array([[1,2],[3,4],[5,6],[7,8]]);
$a = $matrixOperator->array([10,20]);

## Set a array to array.
$array[0] = $a;

## Set a element
$array[0][1] = 10;
```


### offsetUnset
```php
public function offsetUnset( $offset )
```
One of the methods of ArrayAccess Interface.

Unsuppored operation. Throw the LogicException


### setPortableSerializeMode
```php
public function setPortableSerializeMode(bool $mode)
```
Use hardware-independent preservation in serialize.


### getPortableSerializeMode
```php
public function getPortableSerializeMode()
```
Get Portable Serialized Mode status


### serialize
```php
public function serialize()
```
One of the methods of Serializable Interface.

Converts an NDArray to a storable binary string.


### unserialize
```php
public function unserialize($serialized)
```
One of the methods of Serializable Interface.

Converts a savable binary string to an NDArray.
