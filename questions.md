1. What is the difference between Component and PureComponent?
Give an example where it might break my app.

Normal components re-render when their parent component renders or there is a 
state update. Pure components only render when it's necessary.

It can break if the props have deeply nested objects (because of only shallow comparison).


2. Context + ShouldComponentUpdate might be dangerous. Why is
that?

ContextAPI provides a state for the app. But ShouldComponentUpdate observes the props instead of the state.
So it re-renders based on a prop change, not a state change.
This might lead to an issue that it ignores the state change.


3. Describe 3 ways to pass information from a component to its
PARENT.

1- Context API
2- UseReducer 
3- State management libraries like Redux (signals is getting popularity nowadays)


4. Give 2 ways to prevent components from re-rendering.

1 -Using memo is one of the best as it prevents re-rendering when their props have not changed.
2 - useCallback: memoizes the function

5. What is a fragment and why do we need it? Give an example where it
might break my app.

It's this pattern we usually use for wrapping our JSX into a parent: <></>
We need it because sometimes we don't want to add an extra element to the DOM as it my break the CSS styling.



6. Give 3 examples of the HOC pattern.
7. What's the difference in handling exceptions in promises,
callbacks and async…await?
8. How many arguments does setState take and why is it async.
9. List the steps needed to migrate a Class to Function
Component.
10. List a few ways styles can be used with components.
11. How to render an HTML string coming from the server.