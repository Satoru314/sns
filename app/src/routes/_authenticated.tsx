import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  // 将来的に認証チェックをここに追加
  // 現時点では単にOutletを表示
  return <Outlet />
}
