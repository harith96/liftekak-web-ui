export default class DocPagination {
  previousPagesFirstDocs = [];

  currentPageLastDoc = null;

  updatePagination(docs) {
    const [firstDoc] = docs;

    if (firstDoc.data().rideId !== this.previousPagesFirstDocs[this.previousPagesFirstDocs.length - 1]?.data().rideId)
      this.previousPagesFirstDocs.push(firstDoc);

    this.currentPageLastDoc = docs[docs.length - 1];
  }

  getPreviousPageFirstDoc() {
    const prevFirstDoc =
      this.previousPagesFirstDocs.length > 1
        ? this.previousPagesFirstDocs[this.previousPagesFirstDocs.length - 2]
        : this.previousPagesFirstDocs[0];

    this.previousPagesFirstDocs.pop();

    return prevFirstDoc;
  }

  reset() {
    this.currentPageLastDoc = null;
    this.previousPagesFirstDocs.length = 0;
  }
}
