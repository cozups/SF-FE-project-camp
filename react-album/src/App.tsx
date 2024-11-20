import { createBrowserRouter, RouterProvider } from 'react-router-dom';
/** 우리가 만든 페이지 컴포넌트 */
import HomePage from '@/views/Home';
import BookmarkPage from '@/views/Bookmark';
import { Toaster } from '@/components/ui';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [],
  },
  {
    path: '/search/:searchValue',
    element: <HomePage />,
  },
  {
    path: '/bookmark',
    element: <BookmarkPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
