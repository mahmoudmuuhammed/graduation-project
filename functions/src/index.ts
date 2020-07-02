import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const videoCallNotification =
    functions.firestore.document('videoCallNotification/{notificaionID}')
        .onCreate((msgData) => {
            const message = msgData.data();
            const receiverMsgToken = message?.receiverMsgToken;
            const clickAction: string = 'VideoChatActivity'

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
            if (notificationData?.message == 'has commented on your post') {
                const recieverRef = notification.ref;
                const recieverUserRef = recieverRef.parent.parent;
                recieverUserRef?.get().then((user) => {
                    const userData = user.data();
                    const recieverMsgToken = userData?.notification_token_id
                    const payload = {
                        notification: {
                            title: 'new comment on your post',
                            body: 'from ' + notificationData?.from_full_name
                        }
                    }
                    return admin.messaging().sendToDevice(recieverMsgToken, payload)
                }).catch((err) => console.log(err))
            }
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
                // .then(() => {
                //     let userId
                //     Object.keys(newClapping).forEach((newKey) => {
                //         if (!oldClapping.hasOwnProperty(newKey)) {
                //             userId = newKey;
                //         }
                //     })

                //     console.log(userId)
                //     return admin.firestore().doc(`Users/${userId}`).get().then(votter => {
                //         let votterData = votter.data();

                //         admin.firestore().collection(`Users/${oldCommentData?.userID}/Notification`).add({
                //             createdTime: Date.now(),
                //             from: votterData?.uid,
                //             from_full_name: votterData?.fullName,
                //             message: `clapped on your comment`,
                //             read: false
                //         })
                //             .then(ref => {
                //                 admin.firestore().doc(`Users/${oldCommentData?.userID}/Notification/${ref.id}`).update({
                //                     n_id: ref.id
                //                 })

                //                 admin.firestore().doc(`Users/${oldCommentData?.userID}`).get().then(poster => {
                //                     let payload = {
                //                         notification: {
                //                             title: `clapped on your comment`,
                //                             body: ` ${votterData?.fullName}`
                //                         }
                //                     }
                //                     admin.messaging().sendToDevice(poster.data()?.notification_token_id, payload)
                //                 })
                //             })

                //     })

                // })
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
                                data: {
                                    toUid: res.data()?.uid
                                },
                                notification: {
                                    title: 'New mesage from ' + senderName,
                                    body: msgData?.msg,
                                    click_action: 'ChatActivity'
                                }
                            }
                        }
                        else {
                            payload = {
                                data: {
                                    toUid: receiverId
                                },
                                notification: {
                                    title: 'New file received from ' + senderName,
                                    body: msgData?.filename,
                                    click_action: 'ChatActivity'
                                }
                            }
                        }
                        return admin.messaging().sendToDevice(receiverToken, payload)
                    })
                })
            })
        })


export const emrgencyNotification =
    functions.firestore.document('Trusted_Alert/{id}')
        .onCreate(alert => {

            let promises: any[] = []
            const alertData = alert.data();
            const userId: string = alertData?.userId;
            let ReceiverData: any;

            return admin.firestore().doc(`Users/${userId}`).get().then(sender => {
                let trustedUsers = sender.data()?.trusted

                trustedUsers.forEach((trustedUserId: string) => {

                    admin.firestore().collection(`Users/${trustedUserId}/Notification`).add({
                        createdTime: Date.now(),
                        from: userId,
                        from_full_name: sender.data()?.fullName,
                        message: `was in danger contact him`,
                        emergencyId:alertData?.emergencyId,
                        read: false
                    }).then(ref => {
                        admin.firestore().doc(`Users/${trustedUserId}/Notification/${ref.id}`).update({
                            n_id: ref.id
                        })
                    })

                    promises.push(
                        admin.firestore().doc(`Users/${trustedUserId}`).get().then(receiver => {

                            ReceiverData = receiver.data();
                            let payload = {
                                data: {
                                    longitude: alertData?.userLongitude,
                                    latitude: alertData?.userLatitude,
                                    userId: alertData?.userId
                                },
                                notification: {
                                    title: `${sender.data()?.fullName} in danger`,
                                    body: 'contact with him now',
                                }
                            }

                            admin.messaging().sendToDevice(ReceiverData?.notification_token_id, payload)
                        })
                    )
                })
                return Promise.all(promises)

            })

        })

export const votingNotification =
    functions.firestore.document('Posts/{postId}')
        .onUpdate(post => {

            const newPostData = post.after.data();
            const oldPostData = post.before.data();
            const newVotes = newPostData?.upVotes
            const oldVotes = oldPostData?.upVotes
            let userId;

            Object.keys(newVotes).forEach((newKey) => {
                if (!oldVotes.hasOwnProperty(newKey)) {
                    userId = newKey;
                }
            })

            return admin.firestore().doc(`Users/${userId}`).get().then(votter => {
                let votterData = votter.data();

                admin.firestore().collection(`Users/${oldPostData?.userID}/Notification`).add({
                    createdTime: Date.now(),
                    from: votterData?.uid,
                    from_full_name: votterData?.fullName,
                    message: `votted on yout post`,
                    read: false
                })
                    .then(ref => {
                        admin.firestore().doc(`Users/${oldPostData?.userID}/Notification/${ref.id}`).update({
                            n_id: ref.id
                        })

                        admin.firestore().doc(`Users/${oldPostData?.userID}`).get().then(poster => {
                            let payload = {
                                notification: {
                                    title: `new vote on your post`,
                                    body: ` from ${votterData?.fullName}`
                                }
                            }
                            admin.messaging().sendToDevice(poster.data()?.notification_token_id, payload)
                        })
                    })

            })

        })