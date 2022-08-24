// select dom elements
const countersEl = document.getElementById("counters");
const addCounterEl = document.getElementById("addCounter");
const resetCounterEl = document.getElementById("resetCounter");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_COUNTER = "addCounter";
const RESET_COUNTERS = "resetCounter";

// action creators
const incrementAction = (id, value) => {
  return {
    type: INCREMENT,
    payload: {
      id: id,
      value: value,
    },
  };
};
const decrementAction = (id, value) => {
  return {
    type: DECREMENT,
    payload: {
      id: id,
      value: value,
    },
  };
};
const addCounterAction = () => {
  return {
    type: ADD_COUNTER,
    payload: {
      id: store.getState().totalCounter,
      value: 0,
    },
  };
};
const resetCounterAction = () => {
  return {
    type: RESET_COUNTERS,
  };
};

// initial state
let initialState = {
  counters: [
    {
      id: 0,
      value: 0,
    },
  ],
  totalCounter: 1,
};

// create store
const store = Redux.createStore(counterReducer);

// add new counter
const newCounter = () => {
  const counterEl = document.createElement("div");
  store.getState().counters.forEach((counter) => {
    counterEl.innerHTML = `
      <div
        class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
      >
        <div id="${counter.id}" class="text-2xl font-semibold">${counter.value}</div>
        <div class="flex space-x-3">
          <input class="border-2 px-1 w-40 outline-none" type="number" name="" id="input-${counter.id}" placeholder="Inc. & Dec. Value" />
          <button id="increment-${counter.id}" onClick="increment(${counter.id})" class="bg-indigo-400 text-white px-3 py-2 rounded shadow">
            Increment
          </button>
          <button id="decrement-${counter.id}" onClick="decrement(${counter.id})" class="bg-red-400 text-white px-3 py-2 rounded shadow">
            Decrement
          </button>
        </div>
      </div>
    `;
  });
  countersEl.appendChild(counterEl);
};

// reset counter
const resetCounter = () => {
  countersEl.innerHTML = "";

  store.getState().counters.map((counter) => {
    const counterEl2 = document.createElement("div");
    counterEl2.innerHTML = `
      <div
        class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
      >
        <div id="${counter.id}" class="text-2xl font-semibold">${counter.value}</div>
        <div class="flex space-x-3">
          <input class="border-2 px-1 w-40 outline-none" type="number" name="" id="input-${counter.id}" placeholder="Inc. & Dec. Value" />
          <button id="increment-${counter.id}" onClick="increment(${counter.id})" class="bg-indigo-400 text-white px-3 py-2 rounded shadow">
            Increment
          </button>
          <button id="decrement-${counter.id}" onClick="decrement(${counter.id})" class="bg-red-400 text-white px-3 py-2 rounded shadow">
            Decrement
          </button>
        </div>
      </div>
    `;
    countersEl.appendChild(counterEl2);
  });
};

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    return {
      ...state,
      counters: state.counters.map((counter) => {
        if (counter.id === action.payload.id) {
          return {
            ...counter,
            value: counter.value + action.payload.value,
          };
        } else {
          return counter;
        }
      }),
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      counters: state.counters.map((counter) => {
        if (counter.id === action.payload.id) {
          return {
            ...counter,
            value: counter.value - action.payload.value,
          };
        } else {
          return counter;
        }
      }),
    };
  } else if (action.type === ADD_COUNTER) {
    return {
      ...state,
      counters: [...state.counters, action.payload],
      totalCounter: state.totalCounter + 1,
    };
  } else if (action.type === RESET_COUNTERS) {
    return {
      ...state,
      counters: state.counters.map((counter) => {
        return {
          ...counter,
          value: 0,
        };
      }),
    };
  } else {
    return state;
  }
}

// update UI initially
newCounter();

const render = (id) => {
  store.getState().counters.map((counter) => {
    if (counter.id === id) {
      document.getElementById(id).innerText = counter.value;
    }
  });
};

store.subscribe(render);

// button click listeners
function increment(id) {
  let inputValue = Number(document.getElementById(`input-${id}`).value);
  store.dispatch(incrementAction(id, inputValue));
  inputValue = "";
  render(id);
}
function decrement(id, value) {
  let inputValue = Number(document.getElementById(`input-${id}`).value);
  store.dispatch(decrementAction(id, inputValue));
  inputValue = "";
  render(id);
}

addCounterEl.addEventListener("click", () => {
  store.dispatch(addCounterAction());
  newCounter();
});
resetCounterEl.addEventListener("click", () => {
  store.dispatch(resetCounterAction());
  resetCounter();
});
