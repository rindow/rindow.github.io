---
layout: document
title: "Figure"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/plot
next_section: api/axes
---
- **namespace**: Rindow\Math\Plot\System
- **classname**: Figure

It is created by figure or subplots method of Plot.

Figures are separated by one or more "Axes".

Methods
-------
{:.no_toc}
* Table of contents
{:toc}

### num
```php
public function num()
```
Returns the figure number. It is assigned at creation.

Return
- the figure number

Example
```php
$mo = new Rindow\Math\Matrix\MatrixOperator();
$plt = new Rindow\Math\Plot\Plot(null,$mo);
$figure = $plt->figure();
$num = $figure->num();
$figure = $plt->figure($num);
```

### getFigSize
```php
public function getFigSize() : array
Return [$width, $height]
```
Get the figure size.

Return
- **width**: Figure width.
- **height**: Figure height.

Example
```php
$figure = $plt->figure();
[$width, $height] = $figure->getFigSize();
```

### getAxes
```php
public function getAxes() : array
```
Gets all axes included in the figure.

Return
- list of axes.

Example
```php
[$figure,$dummy] = $plt->subplots(2,3);
$axes = $figure->getAxes();
```

### setAxes
```php
public function setAxes(array $axes) : void
```
Set all the axes included in the figure.

Arguments
- **axes**: List of the axes.

Example
```php
[$figure,$axes] = $plt->subplots(2,3);
..something..
$figure->getAxes($axes);
```

### addAxes
```php
public function addAxes(Axes $axes) : void
```
Add the created axes to the figure.

Arguments
- **axes**: the axes.

Example
```php
$figure->addAxes($axes);
```

### addSubPlot
```php
public function addSubPlot(
    int $nRows=null, int $nCols=null, int $index=null,
    int $rowspan=null, int $colspan=null)
```
Add a new axes to the figure.

Assuming positions that are separated by vertical and horizontal grids,
specify whether to add to the end.

Arguments
- **nRows**: Number of rows in the grid.
    - default is 1.
- **nCols**: Number of columns in the grid.
    - default is 1.
- **index**: where to add axes.
    - default is 0.
- **rowspan**: How many rows of the grid should be allocated to the axes height.
    - default is 1.
- **rowspan**: How many columns of the grid should be allocated to the axes width.
    - default is 1.

Return
    - Axes instance.

Example
```php
$figure = $plt->figure();
$axes = $figure->addSubPlot(2,3,3);
$axes->plot($x);
$plt->show();
```

### colorbar
```php
public function colorbar(Mappable $mappable,Axes $ax,bool $absolute=null)
```
Show the scale of the displayed color.

Generally used to create Heat maps.

Arguments
- **mappable**: Artist displayed using a color map.
    - The target Artist instance for displaying the color bar.
- **ax**: The axes to display.
    - Specify the axes of the target you want to display.
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

$figure = $plt->figure();
$axes = $plt->subplot();
$img = $axes->imshow($z,'jet',[0.0, 0.3],[-4.0,4.0,-4.0,4.0]);
$figure->colorbar($img,$axes);
$plt->show();
```
