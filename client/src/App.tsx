import { useAppDispatch } from "./redux/store";
import { setUser } from "./redux/slices/userSlice";
import { Button } from "./components/ui/button";

const App = () => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(setUser({ id: "123", email: "user@example.com", name: "John Doe" }));
  };

  return (
    <div className='bg-red-300'>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  )
}

export default App
