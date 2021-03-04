---
layout: document
title: "ImageDataGenerator"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/imagefilter
---

- **namespace**: (Rindow\NeuralNetworks\Data\Image)
- **classname**: (NDArrayDataset)

NDArrayDataset with ImageFilter applied.
A data set that randomly processes and returns image data.

The builder creates an instance, but it's actually an instance of the NDArrayDataset class.

Methods
-------

### constructor
```php
$builer->ImageDataGenerator(
    NDArray $inputs,
    array $options=[
        'tests'=>null,
        'batch_size'=>32,
        'shuffle'=>true,
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

- **tests**: Specify inputs and the corresponding tests data.
- **batch_size**: batch size.
- **shuffle**: Randomize the order of the returned values.
- **data_format**: Either "channels_last" or "channels_first". Specify which of the input shapes is the channel.
- **height_shift**: Maximum number of pixels to randomly slide the image up and down.
- **width_shift**: Maximum number of pixels to randomly slide the image left and right.
- **vertical_flip**: Randomly flip it upside down.
- **horizontal_flip**: Randomly flip left and right.

Examples

```php
use Rindow\NeuralNetworks\Builder\NeuralNetworks;
$nn = new NeuralNetworks($mo);
$dataset = $nn->data()->ImageDataGenerator($inputs,[
    'tests'=>$tests,
    'height_shift'=>2,
    'width_shift'=>2,
    'vertical_flip'=>true,
    'horizontal_flip'=>true]);
foreach ($dataset as $batchdataset) {
    [$train,$label] = $batchdataset;
    foreach ($train as $key => $value) {
        $inputs = $value;
        $trues  = $label[$key];
        //....... some processing
    }
}
```
