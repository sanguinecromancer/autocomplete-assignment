1. What is the difference between Component and PureComponent?
Give an example where it might break my app.

Normal components re-render when their parent component renders or there is a 
state update. Pure components only render when it's necessary.
It can break if the props have deeply nested objects (because of only shallow comparison).


2. Context + ShouldComponentUpdate might be dangerous. Why is
that?

ContextAPI provides a state for the app. To my knowledge ShouldComponentUpdate observes the props.
This might lead to an issue that it ignores the state change.


3. Describe 3 ways to pass information from a component to its
PARENT.

1- Context API
2- useReducer 
3- State management libraries like Redux (signals is getting popularity nowadays)


4. Give 2 ways to prevent components from re-rendering.

1 -Using React.memo is one of the best as it prevents re-rendering when their props have not changed.
2 -useCallback: memoizes the function

5. What is a fragment and why do we need it? Give an example where it
might break my app.

It's this pattern we usually use for wrapping our JSX into a parent: <></>
We need it because sometimes we don't want to add an extra element to the DOM as it might break the CSS styling.


6. Give 3 examples of the HOC pattern.

It takes a component and returns a component, but I can remember one popular example:
"connect" from react-redux is one of the most popular high order components.
Authentication, managing state are also HOCs.


7. What's the difference in handling exceptions in promises,
callbacks and async…await?

Callbacks check right away the first argument, if it's an error.
Promises use .catch() method.
Async await use try and catch blocks to catch the errors.


8. How many arguments does setState take and why is it async.

It takes two arguments, one of them is current state and the next is a callback function.
Such heavy operation like updating state, virtual dom and then real DOM etc. should be async as otherwise it might lead to inconsistencies.


9. List the steps needed to migrate a Class to Function
Component.

Easiest part is the render method as it can directly be used in the return of the function. Then this.state = item will be just replaced with
[item, setItem] = useState.
Hardest part is to convert the lifecycle methods. you need to consider an appropriate hook like useEffect, useRef - depending on what you want to do.


In my current company we are doing this right now just by writing the new components as function components :) our app had started 
6 years ago with class based components.


10. List a few ways styles can be used with components.
You can use a CSS stylesheet, styled components or a library like Tailwind.


11. How to render an HTML string coming from the server.
This is not recommended so I haven't done this so far but React had something like "dangerousSetHTML" from what I remember.