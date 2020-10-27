---
layout: document
title: "Miscellaneous"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/axes
---

{:.no_toc}
* Table of contents
{:toc}

Line Style
----------
The following line style characters can be specified in the marker string of "plot".

- '--' => Broken line
- '-.' => Chain line
- ':' => Dotted line

Marker
------
The following marker characters can be specified in the marker string of "plot" and "scatter".

- ',' => smalldot
- '@' => pixel
- 'o' => dot
- '^' => yield
- 'v' => delta
- '1' => down
- '2' => up
- '3' => triangle
- '4' => trianglemid
- 's' => square
- 'h' => home
- '\*' => star
- 'u' => hourglass
- 'e' => bowtie
- 't' => target
- 'H' => halfline
- 'B' => box
- 'O' => circle
- '+' => plus
- 'x' => cross
- 'D' => diamond
- '\|' => vertical
- '\_' => line

Color
-----
To specify the color, specify RGB or RGBA in the array type, or specify the color name.

Color names are described in "src/Renderer/rgb.inc.php".

Examples
```php
$plt->scatter($x,$y,null,[255, 192, 203]);
$plt->scatter($x,$y,null,[255, 192, 203, 0]);
$plt->scatter($x,$y,null,'pink');
```

By default, the colors that are switched in order are used in the following order;
- RoyalBlue
- orange
- SeaGreen
- red
- purple
- brown
- salmon
- SlateGray
- YellowGreen
- aquamarine1
- SlateBlue
- peru
- PaleGreen
- magenta
- gold
- violet

Colormap
--------
The table that converts the numerical values of image data into colors is called "colormap".

It converts the continuous change of one number into a continuous color change that is easy to see.

- anton
- autumn
- bone
- cool
- copper
- flag
- gray
- hot
- hsv
- inferno
- jet
- magma
- nipy_spectral
- pink
- plasma
- prism
- spring
- summer
- viridis
- winter

Configuration
-------------
Default parameters can be set when the Plot is initialized.
Give Array type config as the first argument.

Example
```php
$config = [
    'title.fontSize' => 4,
    'bar.barWidth' => 0.5,
];
$mo = new Rindow\Math\Matrix\MatrixOperator();
$plt = new Rindow\Math\Plot\Plot($config,$mo);
```

The items that can be set are as follows.
- **bar.barWidth**:
    - bar chart width. Specify in pixels.
- **bar.legendLineWidth**:
    - Length of line drawn by bar chart legend. Specify in pixels.
- **figure.figsize**:
    - figure size. Specify in pixels.
- **figure.leftMargin**:
    - figure left margin. Specify in pixels.
- **figure.bottomMargin**:
    - figure bottom margin. Specify in pixels.
- **figure.rightMargin**:
    - figure right margin. Specify in pixels.
- **figure.topMargin**:
    - figure top margin. Specify in pixels.
- **figure.axesHSpacingRatio**:
    - The spacing between axes when creating multiple axes. Specify as a ratio to the size of the frame outside the axes.
- **figure.axesVSpacingRatio**:
    - The spacing between axes when creating multiple axes. Specify as a ratio to the size of the frame outside the axes.
- **figure.bgColor**:
    - figure background color
- **figure.colorbarWidth**:
    - colorbar width. Specify in pixels.
- **frame**:
    - Whether to display the frame. Specify with true or false.
- **frame.frameColor**:
    - frame color.
- **frame.labelColor**:
    - tick label color.
- **frame.xTickPosition**:
    - Position to draw ticks. Specify below or above the frame.
    - "up" or "down"
- **frame.yTickPosition**:
    - Position to draw ticks. Specify left or right of frame.
    - "left" or "right"
- **frame.xTickLength**:
    - tick length. Specify in pixels.
- **frame.yTickLength**:
    - tick length. Specify in pixels.
- **frame.xTickLabelMargin**:
    - Gap between tick and label. Specify in pixels.
- **frame.yTickLabelMargin**:
    - Gap between tick and label. Specify in pixels.
- **frame.xTickLabelAngle**:
    - Angle to tilt the string.
- **frame.yTickLabelAngle**:
    - Angle to tilt the string.
- **frame.tickLabelStandardCount**:
    - Number of tick labels to automatically draw.
- **frame.tickLabelWidth**:
    - Reference value for calculating the width of automatically drawn tick labels
- **frame.tickLabelHeight**:
    - Reference value for calculating the height of automatically drawn tick labels
- **frame.xTickLabelFontSize**:
    - Tick label font size. A numeric value that depends on the renderer.
- **frame.yTickLabelFontSize**:
    - Tick label font size. A numeric value that depends on the renderer.
- **frame.framePadding**:
    - Number of pixels to shift frame from data area.
- **legend.lineSpacing**:
    - legend line space.
- **legend.colorBoxWidth**:
    - Legend line width.
- **legend.legendMargin**:
    - Legend frame margin.
- **legend.fontSize**:
    - Legend font size.
- **line2d.thickness**:
    - Line thickness.
- **line2d.markerSize**:
    - Line marker size.
- **marker.markerSize**:
    - Marker size.
- **marker.markerStyle**:
    - Marker style.
- **renderer.skipCleaning**:
    - Normally, temporary files are automatically cleaned before rendering starts. Set this to True to skip cleaning.
- **renderer.skipRunViewer**:
    - Viewer does not start.
- **title.position**:
    - Axes title position. Whether to draw above or below or other.
    - "up" or "down" or "left" or "right".
- **title.rotate**:
    - Title tilt.
- **title.fontSize**:
    - Title font size.
- **title.color**:
    - Title color.
- **title.margin**:
    - Margin from the edge of the figure
- **wedge.labelDistance**:
    - Position from center to draw label. Specify in coordinate axis units.
- **wedge.labelColor**:
    - label color.
- **wedge.pctDistance**:
    - Position from center to draw percentage text. Specify in coordinate axis units.
- **wedge.pctColor**:
    - percentage text color.
- **wedge.fontSize**:
    - font size.
- **wedge.legendLineWidth**:
    - legend line width.
- **xlabel.position**:
    - X-axis label position. Whether to draw above or below.
    - "up" or "down".
- **xlabel.rotate**:
    - X-axis label tilt.
- **xlabel.fontSize**:
    - font size.
- **xlabel.color**:
    - X-axis label text color.
- **xlabel.margin**:
    - Margin from the edge of the figure
- **ylabel.position**:
    - Y-axis label position. Whether to draw left or right.
    - "left" or "right".
- **ylabel.rotate**:
    - X-axis label tilt.
- **ylabel.fontSize**:
    - font size.
- **ylabel.color**:
    - Y-axis label text color.
- **ylabel.margin**:
    - Margin from the edge of the figure
