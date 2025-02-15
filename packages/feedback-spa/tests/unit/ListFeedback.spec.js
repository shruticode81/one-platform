import { shallowMount } from '@vue/test-utils'
import ListFeedback from '@/components/ListFeedback.vue'

const input = {
  id: '5ffc6d4a4551527451c6db16',
  summary: 'hoho Testing the Feedback in demo',
  module: 'Mod APP',
  description: 'Lorem Ipsum',
  experience: 'Good',
  ticketUrl: 'https://github.com/Integration-Git/git/issues/208',
  state: 'OPEN',
  source: 'GITHUB',
  category: 'FEEDBACK',
  assignee: {
    name: null,
    email: null,
    url: null
  },
  createdBy: 'Rigin Oommen',
  createdOn: '2021-01-11T15:22:50.426Z',
  updatedOn: '2021-01-11T15:22:50.426Z'
}

describe('ListFeedback.vue', () => {
  it('renders property id when passed in ListFeedback', () => {
    const wrapper = shallowMount(ListFeedback, {
      propsData: {
        feedback: input
      }
    })
    expect(wrapper.vm.$props.feedback.id).toMatch(input.id)
  })

  it('renders property summary when passed in ListFeedback', () => {
    const wrapper = shallowMount(ListFeedback, {
      propsData: {
        feedback: input
      }
    })
    expect(wrapper.vm.$props.feedback.summary).toMatch(input.summary)
  })
})
