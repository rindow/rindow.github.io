---
layout: document
title: "Tokenizer"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/preprocessor
next_section: api/textclassifieddataset
---

- **namespace**: Rindow\NeuralNetworks\Data\Sequence
- **classname**: Tokenizer

Assign numbers to words to convert texts into sequences of integers.

Methods
-------

### constructor
```php
public function __construct(
    object $mo,
    callable $analyzer=null,
    int $num_words=null,
    string $filters="!\"\'#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n",
    string $specials=null,
    bool $lower=true,
    string $split=" ",
    bool $char_level=false,
    string $oov_token=null,
    int $document_count=0,
)
```

Options
- **num_words**: maximum number of words to use in corpus. Words with a large number of occurrences are prioritized, and words with a low priority are skipped when corpus is generated.
- **filters**: Characters removed from input text.
- **specials**: A special character that is treated as a single word, independent of the word delimiter.
- **lower**: Whether to convert the texts to lowercase.
- **split**: Word delimiter.
- **oov_token**: An alternative character to replace and include in corpus instead of skipping low priority.

### fitOnTexts
```php
public function fitOnTexts(iterable $texts) : void
```
Initialization of vocabulary table or append vocabulary

Arguments

- **texts**: list of text string. Initialize with the entered text.

### textsToSequences
```php
public function textsToSequences(iterable $texts) : iterable
```
Convert text to sequence based on vocabulary table

Arguments

- **texts**: list of text string.


### sequencesToTexts
```php
public function sequencesToTexts(iterable $sequences) : iterable
```
Convert sequence to text based on vocabulary table

Arguments

- **sequences**: list of sequences.

### numWords
```php
public function numWords(bool $internal=null) : int
```
Number of valid words in the vocabulary table.

Arguments

- **internal**: If True, returns the number of internally held words instead of the number of valid words.

### wordToIndex
```php
public function wordToIndex(string $word) : int
```
Convert the word to the word number.

Arguments

- **word**: Word string.

### indexToWord
```php
public function indexToWord(int $index) : string
```
Convert the word number to the word.

Arguments

- **word**: Word number.

Examples
--------

```php
$texts = [
    "Hello Tom!\n",
    "Good morning.\n",
    "Good night Tom.\n",
];
$tokenizer = new Tokenizer($mo);
$tokenizer->fitOnTexts($texts);
$sequences = $tokenizer->textsToSequences($texts);
# $sequences:
# [[1,2],[3,4],[3,5,2]]
$texts = $tokenizer->sequencesToTexts($sequences);
# $texts:
# [["hello tom"],["good morning"],["good night tom"]]
$word = $tokenizer->numWords()
```
