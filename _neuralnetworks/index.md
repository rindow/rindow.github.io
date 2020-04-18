---
layout: document
title: "Rindow Neural Networks"
next_section: gettingstarted
---

Hello there!
------------

The Rindow Neural Networks is a high-level neural networks library for deep learning.

The goal is to be able to describe a network model in PHP as well as Python
using a description method similar to Keras.

If you use the rindow_openblas php extension,
you can calculate at speed close to CPU version of tensorflow.
The trained model trained on your laptop is available on general web hosting.
You can also benefit from deep learning on popular PHP web hosting services.

It has the following features.

- A high-level neural networks description
- Cooperation with high-speed operation library
- Designing for scalability of operation library
- To save developers the time to learn how to use this library, we adopt an interface similar to Keras.

Rindow Neural Networks usually work with:

- Rindow Math Matrix: scientific matrix operation library
- Rindow OpenBLAS extension: PHP extension of OpenBLAS
- Rindow Math Plot: Visualize machine learning results


Why do deep learning with PHP?
------------------------------

> - "If you do deep learning, you should use Python."
> - "You can't study Python anyway."
> - "Isn't Python an excellent Deep learning framework?"

What you say is right.

So why do we have to use Python?

Do you need to be platform constrained for deep learning?
Never need!

Deep learning / ML is only a small part of the whole system. It's just a small group of functions in the library.
Everyone should be able to use it anywhere, as much as print "Hello!".

It is more unnatural to not be able to use PHP.


Requirements
------------

- PHP 7.2 or later.
- Windows10 or Linux environment is required to use rindow_openblas extension.

Installation
------------

### Install the Rindow Neural Networks and Graphing tool

Please set up with composer.

```shell
$ composer require rindow/rindow-neuralnetworks
$ composer require rindow/rindow-math-plot
```

### Download and setup the rindow_openblas extension

Training will take a lot of time if left untouched. It is **strongly recommended** that you set up the **rindow_openblas extension** in php for speed.

- [Rindow OpenBLAS extension Pre-build binaries(Windows)](https://github.com/rindow/rindow-openblas-binaries)
- [Rindow OpenBLAS extension for Build from source](https://github.com/rindow/rindow-openblas)

### Expansion of memory used

You need to increase the maximum amount of memory used by PHP depending on the amount of data used.

When training image data, do not be surprised that the amount of sample data is so large that it will be the maximum memory capacity that you cannot usually imagine.

For example, change the memory_limit item of php.ini as follows.

```shell
memory_limit = 8G
```

### Try the sample program

Source code for simple image learning is provided in the sample directory.
When using "Rindow\Math\Plot" on Linux, you need to specify the image viewer.

Execute as follows.
```shell
$ RINDOW_MATH_PLOT_VIEWER=/some/bin/dir/png-file-viewer
$ export RINDOW_MATH_PLOT_VIEWER
$ mkdir samples
$ cd samples
$ cp ../vendor/rindow/rindow-neuralnetworks/samples/mnist-basic-clasification.php .
$ php mnist-basic-clasification.php
```

If done correctly, a graph of the learning process will be displayed.


Note
----
This neural network library has just begun. I understand that it is still lacking. Please have mercy.

Currently, Rindow Neural Networks does not support the Rindow framework. Manage the life cycle of an object in a stand-alone manner as in normal PHP programming. It will be available on the Rindow framework in the future.

This text is written using machine translation. We hope that  native English speakers will be able to help you correct the text.
