import { ActorMessage } from 'tarant'
import Vue from 'vue'
import { VueActor } from './vue-actor'

const toObject = (arr: any[]) =>
  arr.reduce((prev, cur) => {
    prev[cur.name] = cur.fn
    return prev
  }, {})

export class VueRenderer {
  public onInitialize(actor: VueActor): void {
    const methods = Object.keys(actor.constructor.prototype).filter(
      key => typeof actor.constructor.prototype[key] === 'function',
    )

    const actorAsAny = actor as any
    actorAsAny.__internals = actorAsAny.__internals || {}
    actorAsAny.__internals.vue = new Vue({
      data: actor,
      el: `#${actor.id}`,
      methods: toObject(methods.map(method => ({ name: method, fn: actorAsAny.self[method] }))),
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
