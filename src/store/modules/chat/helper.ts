import { ss } from '@/utils/storage'

const LOCAL_NAME = 'chatStorage'

export function defaultState(): Chat.ChatState {
  const uuid = 1002
  return {
    active: uuid,
    usingContext: true,
    history: [{ uuid, title: 'New Chat', isEdit: false, modal: '' }],
    chat: [{ uuid, data: [] }],
  }
}

export function getLocalState(): Chat.ChatState {
  const localState = ss.get(LOCAL_NAME)
  const newHistorys = localState?.history.map((item: Chat.History) => {
    const chat = localState.chat.find((i: any) => i.uuid === item.uuid)
    const modalType = chat.data.at(-1)?.modal || ''
    item.modal = modalType
    return item
  }) || []
  if (newHistorys.length === 0)
    return { ...defaultState(), ...localState }
  else
    return { ...defaultState(), ...localState, history: newHistorys }
}

export function setLocalState(state: Chat.ChatState) {
  ss.set(LOCAL_NAME, state)
}
