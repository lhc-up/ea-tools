export const dispatchEvent = function (name: string, args: any, isBubbling?: boolean, isBroadcast?: boolean) {
    const event = document.createEvent('HTMLEvents');
    // name:事件类型，isBubbling:是否冒泡，isBroadcast:是否阻止浏览器的默认行为
    event.initEvent(name, isBubbling, isBroadcast);
    Object.assign(event, args);
    document.dispatchEvent(event);
    return event;
}
export const addEventListener = function (name: string, cb: EventListener) {
    document.addEventListener(name, cb);
}
export const removeEventListener = function (name: string, cb: EventListener) {
    document.removeEventListener(name, cb);
}