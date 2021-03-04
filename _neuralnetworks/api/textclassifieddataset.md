---
layout: document
title: "TextClassifiedDataset"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/tokenizer
next_section: api/imagefilter
---

- **namespace**: Rindow\NeuralNetworks\Data\Dataset
- **classname**: TextClassifiedDataset
- **parentclass**: Rindow\NeuralNetworks\Data\Dataset\ClassifiedDirectoryDataset

Classified text data preprocessor.
Inherit the ClassifiedDirectoryDataset class to do the general pre-processing of text.

The loaded text is converted to Sequence using the Tokenizer class.

In addition, you can use the loadData method to convert the entire dataset to an NDArray of Text sequence and class number.

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
$builer->TextClassifiedDataset(
    string $path,
    array $options=[
        'pattern'=>null,
        'batch_size'=>32,
        'crawler'=>null,
        'unclassified'=>false,
        'padding'=>'post',
        'tokenizer'=>null,
        'classnames'=>[],
        'analyzer'=>null,
        'num_words'=>null,
        'tokenizer_filters'=>"!\"\'#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n\r",
        'specials'=>null,
        'lower'=>true,
        'split'=>" ",
        'char_level'=>false,
        'oov_token'=>null,
        'document_count'=>0,
        'preprocessor'=>null,
        'maxlen'=>null,
        'dtype'=>NDArray::int32,
        'padding'=>"post",
        'truncating'=>"post",
        'value'=>0,
        'verbose'=>false,
    ]
)
```
You can create a TextClassifiedDataset instances with the Data Builder.


Examples

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$dataset = $nn->data()->TextClassifiedDataset(
    '/data/path/text',
    ['pattern'=>'@.*\\.txt@',]);

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

### fitOnTexts
```php
public function fitOnTexts()
```
Start fitOnTexts of Tokenizer and perform preprocessing to convert Text to Sequence.
Call the TextClassifiedDataset instance before using it as an iterator.

For example, call this method before using it in foreach.

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$dataset = $nn->data()->TextClassifiedDataset(
    '/dataset/text',
    [
        'pattern'=>'@.*\\.txt@',
        'batch_size'=>8,
    ]
);

$dataset->fitOnTexts();
foreach ($dataset as $key => $value) {
    $datas[] = $value;
    [$texts,$labels] = $value;
    foreach($texts as $key => $text) {
        $label = $labels[$key];
        $sets[] = [$text,$label];
        $liseqs[] = $text;
        $lilabels[] = $label;
    }
}

```

### loadData
```php
public function loadData()
```
Call this method if you don't want to use TextClassifiedDataset as an iterator and want to use it to generate an NDArray.

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$dataset = $nn->data()->TextClassifiedDataset(
    '/dataset/text',
    [
        'pattern'=>'@.*\\.txt@',
        'batch_size'=>8,
    ]
);
[$inputs,$tests] = $dataset->loadData();
$classnames = $dataset->classnames();
```
