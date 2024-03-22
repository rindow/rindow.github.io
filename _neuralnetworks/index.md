---
layout: document
title: "Rindow Neural Networks"
meta_description: "Rindow Neural Networks is a high-level neural networks library for PHP. The goal is to be able to describe a machine learning model on PHP as well as Python using a description method similar to Keras."
next_section: gettingstarted
---

<div class="container">
  <div class="row">
    <div class="col-lg-4">
      <!--svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg -->
      <img class="bd-placeholder-img rounded" width="200" height="200" alt="Easy to build" src="images/easy-to-build.png">
      <h3>Easy to build</h3>
      <p>This is a high-dimensional neural network library that allows you to easily build a model by combining abundant DNN, CNN, RNN, Attention and other components.</p>
    </div><!-- /.col-lg-4 -->
    <div class="col-lg-4">
      <!--svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg-->
      <img class="bd-placeholder-img rounded" width="200" height="200" alt="Easy to check" src="images/easy-to-check.png">
      <h3>Easy to check</h3>
      <p>Models are easy to train, and peripheral tools are available to graph the learning process of the model.</p>
    </div><!-- /.col-lg-4 -->
    <div class="col-lg-4">
      <!--svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg-->
      <img class="bd-placeholder-img rounded" width="200" height="200" alt="Easy Acceleration" src="/assets/themes/rindow/img/gears.svg">
      <h3>Easy Acceleration</h3>
      <p>PHP extensions that can be as fast as the CPU version of Tensorflow and GPU extensions that work on laptops without NVidia are available.</p>
    </div><!-- /.col-lg-4 -->
  </div><!-- /.row -->
  <div class="row">
    <div class="col-lg-4">
        <p>.</p>
    </div><!-- /.col-lg-4 -->
  </div><!-- /.row -->
</div><!-- /.container -->


What is the Rindow Neural Networks
----------------------------------
Rindow Neural Networks is a high-level neural network library for PHP.
Powerful machine learning can be achieved with PHP.

- Build DNN, CNN, RNN, and attention machine learning models.
- You can use your knowledge of Python and Keras as is.
- Popular computer vision and natural language processing samples available.
- By calling high-speed calculation libraries, it can process data as fast as the TensorFlow CPU version.
- No dedicated machine learning environment required. It can be done with an inexpensive laptop.
- Comes with interesting sample programs.

The goal is to make it easy to create machine learning models in PHP, similar to Keras in Python.

When using OpenBLAS and Rindow-Matlib,
It can calculate at speeds close to the CPU version of tensorflow.
Pre-trained models trained on laptops are available on popular web hosting.
You can also benefit from deep learning on popular PHP web hosting services.

Supports GPU acceleration using OpenCL and CLblast. You can take advantage of GPUs integrated into inexpensive laptops. No n-vidia graphics card required.

It has the following features.

- Writing high-level neural networks
- Cooperation with high-speed calculation library
- Designed with consideration to the extensibility of the calculation library
- Adopts a Keras-like interface to save developers time learning how to use this library.

Rindow Neural Networks typically work in conjunction with:

- Rindow-Matlib: Scientific matrix calculation library suitable for machine learning
- OpenBLAS: The most popular high-speed matrix calculation library
- Rindow Math Plot: Visualize machine learning results.
- OpenCL: Framework for GPU programming
- CLBlast: BLAS on GPU (OpenCL)

Sample programs
---------------
<div class="container">
  <div class="row">
    <div class="col-lg-4">
      <!--svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg -->
      <img class="bd-placeholder-img rounded" width="200" height="200" alt="sample1" src="images/basic-classification.png">
    </div><!-- /.col-lg-4 -->
    <div class="col-lg-4">
      <!--svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg-->
      <img class="bd-placeholder-img rounded" width="200" height="200" alt="sample2" src="images/easy-to-check.png">
    </div><!-- /.col-lg-4 -->
    <div class="col-lg-4">
      <!--svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg-->
      <img class="bd-placeholder-img rounded" width="200" height="200" alt="sample3" src="images/neural-machine-translation.png">
    </div><!-- /.col-lg-4 -->
  </div><!-- /.row -->
</div><!-- /.container -->

- Images basic classification with Full-connected Neural Networks(FNN)
- Images classification with Convolution Neural Networks(CNN)
- Numeric addition text generation with Recurrent Neural Networks(RNN)
- Neural machine language translation with Attention(RNN with Attention)


Tutorials
---------
We plan to create step-by-step tutorials.

See the [Machine learning tutorials on PHP](tutorials/tutorials.html) page.

- [Basic image clasification](tutorials/basic-image-classification.html)
- [Convolutional Neural Network(CNN)](tutorials/convolution-neural-network.html)
- [Learning to add numbers with seq2seq on PHP](tutorials/learn-add-numbers-with-rnn.html)
- [Neural machine translation with attention on PHP](tutorials/neural-machine-translation-with-attention.html)


Why do deep learning with PHP?
------------------------------

> - "If you want to do deep learning, you should use Python."
> - “You should just learn Python!”
> - "Isn't Python a great deep learning framework?"

You are right.

So why should you use Python?

Do you need to be platform constrained for deep learning?
Absolutely not necessary!

Deep learning/ML is just one part of the whole system. This is just a small group of functions in the library.
Anyone can use it anywhere as long as it prints out "Hello!".

It would be unnatural not to be able to use PHP.


Requirements
------------

- PHP 8.1 8.2 8.3 (If you want to use it on PHP 7.x and 8.0, please use Version 1.x.)
- Windows 10 or Ubuntu 20.04 or later is required to use OpenBLAS and Rindow-Matlib.
- Rindow Math Matrix

Recommends
----------

- Rindow Math Plot ( Display the result on a graph )
- GD / GD2  extension ( Used for graph display )
- pdo_sqlite extension ( Used to save the trained model )
- OpenBLAS/Rindow-Matlib ( Used for high-speed calculation )
- OpenCL/CLBlast ( GPU Acceleration )

Release Notes
-------------
The release notes are below

- [Rindow Neuralnetworks](https://github.com/rindow/rindow-neuralnetworks/releases)
- [Rindow Math Matrix](https://github.com/rindow/rindow-math-matrix/releases)
- [Rindow Matlib](https://github.com/rindow/rindow-matlib/releases)

Note
----
This neural network library has just begun. I understand that it is still lacking. Please have mercy.

Currently, Rindow Neural Networks does not support the Rindow framework. Manage the life cycle of an object in a stand-alone manner as in normal PHP programming. It will be available on the Rindow framework in the future.

This text is written using machine translation. We hope that  native English speakers will be able to help you correct the text.
