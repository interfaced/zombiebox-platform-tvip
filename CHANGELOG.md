# v0.1.0 ()

## Features
* **#1531** Add aspect ratio support.
* **#3998** Add ViewPort class which is responsible for managing display area sizes and aspect ratio
* **#4422** Rename abstract Video class (zb.device.Video) to AbstractVideo (zb.device.AbstractVideo)

## Improvements
* **#4319** Removed call `_createViewPort()` method from Video constructor
* **#4378** Created new namespace for containing platform's constant values
* **#4503** Move calling parent class constructor to the top of child constructors