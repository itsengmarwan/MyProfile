async function copyToClipboard(text) {
    try {
        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                showToast('Copied to clipboard');
                return;
            } catch (error) {
                console.warn('Clipboard API unavailable; trying fallback:', error);
            }
        }

        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.setAttribute('aria-hidden', 'true');
        el.tabIndex = -1;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);

        try {
            el.select();
            if (!document.execCommand('copy')) throw new Error('Copy command failed');
        } finally {
            el.remove();
        }

        showToast('Copied to clipboard');
    } catch (error) {
        console.error('Unable to copy text:', error);
        showToast('Copy failed — please copy it manually');
    }
}

document.querySelectorAll('[data-copy-value]').forEach((button) => {
    button.addEventListener('click', () => copyToClipboard(button.dataset.copyValue));
});

document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
});

let toastTimer;

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.querySelector('span')?.replaceChildren(document.createTextNode(message));
    toast.classList.add('show');
    toast.setAttribute('role', 'status');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
