import serve from "@rollup-extras/plugin-serve";
import copy from "@rollup-extras/plugin-copy";
import styles from "rollup-plugin-styler";
import resolve from "@rollup/plugin-node-resolve";

const dev = process.env.ROLLUP_WATCH === "true";

export default {
	input: "src/main.js",
	output: {
		dir: "dist",
		format: "es",
		sourcemap: dev,
		assetFileNames: "[name][extname]",
	},
	plugins: [
		resolve(),
		styles({
			mode: ["extract", "style.css"],
		}),

		copy({
			targets: [{ src: "index.html" }, { src: "public/**/*", dest: "public" }],
		}),

		dev &&
			serve({
				port: 3000,
				open: true,
				contentBase: "dist",
			}),
	],
};
