window.addEventListener('error', e => {
    console.log('Script 2', 'error', e.message, e.error);
});

window.addEventListener('unhandledrejection', e => {
    console.log('Script 2', 'unhandledrejection', e.reason);
});

function throwAnError2() {
    async function throwAsyncError2() {
        throw new Error("Async error from script2");
    }
    throwAsyncError2();
    throw new Error("Sync error from script2");
}

// This error is thrown from an origin different from the HTML page.
window.setTimeout(() => throwAnError2(), 1000);
