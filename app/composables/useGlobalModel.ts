import { BaseGlobalModel } from '#components'

export function useGlobalModel() {
  const overlay = useOverlay()
  const modal = overlay.create(BaseGlobalModel)

  return {
    modal,
    open: modal.open,
    close: modal.close,
    patch: modal.patch
  }
}
