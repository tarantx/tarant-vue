import { Actor, ActorMessage } from 'tarant'
import Vue from 'vue'
import { VueActor } from './vue-actor'

const toObject = (arr: any[]) =>
  arr.reduce((prev, cur) => {
    prev[cur.name] = cur.fn
    return prev
  }, {})

export class VueRenderer {
  public async onInitialize(baseActor: Actor): Promise<void> {
    const actor = baseActor as VueActor
    const actorAsAny = actor as any
    const template = await (actor as any).template()
    const data = await (actor as any).data()
    const filterList = ['constructor', "data", "template"]
    const methods = (Object as any).entries(data.constructor.prototype).filter(
        (entry: any) => {
            return !(filterList as any).includes(entry[0])
        }
      ).reduce((accumulator: any, method: any) => {
            accumulator[method[0]]=method[1]
            return accumulator
      }, {})
    actorAsAny.__internals = actorAsAny.__internals || {}
    actorAsAny.__internals.vue = new Vue({
      data,
      el: `#${actor.id}`,
      methods,
      template,
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
