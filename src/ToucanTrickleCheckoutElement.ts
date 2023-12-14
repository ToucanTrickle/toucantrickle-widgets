import {css, html, LitElement} from 'lit';
import clsx from 'clsx';
import {customElement, property, query} from 'lit/decorators.js';

import {
  CheckoutAction,
  ToucanTrickleEnvironment,
  // ToucanTrickleDefaultChain,
  ToucanTrickleAppUrl,
  IframeEvents,
  WidgetFlow,
  TOUCANTRICKLE_settings,
  WidgetTheme,
  ToucanTrickleDefaultChain,
} from './constants';
import {appendStyle} from './utils';

@customElement('toucantrickle-checkout')
export class ToucanTrickleCheckoutElement extends LitElement {
  static styles = css`
    iframe {
      width: 480px;
      height: 610px;
      border: 1px solid gray;
      border-radius: 15px;
    }
    .dark-theme {
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 30px rgba(255, 255, 255, 0.06);
    }
  `;

  @property()
  environment: ToucanTrickleEnvironment = ToucanTrickleEnvironment.testnet;

  @property()
  chains: string = '';

  @property()
  provider: string;

  @property()
  plan: string;

  @property()
  ref: string;

  @property()
  mode: WidgetFlow = WidgetFlow.CheckoutFlow;

  @property()
  theme: WidgetTheme;

  connectedCallback() {
    super.connectedCallback();
    if (this.mode === WidgetFlow.CheckoutFlow && !this.plan)
      throw new Error("plan is required attribute in 'toucantrickle-checkout-flow' mode");

    window.addEventListener('message', (event) => this.handleMessage(event));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage(event: MessageEvent<CheckoutAction>) {

    const action = event.data;
    this.dispatchEvent(new CustomEvent(action.type, {detail: event.data, bubbles: true, composed: true}));

    if (action.type === IframeEvents.styles) {
      appendStyle(this.iframe, action.payload as Record<string, string>);
    }

    if (action?.type === IframeEvents.settings) {
      const payload = action.payload as string;
      localStorage.setItem(TOUCANTRICKLE_settings, payload);
    }

    if (action?.type === IframeEvents.close) {
      this.requestUpdate();
    }

    if (action?.type === IframeEvents.successCheckout) {
      this.requestUpdate();
    }
  }

  @query('#toucantrickle-checkout-iframe')
  iframe!: HTMLIFrameElement;

  render() {
    const source =
      ToucanTrickleAppUrl[this.environment] +
      '/subscribers?provider=' + 
      this.provider +
      '&plan=' +
      this.plan +
      '&chain=' +
      (this.chains || ToucanTrickleDefaultChain[this.environment]) // +
      '&ref=' +
      this.ref;
    return html`<iframe
      class="${clsx({'dark-theme': this.theme === WidgetTheme.Dark})}"
      id="toucantrickle-checkout-iframe"
      title="ToucanTrickle Checkout Widget"
      src="${source}"
    ></iframe> `;
  }
}
