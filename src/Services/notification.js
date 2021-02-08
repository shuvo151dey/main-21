import {toast} from "react-toastify";

export const notifyEvent = async (timestamp, body) => {
    const reg = await navigator.serviceWorker.getRegistration();
    Notification.requestPermission().then((permission) => {
        if(permission !== granted){
            toast.error("kindly allow push notifications to help us serve you better.", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        else{
            reg.showNotification(
                'Spring Fest 2021',
                {
                    tag: timestamp,
                    body: body,
                    showTrigger: new TimestampTrigger(timestamp),
                    data: {
                        url: window.location.href
                    },
                    badge: "https://labyrinth.springfest.in/view/images/SF.png",
                    icon: "https://labyrinth.springfest.in/view/images/SF.png"
                }
            )
        }
    })
}

export const cancelNotifications = () => {
    const reg = await navigator.serviceWorker.getRegistration();
    const notifications = await reg.getNotifications({
        includeTriggered: true
    });
    notifications.forEach(notification => notification.close());
    toast.success(`${notifications.length} notification(s) cancelled`, 
    {
        position: toast.POSITION.TOP_RIGHT
    })
}