/** Lib */
function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    
    return () => {
      listeners = listeners.filter(l => l != listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);

    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

/** App TODO */
// Actions Types
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Generators Actions
const addTodoAction = todo => ({ type: ADD_TODO, todo });
const removeTodoAction = id => ({ type: REMOVE_TODO, id });
const toggleTodoAction = id => ({ type: TOGGLE_TODO, id });

const addGoalAction = goal => ({ type: ADD_GOAL, goal });
const removeGoalAction = id => ({ type: REMOVE_TODO, id });

function todoReducer(state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id != action.id);
    case TOGGLE_TODO:
      return state.map(todo => todo.id !== action.id
        ? todo
        : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
        return state;
  }
}
/** APP Goal (Reducer) */
function goalReducer(state = [], action) {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

function rootReducer(state = {}, action) {
  return {
    todos: todoReducer(state.todos, action),
    goals: goalReducer(state.goals, action),
  };
}
