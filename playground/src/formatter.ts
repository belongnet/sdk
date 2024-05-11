import prettier from 'prettier'
import babel from 'prettier/plugins/babel'
import estree from 'prettier/plugins/estree'

export function formatCode(code: string) {
  return prettier.format(code, {
    parser: 'babel',
    plugins: [babel, estree],
    semi: false,
    singleQuote: true,
  })
}
