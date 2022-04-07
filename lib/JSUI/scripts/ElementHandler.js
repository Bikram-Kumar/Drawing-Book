export class ElementHandler {

  constructor(parentNode = window.document.body) {
    this.parentNode = parentNode;
    this.elementPositionType = (this.parentNode === window.document.body) ? "fixed": "absolute";
    this.createDialogBox();
    this.createLoadingBuffer();
  }
  
  createDialogBox() {
    //defined below
  }

  displayDialogBox() {
    this.dialogBox.parentNode.classList.remove('hidden');
  }

  hideDialogBox() {
    this.dialogBox.parentNode.classList.add('hidden');
  }

  alert(message, callback) {
    //defined below
  }
  

  prompt(labelText, inputType, callback) {
    //defined below
  }
  
  confirm(message, callback) {
    //defined below
  }

  formInput(form, callback) {
    //defined below
  }

  createLoadingBuffer() {
    //defined below
  }

  showLoadingBufferPopUp(color = "#0d63d2") {
    
    this.loadingBuffer.parentNode.style.opacity = '0';
    this.loadingBuffer.children[0].style.borderTopColor = color;
    this.loadingBuffer.parentNode.classList.remove("hidden");
    
  }

  hideLoadingBufferPopUp() {
    this.loadingBuffer.parentNode.classList.add("hidden");
  }

  showLoadingBufferPage(color = "#0d63d2") {
    this.loadingBuffer.parentNode.style.opacity = '1';
    this.loadingBuffer.children[0].style.borderTopColor = color;
    this.loadingBuffer.parentNode.classList.remove("hidden");
  }

  hideLoadingBufferPage() {
    this.loadingBuffer.parentNode.classList.add("hidden");
  }
}


ElementHandler.prototype.createDialogBox = function() {

  var background = window.document.createElement('div');
  var dialogBox = window.document.createElement('div');
  var okButton = window.document.createElement('button');
  var cancelButton = window.document.createElement('button');

  background.classList.add("position-center", "hidden");
  dialogBox.classList.add("position-absolute", "position-center");
  // cancelButton is hidden by default. Make it visible only where needed, e.g. confirm dialog box.
  cancelButton.classList.add("hidden");

  background.style.cssText = `
  position: ${this.elementPositionType};
  width: 100%;
  height: 100%;
  background: #000000c1;
  z-index: 101;
  `;
  dialogBox.style.cssText = `
  max-width:480px;
  width: 90%;
  background: #f2f6f7;
  border-radius: 5px;
  padding: 10px;
  `;
  okButton.style.cssText = `
  margin-top: 16px;
  float: right;
  background: #294ca1;
  color: #ffffff;
  width: 4rem;
  height: 2rem;
  border: none;
  border-radius: 1rem;
  `;
  cancelButton.style.cssText = `
  margin-top: 16px;
  float: left;
  background: #ce3131;
  color: #ffffff;
  width: 4rem;
  height: 2rem;
  border: none;
  border-radius: 1rem;
  `;

  okButton.innerText = 'OK';
  cancelButton.innerText = 'Cancel';

  dialogBox.appendChild(cancelButton);
  dialogBox.appendChild(okButton);
  background.appendChild(dialogBox);
  this.parentNode.appendChild(background);

  this.dialogBox = dialogBox;
  this.dialogBoxSubmitButton = okButton;
  this.dialogBoxCancelButton = cancelButton;

}

ElementHandler.prototype.alert = function(message, callback) {
  var p = window.document.createElement('p');
  p.innerHTML = message;
  p.style.marginBottom = '0px';

  this.dialogBoxSubmitButton.onclick = () => {
    this.hideDialogBox();
    this.dialogBox.removeChild(p);
    callback();
  };

  this.dialogBox.prepend(p);
  this.displayDialogBox();

}

ElementHandler.prototype.createLoadingBuffer = function() {
  /***************************************************************************************************
  ★ We create three divs, background, box and the buffer.
  ★ When showLoadingBufferPopUp is called, the background visibility will be hidden
  so that it will show only the box, while blocking user input
  ★ When showLoadingBufferPage is called the background will be visible (solid) so that the page gets filled.
  ***************************************************************************************************/
  var background = window.document.createElement('div');
  var loadingBufferBox = window.document.createElement('div');
  var loadingBuffer = window.document.createElement('div');

  background.classList.add("hidden");
  loadingBufferBox.classList.add("position-center");
  loadingBuffer.classList.add("loading-buffer");

  background.style.cssText = `
  position: ${this.elementPositionType};
  background: #ffffff;
  width: 100%;
  height: 100%;
  z-index: 100;
  `;

  loadingBufferBox.style.cssText = `
  position: absolute;
  background: #ffffff;
  max-width:480px;
  max-height:320px;
  width: 10rem;
  height: 5rem;
  padding: 20px;
  border-radius: 5px;
  `;

  loadingBufferBox.appendChild(loadingBuffer);
  background.appendChild(loadingBufferBox);
  this.parentNode.appendChild(background);

  this.loadingBuffer = loadingBufferBox;
}

ElementHandler.prototype.prompt = function(labelText, inputType, callback) {

  var label = window.document.createElement('label');
  var input = window.document.createElement('input');
  label.innerHTML = labelText;
  input.type = inputType;
  
  input.classList.add('position-relative', 'position-centerX');
  label.style.display = 'block';
  input.style.display = 'block';
  input.style.marginTop = '16px';
  
  

  this.dialogBoxSubmitButton.onclick = () => {
    this.dialogBox.removeChild(label);
    this.dialogBox.removeChild(input);
    this.hideDialogBox();
    
    callback(input.value);
  }
  this.dialogBox.prepend(label, input);
  this.displayDialogBox();

}

ElementHandler.prototype.confirm = function (message, callback) {
  var p = window.document.createElement('p');
  p.innerHTML = message;
  p.style.marginBottom = '0px';
  this.dialogBoxSubmitButton.onclick = () => {
    callback(true);
    this.dialogBoxCancelButton.classList.add('hidden');
    this.hideDialogBox();
    this.dialogBox.removeChild(p);
  };
  this.dialogBoxCancelButton.onclick = () => {
    callback(false);
    this.dialogBoxCancelButton.classList.add('hidden');
    this.hideDialogBox();
    this.dialogBox.removeChild(p);
  };

  this.dialogBox.prepend(p);
  this.dialogBoxCancelButton.classList.remove('hidden');
  this.displayDialogBox();

}

ElementHandler.prototype.formInput = function (formData, callback) {
  var form = window.document.createElement('form');
  form.innerHTML = formData;
  form.classList.add('position-relative', 'position-centerX');
  form.style.display = 'block';
  form.style.marginTop = '16px';
  
  this.dialogBoxSubmitButton.onclick = () => {
    this.dialogBox.removeChild(form);
    this.hideDialogBox();
  }
  this.dialogBox.prepend(form);
  this.displayDialogBox();


}