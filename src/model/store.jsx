const db = firebase.firestore();
const userId = 'UserID1234'; // Example user ID

// Add a new conversation to the user's document
const newConversation = {

  messages: [{bot:'Hello there human', user:'Hi there Mr Robot'}],
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
};

// Update the user document with the new conversation
db.collection('users').doc(userId).update({
  Conversations: firebase.firestore.FieldValue.arrayUnion(newConversation)
}).then(() => {
  console.log('Conversation added!');
}).catch(error => {
  console.error('Error adding conversation: ', error);
});
