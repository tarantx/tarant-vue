import { VueActor } from '../lib/vue-actor'
class TestActor extends VueActor {
  public template: string = '{{something}}'
  constructor() {
    super()
  }
}
describe('VueActor', () => {
  it('should have property for a template', () => {
    const actor = new TestActor()
    expect(actor).toBeInstanceOf(VueActor)
    expect(actor.template).toEqual('{{something}}')
  })
})
