/*
Because CodePen imports React from 
https://unpkg.com/react/umd/react.development.js
and that file does not expose React Hooks functions,
this file is being added to our deploy so that CodePen
examples can import it as well to expose hooks
functions by default.

This lets use `useState` instead of the clunkier
`React.useState` in CodePen examples.
*/
if (typeof React !== 'undefined') {
  window.useState = React.useState
  window.useEffect = React.useEffect
  window.useRef = React.useRef
  window.useContext = React.useContext
  window.useReducer = React.useReducer
  window.useCallback = React.useCallback
  window.useMemo = React.useMemo
  window.useRef = React.useRef
  window.useImperativeHandle = React.useImperativeHandle
  window.useLayoutEffect = React.useLayoutEffect
  window.useDebugValue = React.useDebugValue
}