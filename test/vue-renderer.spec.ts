const mockVue = {}
jest.mock('vue', () => ({default: jest.fn(() => mockVue)}))
import { VueRenderer } from "../lib/vue-renderer"
import { VueActor } from "../lib/vue-actor"
import Vue from 'vue'
import * as faker from "faker"

describe('VueRenderer', () => {
    it('should bind with vue in initialize', () => {
        const fakeActor = jest.fn<VueActor>(() => ({
            id: faker.random.uuid(),
            template: faker.random.uuid()
        }))
        const renderer = new VueRenderer()
        const fakeActorInstance = new fakeActor()
        
        renderer.onInitialize(fakeActorInstance)
        expect(Vue).toBeCalledWith({
            data: fakeActorInstance,
            el: fakeActorInstance.id,
            template: fakeActorInstance.template
        })
    })
})
