import tseslint from 'typescript-eslint';
export default tseslint.config(
  { ignores: ['.next/**', 'out/**', 'next-env.d.ts', 'node_modules/**'] },
  ...tseslint.configs.recommended,
);
