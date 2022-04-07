export class EventHandler {

  onClick;
  onDblClick;
  onSwipe;
  onLeftSwipe;
  onRightSwipe;
  onUpSwipe;
  onDownSwipe;



  constructor(node = window.document.body) {
    this.node = node;

    // pointerCoords stores the coordinates of the pointer (single touch or mouse)
    this.pointerCoords = {
      previous: {
        x: 0,
        y: 0
      },
      current: {
        x: 0,
        y: 0
      }
    };

    this.addCommonListeners(); // common for all devices
    this.addTouchListeners();
    this.addMouseListeners();
    this.addKeyListeners();
  }
  
  handleEvent(e) {
    switch(e.type) {
      case 'click':
        this.handleClick(e);
        break;
        
      case 'dblclick':
        this.handleDblClick(e);
        break;
        
      case 'touchstart':
        this.handleTouchStart(e);
        break;
        
      case 'touchmove':
        this.handleTouchMove(e);
        break;
        
      case 'touchend':
      case 'touchcancel':
      case 'touchinterrupt':
        this.handleTouchEnd(e);
        break;
        
      case 'mousedown':
        this.handleMouseDown(e);
        break;
      
      case 'mousemove':
        this.handleMouseMove(e);
        break;
      
      case 'mouseup':
        this.handleMouseDown(e);
        break;
      
      case 'keydown':
        this.handleKeyDown(e);
        break;
      
      case 'keyup':
        this.handleKeyUp(e);
        break;
      
    }
  }

  addCommonListeners() {
    this.node.addEventListener('click', this);
    this.node.addEventListener('dblclick', this);
  }
  removeCommonListeners() {
    this.node.removeEventListener('click', this);
    this.node.removeEventListener('dblclick', this);
  }

  addTouchListeners() {
    this.node.addEventListener('touchstart', this);
    this.node.addEventListener('touchmove', this);
    this.node.addEventListener('touchend', this);
    this.node.addEventListener('touchcancel', this);
    this.node.addEventListener('touchinterrupt', this);
  }
  removeTouchListeners() {
    this.node.removeEventListener('touchstart', this);
    this.node.removeEventListener('touchmove', this);
    this.node.removeEventListener('touchend', this);
    this.node.removeEventListener('touchcancel', this);
    this.node.removeEventListener('touchinterrupt', this);
  }
  addMouseListeners() {
    this.node.addEventListener('mousedown', this);
    this.node.addEventListener('mousemove', this);
    this.node.addEventListener('mouseup', this);

  }
  removeMouseListeners() {
    this.node.removeEventListener('mousedown', this);
    this.node.removeEventListener('mousemove', this);
    this.node.removeEventListener('mouseup', this);

  }
  addKeyListeners() {
    this.node.addEventListener('keydown', this);
    this.node.addEventListener('keyup', this);
  }
  removeKeyListeners() {
    this.node.removeEventListener('keydown', this);
    this.node.removeEventListener('keyup', this);
  }
  
  handleClick(e) {
    e.preventDefault();
  }


  // For single touch and mouse events, we define corresponding pointer event handlers, which will handle a single pointer.
  // For two or more touches we define separate functions for each.

  handleTouchStart(e) {
    e.preventDefault();
    switch (e.targetTouches.length) {
      case 1:
        this.handlePointerDown(e.targetTouches[0]);
        break;
      case 2:
        this.handleDoubleTouchStart(e.targetTouches[0], e.targetTouches[1]);
        break;
    }
  }
  handleTouchMove(e) {
    e.preventDefault();
    switch (e.targetTouches.length) {
      case 1:
        this.handlePointerMove(e.targetTouches[0]);
        break;
      case 2:
        this.handleDoubleTouchMove(e.targetTouches[0], e.targetTouches[1]);
        break;
    }
  }

  handleTouchEnd(e) {
    e.preventDefault();
  }

  handleMouseDown(e) {
    e.preventDefault();
    this.handlePointerDown(e);
  }

  handleMouseMove(e) {
    e.preventDefault();
    this.handlePointerMove(e);
  }

  handleMouseUp(e) {
    e.preventDefault();
    this.handlePointerUp(e);
  }

  get offsetLeft() {
    return this.node.offsetLeft;
  }

  get offsetTop() {
    return this.node.offsetTop;
  }

  swapPointerCoords(x, y) {
    this.pointerCoords.previous.x = this.pointerCoords.current.x;
    this.pointerCoords.previous.y = this.pointerCoords.current.y;
    this.pointerCoords.current.x = x;
    this.pointerCoords.current.y = y;
  }



  handlePointerDown(e) {
    var x = e.clientX + this.offsetLeft;
    var y = e.clientY + this.offsetTop;
    this.swapPointerCoords(x, y);
  }
  handlePointerMove(e) {
    var x = e.clientX + this.offsetLeft;
    var y = e.clientY + this.offsetTop;
    this.swapPointerCoords(x, y);

    var x0 = this.pointerCoords.previous.x;
    var y0 = this.pointerCoords.previous.y;

    // Check if Swipe events are set and call them.

    if (this.onSwipe) {
      this.onSwipe();
    }

    if (this.onRightSwipe) {
      if (x > x0) {
        //Right swipe
        this.onRightSwipe();
      }
    }
    if (this.onLeftSwipe) {
      if (x < x0) {
        //Left swipe
        this.onLeftSwipe();
      }
    }
    if (this.onUpSwipe) {

      if (y < y0) {
        //Up swipe
        this.onUpSwipe();
      }
    }
    if (this.onDownSwipe) {
      if (y > y0) {
        //Down swipe
        this.onDownSwipe();

      }
    }
  }

  handlePointerUp(e) {}

}