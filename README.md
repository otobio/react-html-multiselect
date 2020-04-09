Disclaimer
======
This is  a fork of [react-dropdown-multiselect](https://github.com/ahstro/react-dropdown-multiselect)
by [ahstro](https://github.com/ahstro), so huge thanks to him.
I just needed a simple multiselect for a project and forked.

react-html-multiselect
======================

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]


### Why

* The default html multi-select seems like a different element to the single-select
* Most custom select does not work out of box with normal html form, this does.
* The default HTML select element is hard to style
* if you want more advanced select, check [react-select](https://github.com/JedWatson/react-select)

### Installation

```
// With npm
$ npm install react-html-multiselect  --save

// With yarn
$ yarn add react-html-multiselect
```

### Usage

```JavaScript
'use strict';

import React from 'react';
import Dropdown from '../';

class App extends React.Component {

  constructor() {
    this.state = {
      selected: { value: 'two', label: 'Two'}
    }
  }

  _onSelect(option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  }

  render() {

    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two', disabled: true },
      {
        type: 'group', name: 'group1', items: [
          { value: 'three', label: 'Three' },
          { value: 'four', label: 'Four' }
        ]
      },
      {
        type: 'group', name: 'group2', items: [
          { value: 'five', label: 'Five' },
          { value: 'six', label: 'Six' }
        ]
      }
    ]

    let defaultOption = this.state.selected

    return (
      <Dropdown options={options} onChange={this._onSelect.bind(this)} value={defaultOption} placeholder="Select an option" />
    )
  }

}
React.render(<App />, document.body)

```

**Run example**

```
$ cd example && npm install && npm run watch
```

### Customizing the dropdown

**name**

The `name` prop is passed down to the hidden `select`

```JavaScript
<Dropdown name='element-name' />;
```

**className**

The `className` prop is passed down to the wrapper `div`, which also has the `Dropdown-root` class.

```JavaScript
<Dropdown className='myClassName' />;
```

**controlClassName**

The `controlClassName` prop is passed down to the control `div`, which also has the `Dropdown-control` class.

```JavaScript
<Dropdown controlClassName='myControlClassName' />;
```

**menuClassName**

The `menuClassName` prop is passed down to the menu `div` (the one that opens and closes and holds the options), which also has the `Dropdown-menu` class.

```JavaScript
<Dropdown menuClassName='myMenuClassName' />;
```

**noPreview**

The `noPreview` prop is meant to disable the display of selected values, and instead display the count of selected value.

```JavaScript
<Dropdown noPreview='Y' />;
```

### License

MIT | Build for [CSViz](https://csviz.org) project @[Wiredcraft](http://wiredcraft.com)

[npm-image]: https://img.shields.io/npm/v/react-dropdown-multiselect.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-dropdown-multiselect
[downloads-image]: http://img.shields.io/npm/dm/react-dropdown-multiselect.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-dropdown-multiselect
