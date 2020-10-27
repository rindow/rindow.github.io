---
layout: document
title: "Random"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/matrixoperator
next_section: api/linearalgebra
---
- **namespace**: Rindow\Math\Matrix
- **classname**: Random

Random number library for arrays

Methods
-------
{:.no_toc}
* Table of contents
{:toc}

### constructor
```php
$random = $matrixoperator->random();
```

Example
```php
$mo = new MatrixOperator();
$random = $mo->random();
```

-------
### rand
```php
public function rand($n,$dtype=null) : NDArray
```
Generate uniform random numbers.
Generate floating point random numbers between 0 and 1

- **n**: Array shape or integer
    - If it is an array type, interpret it as an array
    - If it is an integer type, interpret it as one-dimensional elements
- **dtype**:
    - dimension type.
    - If omitted, the defaultfloattype of MatrixOperator is specified

Example
```php
$x = $mo->random()->rand(3);
## x => [0.017922753468156,0.2230901569128,0.020974824205041]
$x = $mo->random()->rand([2,2]);
## x => [[0.25896999239922,0.24897809326649],[0.21115177869797,0.56294137239456]]
```

-------
### randn
```php
public function randn($n,$dtype=null) : NDArray
```
Generate random numbers that follow a normal distribution.
Generate floating point random numbers between 0 and 1

- **n**: Array shape or integer
    - If it is an array type, interpret it as an array
    - If it is an integer type, interpret it as one-dimensional elements
- **dtype**:
    - dimension type.
    - If omitted, the defaultfloattype of MatrixOperator is specified

Example
```php
$x = $mo->random()->randn(3);
## x => [2.8502717018127,-1.4712480306625,-1.2802208662033]
$x = $mo->random()->randn([2,2]);
## x => [[0.55892831087112,0.27865865826607],[2.0675654411316,-1.1851477622986]
```

-------
### randomInt
```php
public function randomInt(int $max) : int
```
Generate a random integer

- **max**: Generate one random integer from zero to the "max".

Example
```php
$x = $mo->random()->randomInt(10);
## x => 2
$x = $mo->random()->randomInt(10);
## x => 10
```

-------
### choice
```php
public function choice($a,int $size=null, bool $replace=null)
```
Pick a value randomly from an array

- **a**: population.  an integer or NDArray type.
    - In the case of an integer, NDArray of population is automatically created using arange().
- **size**: Number of times to choose. That is, the size of the random number array to be generated.
    - If the size is 1, a value is obtained instead of an array.
    - If the size is greater than 1, an NDArray is obtained.
    - 1 is the default.
- **replace**: Whether to select the same array element multiple times
    - Select multiple times if true
    - If false, an element will be removed from the list once it has been selected.
    - true is the default.

Result
    - The chosen values.

Example
```php
$x = $mo->random()->choice(3);
## x => 2
$x = $mo->random()->choice(3,3);
## x => [2,2,0]
$x = $mo->random()->choice(3,3,false);
## x => [1,2,0]
$x = $mo->random()->choice($mo->array([10,20]),3);
## x => [10.0, 10.0, 20.0]
```
