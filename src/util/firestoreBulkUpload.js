import { doc, getFirestore, setDoc, writeBatch } from '@firebase/firestore';
import _ from 'lodash';

import cities from '../data/cities.json';

export default async function (collectionPath) {
  const db = getFirestore();
  console.log('upload cities');

  _.chain(cities)
    .chunk(400)
    .forEach(async (chunk) => {
      //   console.log(chunk);
      const batch = writeBatch(db);

      _.forEach(
        chunk,
        ({
          id,
          district_id = '',
          name_en = '',
          name_si = '',
          name_ta = '',
          postcode = '',
          latitude = '',
          longitude = '',
        }) =>
          batch.set(
            doc(db, collectionPath, id),
            { id, district_id, name_en, name_si, name_ta, details: { postcode, location: { latitude, longitude } } },
            { merge: true }
          )
      );

      console.log('upload batch');
      await batch.commit();

      console.log('batch uploaded successfully');
    })
    .value();
}
