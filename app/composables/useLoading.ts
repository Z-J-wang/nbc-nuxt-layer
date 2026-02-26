import { BaseLoading } from '#components'

export function useLoading() {
  const overlay = useOverlay()
  const modal = overlay.create(BaseLoading)

  return {
    modal,
    open: modal.open,
    close: modal.close,
    patch: modal.patch
  }
}
