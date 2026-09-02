---
layout: document
title: "Data"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/datasets
next_section: api/sequential
---
Overview
-------

- namespace: Rindow\NeuralNetworks\Builder
- classname: Data

Create an instance of data preparation features
Please refer to each features for usage.

Data preparation utilities
--------------------------
- [**CSVDataset**](csvdataset.html): CSV data preparation.
- [**NDArrayDataset**](ndarraydataset.html): NDArray data preparation.
- [**ImageFilter**](imagefilter.html): Image data filter.
- [**ImageDataGenerator**](imagedatagenerator.html): Image data generator.
- [**ClassifiedDirectoryDataset**](classifieddirectorydataset.html) : classified directory handler
- [**TextClassifiedDataset**](textclassifieddataset.html) : Text data in classified directory
- [**ImageClassifiedDataset**](imageclassifieddataset.html) : Image data in classified directory

Examples
--------

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$filter = new MyFilter();
$csv = $nn->data()->CSVDataset('/datapath/csvdatadir',filter:$filter);
```
