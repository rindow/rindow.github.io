---
layout: document
title: "SequentialDataset"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/classifieddirectorydataset
next_section: api/preprocessor
---

- **namespace**: Rindow\NeuralNetworks\Data\Dataset
- **classname**: SequentialDataset

Combine multiple datasets and output them in batches. This is particularly useful when dealing with data that doesn't fit into memory.


Methods
-------

### constructor
```php
$builer->SequentialDataset(
        iterable $inputs,
        ?int $batch_size=null,
        ?int $total_size=null,
        ?bool $shuffle=null,
        ?DatasetFilter $filter=null,
        ?DatasetFilter $inputs_filter=null,
)
```
You can create a NDArrayDataset instances with the Data Builder.

Arguments

- **inputs**: Specify inputs and the corresponding tests data. an iterator that yields arrays of type NDArray or NDrray, consisting of two arrays.
- **batch_size**: batch size.
- **total_size**: specify the maximum data size.
- **shuffle**: Randomize the order of the returned values.
- **filter**: Instance of dataset filter.
- **inputs_filter**: N/A

Examples

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$sequential_inputs = new MyHugeDataStream($files);
$filter = new MyFilter();
$dataset = $nn->data()->SequentialDataset(
    $sequential_inputs,
    filter:$filter);
foreach ($dataset as $batchdataset) {
    [$train,$label] = $batchdataset;
    foreach ($train as $key => $value) {
        $inputs = $value;
        $trues  = $label[$key];
        //....... some processing
    }
}
```


### setFilter
```php
public function setFilter(DatasetFilter $filter) : void
```
Set a filter to process input data on demand.

Arguments

- **filter**: Instance of conversion filter.


### batchSize
```php
public function batchSize() : int
```
Dataset batch size.


### datasetSize
```php
public function datasetSize() : int
```
Total size of the dataset.

In the initial state, the file is not read, so the correct size cannot be returned.
You can get the size after reading to the end of the dataset

### count
```php
public function count() : int
```
Number of batch steps.

In the initial state, the file is not read, so the correct size cannot be returned.
You can get the size after reading to the end of the dataset


How to make a filter
--------------------
It is loaded by the fgetcsv function and passed a PHP native Array organized by batch size.
You need to implement a filter that converts this to an NDArray.

Create a class that implements DatasetFilter and implement the translate method.

### translate
```php
public function translate(iterable $inputs, iterable $tests=null, $options=null) : array
```

Arguments

- **inputs**: NDArray rows of the specified batch size from the inputs.
- **tests**: NDArray rows of the specified batch size from the tests.
- **options**: N/A.

Output set

- **inputs**: Data expected to be used for training input
- **tests**: Data expected to be used for correct labels

### Filter Example
An example of a filter that returns input data in 1/10

```php
use Rindow\NeuralNetworks\Data\Dataset\DatasetFilter;

class TestFilter implements DatasetFilter
{
    public function __construct($mo = null)
    {
        $this->mo = $mo;
    }
    public function translate(
        iterable $inputs, iterable $tests=null, $options=null) : array
    {
        $la = $this->mo->la();
        $inputs = $la->copy($inputs);
        $la->scal(1/10,$inputs);
        return [$inputs,$tests];
    }
}
```
