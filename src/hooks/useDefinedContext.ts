import { Context, useContext } from 'react';

function useDefinedContext<T>(context: Context<T | undefined>) {
  const contextType = useContext(context);
  if (contextType === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return contextType;
}

export default useDefinedContext;
