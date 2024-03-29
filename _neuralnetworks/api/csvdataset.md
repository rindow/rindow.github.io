---
layout: document
title: "CSVDataset"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/ndarraydataset
next_section: api/classifieddirectorydataset
---

- **namespace**: Rindow\NeuralNetworks\Data\Dataset
- **classname**: CSVDataset

CSV data preprocessor.

Read the CSV file under the specified path and convert it to NDArray through the created filter.

Methods
-------

### constructor
```php
$builer->CSVDataset(
    string $path,
    string $pattern=null,
    int $batch_size=32,
    bool $skip_header=false,
    DatasetFilter $filter=null,
    object $crawler=null,
    bool $shuffle=false,
    int $length=0,
    string $delimiter=',',
    string $enclosure='"',
    string $escape='\\',
)
```
You can create a CSVDataset instances with the Data Builder.

Arguments

- **path**: Top directory of csv files.
- **pattern**: File name pattern. Specifies the regular expression for preg_match.
- **batch_size**: Batch size
- **filter**: Specifies the filter for the dataset. Filter will be described later.
- **crawler**: Specifies an instance of the service that crawls the directory tree. By default it uses its own Dir class.
- **shuffle**: Whether to randomize the order of the data in the batch. (Note that it is not random for the entire data)
- **length**: Limit maximum line length
- **delimiter**: The optional delimiter parameter sets the field delimiter (one character only).
- **enclosure**: The optional enclosure parameter sets the field enclosure character (one character only).
- **escape**: The optional escape parameter sets the escape character (at most one character). An empty string ("") disables the proprietary escape mechanism.

Examples

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$filter = new MyFilter();
$csv = $nn->data()->CSVDataset('/datapath/csvdatadir',['filter'=>$filter]);
foreach ($csv as $batchdataset) {
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
Set a filter to convert CSV row data to NDArray.

In order to use CSVDataset, it is necessary to specify a filter with DatasetFilter interface by the option of the constructor or by the setFilter method.

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

- **inputs**: Array of strings read by fgetcsv for the number of rows of the specified batch size.
- **tests**: N/A
- **options**: N/A

Output set

- **inputs**: Data expected to be used for training input
- **tests**: Data expected to be used for correct labels

### Filter Example
An example of a filter that returns the last column of csv as the correct label

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
        $batchSize= count($inputs);
        $cols = count($inputs[0])-1;
        $inputsNDArray = $this->mo->la()->alloc([$batchSize,$cols]);
        $testsNDArray = $this->mo->la()->alloc([$batchSize,1]);
        foreach ($inputs as $i => $row) {
            $testsNDArray[$i][0] = (float)array_pop($row);
            for($j=0;$j<$cols;$j++) {
                $inputsNDArray[$i][$j] = (float)$row[$j];
            }
        }
        return [$inputsNDArray,$testsNDArray];
    }
}
```
