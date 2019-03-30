import { Actor } from 'tarant'
export abstract class VueActor extends Actor {
  public abstract readonly template: () => string
  // tslint:disable-next-line
  private readonly __isVueActor: boolean = true
}
