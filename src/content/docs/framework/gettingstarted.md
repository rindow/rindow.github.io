---
layout: document
title: "Getting Started"
previous_section: index
---
## Quick Start
Let's run a simple demo.

#### Install PHP
Install the php command line environment.

```shell
$ sudo apt install php7.4-cli
```
If you are using Windows, please download PHP from [here](https://windows.php.net/download/).

The Skeleton code is available from PHP 7.2 to 7.4.

#### Download Composer
If you do not have Composer, download it from http://getcomposer.org/ or
just run the following command:

```shell
$ php -r "readfile('https://getcomposer.org/installer');" | php
```

#### Install the Mini Web-application Skeleton
Create a project with composer.

```shell
$ php composer.phar create-project rindow/skeleton-mini-webappl path/to/install
```

#### Run Tests

```shell
$ vendor/bin/phpunit -c tests
```

#### Run Application

```shell
$ php -S localhost:8000 -t public
```

The sample is now running. Access http://localhost:8000/ with a web browser.

#### Change settings
Rewrite "config/webapp.config.php" or write additional settings to "config/local/" directory.

The settings are compiled and saved. You must clear the cache after changing the settings. Script is prepared in the sample.
If you are using a memory cache such as APCu, also clear the memory cache.

If you change the version item in the module_manager section of webapp.config.php, the cache will be cleared automatically.

```shell
$ vi config/webapp.config.php
$ bin/cache-clear
```

## Full Features Demonstration Application
You can try to see Full Features Demonstration.

Install the project with composer in the same way.

```shell
$  php composer.phar create-project rindow/skeleton-fullfeatures-demo path/to/install
```


## Project directory structure

```
+--bin/ : Scripts for starting command line application
|
+--cache/ : Various cache files
|
+--config/--+-- webapp.config.php : Project-wide settings
|           |
|           +-- local/ : Settings for each local environment
|
+--(data/ : database files etc.)
|
+--(log/ : log files)
|
+--public/--+-- index.php : Web application entry point
|           |
|           +-- Other public files
|
+--resources/-+-- views/-+-- global : View template files for the entire project.
|
+-- src/ ---+--(Command/ : Command line Application Components)
|           |
|           +-- Controller/ : Web-MVC Controllers
|           |
|           +--(Entity/ : Entity objects)
|           |
|           +--(Model/ : Application Services Components)
|           |
|           +--(Persistence/ : Persistence Services Components)
|           |
|           +--(Repository/ : Repository Services Components)
|           |
|           +-- Resources/--+-- config/ : Configuration files in module
|           |               |
|           |               +-- views/--+-- local/ : View template files in module
|           |
|           +--(Tests/ : Test cases. Change directly under the project if necessary)
|           |
|           +-- Module.php : Module interface
|           |
|           +--(Setup.php : Setup functions for the Composer)
|
+-- tests/ : Test settings and Test cases
|
+-- vendor/ : composer modules
|
+-- composer.json : composer configuration file
```
