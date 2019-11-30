import { Actor, ActorMessage, IMaterializer } from 'tarant'
import Vue from 'vue'

const toObject = (arr: any[]) =>
  arr.reduce((prev, cur) => {
    prev[cur.name] = cur.fn
    return prev
  }, {})

export class VueRenderer implements IMaterializer {
  public onInitialize(baseActor: Actor): void {
    const actor = baseActor as any

    let data
    let template

    try {
      data = actor.data()
      template = actor.template()
    } catch (_) {
      return
    }

    if (typeof template !== 'string' || typeof data !== 'object') {
      return
    }

    const methods = Object.keys(actor.constructor.prototype).filter(
      key => typeof actor.constructor.prototype[key] === 'function',
    )

    actor.__internals = actor.__internals || {}
    actor.__internals.vue = new Vue({
      data: actor.data(),
      el: `#${actor.id}`,
      methods: toObject(methods.map(method => ({ name: method, fn: actor.self[method] }))),
      template: actor.template(),
    })
  }
  public onBeforeMessage(actor: Actor, message: ActorMessage): void {
    //
  }
  public onAfterMessage(actor: Actor, message: ActorMessage): void {
    //
  }
  public onError(actor: Actor, message: ActorMessage, error: any): void {
    //
  }
}
