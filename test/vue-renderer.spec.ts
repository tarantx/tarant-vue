const mockVue = {}
jest.mock('vue', () => ({ __esModule: true, createApp: jest.fn(() => mockVue) }))
import { VueRenderer } from '../lib/vue-renderer'
import { createApp } from 'vue'
import { faker } from '@faker-js/faker'
import { Actor } from 'tarant'

describe('VueRenderer', () => {
  it('should bind with vue in initialize', () => {
    const expectedData = { [faker.datatype.uuid()]: faker.datatype.uuid() }
    const expectedTemplate = faker.datatype.uuid()

    class TestActorWithMethod extends Actor {
      constructor() {
        super(faker.datatype.uuid())
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
    expect(createApp).toBeCalledWith({
      data: expect.anything(),
      el: `#${fakeActorInstance.id}`,
      render: expect.anything(),
      methods: {
        method: expect.anything(),
      },
    })
  })
})
