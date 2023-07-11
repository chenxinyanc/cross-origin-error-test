window.addEventListener('error', e => {
    console.log('Script 1', 'error', e.message, e.error);
});

window.addEventListener('unhandledrejection', e => {
    console.log('Script 1', 'unhandledrejection', e.reason);
});
