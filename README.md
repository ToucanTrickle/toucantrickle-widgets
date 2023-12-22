# Overview

The repo contains the ToucanTrickle Protocol buttons/widgets that can be integrated into your website. This includes a
checkout button that can be used to provide simple signup experience as well as a top-up button that can be added
to your app/website to allow users to ensure they maintain a healthy toucanTrickle balance.

# Installation

To install the stable version:

```
npm install --save @toucantrickle/toucantrickle-widgets
```

or using yarn:

```
yarn add @toucantrickle/toucantrickle-widgets
```

# Usage

Add this import to starting point of your project such as: index.js or index.ts files

```ts
import '@toucantrickle/toucantrickle-widgets';
```

Or add this script tag at the starting of the project
```html
<script>https://cdn.jsdelivr.net/npm/@toucantrickle/toucantrickle-widgets@1.0.0/dist/index.js</script>
```

Create a `<toucantrickle-checkout-button/>` element with required attributes mentioned below.

```html
<toucantrickle-checkout-button
  class="toucantrickle-checkout-button"
  environment="production"
  chains="polygon,avalanche"
  provider="0x...."
  plan="123456"
  onClose="close"
  onSuccess="success"
  label="Checkout with Crypto"
></toucantrickle-checkout-button>
```

### Attributes:

| name       | Required |                                                                                                        Description |
|------------|:--------:|-------------------------------------------------------------------------------------------------------------------:|
| class      |          |                                                                                                CSS classes to add. |
| environment |          |                                 Environment. Possible values: `testnet` or `production`. Defaults to `production`. |
| chains     |          | List of chains a subscription can be created on. Ensure the same plans exist on all chains. Defaults to `polygon`. |
| provider   |    ✔     |                                                                                      Your provider wallet address. |
| plan       |    ✔     |                                                                                                 Your ToucanTrickle plan id. |
| label      |          |                                                                                      Message to put on the button. |
| ref        |          |                                                 Include a custom value associated with the ToucanTrickle subscription data. |
| size       |          |                                 Button size. Possible values:`regular`, `large` or `small`. Defaults to `regular`. |
| theme      |          |                                              Widget theme. Possible values: `dark` or `light`. Defaults to `dark`. |
| redirect   |          |                         Redirect to URL upon successful subscribe. Does not call `onSuccess` handler, if supplied. |
| onClose    |          |                                                                                        Callback for `close` event. |
| onSuccess  |          |                                                                          Callback for `successSubscription` event. |

### Events:

| name                |                        Description |
| ------------------- | ---------------------------------: |
| close               |          Fires after widget closes |
| successSubscription | Fires when user subscribes to plan |

### Multi Chain:

The ToucanTrickle protocol has been deployed on a number of EVM chains, and additional chains will be supported in the future. For the 
checkout widget to support multiple chains, the provider must have deployed the exact same set of plans/discounts on each
chain in which they support. Once that is done, the widget needs to be told which chains to support via the `chains`
attribute. The value is a comma separate list of the following chains:

Production Environment:
* polygon
* avalanche
* fantom
* celo
* aurora
* moonbeam
* gnosis

Testnet Environment:
* mumbai
* fuji
* celo_alfajores


### Styling:

`toucantrickle-checkout-button` uses [Shadow CSS ::part](https://github.com/fergald/docs/blob/master/explainers/css-shadow-parts-1.md) spec. It has button inside defined as `button` part
![img.png](docs/button_part.png)

```html
<style>
  .toucantrickle-checkout-button::part(button) {
    background-color: aqua;
    width: 100%; /* Those styles apply to button in shadow root */
  }
</style>
<toucantrickle-checkout-button
  class="toucantrickle-checkout-button"
  label="Pay with Crypto"
/>
```

See more about `::part()` on https://developer.mozilla.org/en-US/docs/Web/CSS/::part
