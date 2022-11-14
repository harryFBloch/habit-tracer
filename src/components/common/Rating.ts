import { InAppReview } from '@awesome-cordova-plugins/in-app-review';
import { Storage } from '@ionic/storage';

export const Rating = (callback: () => void) => {
    const store = new Storage();
    store.create()
    .then(() => {
      store.get('askedForRating')
      .then((askedForRating: string) => {
        console.log('askedForRating', askedForRating)
        if (!askedForRating) {
          store.set('askedForRating', true);
          InAppReview.requestReview()
          .then((res) => {
            console.log('rating', res);
          })
          .catch((error) => {
            console.log('error')
          })
        } else { }
        callback();
      })
      .catch((error: string) => {
        console.log('yo')
        callback()
      })
    })
    .catch((error: string) => {
      console.log('my')
      callback()
    })
  
}

export default Rating;