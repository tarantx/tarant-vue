# ![logomakr_3zswgm](https://user-images.githubusercontent.com/3071208/50431626-dfd3f180-0891-11e9-9e18-d50539670810.png)

## Motivation

Provide the capabilities to actors to be render using the vue framework.

## Installation

add it to your project using `npm install tarant-vue --save` or `yarn add tarant-vue`

## Usage

Extend the vue actor with a template and the properties to bind to the id of the actor will relate to the html component id

```js
import { VueActor } from "../Models/VueActor";

export default class AppActor extends VueActor {
    constructor() {
      super("#app")
      this.schedule(1000, this.incrementCounter, [])
    }
  
    private incrementCounter(): void {
      this.counter++;
    }

    private counter = 0; 
    readonly template : string = "<div>counter: {{counter}}</div>"
}
```

Initialize the actor system with the provided materializer
```js
import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import AppActor from './Actor/AppActor';
import { VueRenderer } from './Models/VueRenderer';

window.onload = () => {
  const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
  .withMaterializer(new VueRenderer())
  .done())  
  system.actorOf(AppActor)
}
```
##### Created my free [logo](https://logomakr.com/3zsWGM) at <a href="http://logomakr.com" title="Logo Makr">LogoMakr.com</a> 