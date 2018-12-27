# UI Bricks

## Brick Construction

- Inner State
- Props
  - Local Handlers Dealing with local state
  - Messaging Handlers Transfer event to handlers defined in parents
- Derived State Local state can updated by both local handler and parent event

Instantiation of childrend which may call parent handlers should be done in parent.
