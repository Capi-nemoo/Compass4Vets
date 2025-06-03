import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // use this file's directory for extending configs
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];
