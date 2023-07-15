import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EmpressVote } from './pages/empress-vote';
import { LoversVote } from './pages/lovers-vote';
import { Admin } from './pages/admin';
import { FinalVote } from './pages/final-vote';
import { ChariotVote } from './pages/chariot-vote';

const router = createBrowserRouter([
    {
        path: '/empress',
        element: <EmpressVote />,
    },
    {
        path: '/chariot',
        element: <ChariotVote />,
    },
    {
        path: '/lovers',
        element: <LoversVote />,
    },
    {
        path: '/final',
        element: <FinalVote />,
    },
    {
        path: '/',
        element: <Admin />,
    },
]);

export function App() {
    return (
        <div className="text-center selection:bg-green-600">
            <header className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-700 to-black text-white p-10">
                <RouterProvider router={router} />
            </header>
        </div>
    );
}

export default App;
