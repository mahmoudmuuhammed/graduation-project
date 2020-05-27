import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// export const fileUpload = functions.storage.bucket('users').object().onChange(event => {
//     console.log(event);
// })



export const videoCallNotification =
    functions.firestore.document('videoCallNotification/{notificaionID}')
        .onCreate((msgData) => {

            const message = msgData.data();
            const recieverMsgToken = message?.RecieverMsgToken;
            const payload = {
                data: {
                    channelName: message?.channelName
                },
                notification: {
                    title: 'Incoming Video Call',
                    body: message?.Caller,
                    image: "https://cdn3.iconfinder.com/data/icons/basic-user-interface-application/32/INSTAGRAM_ICON_SETS-35-512.png"
                }
            }

            return admin.messaging().sendToDevice(recieverMsgToken, payload)
        })

export const commentNotification =
    functions.firestore.document('Users/{userId}/Notification/{notificationId}')
        .onCreate((notification) => {
            const notificationData = notification.data();

            const recieverRef = notification.ref;
            const recieverUserRef = recieverRef.parent.parent;

            recieverUserRef?.get().then((user) => {
                const userData = user.data();
                const recieverMsgToken = userData?.notification_token_id

                const payload = {

                    notification: {
                        title: 'New comment on your post',
                        body: 'from ' + notificationData?.from_full_name
                    }
                }

                return admin.messaging().sendToDevice(recieverMsgToken, payload)

            }).catch((err) => console.log(err))
        })

// export const commentCounter =
//     functions.firestore.document('Posts/{postId}/Comments/{CommentId}')
//         .onCreate(comment => {
//             const commentData = comment.data();
//             const userId=commentData?.userId

//             const userRef=comment.ref.parent.parent?.parent.parent?.collection(`Users/${userId}`)
//             userRef.
//         })