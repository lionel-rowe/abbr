export const getTextFromHtml = (UNSAFE_html: string) => {
  const template = document.createElement('template');

  template.innerHTML = UNSAFE_html;

  return (template.content.firstElementChild as any).innerText;
};
