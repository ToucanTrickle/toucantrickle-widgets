import React from 'react';
import {createComponent} from '@lit/react';
import { ToucanTrickleCheckoutButtonElement } from './ToucanTrickleCheckoutButtonElement';

export const ToucanTrickleCheckoutButtonReact = createComponent({
  tagName: "toucantrickle-checkout-button",
  elementClass: ToucanTrickleCheckoutButtonElement,
  react: React,
  events: {
    onClose: 'close',
    onSuccess: 'successSubscription'
  }
})