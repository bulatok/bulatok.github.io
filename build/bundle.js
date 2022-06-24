
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\button.svelte generated by Svelte v3.48.0 */

    const { console: console_1 } = globals;
    const file$4 = "src\\button.svelte";

    function create_fragment$4(ctx) {
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			attr_dev(button, "class", "svelte-10o5gun");
    			add_location(button, file$4, 27, 0, 724);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", changeBackground, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function changeBackground() {
    	let getRandom = function (n) {
    		return Math.round(Math.random() * n + 1);
    	};

    	const numberImages = 23;
    	let images = [];

    	for (let i = 0; i < numberImages; i++) {
    		images.push(`${i + 1}.png`);
    	}

    	const id = getRandom(numberImages);
    	const image = images[id];
    	const path = `url('images/background/${image}')`;
    	console.log(path);
    	document.body.style.backgroundImage = path;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ changeBackground });
    	return [changeBackground, $$scope, slots];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { changeBackground: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get changeBackground() {
    		return changeBackground;
    	}

    	set changeBackground(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\socials.svelte generated by Svelte v3.48.0 */

    const file$3 = "src\\socials.svelte";

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let li;
    	let a1;
    	let t0;
    	let span;
    	let t1;
    	let a0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			li = element("li");
    			a1 = element("a");
    			t0 = text(/*nameStart*/ ctx[0]);
    			span = element("span");
    			t1 = text(/*nameEnd*/ ctx[1]);
    			a0 = element("a");
    			attr_dev(span, "class", "endSocialItemSpan svelte-1dw1ji7");
    			add_location(span, file$3, 26, 38, 484);
    			attr_dev(a0, "class", "svelte-1dw1ji7");
    			add_location(a0, file$3, 26, 86, 532);
    			attr_dev(a1, "href", /*link*/ ctx[2]);
    			attr_dev(a1, "class", "svelte-1dw1ji7");
    			add_location(a1, file$3, 26, 12, 458);
    			add_location(li, file$3, 24, 8, 381);
    			attr_dev(div0, "class", "svelte-1dw1ji7");
    			add_location(div0, file$3, 23, 4, 366);
    			attr_dev(div1, "class", "svelte-1dw1ji7");
    			add_location(div1, file$3, 22, 0, 355);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, li);
    			append_dev(li, a1);
    			append_dev(a1, t0);
    			append_dev(a1, span);
    			append_dev(span, t1);
    			append_dev(a1, a0);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*nameStart*/ 1) set_data_dev(t0, /*nameStart*/ ctx[0]);
    			if (dirty & /*nameEnd*/ 2) set_data_dev(t1, /*nameEnd*/ ctx[1]);

    			if (dirty & /*link*/ 4) {
    				attr_dev(a1, "href", /*link*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Socials', slots, []);
    	let { nameStart } = $$props;
    	let { nameEnd } = $$props;
    	let { link } = $$props;
    	const writable_props = ['nameStart', 'nameEnd', 'link'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Socials> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('nameStart' in $$props) $$invalidate(0, nameStart = $$props.nameStart);
    		if ('nameEnd' in $$props) $$invalidate(1, nameEnd = $$props.nameEnd);
    		if ('link' in $$props) $$invalidate(2, link = $$props.link);
    	};

    	$$self.$capture_state = () => ({ nameStart, nameEnd, link });

    	$$self.$inject_state = $$props => {
    		if ('nameStart' in $$props) $$invalidate(0, nameStart = $$props.nameStart);
    		if ('nameEnd' in $$props) $$invalidate(1, nameEnd = $$props.nameEnd);
    		if ('link' in $$props) $$invalidate(2, link = $$props.link);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [nameStart, nameEnd, link];
    }

    class Socials extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { nameStart: 0, nameEnd: 1, link: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Socials",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*nameStart*/ ctx[0] === undefined && !('nameStart' in props)) {
    			console.warn("<Socials> was created without expected prop 'nameStart'");
    		}

    		if (/*nameEnd*/ ctx[1] === undefined && !('nameEnd' in props)) {
    			console.warn("<Socials> was created without expected prop 'nameEnd'");
    		}

    		if (/*link*/ ctx[2] === undefined && !('link' in props)) {
    			console.warn("<Socials> was created without expected prop 'link'");
    		}
    	}

    	get nameStart() {
    		throw new Error("<Socials>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nameStart(value) {
    		throw new Error("<Socials>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nameEnd() {
    		throw new Error("<Socials>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nameEnd(value) {
    		throw new Error("<Socials>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get link() {
    		throw new Error("<Socials>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set link(value) {
    		throw new Error("<Socials>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\meInfo.svelte generated by Svelte v3.48.0 */

    const file$2 = "src\\meInfo.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let p;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t = text(/*descip*/ ctx[0]);
    			add_location(p, file$2, 7, 4, 87);
    			add_location(div, file$2, 6, 0, 76);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*descip*/ 1) set_data_dev(t, /*descip*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MeInfo', slots, []);
    	let { descip } = $$props;
    	const writable_props = ['descip'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MeInfo> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('descip' in $$props) $$invalidate(0, descip = $$props.descip);
    	};

    	$$self.$capture_state = () => ({ descip });

    	$$self.$inject_state = $$props => {
    		if ('descip' in $$props) $$invalidate(0, descip = $$props.descip);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [descip];
    }

    class MeInfo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { descip: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MeInfo",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*descip*/ ctx[0] === undefined && !('descip' in props)) {
    			console.warn("<MeInfo> was created without expected prop 'descip'");
    		}
    	}

    	get descip() {
    		throw new Error("<MeInfo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set descip(value) {
    		throw new Error("<MeInfo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\currency.svelte generated by Svelte v3.48.0 */

    const file$1 = "src\\currency.svelte";

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let t;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = text(/*rate*/ ctx[0]);
    			attr_dev(div0, "id", "currecny_rate_USD");
    			attr_dev(div0, "class", "navbar_currency_rate");
    			add_location(div0, file$1, 16, 4, 378);
    			attr_dev(div1, "class", "navbar_currency");
    			add_location(div1, file$1, 15, 0, 343);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*rate*/ 1) set_data_dev(t, /*rate*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Currency', slots, []);
    	let rate = "wait..";

    	function showCurrency() {
    		const api_url = "https://api.coindesk.com/v1/bpi/currentprice.json";

    		fetch(api_url).then(resp => resp.json()).then(data => {
    			$$invalidate(0, rate = `BTC/USD ${data.bpi.USD.rate_float}`);
    		});
    	}

    	showCurrency();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Currency> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ rate, showCurrency });

    	$$self.$inject_state = $$props => {
    		if ('rate' in $$props) $$invalidate(0, rate = $$props.rate);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rate];
    }

    class Currency extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Currency",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.48.0 */
    const file = "src\\App.svelte";

    // (101:2) <Button>
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("change background");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(101:2) <Button>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let body;
    	let currency;
    	let t0;
    	let div2;
    	let div0;
    	let ul0;
    	let li0;
    	let a0;
    	let span0;
    	let t2;
    	let t3;
    	let li1;
    	let a1;
    	let span1;
    	let t5;
    	let t6;
    	let div1;
    	let h1;
    	let t8;
    	let div4;
    	let div3;
    	let h2;
    	let t10;
    	let button;
    	let t11;
    	let meinfo0;
    	let t12;
    	let meinfo1;
    	let t13;
    	let meinfo2;
    	let t14;
    	let div5;
    	let ul1;
    	let socials0;
    	let t15;
    	let socials1;
    	let t16;
    	let socials2;
    	let t17;
    	let socials3;
    	let current;
    	currency = new Currency({ $$inline: true });

    	button = new Button({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	meinfo0 = new MeInfo({
    			props: {
    				descip: "19 years old freshman from Innopolis university. Golang enjoyer."
    			},
    			$$inline: true
    		});

    	meinfo1 = new MeInfo({
    			props: {
    				descip: "Have experience in writing several chat bots for telegram and VK on Golang and python.\n\t\t\tI used docker and docker-compose tools for deploying and managing them. \n\t\t\tPostgresql was choosen as a database storage.\n\t\t\t"
    			},
    			$$inline: true
    		});

    	meinfo2 = new MeInfo({
    			props: {
    				descip: "Wrote api-wrapper that finds the best cryptocurrency exchange rates. \n\t\t\t\tThe whole module was written on golang."
    			},
    			$$inline: true
    		});

    	socials0 = new Socials({
    			props: {
    				nameStart: "Linked",
    				nameEnd: "in",
    				link: "https://www.linkedin.com/in/bulat-kutlugallyamov-86506921b/"
    			},
    			$$inline: true
    		});

    	socials1 = new Socials({
    			props: {
    				nameStart: "Git",
    				nameEnd: "Hub",
    				link: "https://github.com/bulatok"
    			},
    			$$inline: true
    		});

    	socials2 = new Socials({
    			props: {
    				nameStart: "Habr",
    				nameEnd: "Career",
    				link: "https://career.habr.com/bulatok"
    			},
    			$$inline: true
    		});

    	socials3 = new Socials({
    			props: {
    				nameStart: "bulat2020205",
    				nameEnd: "@gmail.com",
    				link: "mailto:bulat2020205@gmail.com"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			body = element("body");
    			create_component(currency.$$.fragment);
    			t0 = space();
    			div2 = element("div");
    			div0 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			span0 = element("span");
    			span0.textContent = "01. ";
    			t2 = text("Projects");
    			t3 = space();
    			li1 = element("li");
    			a1 = element("a");
    			span1 = element("span");
    			span1.textContent = "02.";
    			t5 = text("\n\t\t\t\t\t   Articles");
    			t6 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Bulat Kutlugallyamov.";
    			t8 = space();
    			div4 = element("div");
    			div3 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Backend Developer";
    			t10 = space();
    			create_component(button.$$.fragment);
    			t11 = space();
    			create_component(meinfo0.$$.fragment);
    			t12 = space();
    			create_component(meinfo1.$$.fragment);
    			t13 = space();
    			create_component(meinfo2.$$.fragment);
    			t14 = space();
    			div5 = element("div");
    			ul1 = element("ul");
    			create_component(socials0.$$.fragment);
    			t15 = space();
    			create_component(socials1.$$.fragment);
    			t16 = space();
    			create_component(socials2.$$.fragment);
    			t17 = space();
    			create_component(socials3.$$.fragment);
    			attr_dev(span0, "class", "header_counter_1 svelte-159uxei");
    			add_location(span0, file, 73, 7, 1452);
    			attr_dev(a0, "href", "content/projects.html");
    			attr_dev(a0, "class", "first svelte-159uxei");
    			add_location(a0, file, 72, 6, 1398);
    			attr_dev(li0, "class", "header_item_1 svelte-159uxei");
    			add_location(li0, file, 71, 5, 1365);
    			attr_dev(span1, "class", "header_counter_2 svelte-159uxei");
    			add_location(span1, file, 78, 8, 1619);
    			attr_dev(a1, "href", "content/articles.html");
    			attr_dev(a1, "class", "second svelte-159uxei");
    			add_location(a1, file, 77, 6, 1563);
    			attr_dev(li1, "class", "header_item_2 svelte-159uxei");
    			add_location(li1, file, 76, 5, 1530);
    			attr_dev(ul0, "class", "header_list svelte-159uxei");
    			add_location(ul0, file, 70, 3, 1335);
    			attr_dev(div0, "class", "header_header svelte-159uxei");
    			add_location(div0, file, 69, 2, 1304);
    			attr_dev(h1, "class", "about-me_name_1 svelte-159uxei");
    			add_location(h1, file, 86, 3, 1749);
    			attr_dev(div1, "class", "header_me svelte-159uxei");
    			add_location(div1, file, 85, 2, 1722);
    			attr_dev(div2, "class", "container_inner");
    			add_location(div2, file, 68, 1, 1272);
    			attr_dev(h2, "class", "svelte-159uxei");
    			add_location(h2, file, 96, 3, 1917);
    			attr_dev(div3, "class", "about-me_profession_1 svelte-159uxei");
    			add_location(div3, file, 95, 2, 1878);
    			attr_dev(div4, "class", "about_me");
    			add_location(div4, file, 94, 1, 1853);
    			attr_dev(ul1, "class", "socials_list svelte-159uxei");
    			add_location(ul1, file, 119, 2, 2547);
    			attr_dev(div5, "class", "my_list svelte-159uxei");
    			add_location(div5, file, 118, 1, 2523);
    			add_location(body, file, 65, 0, 1232);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, body, anchor);
    			mount_component(currency, body, null);
    			append_dev(body, t0);
    			append_dev(body, div2);
    			append_dev(div2, div0);
    			append_dev(div0, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a0);
    			append_dev(a0, span0);
    			append_dev(a0, t2);
    			append_dev(ul0, t3);
    			append_dev(ul0, li1);
    			append_dev(li1, a1);
    			append_dev(a1, span1);
    			append_dev(a1, t5);
    			append_dev(div2, t6);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(body, t8);
    			append_dev(body, div4);
    			append_dev(div4, div3);
    			append_dev(div3, h2);
    			append_dev(div4, t10);
    			mount_component(button, div4, null);
    			append_dev(div4, t11);
    			mount_component(meinfo0, div4, null);
    			append_dev(div4, t12);
    			mount_component(meinfo1, div4, null);
    			append_dev(div4, t13);
    			mount_component(meinfo2, div4, null);
    			append_dev(body, t14);
    			append_dev(body, div5);
    			append_dev(div5, ul1);
    			mount_component(socials0, ul1, null);
    			append_dev(ul1, t15);
    			mount_component(socials1, ul1, null);
    			append_dev(ul1, t16);
    			mount_component(socials2, ul1, null);
    			append_dev(ul1, t17);
    			mount_component(socials3, ul1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(currency.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			transition_in(meinfo0.$$.fragment, local);
    			transition_in(meinfo1.$$.fragment, local);
    			transition_in(meinfo2.$$.fragment, local);
    			transition_in(socials0.$$.fragment, local);
    			transition_in(socials1.$$.fragment, local);
    			transition_in(socials2.$$.fragment, local);
    			transition_in(socials3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(currency.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			transition_out(meinfo0.$$.fragment, local);
    			transition_out(meinfo1.$$.fragment, local);
    			transition_out(meinfo2.$$.fragment, local);
    			transition_out(socials0.$$.fragment, local);
    			transition_out(socials1.$$.fragment, local);
    			transition_out(socials2.$$.fragment, local);
    			transition_out(socials3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(body);
    			destroy_component(currency);
    			destroy_component(button);
    			destroy_component(meinfo0);
    			destroy_component(meinfo1);
    			destroy_component(meinfo2);
    			destroy_component(socials0);
    			destroy_component(socials1);
    			destroy_component(socials2);
    			destroy_component(socials3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Button, Socials, MeInfo, Currency });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        props: {
            name: 'world'
        }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
