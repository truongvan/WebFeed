import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { preprocessMeltUI, sequence } from "@melt-ui/pp";
/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: sequence([
        vitePreprocess(),
        preprocessMeltUI(), // add to the end!
    ]),

    kit: {
        adapter: adapter({
            pages: "dist",
            assets: "dist",
            precompress: false,
            strict: true,
        }),
        alias: {
            elements: "src/lib/elements",
            components: "src/lib/components",
        },
    },
};

export default config;
