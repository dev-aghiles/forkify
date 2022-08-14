class SearchView {
  _parentElement = document.querySelector('.search');
  _clearInput() {
    return (this._parentElement.querySelector('.search__field').value = '');
  }
  getQuery() {
    const inputValue =
      this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return inputValue;
  }

  addHandlerListner(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
