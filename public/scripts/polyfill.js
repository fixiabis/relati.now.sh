globalThis = globalThis || window;
AbortController = AbortController || (function () {
    function AbortController() { }
    AbortController.prototype.abort = AbortController;
    return AbortController;
}());
