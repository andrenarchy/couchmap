function (doc) {
  if (doc.type=='node' && doc.longitude && doc.latitude) {
    emit(
      { type: "Point", coordinates: [doc.longitude, doc.latitude] }, 
      {
        id: doc._id,
        latlng: [doc.latitude, doc.longitude]
        /* add anything you need for displaying this item on the map */
      }
    );
  }
}
