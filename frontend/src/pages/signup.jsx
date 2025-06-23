import useStore from '../store.jsx';
import LoginSignUpTemplate from './login/SignupTemplate.jsx';

export default function Signup(){

    let {signUp} = useStore();

    return (
        <>
       <LoginSignUpTemplate func={signUp} work={'SignUp'} />
        </>
    )
}