import { Outlet } from "react-router"

export const Layout = () => {
  return (
    <>
      <header>
        <h1 className='title'>Банковские вклады</h1>
        <p>Рыба</p>
        {/* <button onClick={logout}>Выход</button> */}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Рыба</p>
      </footer>
    </>
  )
}