# zstate

Minimalist state manager, thought to sustain a state based on a mutable object that scales according to nodes.

## Nodes?

The nodes are instances that are associated with the state, these instances allow isolated work, example:

```js
import createState from "zstate";

const stateA = createState();

const stateB = A("b");

stateA.on(() => {
    console.log("update");
});

stateB.set({ name: "Uppercod" });
```

Del ejemplo podemos destacar :

1. `stateA` contiene a `stateB`.
2. `stateB` nunca conoce a `stateA`.

## Install

```
npm install zstore
```

## Usage

```js
import state from "zstate";

const state = store({
    toggle: false,
});

state.on(() => {
    console.log("update");
});

const toggle = ({ toggle }) => ({ toggle: !toggle });

state.set(toggle); // true
state.set(toggle); // false
```

## Instance

```js
import createState from "zstate";

const app = createState(initialState);
```

Creates an instance of the state that returns a function that contains the following static properties and methods:

### state

```js
app.state;
```

Current state.

### set

```js
app.set({ any: "value" });
```

Update current state, `set` does not replace current state, just merge.

### on

```js
const off = app.on((state) => {
    console.log("update:", state);
});
```

It subscribes to state changes.
