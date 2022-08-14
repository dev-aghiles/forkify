import previewView from './previewView';
import View from './view';

class BookmarksView extends View {
  _errorMessage = 'No Bookmarks yet. Find a nice recipe and bookmark it!';
  _parentElement = document.querySelector('.bookmarks__list');
  addHandlerBookmarks(hander) {
    window.addEventListener('load', hander);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join(' ');
  }
}

export default new BookmarksView();
