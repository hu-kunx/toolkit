export function copyToClipboard(text: string): Promise<void> {
  if (!text) return Promise.resolve();
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    textarea.style.opacity = '0';
    textarea.value = text;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999);

    document.execCommand('copy', true) ? resolve() : reject();
    document.body.removeChild(textarea);
  });
}
