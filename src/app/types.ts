export interface State {
    errors: string[];
    previousPath: string | null;
    currentPath: string | null;
}

export interface StoreState {
    app: State;
}

// eslint-disable-next-line no-unused-vars
export type Selector = (store: unknown) => any;
