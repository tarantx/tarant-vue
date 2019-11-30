const mockVue = {}
jest.mock('vue', () => ({ __esModule: true, default: jest.fn(() => mockVue) }))
import { VueRenderer } from '../lib/vue-renderer'
import Vue from 'vue'
import * as faker from 'faker'
import { Actor } from 'tarant'

class TestActorWithMethod extends Actor {
  public method(): void {
    return
  }
}

describe('VueRenderer', () => {
  it('should bind with vue in initialize', () => {
    const expectedData = { [faker.random.uuid()]: faker.random.uuid() }
    const expectedTemplate = faker.random.uuid()
    const fakeActor = jest.fn<TestActorWithMethod>(() => ({
      id: faker.random.uuid(),
      data: () => expectedData,
      template: () => expectedTemplate,
    }))
    const renderer = new VueRenderer()
    const fakeActorInstance: any = new fakeActor()

    renderer.onInitialize(fakeActorInstance)
    expect(Vue).toBeCalledWith({
      data: expectedData,
      el: `#${fakeActorInstance.id}`,
      template: expectedTemplate,
      methods: {
        method: fakeActorInstance.method,
      },
    })
  })
})
