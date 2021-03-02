import { Actor, ActorMessage, IMaterializer } from 'tarant'
import Vue from 'vue'

const toObject = (arr: any[]) =>
  arr.reduce((prev, cur) => {
    prev[cur.name] = cur.fn
    return prev
  }, {})
/* tslint:disable */
export class VueRenderer implements IMaterializer {
  public onInitialize (actor: Actor): void {
    const localActor = actor as any

    let data: any
    let template: (arg: any) => any

    try {
      data = localActor.data()
      template = localActor.template
    } catch (_) {
      return
    }

    if (typeof template !== 'function' || typeof data !== 'object') {
      return
    }

    const internalFunctions = ['data', 'template', 'constructor']
    const isInternalFunction = (key: string) => internalFunctions.includes(key)

    const allEvents = (props) =>
      Object.entries(props)
        .filter(([key]) => key.startsWith('on'))
        .map(([key, value]) => ({ [key.substr(2).toLowerCase()]: value }))
        .reduce((prev, newv) => ({ ...prev, ...newv }), {})

    const withoutEvents = (props) =>
      Object.entries(props)
        .filter(([key]) => !key.startsWith('on'))
        .reduce((prev, newv) => ({ ...prev, ...newv }), {})

    function createElementProxy (createElement) {
      return function (el, props, ...children) {
        const mappedProps = { attrs: withoutEvents(props || {}), on: allEvents(props || {}) }
        return createElement(el, mappedProps, children)
      }
    }

    const methods = Object.getOwnPropertyNames(localActor.constructor.prototype).filter(
      (key) => typeof localActor.constructor.prototype[key] === 'function' && !isInternalFunction(key)
    )

    localActor.__internals = localActor.__internals || {}
    localActor.__internals.vue = new Vue({
      data: { state: data },
      el: `#${localActor.id}`,
      methods: toObject(
        methods
          .filter((method) => localActor.self[method])
          .map((method) => {
            return { name: method, fn: localActor.self[method] }
          })
      ),
      render (createElement) {
        return template.call(this, createElementProxy(createElement))
      }
    })
  }

  public onBeforeMessage (actor: Actor, message: ActorMessage): void {
    //
  }

  public onAfterMessage (actor: Actor, message: ActorMessage): void {
    //
  }

  public onError (actor: Actor, message: ActorMessage, error: any): void {
    //
  }
}
