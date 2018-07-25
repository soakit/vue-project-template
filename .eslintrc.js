// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-before-function-paren": [0, "always"], // 函数定义时括号前面要不要空格
        "object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
        "indent": [
            0,
            "tab",
            {
                "SwitchCase": 1 // SwitchCase缩进
            }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
		"no-tabs": 0,
		"one-var": [0, "always"], // 允许var/let/const逗号分隔申明多个变量
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
		'no-return-assign': 0,
        'no-debugger': 0,
		'new-cap': 0,
		'no-extend-native': 0,
		'operator-linebreak': 0
  },
	'globals': {
		'_': true,
		'$': true,
		'config': true,
		'DEBUG': true,
		'jQuery': true,
		'initOACommon': true,
		'gantt': true,
		'jsMind': true,
        'location': true,
        'WeixinJSBridge': true
	}
}
