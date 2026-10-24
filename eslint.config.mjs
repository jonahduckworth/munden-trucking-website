import nextConfig from "eslint-config-next";

export default [
  ...nextConfig,
  { ignores: [".cache/**", "test-results/**", "playwright-report/**"] },
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];
