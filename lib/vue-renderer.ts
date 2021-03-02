import { Actor, ActorMessage, IMaterializer } from 'tarant'
import Vue from 'vue'

const toObject = (arr: any[]) =>
  arr.reduce((prev, cur) => {
    prev[cur.name] = cur.fn
    return prev
  }, {})

export class VueRenderer implements IMaterializer {
  public onInitialize(actor: Actor): void {
    const localActor = actor as any

    let data
    let template

    try {
      data = localActor.data()
      template = localActor.template()
    } catch (_) {
      return
    }

    if (typeof template !== 'string' || typeof data !== 'object') {
      return
    }

    const methods = Object.getOwnPropertyNames(localActor.constructor.prototype).filter(
      (key) => typeof localActor.constructor.prototype[key] === 'function' && key !== 'constructor',
    )

    localActor.__internals = localActor.__internals || {}
    localActor.__internals.vue = new Vue({
      data,
      el: `#${localActor.id}`,
      methods: toObject(methods.map((method) => ({ name: method, fn: localActor.self[method] }))),
      template,
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
