import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  // 公開領域のレイアウト
  // 現時点では単にOutletを表示
  return <Outlet />
}
