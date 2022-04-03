const transactionService = {
    findByUser: user => {
        return firebase.firestore()
            .collection('transactions')
            .where('user.uid', '==', user.uid)
            .orderBy('date', 'desc')
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
            })
    },
    findByUid: uid => {
        return firebase.firestore()
            .collection("transactions")
            .doc(uid)
            .get()
            .then(doc => {
                return doc.data();
            })
    },
    remove: transaction => {
        return firebase.firestore()
            .collection("transactions")
            .doc(transaction.uid)
            .delete();
    },
    save: transaction => {
        return firebase.firestore()
            .collection('transactions')
            .add(transaction);
    },
    update: transaction => {
        return firebase.firestore()
            .collection("transactions")
            .doc(getTransactionUid())
            .update(transaction);
    }
}