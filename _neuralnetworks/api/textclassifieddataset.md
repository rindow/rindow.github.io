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
        'shuffle'=>false,
        'limit'=>null,
        'restricted_by_class'=>null,
        'tokenizer'=>null,
        'classnames'=>[],
        'num_words'=>null,
        'tokenizer_filters'=>"!\"\'#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n\r",
        'specials'=>null,
        'lower'=>true,
        'split'=>" ",
        'char_level'=>false,
        'oov_token'=>null,
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
- **tokenizer**: instance of tokenizer.
- **classnames**: list of classname.
- **num_words**: maximum number of words to use in corpus. Words with a large number of occurrences are prioritized, and words with a low priority are skipped when corpus is generated.
- **tokenizer_filters**: Characters removed from input text.
- **specials**: A special character that is treated as a single word, independent of the word delimiter.
- **lower**: Whether to convert the texts to lowercase.
- **split**: Word delimiter.
- **oov_token**: An alternative character to replace and include in corpus instead of skipping low priority.
- **preprocessor**: instance of preprocessor.
- **maxlen**: sequence max length. If the sequence is short, it will be padded. If the sequence is long, it will be truncated. If Null, the maximum length of the sequence will be applied.
- **dtype**: Output NDArray data type.
- **padding**: If "pre", it will be padded before. If it is "post", it will be padded later.
- **truncating**: If "pre", the front is truncated. If it is "post", the rest will be truncated.
- **value**: Value to be padded.
- **verbose**: Show progress bar when using loadData method.

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
