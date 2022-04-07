export class UI_StylesManager {
  
  static injectAllStyles() {
    this.injectPositioningStyles();
    this.injectUIElementStyles();
  }
  
  static injectPositioningStyles() {
    this.injectStylesheet("../stylesheets/positioning-styles.css");
  }
  
  static injectUIElementStyles() {
    this.injectStylesheet("../stylesheets/ui-element-styles.css");
  }
  
  static injectStylesheet(src) {
    var link = window.document.createElement('link');
    link.rel = "stylesheet";
    link.href = import.meta.url.replace("UI_StylesManager.js", "") + src;
    link.type = "text/css";
    link.media = "all";
    window.document.head.appendChild(link);
  }
  
}