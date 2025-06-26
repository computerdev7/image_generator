import useStore from '../store.jsx';
import LoginSignUpTemplate from '../components/SignupTemplate.jsx';

export default function Signup(){

    let {signUp} = useStore();

    return (
        <>
       <LoginSignUpTemplate func={signUp} work={'SignUp'} />
        </>
    )
}