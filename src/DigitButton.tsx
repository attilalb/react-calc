import { ACTIONS } from './App';

export default function DigitButton({ dispatch, digit, value }) {
  return (
    <button
      id={value}
      className="button bg-white"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
