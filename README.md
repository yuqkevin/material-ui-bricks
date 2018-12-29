# UI Bricks

## Brick Construction

- initState // Be careful to avoiding "anti-pattern" in Derived State:
  // . Local state only initialized not updated by initState,
  // . initState should be immutable.
- bricks // configurable children
- handlers
  - local // will bound with component
  - parentNames // passed parent handlers
- fromState // mapping state to child brick props
