import useStore from '../store.jsx';
import LoginSignUpTemplate from './login/SignupTemplate.jsx';

export default function Login(){

    let {login} = useStore();

    return (
        <>
        <LoginSignUpTemplate func={login} work={'Login'}/>
        </>
    )
}