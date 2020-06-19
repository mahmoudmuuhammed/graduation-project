import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const videoCallNotification =
    functions.firestore.document('videoCallNotification/{notificaionID}')
        .onCreate((msgData) => {
            const message = msgData.data();
            const receiverMsgToken = message?.receiverMsgToken;
            const clickAction: string = 'com.example.medkit.activities.VideoChatActivity'

            const payload = {
                data: {
                    channelName: message?.channelName,
                    callerId: message?.callerID,
                },
                notification: {
                    title: 'Incoming Video Call',
                    body: message?.caller,
                    click_action: clickAction
                }
            }
            return admin.messaging().sendToDevice(receiverMsgToken, payload)
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

export const postCounter =
    functions.firestore.document('Posts/{postId}')
        .onCreate(post => {
            const userId = post.data()?.userID;
            return admin.firestore().doc(`Users/${userId}`).update({ postCounter: admin.firestore.FieldValue.increment(1) })
        })

export const postCounterOnDelete =
    functions.firestore.document('Posts/{postId}')
        .onDelete(post => {
            const userId = post.data()?.userID;
            return admin.firestore().doc(`Users/${userId}`).update({ postCounter: admin.firestore.FieldValue.increment(-1) })
        })

export const commentCounter =
    functions.firestore.document('Posts/{postId}/Comments/{CommentId}')
        .onCreate(comment => {
            const userId = comment.data()?.userId;
            return admin.firestore().doc(`Users/${userId}`).update({ commentCounter: admin.firestore.FieldValue.increment(1) })
        })

export const commentCounterOnDelete =
    functions.firestore.document('Posts/{postId}/Comments/{CommentId}')
        .onDelete(comment => {
            const commentData = comment.data();
            const userId = commentData?.userId;
            return admin.firestore().doc(`Users/${userId}`).update({ commentCounter: admin.firestore.FieldValue.increment(-1) })
        })

export const clappingCounter =
    functions.firestore.document('Posts/{postId}/Comments/{CommentId}')
        .onUpdate(comment => {
            const newCommentData = comment.after.data();
            const oldCommentData = comment.before.data();
            const newClapping = newCommentData?.clappings
            const oldClapping = oldCommentData?.clappings
            let oldClappingCount: number = 0, newClappingCount: number = 0, changeValue: number = 0;
            const userId = newCommentData?.userId

            Object.values(oldClapping).forEach((value) => {
                oldClappingCount += Number(value)
            })
            Object.values(newClapping).forEach((value) => {
                newClappingCount += Number(value)
            })

            if (newClappingCount > oldClappingCount) { changeValue = 1 }
            else if (newClappingCount < oldClappingCount) { changeValue = -1 }
            else { changeValue = 0 }

            return admin.firestore().doc(`Users/${userId}`).update({ clappingCounter: admin.firestore.FieldValue.increment(changeValue) })
        })

export const chatNotification =
    functions.firestore.document('Rooms/{roomId}/Messages/{msgId}')
        .onCreate(msg => {

            const msgData = msg.data();
            const senderId: string = msgData?.uid;
            let senderName: string = '';
            let receiverId: string = '';
            let receiverToken: string = '';
            const msgRef = msg.ref;
            const roomRef = msgRef.parent.parent;
            let payload: {};

            roomRef?.get().then(room => {
                const roomData = room.data();
                Object.keys(roomData?.users).forEach((key) => {
                    if (senderId != key) {
                        receiverId = key
                    }
                })
                return admin.firestore().doc(`Users/${receiverId}`).get().then(res => {
                    receiverToken = res.data()?.notification_token_id

                    admin.firestore().doc(`Users/${senderId}`).get().then(res => {
                        senderName = res.data()?.fullName

                        if (msgData?.msgtype == 0) {
                            payload = {
                                notification: {
                                    title: 'New mesage from ' + senderName,
                                    body: msgData?.msg
                                }
                            }
                        }
                        else {
                            payload = {
                                notification: {
                                    title: 'New file received from ' + senderName,
                                    body: msgData?.filename
                                }
                            }
                        }
                        return admin.messaging().sendToDevice(receiverToken, payload)
                    })
                })
            })
        })