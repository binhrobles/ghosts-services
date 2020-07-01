import sanitizeHtml from 'sanitize-html';

export const sanitizeText = (text: string): string => {
  // clean up user html input
  return sanitizeHtml(text);
};
