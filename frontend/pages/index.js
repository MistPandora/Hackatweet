import Login from '../components/Login';
import Home from '../components/Home';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function LoginPage() {

  const user = useSelector(state => state.user.value);
  const router = useRouter();

  if (user.username) {
    router.push('/home')
  } else {
    return <Login />
  }

}

export default LoginPage;
