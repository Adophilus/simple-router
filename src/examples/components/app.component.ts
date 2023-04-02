class AppComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "this is the app component"
  }
}

window.customElements.define('wc-app', AppComponent)

declare global {
  interface HTMLElementTagNameMap {
    "ws-app": AppComponent
  }
}

export default AppComponent
