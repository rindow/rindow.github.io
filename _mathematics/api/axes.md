---
layout: document
title: "Axes"
grand_upper_section: index
upper_section: apitoc
previous_section: figure
next_section: miscplot
---
- **namespace**: Rindow\Math\Plot\System
- **classname**: Axes

Axes calculates the scale automatically from the size of various artists drawn inside.
And it calculates from the scale when the rendering command comes and draws the artist using the renderer.

Methods
-------
{:.no_toc}
* Table of contents
{:toc}

### bar
```php
public function bar($x, NDArray $height,
    $width=null, $bottom=null, string $label=null, string $style=null) : array
```
Draw a bar chart.

Arguments
- **x**: x-axis labels or x coordinate.
    - Specifies a list of labels for the x-axis.
    - If NDArray is specified, it will be treated as x coordinate. Must be a one-dimensional array.
- **height**: Number of columns.
    - Specify NDArray type height data. Must be a one-dimensional or two-dimensional array.
    - In the case of a two-dimensional array, it is interpreted as a data set, so draw a stacked bar chart or a side by side bar chart.
- **width**: Bar width.
    - If the float type is specified, draw bars with the same width.
    - If NDArray type is specified, it will be interpreted as the width of each bar.
- **bottom**:
    - When the float type is specified, all the bars are drawn from the same bottom position.
    - If NDArray type is specified, it will be interpreted as the bottom position for each bar.
- **label**:
    - Specify the label to be displayed in the legend.
- **style**:
    - If you specify data with two or more height data, specify whether it is a "stacked" bar chart or a "sideBySide" bar chart.
    - Default is "stacked".

Result
- Bar instances list.

Example
```php
$x = ['apple','orange','banana','pear','strawberry'];
$y = $mo->array([
    [0.1,0.1], [0.3,3.0], [0.7,4.0], [1.2,3.0], [2.8,1.0]
]);
$figure = $plt->figure();
$axes = $plt->subplot();
$bars = $axes->bar($x,$y);
$axes->legend($bars,['data0','data1']);
$figure = $plt->figure();
$axes = $plt->subplot();
$bars = $axes->bar($x,$y,null,null,null,'sideBySide');
$axes->legend($bars,['data0','data1']);
$plt->show();
```

### barh
```php
public function barh($y, NDArray $width,
    $height=null, $left=null, string $label=null, string $style=null) : array
```
Draw a horizontal bar chart.

Arguments
- **y**: y-axis labels or x coordinate.
    - Specifies a list of labels for the y-axis.
    - If NDArray is specified, it will be treated as y coordinate.
- **width**: Number of columns.
    - Specify NDArray type width data. Must be a one-dimensional or two-dimensional array.
    - In the case of a two-dimensional array, it is interpreted as a data set, so draw a stacked bar chart or a side by side bar chart.
- **height**: Bar height.
    - If the float type is specified, draw bars with the same height.
    - If NDArray type is specified, it will be interpreted as the height of each bar.
- **left**:
    - When the float type is specified, all the bars are drawn from the same left position.
    - If NDArray type is specified, it will be interpreted as the left position for each bar.
- **label**:
    - Specify the label to be displayed in the legend.
- **style**:
    - If you specify data with two or more height data, specify whether it is a "stacked" bar chart or a "sideBySide" bar chart.
    - Default is "stacked".

Result
- Bar instances list.

Example
```php
$y = ['apple','orange','banana','pear','strawberry'];
$x = $mo->array([
    [0.1,0.1], [0.3,3.0], [0.7,4.0], [1.2,3.0], [2.8,1.0]
]);
$figure = $plt->figure();
$axes = $plt->subplot();
$bars = $axes->barh($y,$x);
$axes->legend($bars,['data0','data1']);
$figure = $plt->figure();
$axes = $plt->subplot();
$bars = $axes->barh($y,$x,null,null,null,'sideBySide');
$axes->legend($bars,['data0','data1']);
$plt->show();
```

### plot
```php
public function plot(NDArray $x, NDArray $y=null,
                    string $marker=null, string $label=null) : array
```
Draw a line graph.

Arguments
- **x**: X-coordinate data of NDArray type.
    - For x coordinate data, it must be a one-dimensional array or an array of the shape [n, 1].
    - If the y-coordinate data is omitted, this argument becomes the y-coordinate data, and the x-coordinate is automatically assigned.
- **y**: Y-coordinate data of NDArray type.
    - Must be a one-dimensional or two-dimensional array.
    - In the case of a two-dimensional array, multiple graphs are drawn by interpreting as a y-coordinate data set.
    - If this parameter is omitted, the first parameter is interpreted as y-coordinate data.
- **marker**: String to specify marker.
    - Add a marker to the graph and set line style.
    - See the section of [**Line style**](miscplot.html#line-style) and [**Marker**](miscplot.html#marker).
- **label**:
    - Specify the label to be displayed in the legend.

Result
- Line2D instances list.

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$data1 = $mo->array([0.1, 3.0, 4.0, 3.0, 1.0]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0,null,'*','data0');
$axes->plot($data1,null,'o--','data1');
$axes->legend();
$plt->show();
```
```php
$x = $mo->array([0.0, 0.5, 1.0, 1.5, 2.0]);
$y = $mo->array([
    [0.1,0.1], [0.3,3.0], [0.7,4.0], [1.2,3.0], [2.8,1.0]
]);
$figure = $plt->figure();
$axes = $plt->subplot();
$lines = $axes->plot($x,$y);
$axes->legend($lines,['data0','data1']);
$plt->show();
```

### scatter
```php
public function scatter(NDArray $x, NDArray $y, NDArray $size=null,
                $color=null, string $marker=null, $label=null) : DataArtist
```
Draw a scatter plot.

Arguments
- **x**: X-coordinate data of NDArray type.
    - The array is reshaped into a one-dimensional array and processed.
- **y**: Y-coordinate data of NDArray type.
    - The array is reshaped into a one-dimensional array and processed.
- **size**: Marker size of NDArray type.
    - Size can be specified as z-axis data.
- **color**: Color code
    - Specify the color explicitly.
    - See the section of [**Color**](miscplot.html#color).
- **marker**: String to specify marker.
    - Add a marker to the graph.
    - See the section of [**Line style**](miscplot.html#line-style) and [**Marker**](miscplot.html#marker).
- **label**:
    - Specify the label to be displayed in the legend.

Result
- Marker instance.

Example
```php
$x0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$y0 = $mo->array([0.1, 3.0, 4.0, 3.0, 1.0]);
$figure = $plt->figure();
$axes = $plt->subplot();
$mk0 = $axes->scatter($x0,$y0);
$x1 = $mo->array([0.1, 3.0, 4.0, 3.0, 1.0]);
$y1 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$mk1 = $axes->scatter($y0,$x0,null,'red','*');
$axes->legend([$mk0,$mk1],['data0','data1']);
$plt->show();
```

### pie
```php
public function pie(NDArray $x, array $labels=null,
                float $startangle=null, $autopct=null, array $explodes=null) : array
```
Draw a pie chart.

Arguments
- **x**: Actual data of NDArray type.
    - Interpret as a weight for the sum, it must be a one-dimensional array.
- **labels**: List of labels for the data.
    - Label each piece of pie.
- **startangle**: Start position angle.
    - Specifies the angle from horizontal counterclockwise.
- **autopct**: Display format of weight.
    - To display in percent, specify the format of sprintf.
    - If you want to display arbitrary based on actual data, specify a function.
- **explode**: explode ratio list.
    - If you want to explode, specify a list of ratios.

Result
- Wedge instance list.

Examples
```php
$x = $mo->array([2, 3, 5, 4, 2]);
$labels = ['apple','orange','banana','pear','strawberry'];
$explode = [0, 0, 0.1, 0, 0];
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->pie($x,$labels,90,'%1.1f%%',$explode);
$plt->show();
```
```php
$x = $mo->array([2, 3, 5, 4, 2]);
$labels = ['apple','orange','banana','pear','strawberry'];
$figure = $plt->figure();
$axes = $plt->subplot();
$weds = $axes->pie($x,null,90,fn($x)=>sprintf('%dpt',$x));
$axes->legend($weds,$labels);
$plt->show();
```

### imshow
```php
public function imshow(NDArray $x, string $cmap=null,array $norm=null,array $extent=null)
```
Displays image data.
Generally used to create Heat maps.

Arguments
- **x**: Z-axis data in a two-dimensional array of NDArray type.
    - Interpret as a weight for the sum, it must be a one-dimensional array.
- **cmap**: Colormap name.
    - Choose a colormap that converts numbers to colors. See [**colormap**](#colormap).
    - Default is 'viridis'.
- **norm**: Range of z-axis data.
    - Apply the specified range to the numerical value of colormap.
    - If omitted, the minimum and maximum values of the z-axis data are interpreted as the z-axis data range.
- **extent**: x-axis and y-axis range.
    - Specify the range of x-axis and y-axis of the displayed image data.
    - If omitted, it is automatically assigned with the subscript of the array.

Result
- Image instance.

Examples
```php
$fn = fn($x) => 1/sqrt(2*pi())*exp(-$x*$x/2);
$x = $mo->f($fn,$mo->arange(100,-5.0, 0.08));
$z = $mo->la()->multiply($x,$mo->la()->multiply($x,$mo->ones([100,100])),true);

$figure = $plt->figure();
$axes = $plt->subplot();
$img = $axes->imshow($z,'jet',[0.0, 0.3],[-4.0,4.0,-4.0,4.0]);
$figure->colorbar($img,$axes);
$plt->show();
```

### legend
```php
public function legend(array $artists=null,array $labels=null)
```
Draw a legend.

Arguments
- **artists**: Target Artists or labels.
    - Draws a legend for the specified artist.
    - If you omit artists, use the labels registered for artists, targeting all drawn artists. The label argument is ignored.
    - If the labels argument is omitted, all the drawn artists will be the target, the artists argument will be interpreted as label, and the legend will be drawn.
- **labels**: labels.
    - If you want to specify the label explicitly, give the labels argument.

Result
- Legend instance.

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$data1 = $mo->array([0.1, 3.0, 4.0, 3.0, 1.0]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0,null,null,'data0');
$axes->plot($data1,null,null,'data1');
$axes->legend();
$plt->show();
```
```php
$x = $mo->array([
    [0.1,0.1], [0.3,3.0], [0.7,4.0], [1.2,3.0], [2.8,1.0],
]);
$figure = $plt->figure();
$axes = $plt->subplot();
$lines = $axes->plot($x);
$axes->legend($lines,['data0','data1']);
$plt->show();
```
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$data1 = $mo->array([0.1, 3.0, 4.0, 3.0, 1.0]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->plot($data1);
$axes->legend(['data0','data1']);
$plt->show();
```

### setXLabel
```php
public function setXLabel($label) : void
```
Draw the x-axis label.

Arguments
- **label**: x-axis label.
    - Specify the label to be displayed on the x-axis with a character string.

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->setXLabel('x-axis sample');
$plt->show();
```

### setYLabel
```php
public function setYLabel($label) : void
```
Draw the y-axis label.

Arguments
- **label**: y-axis label.
    - Specify the label to be displayed on the y-axis with a character string.

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->setYLabel('y-axis sample');
$plt->show();
```

### setTitle
```php
public function setTitle($title) : void
```
Draw a title for the axes.

Arguments
- **label**: y-axis label.
    - Specify the title to be displayed on the axes with a character string.

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->setTitle('title');
$plt->show();
```

### setXTicks
```php
public function setXTicks(NDArray $ticks=null) : void
```
Explicitly specify ticks for the x-axis.

Arguments
- **ticks**: x-axis ticks
    - Must be a one-dimensional array of NDArray type.

Examples
```php
$x = $mo->arange(5);
$xlabel = ['Jan','Feb','Mar','Apr','May'];
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->setXTicks($x);
$axes->setXTickLabels($xlabel);
$plt->show();
```

### setXTickLabels
```php
public function setXTickLabels(array $labels=null) : void
```
Explicitly specify tick labels for the x-axis.

Arguments
- **labels**: x-axis label.
    - Specify a list of strings.

Examples
```php
$x = $mo->arange(5);
$xlabel = ['Jan','Feb','Mar','Apr','May'];
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->setXTicks($x);
$axes->setXTickLabels($xlabel);
$plt->show();
```

### setYTicks
```php
public function setYTicks(NDArray $ticks=null) : void
```
Explicitly specify ticks for the y-axis.

Arguments
- **ticks**: y-axis ticks
    - Must be a one-dimensional array of NDArray type.

Examples
```php
$y = $mo->arange(6, 0.0, 0.5);
$ylabel = ['0m','0.5m','1m','1.5m','2m','2.5m'];
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->setYTicks($y);
$axes->setYTickLabels($ylabel);
$plt->show();
```

### setYTickLabels
```php
public function setYTickLabels(array $labels=null) : void
```
Explicitly specify tick labels for the y-axis.

Arguments
- **labels**: y-axis label.
    - Specify a list of strings.

Examples
```php
$y = $mo->arange(6, 0.0, 0.5);
$ylabel = ['0m','0.5m','1m','1.5m','2m','2.5m'];
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->setYTicks($y);
$axes->setYTickLabels($ylabel);
$plt->show();
```

### setFrame
```php
public function setFrame(bool $frame) : void
```
Specify whether to draw coordinate axes and frames.
It is set to display by default.

Arguments
- **frame**: Frame switch
    - true: Display.
    - false: Do not display

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->setFrame(false);
$plt->show();
```

### hideXTicks
```php
public function hideXTicks(bool $hidden) : void
```
Hide the X coordinate ticks.
(This method is provisional.)

Arguments
- **hidden**: hidden switch
    - true: Hidden.
    - false: Display

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->hideXTicks(true);
$plt->show();
```

### hideYTicks
```php
public function hideYTicks(bool $hidden) : void
```
Hide the Y coordinate ticks.
(This method is provisional.)

Arguments
- **hidden**: hidden switch
    - true: Hidden.
    - false: Display

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->hideYTicks(true);
$plt->show();
```

### setXTickPosition
```php
public function setXTickPosition(string $position) : void
```
Specify where to draw X-ticks.

Arguments
- **position**: draw position
    - down: Draw ticks below the axis.
    - up: Draw ticks above the axis.
    - Default is "down".

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->setXTickPosition('up');
$plt->show();
```

### setYTickPosition
```php
public function setYTickPosition(string $position) : void
```
Specify where to draw Y-ticks.

Arguments
- **position**: draw position
    - left: Draw ticks to the left of the axis.
    - right: Draw ticks to the right of the axis.
    - Default is "left".

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($data0);
$axes->setYTickPosition('right');
$plt->show();
```

### setXScale
```php
public function setXScale($type) : void
```
Set x-axis scale type.

Arguments
- **type**: x-axis scale
    - null or 'log'.
    - Default is null.

Examples
```php
$x = $mo->array([0.1, 2.0, 30.0, 400.0, 5000.0]);
$y = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($x,$y);
$axes->setXScale('log');
$plt->show();
```

### setYScale
```php
public function setYScale($type) : void
```
Set y-axis scale type.

Arguments
- **type**: y-axis scale
    - null or 'log'.
    - Default is null.

Examples
```php
$x = $mo->arange(5);
$y = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($x,$y);
$axes->setYScale('log');
$plt->show();
```

### setDataAreaMargin
```php
public function setDataAreaMargin(float $dataAreaMargin) : void
```
Set the margin percentage between the axis and the data.

Arguments
- **type**: y-axis scale
    - null or 'log'.
    - Default is null.

Examples
```php
$x = $mo->arange(5);
$y = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($x,$y);
$axes->setDataAreaMargin(0);
$plt->show();
```

### setAspect
```php
public function setAspect($aspect) : void
```
Set aspect ratio.

Arguments
- **aspect**: aspect mode
    - null: auto aspect.
    - equal: equal aspect.

Examples
```php
$x = $mo->arange(5);
$y = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$figure = $plt->figure();
$axes = $plt->subplot();
$axes->plot($x,$y);
$axes->setAspect('equal');
$plt->show();
```
