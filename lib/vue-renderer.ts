import { ActorMessage, IMaterializer } from 'tarant'
import Vue from 'vue'
import { VueActor } from './vue-actor'

export class VueRenderer implements IMaterializer {
  public onInitialize(actor: VueActor): void {
    // tslint:disable-next-line:no-unused-expression
    new Vue({
      data: actor,
      el: actor.id,
      template: actor.template,
    })
  }
  public onBeforeMessage(actor: VueActor, message: ActorMessage): void {
    //
  }
  public onAfterMessage(actor: VueActor, message: ActorMessage): void {
    //
  }
  public onError(actor: VueActor, message: ActorMessage, error: any): void {
    //
  }
}
