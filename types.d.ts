declare module "zstate" {
    export interface StateFill {
        [index: string]: any;
    }

    export interface State<T> {
        <S>(space: string, initialState?: () => S): State<S>;
        <S>(space: string, initialState?: S): State<S>;
        state: T;
        set(update: T): T;
        set(update: (state: T) => Partial<T>): T;
        on(handler?: (state: T) => void): void;
    }

    export default function createState<T = StateFill>(
        initialState?: T
    ): State<T>;

    export default function createState<T = StateFill>(
        initialState?: () => T
    ): State<T>;
}
