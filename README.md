# feathers-snake-case-hook

## Installation

```bash
npm install feathers-snake-case-hook --save
```

## Usage
```js
import { toSnakeCase } from 'feathers-snake-case-hook'
app.service('/todos').before({
  all: [ toSnakeCase() ]
})
```

## License

Copyright © 2016

Licensed under the [MIT license](LICENSE).
