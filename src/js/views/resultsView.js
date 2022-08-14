import View from './view';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class ResultsView extends View {
  _errorMessage = 'No recipes found for your query. Please try again!';
  _parentElement = document.querySelector('.results');
  _generateMarkup() {
    return this._data.map(resu => previewView.render(resu, false)).join(' ');
  }
}
export default new ResultsView();
