/* global OriDomi */

// Get ref to input node
const textInputNode = document.getElementById('data-input');

// Create folding list object
const folded = new OriDomi('#origami', {
  hPanels: 10,
  ripple: true,
  shading: 'hard',
  speed: 1000,
  maxAngle: 70,
  perspective: 800,
  touchEnabled: false,
});

// Set folding list to collapsed
folded.collapse('top');

// Remove child nodes from given DOMElement
function removeChildNodes(domElement) {
  Array.from(domElement.childNodes).forEach(node => {
    domElement.removeChild(node);
  });
}

// Call modifyContent method to removeChildNodes on all panels
function clearAllPanels() {
  folded.modifyContent(removeChildNodes);
}

// Create callback function with specified input element and a callback function injected
function getData(input, callback) {
  return function xhrCallback() {
    const xhr = new XMLHttpRequest();
    const inputStr = input.value;
    if (inputStr.length < 3) {
      clearAllPanels();
      folded.collapse('top');
      return;
    }
    xhr.onreadystatechange = function onReadyStateChange() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = xhr.responseText.split('\n');
        callback(response);
      }
    };
    xhr.open('GET', `/api/words?match=${inputStr}`);
    xhr.send();
  };
}

// Create list of fold divs for each word provided
function createWordList(domElement, words) {
  words.forEach(word => {
    const childNode = document.createElement('div');
    childNode.className = 'fold';
    childNode.textContent = word;
    // eslint-disable-next-line no-use-before-define
    childNode.addEventListener('click', setTextInput(word));
    domElement.appendChild(childNode);
  });
}

// Update all panels with words provided
function updateAllPanels(words) {
  // Return if current text doesn't match fragment of first word in returned words list
  const firstMatchFragment = words[0].slice(0, textInputNode.value.length).toLowerCase();
  if (firstMatchFragment !== textInputNode.value.toLowerCase()) return;

  folded.modifyContent((domElement) => {
    removeChildNodes(domElement);
    createWordList(domElement, words);
  });
  folded.accordion('top');
}

// Create clickHandler function with textInputNode and updateAllPanels callback injected
const clickHandler = getData(textInputNode, updateAllPanels);

// Set text input and then request updated data from server
const setTextInput = (word) => () => {
  textInputNode.value = word;
  clickHandler();
};

// Register event listener on content input
textInputNode.addEventListener('input', clickHandler);
