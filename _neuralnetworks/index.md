---
layout: document
title: "Rindow Neural Networks"
meta_description: "Rindow Neural Networks is a high-level neural networks library for PHP. The goal is to be able to describe a machine learning model on PHP as well as Python using a description method similar to Keras."
next_section: install
---
The Rindow Neural Networks is a high-level neural networks library for PHP.
You can achieve powerful machine learning on PHP.

- You can build machine learning models for DNNs, CNNs, RNNs, and Attentions.
- You can use your knowledge of Python and Keras as it is.
- Samples of popular Computer Vision and natural language processing are available.
- The PHP extension can process data twice as fast as the tensorflow CPU version.
- You don't need a dedicated machine learning environment. It can be done on an inexpensive laptop.
- Comes with interesting sample programs.

The goal is to make it easy to write machine learning models on PHP, just like Keras on Python.

If you use the rindow_openblas php extension,
you get can calculate at speed close to CPU version of tensorflow.
The trained model trained on your laptop is available on general web hosting.
You can also benefit from deep learning on popular PHP web hosting services.

It supports GPU acceleration using OpenCL with rindow_clblas. This is an experimental attempt. The speed is not very fast yet. Only compatible with the Windows version.

It has the following features.

- A high-level neural networks description
- Cooperation with high-speed operation library
- Designing for scalability of operation library
- To save developers the time to learn how to use this library, we adopt an interface similar to Keras.

Rindow Neural Networks usually work with:

- Rindow Math Matrix: scientific matrix operation library
- Rindow OpenBLAS extension: PHP extension of OpenBLAS
- Rindow Math Plot: Visualize machine learning results
- Rindow CLBlast extension: PHP extension of BLAS on GPU (OpenCL)

Sample programs
---------------

- Images basic classification with Full-connected Neural Networks(FNN)
- Images classification with Convolution Neural Networks(CNN)
- Numeric addition text generation with Recurrent Neural Networks(RNN)
- Neural machine language translation with Attention(RNN with Attention)


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

Note
----
This neural network library has just begun. I understand that it is still lacking. Please have mercy.

Currently, Rindow Neural Networks does not support the Rindow framework. Manage the life cycle of an object in a stand-alone manner as in normal PHP programming. It will be available on the Rindow framework in the future.

This text is written using machine translation. We hope that  native English speakers will be able to help you correct the text.
