import DOMPurify from "dompurify";

// Limpia HTML externo antes de renderizarlo con dangerouslySetInnerHTML
export const sanitize = (html: string): string => {
    return DOMPurify.sanitize(html);
};
