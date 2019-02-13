module.exports = {
	env: {
		es6: true,
		browser: true,
		node: true
	},
    extends: [
        "c74",
        "plugin:react/recommended"
    ],
    parser: "babel-eslint",
	rules: {
        indent: ["error", 4],
        quotes: ["error", "single"]
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            pragma: "React",  // Pragma to use, default to "React"
            version: "detect" // React version. "detect" automatically picks the version you have installed.
        }
    }
};
