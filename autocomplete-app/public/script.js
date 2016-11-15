function clearDataList() {
  const list = document.getElementById('suggestions');

  Array.from(list.childNodes).forEach(node => {
    list.removeChild(node);
  });
}

function setDataList(optionValues) {
  const list = document.getElementById('suggestions');

  optionValues.forEach(word => {
    const optionNode = document.createElement('option');
    optionNode.value = word;
    list.appendChild(optionNode);
  });
}

function updateList(listValues) {
  clearDataList();
  setDataList(listValues);
}

function getData(elem, callback) {
  return function xhrCallback() {
    const xhr = new XMLHttpRequest();
    const inputStr = elem.value;
    if (inputStr.length < 3) {
      clearDataList();
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
// const submitButton = document.getElementById('submit');

const textInputNode = document.getElementById('autocomplete-field');
const clickHandler = getData(textInputNode, updateList);

textInputNode.addEventListener('input', clickHandler);
