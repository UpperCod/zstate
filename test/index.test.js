import test from "ava";
import createState from "../zstate";

test("instance", (t) => {
    const { state } = createState({ id: 100 });
    t.deepEqual(state, { id: 100 });
});

test("set", (t) => {
    const { state, set } = createState({ id: 100 });

    set({ id: 101 });

    t.deepEqual(state, { id: 101 });

    set(() => ({ value: "any" }));

    t.deepEqual(state, { id: 101, value: "any" });

    set({ id: null });

    t.deepEqual(state, { value: "any" });
});

test("on", (t) => {
    t.plan(3);

    const { on, set } = createState({ id: 100 });

    on(() => t.pass());

    set({ id: 101 });
    set({ id: 101 });
    set({ id: 101 });
});

test("nesting with inherited instance", (t) => {
    const root = createState({ child: { id: 100 } });

    const child = root("child");

    t.deepEqual(child.state, { id: 100 });
});

test("nesting with new instance", (t) => {
    const root = createState();

    const child = root("child", { id: 100 });

    t.deepEqual(child.state, { id: 100 });
});

test("nesting with subscription", (t) => {
    t.plan(3);

    const root = createState();

    const { set } = root("child", { id: 100 });

    root.on(() => t.pass());

    set({ id: 100 });
    set({ id: 100 });
    set({ id: 100 });
});
