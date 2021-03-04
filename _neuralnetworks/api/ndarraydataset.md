---
layout: document
title: "NDArrayDataset"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/cifar10
next_section: api/csvdataset
---

- **namespace**: Rindow\NeuralNetworks\Data\Dataset
- **classname**: NDArrayDataset

NDArray data preprocessor.

Read NDArray and process it on demand to generate a dataset.

Get the input NDArray by dividing it into batch size units. The selected data can be processed on demand using filters.

Also, the sufful option is specified by default, and it is selected from NDArray in a random order.

You can specify the data for tests and return the data as a set with inputs, or you can use a filter to generate a set from inputs.

Methods
-------

### constructor
```php
$builer->NDArrayDataset(
    NDArray $inputs,
    array $options=[
        'tests'=>null,
        'batch_size'=>32,
        'shuffle'=>true,
        'filter'=>null,
    ]
)
```
You can create a NDArrayDataset instances with the Data Builder.


Examples

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$filter = new MyFilter();
$dataset = $nn->data()->NDArrayDataset($inputs,[
    'tests'=>$tests,
    'filter'=>$filter]);
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
