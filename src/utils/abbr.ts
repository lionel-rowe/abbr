interface IWiktionaryData {
  parse?: {
    text?: {
      '*'?: string
    }
  }
}

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;',
  '/': '&#47;'
};

const escapeHtml = (html: string) => html.replace(/[&<>"'/]/g, (char: string) => entityMap[char]);

const MATCHER = /\b(?:Internet slang)|(?:initialism|acronym)\s+of\b/i;
const EXCLUDER = /\bnon-gloss\b/i;

const SAFE_getAbbrsHtmlAsync = async (UNSAFE_term: string) => {
  const res = await fetch(`https://en.wiktionary.org/w/api.php?action=parse&format=json&page=${encodeURIComponent(UNSAFE_term)}&prop=text&origin=*`);

  const data: IWiktionaryData = await res.json();

  const UNSAFE_html = data.parse
    && data.parse.text
    && data.parse.text['*']
    && data.parse.text['*'];

  const UNSAFE_text = (() => {
    const template = document.createElement('template');

    template.innerHTML = UNSAFE_html || '';

    return (template.content.firstElementChild as any).innerText;
  })();

  const UNSAFE_lines = UNSAFE_text.split('\n').filter((UNSAFE_line: string) => UNSAFE_line.trim().length);

  if (!UNSAFE_lines || !UNSAFE_lines.length) {
    return [];
  }

  const UNSAFE_abbrs = UNSAFE_lines.filter((UNSAFE_line: string) => {
    return MATCHER.test(UNSAFE_line) && !EXCLUDER.test(UNSAFE_line);
  }).map((UNSAFE_line: string) => {
    return UNSAFE_line
      .replace(/\b(?:initialism|acronym)\s+of\b/i, '')
      .replace(/\[.+?\]/g, '')
      .replace(/\(.+?\)/g, '')
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\.$/, '');
  });

  return UNSAFE_abbrs.map((UNSAFE_abbr: string) => {
    const SAFE_title = escapeHtml(UNSAFE_abbr);
    const SAFE_term = escapeHtml(UNSAFE_term);

    return `<abbr title="${SAFE_title}">${SAFE_term}</abbr>`;
  });
};

export default SAFE_getAbbrsHtmlAsync;
