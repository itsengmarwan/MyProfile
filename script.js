async function copyToClipboard(text) {
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            const el = document.createElement('textarea');
            el.value = text;
            el.setAttribute('readonly', '');
            el.style.position = 'fixed';
            el.style.opacity = '0';
            document.body.appendChild(el);
            el.select();
            if (!document.execCommand('copy')) throw new Error('Copy command failed');
            el.remove();
        }
        showToast('Copied to clipboard');
    } catch (error) {
        console.error('Unable to copy text:', error);
        showToast('Copy failed — please copy it manually');
    }
}

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
