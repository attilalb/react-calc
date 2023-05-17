import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './App.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  CLEAR_LAST: 'clear-last',
  EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      //Prevent multiple starting zeros
      if (payload.digit === '0' && state.currentOperand === '0') return state;
      if (payload.digit === '.' && state.currentOperand.includes('.'))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR_LAST:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return '';
  let computation;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
  }
  return computation;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <>
      <div
        id="calculator"
        className="bg-slate-400 h-auto flex flex-col rounded-lg gap-3 p-4 shadow-lg"
      >
        <div
          id="display"
          className="bg-slate-900 h-16 rounded-md flex flex-col items-end justify-around p-3 break-all font-mono"
        >
          <div className="previous-operand text-slate-400 text-sm">
            {previousOperand} {operation}
          </div>
          <div className="current-operand text-white text-base">
            {currentOperand}
          </div>
        </div>
        <div className="bg-slate-600 h-[.25rem] blur"></div>
        <div
          id="numpad"
          className="grid grid-cols-4 grid-flow-row gap-2 text-lg font-black"
        >
          <button
            id="clear"
            className="button bg-slate-300 col-span-2"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            AC
          </button>
          <button
            id="delete"
            className="button bg-slate-300"
            onClick={() => dispatch({ type: ACTIONS.CLEAR_LAST })}
          >
            C
          </button>

          <OperationButton operation="÷" value="divide" dispatch={dispatch} />
          <DigitButton digit="7" value="seven" dispatch={dispatch} />
          <DigitButton digit="8" value="eight" dispatch={dispatch} />
          <DigitButton digit="9" value="nine" dispatch={dispatch} />
          <OperationButton operation="*" value="multiply" dispatch={dispatch} />
          <DigitButton digit="4" value="four" dispatch={dispatch} />
          <DigitButton digit="5" value="five" dispatch={dispatch} />
          <DigitButton digit="6" value="six" dispatch={dispatch} />
          <OperationButton operation="-" value="subtract" dispatch={dispatch} />
          <DigitButton digit="1" value="one" dispatch={dispatch} />
          <DigitButton digit="2" value="two" dispatch={dispatch} />
          <DigitButton digit="3" value="three" dispatch={dispatch} />
          <OperationButton operation="+" value="add" dispatch={dispatch} />
          <DigitButton digit="0" value="zero" dispatch={dispatch} />
          <DigitButton digit="." value="decimal" dispatch={dispatch} />
          <button
            id="equals"
            className="button text-white bg-red-600 col-span-2"
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
