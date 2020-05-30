import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

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
            var oldClappingCount: number = 0, newClappingCount: number = 0, changeValue: number = 0;
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