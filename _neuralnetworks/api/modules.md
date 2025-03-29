---
layout: document
title: "Variable"
grand_upper_section: index
upper_section: api/apitoc
previous_section: api/arrayspec
next_section: api/add
---

- **namespace**: Rindow\NeuralNetworks\Gradient\Core
- **class**: Modules

A container that combines the shape and dtype information of an NDArray. Unlike an NDArray, it does not have a value.
It is used when defining the input specifications of a model.

Methods
-------

### constructor
```php
$g->modules(
    ?array $modules=null,
    ?string $name=null,
) : Module
```

Arguments

- **modules**: array of models and layers.

Examples

```php
use Rindow\NeuralNetworks\Model\AbstractModel;
class TestModel extends AbstractModel
{
    protected Module $models;

    public function __construct(object $nn,int $layers)
    {
        parent::__construct($nn);
        $g = $nn->gradient();
        $this->models = $g->modules();
        foreach($i=0;$i<$layers;$i++)
        {
            $this->models->add($nn->layers->Dense(10));
        }
    }

    protected function call(NDArray $inputs)
    {
        $x = $inputs;
        foreach($this->models as $layer) {
            $x = $layer->forward($x);
        }
        return $x;
    }
}
```
