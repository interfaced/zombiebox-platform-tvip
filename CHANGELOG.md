# v0.4.0 (20.10.2018)

## Features
* **#0000** Sync with zb 1.0.0-beta5
* **#6087** Implemented getting locale (Info#locale)

## Fixes
* **#0000** Device#detect use environment instead of UserAgent string for platform detection
* **#6143** Rename `typedef` to `externs`
* **#6146** Add eslint and fix warnings

# v0.3.0 (14.03.2017)

## Fixes
* **#6002** Fixed aspect ratio namespace.

# v0.2.1 (11.01.2017)

## Features
* **#5046** Added factory method `zb.device.platforms.tvip.factory.createDevice` for create Device instances. All global dependencies now located in factory method.
* **#5046** All *.es6 files renamed to *.js

# v0.2.0 (27.07.2016)

## Features
* **#1531** Add aspect ratio support.
* **#3998** Add ViewPort class which is responsible for managing display area sizes and aspect ratio
* **#4422** Rename abstract Video class (zb.device.Video) to AbstractVideo (zb.device.AbstractVideo)
* **#4495** Transpiled client-side files to ES6

## Improvements
* **#4319** Removed call `_createViewPort()` method from Video constructor
* **#4378** Created new namespace for containing platform's constant values
* **#4503** Move calling parent class constructor to the top of child constructors

## Fixes
* **#4400** Move TVIPRecorder consts to separate namespace
* **#4378** Created new namespace for containing platform's constant values
