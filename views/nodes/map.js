function (doc) {
  if (doc.type=='node' && doc.longitude && doc.latitude) {
    emit(
      doc._id, 
      {
        id: doc._id,
        latlng: [doc.latitude, doc.longitude]
        /* add anything you need for displaying this item on the map */
      }
    );
  }
}
