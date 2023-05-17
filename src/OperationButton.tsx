import { ACTIONS } from './App';

export default function OperationButton({ dispatch, operation, value }) {
  return (
    <button
      id={value}
      className="button bg-orange-400"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
