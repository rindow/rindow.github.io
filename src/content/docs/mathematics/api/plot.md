---
layout: document
title: "Plot"
grand_upper_section: index
upper_section: api/apitoc
next_section: api/figure
---
- **namespace**: Rindow\Math\Plot
- **classname**: Plot

Main component of rindow Math Plot. Perform the operation of each component from here.

Methods
-------
{:.no_toc}
* Table of contents
{:toc}

### constructor
```php
public function __construct(array $config=null,$matrixOperator=null,$renderer=null,$cmapManager=null)
```

Arguments
- **config**: configuration.
    - You can set default values for various parameters.
    - See the section of [**Configuration**](miscplot.html#configuration).
- **matrixOperator**: Matrix Operator instance.
    - If not specified, create a new Rindow\Math\Matrix\MatrixOperator instance internally.
- **renderer**: Render driver instance.
    - If not specified, create a new Rindow\Math\Plot\Renderer\GDDriver instance internally.
- **cmapManager**: Colormap manager instance.
    - If not specified, create a new Rindow\Math\Plot\System\CmapManager instance internally.

Example
```php
$config = [
    'title.fontSize' => 4,
    'bar.barWidth' => 0.5,
];
$mo = new Rindow\Math\Matrix\MatrixOperator();
$plt = new Rindow\Math\Plot\Plot($config,$mo);
```

### figure
```php
public function figure($num=null,array $figsize=null)
```
Explicitly create a new figure or get an existing figure.

Most operations implicitly create the first figure if the figure has not yet been created.
If you want to create the second and subsequent figures,
use the figure method to explicitly create the figure.

Arguments
- **num**: Figure number.
    - If null or a character string is specified, a new one will be created.
    - Specify an integer to get an existing figure.
- **figsize**: Figure size.
    - Specify when creating a new file.
    - If omitted, default values are used.
    - The default value depends on the figure settings.

Result
- Figure instance.

Example
```php
$fig0 = $plt->figure();
$plt->plot($x);
$fig1 = $plt->figure(null,[800,600]);
$plt->plot($a);
$plt->show();
```

### subplots
```php
public function subplots(int $nRows=1,int $nCols=1,array $figsize=null) : array
Result: [$fig,$axes]
```
Create a figure divided by multiple axes.
Axes instances are returned as a list.

Arguments
- **nRows**: Number of rows.
- **nCols**: Number of columns.
- **figsize**: Figure size.
    - Specify when creating a new file.
    - If omitted, default values are used.
    - The default value depends on the figure settings.

Result
- **fig**: figure instance.
- **axes**: Array of axes instances.

Example
```php
[$fig,$axes] = $plt->subplots(2,3);
$axes[0]->plot($x);
$axes[1]->plot($x1);
$axes[2]->plot($x2);
$axes[3]->plot($x3);
$axes[4]->plot($x4);
$axes[5]->plot($x5);
$plt->show();
```

### subplot
```php
public function subplot(int $nRows=null, int $nCols=null, int $idx=null)
```
Adds a new axes to the current figure.
Unlike subplots, it does not create new figures. Also, create only one coordinate axis.

Arguments
- **nRows**: Number of rows.
    - Default value is 1.
- **nCols**: Number of columns.
    - Default value is 1.
- **idx**: Position to add.
    - Corresponds to the item number in the list, similar to the rules for the subplots method.
    - Default value is 0.

Result
- Axes instances.

Example
```php
$plt->figure();
$axes = $plt->subplot(2,3,3);
$axes->plot($x);
$plt->show();
```

### getAxes
```php
public function getAxes($figId=null,$axesId=null)
```
Get a axes in the figure.
Unlike subplot, it does not create new axes when it already exits.

Arguments
- **figId**: figure number.
    - Default is current figure.
- **axesId**: axes number.
    - Default is first axes.

Result
- Axes instances.

Example
```php
$plt->subplots(2,3);
$axes = $plt->getAxes();
$axes->plot($x);
$plt->show();
```


### bar
```php
public function bar($x, NDArray $height,
    $width=null, $bottom=null, string $label=null, string $style=null) : array
```
Draw a bar chart on current figure.

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
$bars = $plt->bar($x,$y);
$plt->legend($bars,['data0','data1']);
$plt->figure();
$bars = $plt->bar($x,$y,null,null,null,'sideBySide');
$plt->legend($bars,['data0','data1']);
$plt->show();
```

### barh
```php
public function barh($y, NDArray $width,
    $height=null, $left=null, string $label=null, string $style=null) : array
```
Draw a horizontal bar chart on current figure.

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
$bars = $plt->barh($y,$x);
$plt->legend($bars,['data0','data1']);
$plt->figure();
$bars = $plt->barh($y,$x,null,null,null,'sideBySide');
$plt->legend($bars,['data0','data1']);
$plt->show();
```

### plot
```php
public function plot(NDArray $x, NDArray $y=null,
                    string $marker=null, string $label=null) : array
```
Draw a line graph on current figure.

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
$plt->plot($data0,null,'*','data0');
$plt->plot($data1,null,'o--','data1');
$plt->legend();
$plt->show();
```
```php
$x = $mo->array([0.0, 0.5, 1.0, 1.5, 2.0]);
$y = $mo->array([
    [0.1,0.1], [0.3,3.0], [0.7,4.0], [1.2,3.0], [2.8,1.0]
]);
$lines = $plt->plot($x,$y);
$plt->legend($lines,['data0','data1']);
$plt->show();
```

### scatter
```php
public function scatter(NDArray $x, NDArray $y, NDArray $size=null,
                $color=null, string $marker=null, $label=null) : DataArtist
```
Draw a scatter plot on current figure.

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
$mk0 = $plt->scatter($x0,$y0);
$x1 = $mo->array([0.1, 3.0, 4.0, 3.0, 1.0]);
$y1 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$mk1 = $plt->scatter($y0,$x0,null,'red','*');
$plt->legend([$mk0,$mk1],['data0','data1']);
$plt->show();
```

### pie
```php
public function pie(NDArray $x, array $labels=null,
                float $startangle=null, $autopct=null, array $explodes=null) : array
```
Draw a pie chart on current figure.

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
$plt->pie($x,$labels,90,'%1.1f%%',$explode);
$plt->show();
```
```php
$x = $mo->array([2, 3, 5, 4, 2]);
$labels = ['apple','orange','banana','pear','strawberry'];
$weds = $plt->pie($x,null,90,fn($x)=>sprintf('%dpt',$x));
$plt->legend($weds,$labels);
$plt->show();
```

### imshow
```php
public function imshow(NDArray $x, string $cmap=null,array $norm=null,array $extent=null)
```
Displays image data on current figure.
Generally used to create Heat maps.

Arguments
- **x**: Z-axis data in a two-dimensional array of NDArray type.
    - Interpret as a weight for the sum, it must be a one-dimensional array.
- **cmap**: Colormap name.
    - Choose a colormap that converts numbers to colors. See [**colormap**](miscplot.html#colormap).
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

$img = $plt->imshow($z,'jet',[0.0, 0.3],[-4.0,4.0,-4.0,4.0]);
$plt->colorbar($img);
$plt->show();
```

### colorbar
```php
public function colorbar(Mappable $mappable,$ax=null,bool $absolute=null)
```
Show the scale of the displayed color on current figure.

Generally used to create Heat maps.

Arguments
- **mappable**: Artist displayed using a color map.
    - The target Artist instance for displaying the color bar.
- **ax**: The axes to display.
    - Specify the axes of the target you want to display.
    - If omitted, use the current axes.
- **absolute**: Whether to draw directly on the specified axes.
    - If omitted or false, remove the required size area from the specified axes and display the colorbar in the empty area.
    - if true, draw the entire specified axes as a colorbar.

Result
- Axes instance. It is newly created or used as a colorbar.

Examples
```php
$fn = fn($x) => 1/sqrt(2*pi())*exp(-$x*$x/2);
$x = $mo->f($fn,$mo->arange(100,-5.0, 0.08));
$z = $mo->la()->multiply($x,$mo->la()->multiply($x,$mo->ones([100,100])),true);

$img = $plt->imshow($z,'jet',[0.0, 0.3],[-4.0,4.0,-4.0,4.0]);
$plt->colorbar($img);
$plt->show();
```
```php
$fn = fn($x) => 1/sqrt(2*pi())*exp(-$x*$x/2);
$x = $mo->f($fn,$mo->arange(100,-5.0, 0.08));
$z = $mo->la()->multiply($x,$mo->la()->multiply($x,$mo->ones([100,100])),true);

$fig = $plt->figure();
$axes0 = $plt->subplot(2,2,0);
$img0 = $axes0->imshow($z,'jet',[0.0, 0.3],[-4.0,4.0,-4.0,4.0]);
$axes1 = $plt->subplot(2,2,2);
$img1 = $axes1->imshow($z,'jet',[0.0, 0.3],[-4.0,4.0,-4.0,4.0]);
$axesz = $plt->subplot(1,8,7);
$plt->colorbar($img0,$axesz,true);
$plt->show();
```

### legend
```php
public function legend(array $artists=null,array $labels=null)
```
Draw a legend on current figure.

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
$plt->plot($data0,null,null,'data0');
$plt->plot($data1,null,null,'data1');
$plt->legend();
$plt->show();
```
```php
$x = $mo->array([
    [0.1,0.1], [0.3,3.0], [0.7,4.0], [1.2,3.0], [2.8,1.0],
]);
$lines = $plt->plot($x);
$plt->legend($lines,['data0','data1']);
$plt->show();
```
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$data1 = $mo->array([0.1, 3.0, 4.0, 3.0, 1.0]);
$plt->plot($data0);
$plt->plot($data1);
$plt->legend(['data0','data1']);
$plt->show();
```

### xlabel
```php
public function xlabel($label)
```
Draw the x-axis label on current figure.

Arguments
- **label**: x-axis label.
    - Specify the label to be displayed on the x-axis with a character string.

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$plt->plot($data0);
$plt->xlabel('x-axis sample');
$plt->show();
```

### ylabel
```php
public function ylabel($label)
```
Draw the y-axis label on current figure.

Arguments
- **label**: y-axis label.
    - Specify the label to be displayed on the y-axis with a character string.

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$plt->plot($data0);
$plt->ylabel('y-axis sample');
$plt->show();
```

### title
```php
public function title($title)
```
Draw a title for the axes on current figure.

Arguments
- **label**: y-axis label.
    - Specify the title to be displayed on the axes with a character string.

Examples
```php
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$plt->plot($data0);
$plt->title('title');
$plt->show();
```

### xticks
```php
public function xticks(NDArray $ticks=null,array $labels=null)
```
Explicitly specify ticks and tick labels for the x-axis on current figure.

Arguments
- **ticks**: x-axis ticks
    - Must be a one-dimensional array of NDArray type.
- **labels**: x-axis label.
    - Specify a list of strings.

Examples
```php
$x = $mo->arange(5);
$xlabel = ['Jan','Feb','Mar','Apr','May'];
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$plt->plot($data0);
$plt->xticks($x,$xlabel);
$plt->show();
```

### yticks
```php
public function yticks(NDArray $ticks,array $labels)
```
Explicitly specify ticks and tick labels for the y-axis on current figure.

Arguments
- **ticks**: y-axis ticks
    - Must be a one-dimensional array of NDArray type.
- **labels**: y-axis label.
    - Specify a list of strings.

Examples
```php
$y = $mo->arange(6, 0.0, 0.5);
$ylabel = ['0m','0.5m','1m','1.5m','2m','2.5m'];
$data0 = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$plt->plot($data0);
$plt->yticks($y,$ylabel);
$plt->show();
```

### xscale
```php
public function xscale($type)
```
Set x-axis scale type on current figure.

Arguments
- **type**: x-axis scale
    - null or 'log'.
    - Default is null.

Examples
```php
$x = $mo->array([0.1, 2.0, 30.0, 400.0, 5000.0]);
$y = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$plt->plot($x,$y);
$plt->xscale('log');
$plt->show();
```

### yscale
```php
public function yscale($type)
```
Set y-axis scale type on current figure.

Arguments
- **type**: y-axis scale
    - null or 'log'.
    - Default is null.

Examples
```php
$x = $mo->arange(5);
$y = $mo->array([0.1, 0.3, 0.7, 1.2, 2.8]);
$plt->plot($x,$y);
$plt->yscale('log');
$plt->show();
```


### show
```php
public function show(string $filename=null)
```
Renders all elements written in the figure.

The default renderer is GDDriver. Use GD2 to render png images.

- GDDriver launches the image file viewer when launched from the command line.
    - For Windows, follow the association with the png extension.
    - In Linux, execute the command set in the environment variable RINDOW_MATH_PLOT_VIEWER.
- GDDriver outputs images to standard output when launched from the web.

Arguments
- **filename**: Image file to draw.
    - If not specified, a temporary file is created automatically.
    - If specified, the filename will be used. In case of multiple figures, it is automatically numbered based on the file name.

Examples
```shell
$ RINDOW_MATH_PLOT_VIEWER=eog
$ export RINDOW_MATH_PLOT_VIEWER
```
```php
$x = $mo->arange(5);
$plt->plot($x);
$plt->figure();
$plt->plot($x);
$plt->show();
```
```php
$x = $mo->arange(5);
$plt->plot($x);
header("Content-type: image/png");
$plt->show();
```
