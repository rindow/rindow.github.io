---
layout: document
title: "ImageFilter"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/textclassifieddataset
next_section: api/imagedatagenerator
---

- **namespace**: Rindow\NeuralNetworks\Data\Image
- **classname**: ImageFilter

This is a data set filter that randomly processes image data.

Use by applying to NDArrayDataset.

Methods
-------

### constructor
```php
$builer->ImageFilter(
    array $options=[
        'data_format'=>'channels_last',
        'height_shift'=>0,
        'width_shift'=>0,
        'vertical_flip'=>false,
        'horizontal_flip'=>false
    ]
)
```
You can create a ImageFilter instances with the Data Builder.

Arguments

- **data_format**: Either "channels_last" or "channels_first". Specify which of the input shapes is the channel.
- **height_shift**: Maximum number of pixels to randomly slide the image up and down.
- **width_shift**: Maximum number of pixels to randomly slide the image left and right.
- **vertical_flip**: Randomly flip it upside down.
- **horizontal_flip**: Randomly flip left and right.

Examples

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$filter = $nn->data()->ImageFilter(
    ['height_shift'=>2,
    'width_shift'=>2,
    'vertical_flip'=>true,
    'horizontal_flip'=>true]);
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
