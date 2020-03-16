type BaseAction<Type = string> = { type: Type };
type PayloadAction<Type, Payload> = { type: Type; payload: Payload };
export type Action<Type = string, Payload = undefined> = Payload extends undefined
  ? BaseAction<Type>
  : PayloadAction<Type, Payload>;

export type Dispatch<Action> = (action: Action) => void;
