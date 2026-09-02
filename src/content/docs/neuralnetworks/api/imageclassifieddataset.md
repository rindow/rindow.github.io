---
layout: document
title: "ImageClassifiedDataset"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/imagedatagenerator
---

- **namespace**: Rindow\NeuralNetworks\Data\Image
- **classname**: ImageClassifiedDataset
- **parentclass**: Rindow\NeuralNetworks\Data\Dataset\ClassifiedDirectoryDataset

Classified image data preprocessor.
Inherit the ClassifiedDirectoryDataset class to do the general pre-processing of image.

The loaded image is converted to NDArray.

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
$builer->ImageClassifiedDataset(
    string $path,
    int $height=32,
    int $width=32,
    int $channels=3,
    bool $fit=true,
    int $dtype=NDArray::uint8,
    int $dtype_class_id=NDArray::int32,
    array $classnames=[],
    int $verbose=null,
    string $pattern=null,
    int $batch_size=32,
    object $crawler=null,
    DatasetFilter $filter=null,
    bool $unclassified=false,
    bool $shuffle=false,
    int $limit=null,
    array $restricted_by_class=null,
)
```
You can create a ImageClassifiedDataset instances with the Data Builder.

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
- **height**: Image height
- **width**: Image width,
- **channels**: Image channels,
- **fit**: Reduces or enlarges the size of the file image to fit the size of the NDArray at the load destination.
- **dtype**: NDArray data type for loading image data
- **dtype_class_id**: Data type of class Id
- **classnames**: list of classname.
- **verbose**: Show progress bar when using loadData method.

Examples

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$dataset = $nn->data()->ImageClassifiedDataset(
    '/data/path/image',
    pattern:'@.*\\.png@');

foreach ($dataset as $batchdataset) {
    [$train,$label] = $batchdataset;
    foreach ($train as $key => $value) {
        $inputs = $value;
        $trues  = $label[$key];
        //....... some processing
    }
}
```

### classnames
```php
public function classnames()
```
Returns all processed class names.

You can't get the correct answer without reading the dataset to the end.

### getTokenizer
```php
public function getTokenizer()
```
Returns the Tokenizer instance in use.

### getPreprocessor
```php
public function getPreprocessor()
```
Returns the Preprocessor instance in use.

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

### loadData
```php
public function loadData()
```
Call this method if you don't want to use ImageClassifiedDataset as an iterator and want to use it to generate an NDArray.

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$dataset = $nn->data()->ImageClassifiedDataset(
    '/dataset/text',
    pattern:'@.*\\.png@',
);
[$inputs,$tests] = $dataset->loadData();
$classnames = $dataset->classnames();
```
