/**
 * Prism language definition for ZapScript, Zaparoo's scripting language for
 * token actions. Syntax follows go-zapscript's parser.
 *
 * Token names are ZapScript-specific on purpose. prism-react-renderer turns
 * theme token types and aliases into inline colors, which nested tokens
 * inherit, so these tokens are colored in src/css/custom.css instead.
 */

// Start of a script segment: line start or after a || separator.
const SEGMENT_START = /((?:^|\|\|)[ \t]*)/.source;

// JSON object content without nested braces: plain characters or strings.
const JSON_BODY = /[^{}"]|"(?:[^"\\]|\\.)*"/.source;

export default function defineZapScript(Prism) {
  const escape = { pattern: /\^./ };

  Prism.languages.zapscript = {
    // Expressions: [[...]]
    expression: {
      pattern: /\[\[[\s\S]*?\]\]/,
      greedy: true,
      inside: {
        'expression-delimiter': /^\[\[|\]\]$/,
        string: /"[^"]*"|'[^']*'/,
        boolean: /\b(?:true|false|nil)\b/,
        number: /\b\d+(?:\.\d+)?\b/,
        'expression-property': {
          pattern: /(\.)[a-z_]\w*/i,
          lookbehind: true,
        },
        'expression-variable': /\b[a-z_]\w*\b/i,
        operator: /==|!=|<=|>=|&&|\|\||[!<>+\-*/%]|\b(?:and|or|not|in|matches|contains|startsWith|endsWith)\b/,
        punctuation: /[.,()[\]]/,
      },
    },

    // Input keys: {enter}, {f12}, {shift+esc}, {hold:a:1s}, {down*10}, {"text"*5}
    'special-key': {
      pattern: /\{(?:[_^]?[\w+]+(?::[\w+.]+)*|"[^"]*")(?:\*\d+)?\}/,
      greedy: true,
    },

    // JSON arguments: a { at the start of an argument starts a JSON value
    json: {
      pattern: new RegExp(
        `([:,=][ \\t]*)\\{(?:${JSON_BODY}|\\{(?:${JSON_BODY}|\\{(?:${JSON_BODY})*\\})*\\})*\\}`,
        'm',
      ),
      lookbehind: true,
      greedy: true,
      inside: Prism.languages.json,
    },

    // Quoted arguments. Quotes only count at the start of an argument, and
    // escapes inside them use ^.
    string: {
      pattern: /((?:^|\|\||[:,])[ \t]*)(?:"(?:[^"^\r\n]|\^.)*"|'(?:[^'^\r\n]|\^.)*')/m,
      lookbehind: true,
      greedy: true,
      inside: { escape },
    },

    // Traits shorthand at the start of a segment: #hold #key=value
    traits: {
      pattern: new RegExp(`${SEGMENT_START}#[^\\s|]+(?:[ \\t]+#[^\\s|]+)*`, 'm'),
      lookbehind: true,
      greedy: true,
      inside: {
        'trait-name': /#[^\s=|]+/,
        'arg-punctuation': /=/,
      },
    },

    // Title syntax at the start of a segment: @System/Title
    title: {
      pattern: new RegExp(`${SEGMENT_START}@[^\\s/|?][^/|?\\r\\n]*\\/(?:[^|?^\\r\\n]|\\^.)+`, 'm'),
      lookbehind: true,
      greedy: true,
      inside: {
        'title-prefix': /^@/,
        'system-id': /^[^/]+(?=\/)/,
        'tag-filter': /\([+~-]?[a-z]+:[^)]*\)/i,
        escape,
        'path-separator': /\//,
      },
    },

    // URLs, including custom schemes such as steam:// and moonlight://
    url: {
      pattern: /\b[a-z][a-z0-9+.-]*:\/\/[^\s?|,^]+/i,
      greedy: true,
    },

    // System IDs in the argument of commands that take systems
    'system-list': {
      pattern: /(\*\*launch\.(?:system|random|search|title):)[^|?\r\n]+/i,
      lookbehind: true,
      greedy: true,
      inside: {
        'system-id': {
          pattern: /(^|,)[^\s,/][^,/]*?(?=\/|,|$)/,
          lookbehind: true,
        },
        escape,
        'arg-punctuation': /,/,
        'path-separator': /\//,
      },
    },

    // Auto launch with a system folder at the start of a segment: SNES/Game.sfc
    'system-path': {
      pattern: new RegExp(`${SEGMENT_START}[A-Za-z0-9][\\w-]*(?=\\/)`, 'm'),
      lookbehind: true,
      greedy: true,
      alias: 'system-id',
    },

    // Command name with its argument colon: **launch.random:
    command: {
      pattern: /\*\*[a-z]+(?:\.[a-z0-9]+)*:?/i,
      inside: {
        'arg-punctuation': /:$/,
      },
    },

    // Advanced arguments: ?key=value&key=value
    'advanced-arg': {
      pattern: /[?&][a-z_]\w*=(?:[^&|^\r\n]|\^.)*/i,
      inside: {
        'arg-name': {
          pattern: /(^[?&])[^=]+/,
          lookbehind: true,
        },
        'arg-value': {
          pattern: /(=)[\s\S]+/,
          lookbehind: true,
          inside: { escape },
        },
        'arg-punctuation': /[?&=]/,
      },
    },

    // Command separator
    separator: /\|\|/,

    escape,

    // Argument separator
    'arg-punctuation': /,/,
  };
}
