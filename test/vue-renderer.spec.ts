const mockVue = {}
jest.mock('vue', () => ({ __esModule: true, default: jest.fn(() => mockVue) }))
import { VueRenderer } from '../lib/vue-renderer'
import Vue from 'vue'
import * as faker from 'faker'
import { Actor } from 'tarant'

describe('VueRenderer', () => {
  it('should bind with vue in initialize', () => {
    const expectedData = { [faker.random.uuid()]: faker.random.uuid() }
    const expectedTemplate = faker.random.uuid()

    class TestActorWithMethod extends Actor {
      constructor() {
        super(faker.random.uuid())
      }

      public method(): void {
        return
      }

      data() {
        return expectedData
      }

      template() {
        return expectedTemplate
      }
    }

    const renderer = new VueRenderer()
    const fakeActorInstance: any = new TestActorWithMethod()
    fakeActorInstance.self = fakeActorInstance

    renderer.onInitialize(fakeActorInstance)
    expect(Vue).toBeCalledWith({
      data: { state: expectedData },
      el: `#${fakeActorInstance.id}`,
      render: expect.anything(),
      methods: {
        method: expect.anything(),
      },
    })
  })
})
