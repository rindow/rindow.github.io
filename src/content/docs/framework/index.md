---
layout: document
title: "Rindow Framework"
meta_description: "The Rindow Framework is a PHP Application Framework that provides a modern programming and configuration model to all PHP programmers. Rindow is modular and your program will be modular and that is independence to PHP frameworks."
next_section: gettingstarted
---
Overview
--------
The Rindow Framework is a PHP Application Framework that provides a modern programming and configuration model to all PHP programmers.
Rindow is modular and your program will be modular and that is independence to PHP frameworks.
Then, You can focus on application-level business logic.

You can use the Dependency Injection Container and use the Interceptor based Aspect Oriented Programming easily.
You can choose both "Annotation" based configuration and PHP's "Array" based configuration.

### Feature:

- Dependency Injection & Aspect Oriented Programming
- Annotation Based Configuration
- Pre-Compiled Configuration and Caching

Requirements
------------
Rindow is supported on PHP 5.3.3 and later.

When it will use with other frameworks, It will varies depending on the implementation.

Installation
------------
Download from github.com and extract to your library directory.
It is planing to use the composer.
And it is planing to provide Web Application skeleton.

Documentation
-------------
You will see soon.
I can write English a little.
I need your help to write in English.


Components
----------
Rindow is separated some components. Those are It can also be used just PHP library independently.

### Core Component
Core Component is constituted Dependency Injection Container and Module Manager.

- The Dependency Injection Container manages life cycle of application objects, and  initializes objects according to the dependencies between objects. Dependencies are compiling and caching to APCu extention and Filesystem.

- The Module Manager manages program codes and configurations as pluggable modules.

### AOP Component
AOP Component is constituted AOP Manager and Interceptor and Event Manager.

- AOP Manager extends Dependency Injection Container and manages the concern over multiple modules as the "Aspect".

- Interceptor get into the gap of the object invocation and monitor concerns to invoke it.

- Event Manager manages events translated form aspects and be a bridge between interceptors and Aspects.

### Annotation based Configuration
Annotation Component is constituted Annotation Manager.

- Annotation Manager compile and cache "Annotation" in PHP class definition. Almost all Rindow's Component can use "Annotation" by this capability.

### Entity Validator
Validator Component is constituted Validator and Contraints.

- Validator validates PHP Object like the "JSR 303 Bean Validation". Validation Configuration will be written by "Annotation" in PHP oject class definition.

- Constraints are definition of constraints like the "Bean Validation".

### Web Form
Form Component is constituted Form Context Builder and Form Renderer.

- Form Context Builder makes the Form Object Structure for HTML form element from PHP oject class decorated by "Annotation".

- Form Renderer draw HTML form element the Form Object Structure and the Form Theme.

### Web-MVC
MVC Component is constituted MVC Application Manager.

- When you want to use Rindow standalone without other frameworks (ZF2 and Symfony and something), You can use MVC Application Manager. This Manager can be configured to use "Annotation". And it can use the Dependency Injection without being aware of DI Container.

### Declarative transaction management
Transaction Component supports Declarative transaction management.

- The transaction description is embedded in the program for legacy applications. But transaction management should be declaratively delimited by Boundary. Declarative transaction management controls for what range of transactions to commit or abort.
- In Rindow Framework, it is realized by using AOP. The setting can also be annotation-based.

### Data Access Object Standardize
Rindow DAO component defines the interface to standardize the data access procedure.

- It provides a standardized reference implementation of the Repository interface and provides the programmer with a customizable interface.
- Implements a reference model that converts the database error using AOP to Data access exception hierarchy.

### Authentication and authorization
Security Core Component supports Authentication and authorization.

- It implements a library group that realizes an abstracted authentication mechanism. In user manager type authentication, the repository can be assigned to databases such as Sql database, Mongodb and etc.
- The Authentication Manager of Voter Authentication is implemented. Since it is applied to the application using AOP, access control can be performed for each class and method, which is completely different from the URL-based Web access control.

### Persisitence Object model
The Repository standard does not define how to store objects. But you may want to standardize the persistence layer.

Persistence-ORM and Persistence-ORMShell supports ORM interface.

It provides an ORM interface that conforms to the Java Persistence API (JPA). However, the implementation of the mapping function is currently left to the programmer.
The programmer can replace it with Doctrine ORM etc. if the application is created on the assumption of JPA compliant ORM. (But if you don't care about that performance)

You shouldn't use an ActiveRecord ORM.

### Modules
Rindow has some module in the standard.

- Twig
- Smarty
- MongoDB
- Google Cloud Datastore
- Monolog
- Symfony Yaml/Yaml extention
- Stomp (Apache ActiveMQ)

### Requirements

- PHP 5.3.3 - 5.6, 7.0 - 7.4
