import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal } from "https://esm.sh/v135/@preact/signals-core@1.5.1/X-ZS8q/dist/signals-core.js";

export function Link(props: h.JSX.HTMLAttributes<HTMLAnchorElement>) {
    const href = props.href instanceof Signal ? props.href.value : props.href;


    return (
        <a
            href={href}
            onClick={(e) => {
                if (IS_BROWSER) {
                    e.preventDefault();
                    globalThis.history.pushState({}, "", href ?? "");
                }
            }}
        >
            {props.children}
        </a>
    );
}