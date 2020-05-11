---
id: state-and-lifecycle
title: State and Lifecycle
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

This page introduces the concept of state and lifecycle in a React component. You can find a [detailed component API reference here](/docs/react-component.html).

Consider the ticking clock example from [one of the previous sections](/docs/rendering-elements.html#updating-the-rendered-element). In [Rendering Elements](/docs/rendering-elements.html#rendering-an-element-into-the-dom), we have only learned one way to update the UI. We call `ReactDOM.render()` to change the rendered output:

```js{8-11}
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(
    element,
    document.getElementById('root')
  )
}

setInterval(tick, 1000)
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

In this section, we will learn how to make the `Clock` component truly reusable and encapsulated. It will set up its own timer and update itself every second.

We can start by encapsulating how the clock looks:

```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  )
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  )
}

setInterval(tick, 1000)
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

However, it misses a crucial requirement: the fact that the `Clock` sets up a timer and updates the UI every second should be an implementation detail of the `Clock`.

Ideally we want to write this once and have the `Clock` update itself:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)
```

To implement this, we need to add "state" to the `Clock` component.

State is similar to props, but it is private and fully controlled by the component.

## Adding Local State to a Component {#adding-local-state-to-a-component}

We will move the `date` from props to state in four steps:

1) Replace `props.date` with `date` in the `<h2>`:

```js{5}
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>    
    </div>
  )
}
```

2) Import the [useState](/docs/hooks-reference.html#usestate) function from the React library:

```js{1}
import React, { useState } from 'react'

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>    
    </div>
  )
}
```

[useState](/docs/hooks-reference.html#usestate) is a React function that returns two things: a value and a function to change that value. For example, to store the current time in this example, we will call `useState` to generate a value `date`, and a function `setDate` to update it. Whenever we call `setDate`, React will re-render the DOM to show the new `date` value.

The line calling `useState` will look like this:

```js
const [date, setDate] = useState(new Date());
```

Passing `new Date()` to `useState` sets the initial value to `new Date()`. `const [date, setDate] = useState(new Date())` stores the current value in `date`, and puts the function that will let us update that value in `setDate`.

With that explanation out of the way, we're ready for step 3:

3) Add a [useState](/docs/hooks-reference.html#usestate) call that assigns the initial date to be `new Date()`:

```js{4}
import React, { useState } from 'react'

function Clock(props) {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>    
    </div>
  )
}
```

4) Remove the `date` prop from the `<Clock />` element:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)
```

We will later add the timer code back to the component itself.

The result looks like this:

```js{1,4,9,15}
import React, { useState } from 'react'

function Clock(props) {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>    
    </div>
  )
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)
```

[**Try it on CodePen**](https://codepen.io/kickstartcoding/pen/eYpMXym?editors=0010)

Now we've got a React component with a `date` variable, and a `setDate` function for changing that variable. But when and how do we change it?

Let's make the `Clock` set up its own timer and update itself every second.

## Adding useEffect to a Component {#adding-useeffect-to-a-component}

In applications with many components, it's very important to free up resources taken by the components when they are destroyed.

We want to [set up a timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) whenever the `Clock` is rendered to the DOM for the first time. This is called "mounting" in React.

The code for setting up a timer to run a `tick` function every second looks like this:

```js
const timerID = setInterval(
  () => tick(),
  1000
)
```

This timer code is all JavaScript so far. No React yet.

We also want to [clear the timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) whenever the DOM produced by the `Clock` is removed. This is called "unmounting" in React.

The JavaScript code for clearing our timer looks like this:

```js
clearInterval(timerID)
```

In React, to get our timer setup to run when the component mounts, and to get our timer to clear when the component unmounts, we need to use [the useEffect function](/docs/hooks-reference.html#useeffect).

The `useEffect` function takes a function as an argument. The function you pass to `useEffect` gets run when the component mounts. So, to setup the timer when the `Clock` component mounts, you need to set up `useEffect` like this:

```js{1,6}
useEffect(() => {
  const timerID = setInterval(
    () => tick(),
    1000
  )
})
```

If you want some specific code to run when the component ***un***mounts, you have to make the function you pass to `useEffect` *return* a function that contains that code. We want to clear our timer when the component unmounts, so we need to return a function that clears the timer in `useEffect`, like this:

```js{7}
useEffect(() => {
  const timerID = setInterval(
    () => tick(),
    1000
  )

  return () => clearInterval(timerID)
})
```

With this code, `setInterval` will get called when our component mounts, and `clearInterval` will get called when our component unmounts.

Let's put this `useEffect` code into our `Clock` component.

First, we need to import the `useEffect` function:

```js{1}
import React, { useState, useEffect } from 'react'

function Clock(props) {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>    
    </div>
  )
}
```

Second, we need to add the `useEffect` code:

```js{6-13}
import React, { useState, useEffect } from 'react'

function Clock(props) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(
      () => tick(),
      1000
    )
    
    return () => clearInterval(timerID)
  })

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>    
    </div>
  )
}
```

Finally, for this all to work, we have to implement a function called `tick()` that the `Clock` component will run every second.

Our `tick` function will use the `setDate` function we got from our `useState` call to schedule updates to the component local state.

It will look like this:

```js
tick() {
  setDate(new Date())
}
```

Let's add it to our component:

```js{15-17}
import React, { useState, useEffect } from 'react'

function Clock(props) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(
      () => tick(),
      1000
    )
    
    return () => clearInterval(timerID)
  })

  function tick() {
    setDate(new Date())
  }

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>    
    </div>
  )
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)
```

[**Try it on CodePen**](https://codepen.io/kickstartcoding/pen/mdexopX?editors=0010)

Now the clock ticks every second.

Let's quickly recap what's going on and the order in which the functions are called:

1) When `<Clock />` is passed to `ReactDOM.render()`, React calls the `Clock` component function. Since `Clock` needs to display the current time, it calls `useState` with an object including the current time. We will later update this state.

2) React then calls the `Clock` component function. This is how React learns what should be displayed on the screen. React then updates the DOM to match the `Clock` function's output.

3) When the `Clock` output is inserted in the DOM, React calls `useEffect`. Inside it, the `Clock` component asks the browser to set up a timer to call the component's `tick()` function once a second.

4) Every second the browser calls the `tick()` function. Inside it, the `Clock` component schedules a UI update by calling `setDate()` with an object containing the current time. Thanks to the `setDate()` call, React knows that `date` has changed, and calls the `Clock` function again to learn what should be on the screen. This time, `date` in the `Clock` function will be different, and so the output will include the updated time. React updates the DOM accordingly.

5) If the `Clock` component is ever removed from the DOM, React calls the function *returned* by `useEffect()` so the timer is stopped.

## Using State Correctly {#using-state-correctly}

There are three things you should know about `useState()`.

### Do Not Modify State Directly {#do-not-modify-state-directly}

For example, this will not re-render a component:

```js
const [comment, setComment] = useState('some comment');
// Wrong
comment = 'some new comment'
```

Instead, use `setComment()`:

```js
// Correct
setComment('some new comment')
```

The only way you can change a variable you get from calling `useState` is with the `set` function it returns (`setComment` in this example).

### Only Call useState (and useEffect) at the Top Level {#only-call-usestate-and-useeffect-at-the-top-level}
**Don't call `useState` or `useEffect` inside loops, conditions, or nested functions.** Instead, always use them at the top level of your React function. By following this rule, you ensure that they are called in the same order each time a component renders. That's what allows React to correctly preserve the state between multiple `useState` and `useEffect` calls.

### Only Call `useState` and `useEffect` from React Functions {#only-call-usestate-and-useeffect-from-react-functions}

**Don't call `useState` or `useEffect` from regular JavaScript functions.** Instead, you can:

* ✅ Call them from React function components.
* ✅ Call them from custom Hooks (we'll learn about these [later on](/docs/hooks-custom.html)).

By following this rule, you ensure that all stateful logic in a component is clearly visible from its source code.

## The Data Flows Down {#the-data-flows-down}

State is often called "local" or "encapsulated". It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:

```js
<h2>It is {date.toLocaleTimeString()}.</h2>
```

This also works for user-defined components:

```js
<FormattedDate date={date} />
```

The `FormattedDate` component would receive the `date` in its props and wouldn't know whether it came from the `Clock`'s state, from the `Clock`'s props, or was typed by hand:

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>
}
```

[**Try it on CodePen**](https://codepen.io/kickstartcoding/pen/PoPRLRB?editors=0010)

This is commonly called a "top-down" or "unidirectional" data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.

If you imagine a component tree as a waterfall of props, each component's state is like an additional water source that joins it at an arbitrary point but also flows down.

To show that all components are truly isolated, we can create an `App` component that renders three `<Clock>`s:

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Each `Clock` sets up its own timer and updates independently.
