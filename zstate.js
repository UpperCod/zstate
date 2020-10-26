/**
 * Create an instance
 * @param {Object.<string,any>} state
 */
export default function zstate(state = {}) {
    const _ref = {};
    const _on = new Map();

    state = load(state);

    const emit = () => _on.forEach((ignore, callback) => callback(state));

    const ctx = (prop, initialState = state[prop]) => {
        if (!_ref[prop]) {
            let prevent;
            const refState = load(initialState, state[prop]);
            _ref[prop] = zstate(refState);
            _ref[prop].on(() => !prevent && emit());
            Object.defineProperty(state, prop, {
                set(state) {
                    prevent = true;
                    _ref[prop].set(state);
                    prevent = false;
                    return refState;
                },
                get() {
                    return refState;
                },
                enumerable: true,
            });
        }
        return _ref[prop];
    };

    ctx.set = (update) =>
        Object.assign(state, load(update, state)) && (emit() || state);

    ctx.on = (callback) => _on.set(callback) && (() => _on.delete(callback));

    ctx.state = state;

    return ctx;
}

const load = (value, param) =>
    typeof value == "function" ? value(param) : value;
