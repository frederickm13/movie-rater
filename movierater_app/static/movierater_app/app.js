"use strict";
import { SearchForm } from './components/SearchForm.js';


document.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
    ReactDOM.render(
        React.createElement(SearchForm),
        document.querySelector("#app")
    );
}