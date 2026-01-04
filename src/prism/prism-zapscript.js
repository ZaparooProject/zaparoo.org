/**
 * Prism language definition for ZapScript
 * ZapScript is Zaparoo's scripting language for token actions
 */

export default function defineZapScript(Prism) {
  Prism.languages.zapscript = {
    // Expressions: [[...]]
    expression: {
      pattern: /\[\[[\s\S]*?\]\]/,
      greedy: true,
      inside: {
        punctuation: /\[\[|\]\]/,
        variable: /\b(?:platform|version|scan_mode|device|last_scanned|media_playing|active_media)\b/,
        property: /\.(?:hostname|os|arch|id|value|data|launcher_id|system_id|system_name|path|name)\b/,
        operator: /==|!=|&&|\|\||!|>|</,
        string: /"[^"]*"|'[^']*'/,
        boolean: /\b(?:true|false)\b/,
        function: /\b\w+(?=\()/,
      },
    },

    // Quoted strings
    string: {
      pattern: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/,
      greedy: true,
    },

    // Command separator
    separator: /\|\|/,

    // Command prefix and name - matches **word or **word.word pattern
    command: {
      pattern: /\*\*[a-z]+(?:\.[a-z0-9]+)*/i,
      alias: 'keyword',
    },

    // Title ID prefix: @
    'title-prefix': {
      pattern: /@(?=[A-Za-z])/,
      alias: 'operator',
    },

    // Advanced arguments: ?key=value or &key=value
    'advanced-arg': {
      pattern: /[?&][a-z_][a-z0-9_]*=/i,
      alias: 'attr-name',
    },

    // Special keys in input commands: {enter}, {f12}, {shift+esc}
    'special-key': {
      pattern: /\{[\w+]+\}/,
      alias: 'variable',
    },

    // Escape sequences
    escape: {
      pattern: /\^./,
      alias: 'char',
    },

    // System IDs (common ones for visual distinction)
    'system-id': {
      pattern: /\b(?:Genesis|MegaDrive|SNES|SuperNintendo|NES|Famicom|N64|PSX|PlayStation|Saturn|Dreamcast|GBA|GameBoyAdvance|GB|GameBoy|GBC|GameBoyColor|PCEngine|TurboGrafx16|Atari2600|Atari5200|Atari7800|WonderSwan|WonderSwanColor|NeoGeo|Arcade|DOS|ao486|X68000|MSX|Amiga|C64|ColecoVision|Intellivision|Vectrex|menu|all)\b/,
      alias: 'class-name',
    },

    // Argument separator
    punctuation: /[:,]/,

    // URLs
    url: {
      pattern: /(?:https?|smb):\/\/[^\s?|]+/,
      alias: 'string',
    },
  };
}
