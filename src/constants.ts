export const TOUCANTRICKLE_settings = '__TOUCANTRICKLE_settings';

export enum WidgetFlow {
  CheckoutFlow = 'toucantrickle-checkout-flow',
}

export enum WidgetTheme {
  Dark = 'dark',
  Light = 'light',
}

export enum ButtonSize {
  Small = 'small',
  Regular = '',
  Large = 'large',
}

export enum IframeEvents {
  styles = 'styles',
  close = 'close',
  redirect = 'redirect',
  successCheckout = 'successCheckout',
  successTopup = 'successTopup',
  settings = 'settings',
}

export enum ToucanTrickleEnvironment {
  development = 'development',
  internal = 'internal',
  testnet = 'testnet',
  production = 'production',
}

export enum ToucanTrickleDefaultChain {
  development = 'mumbai',
  internal = 'mumbai',
  testnet = 'mumbai',
  production = 'polygon',
}

export const ToucanTrickleAppUrl = {
  development: '//localhost:3000',
  internal: '',
  testnet: '//localhost:3000',
  production: '',
};

export interface CheckoutAction<P = unknown> {
  type: IframeEvents;
  payload: P;
}

export interface TopupAction<P = unknown> {
  type: IframeEvents;
  payload: P;
}
