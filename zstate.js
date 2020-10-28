/**
 * Create an instance
 * @param {Object.<string,any>} state
 */
export default function zstate(state = {}) {
    const _ref = {};
    const _on = new Set();

    state = load(state);

    const emit = () => _on.forEach((callback) => callback(state));

    const assigns = (update) => {
        for (const prop in update) {
            if (update[prop] == null && !_ref[prop]) {
                delete state[prop];
            } else {
                state[prop] = update[prop];
            }
        }
    };

    const ctx = (prop, initialState = state[prop]) => {
        if (!_ref[prop]) {
            let prevent;
            _ref[prop] = zstate(load(initialState, state[prop]));
            const off = _ref[prop].on(() => !prevent && emit());
            Object.defineProperty(state, prop, {
                set(nextState) {
                    if (_ref[prop]) {
                        if (nextState == null) {
                            delete _ref[prop];
                            delete state[prop];
                            off();
                        } else {
                            prevent = true;
                            _ref[prop].set(nextState);
                            prevent = false;
                            return _ref[prop].state;
                        }
                    }
                },
                get() {
                    return _ref[prop] && _ref[prop].state;
                },
                enumerable: true,
                configurable: true,
            });
        }
        return _ref[prop];
    };

    ctx.set = (update) => !assigns(load(update, state)) && (emit() || state);

    ctx.on = (callback) => _on.add(callback) && (() => _on.delete(callback));

    ctx.state = state;

    return ctx;
}

const load = (value, param) =>
    typeof value == "function" ? value(param) : value;
