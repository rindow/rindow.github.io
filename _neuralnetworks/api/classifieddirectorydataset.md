---
layout: document
title: "ClassifiedDirectoryDataset"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/csvdataset
next_section: api/preprocessor
---

- **namespace**: Rindow\NeuralNetworks\Data\Dataset
- **classname**: ClassifiedDirectoryDataset

Reads the files classified according to the file system directory in order and returns them with the class name.

Specify the top directory with the following structure.
```
-top-+-class1-+-file1
     |        +-file2
     |
     +-class2-+-file3
              +-file4
```

Methods
-------

### constructor
```php
public function __construct(
    $mo,
    string $path,
    array $options=[
        'pattern'=>null,
        'batch_size'=>32,
        'crawler'=>null,
        'filter'=>null,
        'unclassified'=>false,
        'shuffle'=>false,
        'limit'=>null,
        'restricted_by_class'=>null,
    ]
)
```

Arguments

- **path**: Top directory of classified directories.
- **pattern**: File name pattern. Specifies the regular expression for preg_match.
- **batch_size**: Batch size
- **crawler**: Specifies an instance of the service that crawls the directory tree. By default it uses its own Dir class.
- **filter**: Specifies the filter for the dataset. Filter will be described later.
- **unclassified**: It works in unclassified mode. If set to true, the returned value will not include classname.
- **shuffle**: Shuffles the order of the returned values.
- **limit**: Sets the maximum number of values to return.
- **restricted_by_class**: Restricts returning only the values contained in the specified class.

Examples

```php
use Rindow\NeuralNetworks\Data\Dataset\ClassifiedDirectoryDataset;
$dataset = new ClassifiedDirectoryDataset($mo,'/text',['pattern'=>'@.*\\.txt@']);
foreach ($dataset as $batchdataset) {
    [$contents,$labels] = $batchdataset;
    foreach ($contents as $key => $value) {
        $content = $value;
        $class   = $labels[$key];
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
- **options**: array of file path list.

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
        foreach($inputs as $key => $value) {
        }
        return [$inputs,$tests];
    }
}
```
